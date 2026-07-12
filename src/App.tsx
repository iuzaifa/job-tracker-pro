import React, { useState, useEffect } from 'react';
import { JobForm } from './components/JobForm';
import { JobTable } from './components/JobTable';
import { JobApplication } from './types';
import { Briefcase, GitBranch } from 'lucide-react';

function App() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('jobApplications');
      if (saved) {
        const parsed = JSON.parse(saved);
        setApplications(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(applications));
  }, [applications]);

  const handleJobAdded = (job: JobApplication) => {
    setApplications([job, ...applications]);
    setShowForm(false);
  };

  const handleStatusChange = (
    jobId: string,
    status: JobApplication['applicationStatus']
  ) => {
    setApplications(
      applications.map((app) =>
        app.id === jobId ? { ...app, applicationStatus: status } : app
      )
    );
  };

  const handleDelete = (jobId: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      setApplications(applications.filter((app) => app.id !== jobId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Briefcase className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Job Application Tracker</h1>
                <p className="text-gray-600 text-sm">Manage applications with automated recruiter search</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              {showForm ? 'Close' : 'Add Application'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm && <JobForm onJobAdded={handleJobAdded} />}

        {applications.length > 0 ? (
          <JobTable
            applications={applications}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        ) : !showForm ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Briefcase className="text-gray-300 mx-auto mb-4" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Applications Yet</h2>
            <p className="text-gray-600 mb-6">Start tracking your job applications by adding your first one.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Add Your First Application
            </button>
          </div>
        ) : null}
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p className="flex items-center justify-center gap-2 mb-2">
              <GitBranch size={16} />
              Built with React + TypeScript
            </p>
            <p>© 2024 Job Application Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;