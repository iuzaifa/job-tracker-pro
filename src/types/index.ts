export interface JobApplication {
  id: string;
  companyName: string;
  jobTitle: string;
  jobLocation: string;
  experienceRequired: string;
  jobUrl: string;
  applicationDate: string;
  recruiterName: string;
  recruiterEmail: string;
  recruiterLinkedIn: string;
  companyWebsite: string;
  hrContactNumber: string;
  applicationStatus: 'Applied' | 'Pending' | 'Skipped';
  emailSubject: string;
  emailBody: string;
  notes: string;
}

export interface RecruiterSearchResult {
  name: string;
  email: string;
  linkedInUrl: string;
  jobTitle: string;
  source: 'Google Search' | 'LinkedIn' | 'Career Page' | 'Company Website' | 'Other';
  verified: boolean;
}

export interface SearchQuery {
  jobTitle: string;
  companyName: string;
  location: string;
}

export interface EmailTemplate {
  subject: string;
  body: string;
}