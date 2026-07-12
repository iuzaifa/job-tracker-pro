import { JobApplication } from '../types';

class ExcelManagerService {
  generateCSV(applications: JobApplication[]): string {
    const headers = [
      'Company Name',
      'Job Title',
      'Job Location',
      'Experience Required',
      'Job URL',
      'Application Date',
      'Recruiter Name',
      'Recruiter Email',
      'Recruiter LinkedIn',
      'Company Website',
      'HR Contact Number',
      'Application Status',
      'Email Subject',
      'Email Body',
      'Notes',
    ];

    const rows = applications.map((app) => [
      this.escapeCSV(app.companyName),
      this.escapeCSV(app.jobTitle),
      this.escapeCSV(app.jobLocation),
      this.escapeCSV(app.experienceRequired),
      this.escapeCSV(app.jobUrl),
      this.escapeCSV(app.applicationDate),
      this.escapeCSV(app.recruiterName),
      this.escapeCSV(app.recruiterEmail),
      this.escapeCSV(app.recruiterLinkedIn),
      this.escapeCSV(app.companyWebsite),
      this.escapeCSV(app.hrContactNumber),
      this.escapeCSV(app.applicationStatus),
      this.escapeCSV(app.emailSubject),
      this.escapeCSV(app.emailBody),
      this.escapeCSV(app.notes),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    return csvContent;
  }

  private escapeCSV(field: string): string {
    if (!field) return '';
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  }

  exportToCSV(applications: JobApplication[]): void {
    const csv = this.generateCSV(applications);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `job-applications-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportToExcel(applications: JobApplication[]): void {
    const xml = this.generateExcelXML(applications);
    const blob = new Blob([xml], {
      type: 'application/vnd.ms-excel;charset=utf-8;',
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `job-applications-${new Date().toISOString().split('T')[0]}.xls`
    );
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private generateExcelXML(applications: JobApplication[]): string {
    const header = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">`;

    const styles = `<Styles>
  <Style ss:ID="Default" ss:Name="Normal">
    <Alignment ss:Horizontal="Left" ss:Vertical="Bottom"/>
  </Style>
  <Style ss:ID="Header">
    <Font ss:Bold="1" ss:Color="#FFFFFF"/>
    <Interior ss:Color="#4472C4" ss:Pattern="Solid"/>
    <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
  </Style>
</Styles>`;

    let worksheet = `<Worksheet ss:Name="Job Applications">
  <Table ss:ExpandedColumnCount="15" ss:ExpandedRowCount="${applications.length + 1}">`;

    const headers = [
      'Company Name', 'Job Title', 'Job Location', 'Experience Required',
      'Job URL', 'Application Date', 'Recruiter Name', 'Recruiter Email',
      'Recruiter LinkedIn', 'Company Website', 'HR Contact Number',
      'Application Status', 'Email Subject', 'Email Body', 'Notes',
    ];

    worksheet += '\n    <Row ss:StyleID="Header">';
    for (const header of headers) {
      worksheet += `\n      <Cell><Data ss:Type="String">${this.escapeXML(header)}</Data></Cell>`;
    }
    worksheet += '\n    </Row>';

    for (const app of applications) {
      worksheet += '\n    <Row>';
      const row = [
        app.companyName, app.jobTitle, app.jobLocation, app.experienceRequired,
        app.jobUrl, app.applicationDate, app.recruiterName, app.recruiterEmail,
        app.recruiterLinkedIn, app.companyWebsite, app.hrContactNumber,
        app.applicationStatus, app.emailSubject, app.emailBody, app.notes,
      ];

      for (const cell of row) {
        worksheet += `\n      <Cell><Data ss:Type="String">${this.escapeXML(String(cell || ''))}</Data></Cell>`;
      }
      worksheet += '\n    </Row>';
    }

    worksheet += '\n  </Table>\n</Worksheet>';
    return header + styles + worksheet + '\n</Workbook>';
  }

  private escapeXML(str: string): string {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  getStatistics(applications: JobApplication[]) {
    return {
      total: applications.length,
      applied: applications.filter((a) => a.applicationStatus === 'Applied').length,
      pending: applications.filter((a) => a.applicationStatus === 'Pending').length,
      skipped: applications.filter((a) => a.applicationStatus === 'Skipped').length,
      verifiedRecruiters: applications.filter((a) => a.recruiterEmail).length,
    };
  }
}

export default new ExcelManagerService();