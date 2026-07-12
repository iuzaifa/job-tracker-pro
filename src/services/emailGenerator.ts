import { EmailTemplate } from '../types';

class EmailGeneratorService {
  generateSubject(
    recruiterName: string,
    jobTitle: string,
    companyName: string
  ): string {
    const subjects = [
      `Application for ${jobTitle} Position at ${companyName}`,
      `Interested in ${jobTitle} Opportunity at ${companyName}`,
      `${jobTitle} Application - Excited to Join ${companyName}`,
      `Strong Candidate for ${jobTitle} Role`,
    ];

    return subjects[Math.floor(Math.random() * subjects.length)];
  }

  generateEmailBody(
    recruiterName: string,
    jobTitle: string,
    companyName: string,
    jobDescription: string = '',
    experienceRequired: string = ''
  ): string {
    const keyPoints = this.extractKeyPoints(jobDescription);

    const emailBody = `Dear ${recruiterName || 'Hiring Manager'},

I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. I am impressed by your company's innovative work and believe my skills and experience align well with your team's needs.

**Why I'm a Great Fit:**
${keyPoints}

**My Key Strengths:**
- Strong technical skills and problem-solving abilities
- Proven experience in delivering high-quality results
- Excellent communication and collaboration skills
- Passion for continuous learning and growth

I have attached my resume for your review, which provides more details about my background and accomplishments. I would welcome the opportunity to discuss how I can contribute to ${companyName}'s continued success.

Thank you for considering my application. I look forward to hearing from you soon.

Best regards,
[YOUR NAME]
[YOUR PHONE]
[YOUR LINKEDIN PROFILE URL]`;

    return emailBody;
  }

  private extractKeyPoints(jobDescription: string): string {
    if (!jobDescription || jobDescription.length === 0) {
      return `- Contribute to innovative projects
- Work with talented and collaborative teams
- Grow my skills and expertise in a dynamic environment`;
    }

    const points = jobDescription
      .split(/[\n•\-]|[0-9]+\./) 
      .filter((p) => p.trim().length > 10)
      .slice(0, 3)
      .map((p) => `- ${p.trim()}`)
      .join('\n');

    return points || `- Meet the requirements of the ${jobDescription.substring(0, 30)}... position`;
  }

  generateCompleteEmail(
    recruiterName: string,
    jobTitle: string,
    companyName: string,
    jobDescription: string = '',
    experienceRequired: string = ''
  ): EmailTemplate {
    return {
      subject: this.generateSubject(recruiterName, jobTitle, companyName),
      body: this.generateEmailBody(
        recruiterName,
        jobTitle,
        companyName,
        jobDescription,
        experienceRequired
      ),
    };
  }

  formatEmailForSending(
    recipientEmail: string,
    subject: string,
    body: string
  ): string {
    return `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}

export default new EmailGeneratorService();