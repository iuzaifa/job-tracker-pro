# Job Application Tracker Pro

> Professional job application management with automated recruiter search, email generation, and Excel export.

![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/react-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.0-blue)

## 🎯 Features

✅ **Automated Recruiter Search** - Searches 5+ sources (Google, LinkedIn, Career Pages)  
✅ **Email Verification** - Only uses verified email addresses  
✅ **Personalized Email Generation** - Auto-generate emails based on job details  
✅ **Excel/CSV Export** - Export all applications with 15 columns of data  
✅ **Application Status Tracking** - Applied/Pending/Skipped statuses  
✅ **Local Storage** - Persistent data management (no cloud upload)  
✅ **Responsive UI** - Works on all devices  
✅ **Search History** - Track and manage all applications  
✅ **Expandable Rows** - View complete job & recruiter details  
✅ **Statistics Dashboard** - Real-time application metrics  

## 📋 Data Tracked (15 Columns)

| Field | Description |
|-------|-------------|  
| Company Name | Name of the company |
| Job Title | Position title |
| Job Location | City/Remote |
| Experience Required | Required experience |
| Job URL | Direct job posting link |
| Application Date | Date applied |
| Recruiter Name | Hiring manager or recruiter |
| **Recruiter Email** | **MANDATORY - Verified email** |
| Recruiter LinkedIn | Recruiter's LinkedIn URL |
| Company Website | Official company website |
| HR Contact Number | If publicly available |
| Application Status | Applied/Pending/Skipped |
| Email Subject | Ready-to-send subject |
| Email Body | Personalized email |
| Notes | Additional remarks |

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/iuzaifa/job-tracker-pro.git
cd job-tracker-pro

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage Guide

### Adding a Job Application

1. Click **"Add Application"** button in header
2. Fill in required fields:
   - Company Name *(mandatory)*
   - Job Title *(mandatory)*
   - Job Location, Experience, URLs, etc.
3. Paste job description (optional - helps personalize email)
4. Click **"Search for Recruiter"**
5. Select recruiter from search results
6. Review & customize email template
7. Click **"Submit Application"**

### Managing Applications

- **View Details**: Click eye icon to expand row
- **Change Status**: Dropdown to update status
- **Copy Email**: Click copy button to copy recruiter email
- **Delete**: Click trash icon to remove
- **Sort**: Click column headers to sort

### Exporting Data

- **Excel Export**: Downloads `.xls` file with formatting
- **CSV Export**: Downloads `.csv` for spreadsheet compatibility
- Files auto-saved to Downloads folder with date timestamp

## 🔍 Recruiter Search Sources

The system searches in this priority order:

1. **Google Search** - Public web results for recruiter emails
2. **LinkedIn** - Professional profiles and company pages
3. **Career Page** - Company careers website
4. **Company Website** - Official contact pages
5. **Manual Entry** - Direct email entry option

### Email Verification

- Validates email format before saving
- Prioritizes verified emails from official sources
- Only accepts emails with valid domain
- Prevents duplicate emails

## ✉️ Email Features

**Auto-Generation:**
- Dynamic subject lines based on job details
- Personalized body with company & recruiter name
- Extracts key points from job description
- Professional greeting and closing

**Full Control:**
- Edit subject before sending
- Customize email body
- Preview before submission
- Copy to send manually

## 💾 Data Storage

- **Local Storage**: All data stored in browser (no cloud)
- **Persistent**: Data survives page refresh
- **Offline**: Works without internet
- **Exportable**: Always backup with Excel export
- **Secure**: Your data stays on your device

## 🛠️ Technology Stack

- **React 18** - UI Framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icon library
- **Axios** - HTTP client
- **Vite** - Build tool

## 🔧 Configuration

### Optional: Enable Google Search API

1. Get API keys from:
   - [Google Custom Search API](https://console.cloud.google.com/)
   - [Google Search Console](https://search.google.com/search-console)

2. Create `.env` file:
```env
VITE_GOOGLE_API_KEY=your_key_here
VITE_GOOGLE_SEARCH_ENGINE_ID=your_id_here
```

3. Restart dev server

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Recruiter Not Found?
- Try different company name variations
- Check company careers page manually
- Enter email manually in form
- Verify company website format

### Export Issues?
- Try CSV format instead of Excel
- Check browser download permissions
- Use incognito/private mode
- Clear browser cache

### Data Lost?
- Check localStorage is enabled
- Browser isn't in private mode
- Regularly export to Excel
- Check browser settings

## 📝 Project Structure

```
src/
├── components/
│   ├── JobForm.tsx       # Add application form
│   └── JobTable.tsx      # Display applications
├── services/
│   ├── recruiterSearch.ts # Recruiter search logic
│   ├── emailGenerator.ts  # Email generation
│   └── excelManager.ts    # Excel/CSV export
├── types/
│   └── index.ts          # TypeScript interfaces
├── App.tsx               # Main component
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## 🤝 Contributing

Contributions welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - feel free to use and modify

## 🙏 Acknowledgments

Built with ❤️ for job seekers managing multiple applications

## 📞 Support

For issues or questions:
- Create a [GitHub Issue](https://github.com/iuzaifa/job-tracker-pro/issues)
- Check existing issues first
- Provide detailed description

---

**Made with React + TypeScript | © 2024**