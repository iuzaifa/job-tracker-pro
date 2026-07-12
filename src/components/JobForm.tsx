import React, { useState } from 'react';
import recruiterSearchService from '../services/recruiterSearch';
import emailGeneratorService from '../services/emailGenerator';
import { RecruiterSearchResult, JobApplication, EmailTemplate } from '../types';
import { Search, Mail, Send, Loader } from 'lucide-react';

interface JobFormProps {
  onJobAdded: (job: JobApplication) => void;
}

export const JobForm: React.FC<JobFormProps> = ({ onJobAdded }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    jobLocation: '',
    experienceRequired: '',
    jobUrl: '',
    companyWebsite: '',
    hrContactNumber: '',
    jobDescription: '',
  });

  const [searchResults, setSearchResults] = useState<RecruiterSearchResult[]>([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState<RecruiterSearchResult | null>(null);
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>({
    subject: '',
    body: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSearchRecruiter = async () => {
    if (!formData.companyName.trim() || !formData.jobTitle.trim()) {
      setError('Please enter both company name and job title');
      return;
    }

    setLoading(true);
    setError('');
    setSearchResults([]);

    try {
      const results = await recruiterSearchService.searchRecruiter(
        formData.companyName,
        formData.jobTitle
      );

      if (results.length === 0) {
        setError('No recruiters found. Try entering the email manually or check company website.');
      } else {
        setSearchResults(results);
        setSuccess(`Found ${results.length} potential recruiter(s)`);
      }
    } catch (err) {
      setError('Error searching for recruiters. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecruiter = (recruiter: RecruiterSearchResult) => {
    setSelectedRecruiter(recruiter);

    const template = emailGeneratorService.generateCompleteEmail(
      recruiter.name,
      formData.jobTitle,
      formData.companyName,
      formData.jobDescription,
      formData.experienceRequired
    );

    setEmailTemplate(template);
    setSuccess(`Selected ${recruiter.name} from ${recruiter.source}`);
  };

  const handleUpdateEmailTemplate = (
    field: 'subject' | 'body',
    value: string
  ) => {
    setEmailTemplate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitApplication = () => {
    if (!selectedRecruiter) {
      setError('Please select a recruiter first');
      return;
    }

    if (!selectedRecruiter.email) {
      setError('Recruiter email is required');
      return;
    }

    if (!emailTemplate.subject.trim() || !emailTemplate.body.trim()) {
      setError('Email subject and body cannot be empty');
      return;
    }

    const newJob: JobApplication = {
      id: `job-${Date.now()}`,
      ...formData,
      applicationDate: new Date().toISOString().split('T')[0],
      recruiterName: selectedRecruiter.name,
      recruiterEmail: selectedRecruiter.email,
      recruiterLinkedIn: selectedRecruiter.linkedInUrl || '',
      applicationStatus: 'Applied',
      emailSubject: emailTemplate.subject,
      emailBody: emailTemplate.body,
      notes: '',
    };

    onJobAdded(newJob);

    setFormData({
      companyName: '',
      jobTitle: '',
      jobLocation: '',
      experienceRequired: '',
      jobUrl: '',
      companyWebsite: '',
      hrContactNumber: '',
      jobDescription: '',
    });
    setSearchResults([]);
    setSelectedRecruiter(null);
    setEmailTemplate({ subject: '', body: '' });
    setSuccess('Application added successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Job Application</h2>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 text-green-700 rounded">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name *"
          value={formData.companyName}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title *"
          value={formData.jobTitle}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="jobLocation"
          placeholder="Job Location (e.g., New York, Remote)"
          value={formData.jobLocation}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="experienceRequired"
          placeholder="Experience Required (e.g., 3-5 years)"
          value={formData.experienceRequired}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          name="jobUrl"
          placeholder="Job URL"
          value={formData.jobUrl}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          name="companyWebsite"
          placeholder="Company Website"
          value={formData.companyWebsite}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <textarea
        name="jobDescription"
        placeholder="Paste job description here (optional - helps personalize email)"
        value={formData.jobDescription}
        onChange={handleInputChange}
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
      />

      <div className="mb-6">
        <button
          onClick={handleSearchRecruiter}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition font-semibold"
        >
          {loading ? (
            <>
              <Loader size={20} className="animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search size={20} />
              Search for Recruiter
            </>
          )}
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-gray-900">Found Recruiters:</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {searchResults.map((recruiter, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectRecruiter(recruiter)}
                className={`w-full text-left p-4 border-2 rounded-lg cursor-pointer transition ${
                  selectedRecruiter?.email === recruiter.email
                    ? 'bg-blue-50 border-blue-500'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-semibold text-gray-900">{recruiter.name}</div>
                <div className="text-sm text-blue-600">{recruiter.email}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Source: <span className="font-semibold">{recruiter.source}</span>
                  {recruiter.verified && <span className="ml-2 text-green-600">✓ Verified</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedRecruiter && emailTemplate.subject && (
        <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900">
            <Mail size={20} />
            Email Template Preview
          </h3>
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Subject:
            </label>
            <textarea
              value={emailTemplate.subject}
              onChange={(e) => handleUpdateEmailTemplate('subject', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-12"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Body:
            </label>
            <textarea
              value={emailTemplate.body}
              onChange={(e) => handleUpdateEmailTemplate('body', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-48"
            />
          </div>
        </div>
      )}

      {selectedRecruiter && (
        <button
          onClick={handleSubmitApplication}
          className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
        >
          <Send size={20} />
          Submit Application
        </button>
      )}
    </div>
  );
};