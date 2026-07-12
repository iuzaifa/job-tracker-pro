import React, { useState } from 'react';
import { JobApplication } from '../types';
import excelManager from '../services/excelManager';
import { Download, Eye, Trash2, Copy, FileText } from 'lucide-react';

interface JobTableProps {
  applications: JobApplication[];
  onStatusChange: (
    jobId: string,
    status: JobApplication['applicationStatus']
  ) => void;
  onDelete: (jobId: string) => void;
}

export const JobTable: React.FC<JobTableProps> = ({
  applications,
  onStatusChange,
  onDelete,
}) => {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof JobApplication>('applicationDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const stats = excelManager.getStatistics(applications);

  const sortedApplications = [...applications].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column: keyof JobApplication) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleExportExcel = () => {
    try {
      excelManager.exportToExcel(applications);
    } catch (error) {
      alert('Error exporting to Excel. Trying CSV...');
      excelManager.exportToCSV(applications);
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Skipped':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <StatCard label="Total" value={stats.total} color="text-blue-600" />
        <StatCard label="Applied" value={stats.applied} color="text-green-600" />
        <StatCard label="Pending" value={stats.pending} color="text-yellow-600" />
        <StatCard label="Skipped" value={stats.skipped} color="text-red-600" />
        <StatCard label="Verified" value={stats.verifiedRecruiters} color="text-purple-600" />
      </div>

      <div className="p-6 border-b bg-gray-50 flex gap-3">
        <button
          onClick={handleExportExcel}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          <Download size={20} />
          Export to Excel
        </button>
        <button
          onClick={() => excelManager.exportToCSV(applications)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          <FileText size={20} />
          Export to CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-900 cursor-pointer hover:bg-gray-200" onClick={() => handleSort('companyName')}>
                Company
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900 cursor-pointer hover:bg-gray-200" onClick={() => handleSort('jobTitle')}>
                Position
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Recruiter Email</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900 cursor-pointer hover:bg-gray-200" onClick={() => handleSort('applicationStatus')}>
                Status
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900 cursor-pointer hover:bg-gray-200" onClick={() => handleSort('applicationDate')}>
                Applied
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedApplications.map((app) => (
              <React.Fragment key={app.id}>
                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold text-gray-900">{app.companyName}</td>
                  <td className="px-6 py-4 text-gray-700">{app.jobTitle}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${app.recruiterEmail}`}
                        className="text-blue-600 hover:underline truncate"
                        title={app.recruiterEmail}
                      >
                        {app.recruiterEmail}
                      </a>
                      <button
                        onClick={() => handleCopyEmail(app.recruiterEmail)}
                        className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                        title="Copy email"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={app.applicationStatus}
                      onChange={(e) =>
                        onStatusChange(
                          app.id,
                          e.target.value as JobApplication['applicationStatus']
                        )
                      }
                      className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer border-0 ${getStatusColor(app.applicationStatus)}`}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Pending">Pending</option>
                      <option value="Skipped">Skipped</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{app.applicationDate}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() =>
                        setExpandedRowId(
                          expandedRowId === app.id ? null : app.id
                        )
                      }
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="View details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(app.id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>

                {expandedRowId === app.id && (
                  <tr className="bg-blue-50 border-b">
                    <td colSpan={6} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        {/* Job Details */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 text-lg">📋 Job Details</h4>
                          <div className="space-y-2 text-sm bg-white p-4 rounded-lg border border-gray-200">
                            <p>
                              <span className="font-semibold text-gray-700">Company:</span>
                              <span className="ml-2 text-gray-600">{app.companyName}</span>
                            </p>
                            <p>
                              <span className="font-semibold text-gray-700">Position:</span>
                              <span className="ml-2 text-gray-600">{app.jobTitle}</span>
                            </p>
                            <p>
                              <span className="font-semibold text-gray-700">Location:</span>
                              <span className="ml-2 text-gray-600">{app.jobLocation || 'N/A'}</span>
                            </p>
                            <p>
                              <span className="font-semibold text-gray-700">Experience:</span>
                              <span className="ml-2 text-gray-600">{app.experienceRequired || 'N/A'}</span>
                            </p>
                            <p>
                              <span className="font-semibold text-gray-700">Status:</span>
                              <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${getStatusColor(app.applicationStatus)}`}>
                                {app.applicationStatus}
                              </span>
                            </p>
                            <p>
                              <span className="font-semibold text-gray-700">Applied Date:</span>
                              <span className="ml-2 text-gray-600">{app.applicationDate}</span>
                            </p>
                            {app.companyWebsite && (
                              <p>
                                <span className="font-semibold text-gray-700">Website:</span>
                                <a
                                  href={app.companyWebsite}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-2 text-blue-600 hover:underline break-all"
                                >
                                  Visit
                                </a>
                              </p>
                            )}
                            {app.jobUrl && (
                              <p>
                                <span className="font-semibold text-gray-700">Job Link:</span>
                                <a
                                  href={app.jobUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-2 text-blue-600 hover:underline break-all"
                                >
                                  View Job
                                </a>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Recruiter Details */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 text-lg">👤 Recruiter Details</h4>
                          <div className="space-y-2 text-sm bg-white p-4 rounded-lg border border-gray-200">
                            <p>
                              <span className="font-semibold text-gray-700">Name:</span>
                              <span className="ml-2 text-gray-600">{app.recruiterName || 'N/A'}</span>
                            </p>
                            <p>
                              <span className="font-semibold text-gray-700">Email:</span>
                              <a
                                href={`mailto:${app.recruiterEmail}`}
                                className="ml-2 text-blue-600 hover:underline font-semibold break-all"
                              >
                                {app.recruiterEmail}
                              </a>
                            </p>
                            {app.recruiterLinkedIn && (
                              <p>
                                <span className="font-semibold text-gray-700">LinkedIn:</span>
                                <a
                                  href={app.recruiterLinkedIn}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-2 text-blue-600 hover:underline break-all"
                                >
                                  View Profile
                                </a>
                              </p>
                            )}
                            {app.hrContactNumber && (
                              <p>
                                <span className="font-semibold text-gray-700">Phone:</span>
                                <span className="ml-2 text-gray-600">{app.hrContactNumber}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Email Content */}
                      <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3 text-lg">✉️ Email Content</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="font-semibold text-gray-700 mb-1">Subject:</p>
                            <p className="bg-gray-100 p-3 rounded text-sm text-gray-800 break-words">
                              {app.emailSubject}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700 mb-1">Body:</p>
                            <div className="bg-gray-100 p-3 rounded max-h-48 overflow-y-auto">
                              <pre className="text-xs whitespace-pre-wrap text-gray-700 font-sans">
                                {app.emailBody}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      {app.notes && (
                        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <h4 className="font-semibold text-gray-900 mb-2">📝 Notes</h4>
                          <p className="text-sm text-gray-700">{app.notes}</p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {applications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No applications yet. Add your first job application!</p>
        </div>
      )}
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => (
  <div className="text-center">
    <div className={`text-3xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-gray-600 mt-1">{label}</div>
  </div>
);