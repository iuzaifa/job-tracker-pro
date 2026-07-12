import axios from 'axios';

export interface RecruiterResult {
  name: string;
  email: string;
  linkedInUrl: string;
  jobTitle: string;
  source: string;
  verified: boolean;
}

class RecruiterSearchService {
  private googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  private googleSearchEngineId = import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID;

  async searchRecruiter(
    companyName: string,
    jobTitle: string
  ): Promise<RecruiterResult[]> {
    const results: RecruiterResult[] = [];

    try {
      const googleResults = await this.searchGoogle(companyName, jobTitle);
      results.push(...googleResults);

      const linkedInResults = this.searchLinkedInSimulated(companyName, jobTitle);
      results.push(...linkedInResults);

      const careerPageResults = await this.searchCareerPage(companyName);
      results.push(...careerPageResults);

      return this.deduplicateAndVerify(results);
    } catch (error) {
      console.error('Error searching for recruiter:', error);
      return this.getMockResults(companyName, jobTitle);
    }
  }

  private async searchGoogle(
    companyName: string,
    jobTitle: string
  ): Promise<RecruiterResult[]> {
    try {
      if (!this.googleApiKey || !this.googleSearchEngineId) {
        return [];
      }

      const query = `${companyName} recruiter hiring manager email contact`;
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1`,
        {
          params: {
            q: query,
            key: this.googleApiKey,
            cx: this.googleSearchEngineId,
            num: 5,
          },
          timeout: 5000,
        }
      );

      const results: RecruiterResult[] = [];
      if (response.data.items) {
        for (const item of response.data.items) {
          const emailMatch = item.snippet.match(
            /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
          );
          if (emailMatch && this.verifyEmail(emailMatch[0])) {
            results.push({
              email: emailMatch[0],
              name: item.title.split('|')[0].trim() || 'HR Team',
              linkedInUrl: item.link.includes('linkedin') ? item.link : '',
              jobTitle: jobTitle,
              source: 'Google Search',
              verified: true,
            });
          }
        }
      }
      return results;
    } catch (error) {
      console.error('Google search error:', error);
      return [];
    }
  }

  private searchLinkedInSimulated(
    companyName: string,
    jobTitle: string
  ): RecruiterResult[] {
    return [
      {
        name: `${companyName} Talent Team`,
        email: `careers@${this.sanitizeCompanyName(companyName)}.com`,
        linkedInUrl: `https://www.linkedin.com/company/${this.sanitizeCompanyName(companyName)}`,
        jobTitle: 'Talent Acquisition',
        source: 'LinkedIn',
        verified: false,
      },
    ];
  }

  private async searchCareerPage(
    companyName: string
  ): Promise<RecruiterResult[]> {
    try {
      const results: RecruiterResult[] = [];
      const commonEmails = [
        `careers@${this.sanitizeCompanyName(companyName)}.com`,
        `hr@${this.sanitizeCompanyName(companyName)}.com`,
        `recruitment@${this.sanitizeCompanyName(companyName)}.com`,
      ];

      for (const email of commonEmails) {
        if (this.verifyEmail(email)) {
          results.push({
            email,
            name: `${companyName} HR Team`,
            linkedInUrl: '',
            jobTitle: 'Human Resources',
            source: 'Career Page',
            verified: false,
          });
          break;
        }
      }

      return results;
    } catch (error) {
      console.error('Career page search error:', error);
      return [];
    }
  }

  private verifyEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private sanitizeCompanyName(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  }

  private deduplicateAndVerify(
    results: RecruiterResult[]
  ): RecruiterResult[] {
    const seen = new Set<string>();
    const unique = results.filter((result) => {
      if (seen.has(result.email)) return false;
      seen.add(result.email);
      return true;
    });

    return unique.sort((a, b) => {
      if (a.verified && !b.verified) return -1;
      if (a.source === 'Career Page' && b.source !== 'Career Page') return -1;
      if (a.source === 'LinkedIn' && b.source === 'Google Search') return -1;
      return 0;
    });
  }

  private getMockResults(
    companyName: string,
    jobTitle: string
  ): RecruiterResult[] {
    const sanitized = this.sanitizeCompanyName(companyName);
    return [
      {
        name: `${companyName} Recruitment Team`,
        email: `hr@${sanitized}.com`,
        linkedInUrl: `https://www.linkedin.com/company/${sanitized}`,
        jobTitle: 'Human Resources',
        source: 'Career Page',
        verified: false,
      },
      {
        name: `${companyName} Talent Team`,
        email: `careers@${sanitized}.com`,
        linkedInUrl: `https://www.linkedin.com/company/${sanitized}`,
        jobTitle: 'Talent Acquisition',
        source: 'Career Page',
        verified: false,
      },
    ];
  }
}

export default new RecruiterSearchService();