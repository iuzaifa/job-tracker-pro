# 📖 How to Use Job Application Tracker Pro

## Table of Contents
- [🚀 Quick Start](#-quick-start)
- [📝 Add Application](#-add-application)
- [🔍 Search Recruiter](#-search-recruiter)
- [✉️ Email Template](#-email-template)
- [📊 Manage Applications](#-manage-applications)
- [💾 Export Data](#-export-data)
- [📈 Dashboard Stats](#-dashboard-stats)
- [🔧 Features Explained](#-features-explained)
- [📝 Example Workflow](#-example-workflow)
- [⚙️ Configuration](#-configuration)
- [🆘 Troubleshooting](#-troubleshooting)
- [🎯 Pro Tips](#-pro-tips)
- [🌐 Deploy Online](#-deploy-online)

---

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/iuzaifa/job-tracker-pro.git
cd job-tracker-pro
npm install
npm run dev
```

**App opens at:** `http://localhost:3000` ✨

---

## 📝 Add Application

### Step 1: Click "Add Application" Button

Click the blue **"Add Application"** button in the header to open the form.

### Step 2: Fill Required Fields

```
✓ Company Name (REQUIRED)
  Example: Wipro, Google, Amazon

✓ Job Title (REQUIRED)
  Example: Frontend Developer, Full Stack Engineer

Optional Fields:
  • Job Location: India, Remote, New York
  • Experience Required: 1-3 years, 5+ years
  • Job URL: Link to job posting
  • Company Website: https://company.com
  • Job Description: Paste full JD for better email personalization
```

### Step 3: Submit Form

Fill at least **Company Name** and **Job Title**, then proceed to recruiter search.

---

## 🔍 Search Recruiter

### How It Works

1. **Enter Company & Job Title**
2. **Click "Search for Recruiter"** button
3. System searches 5 sources in order:
   - ✅ Google Search (web results)
   - ✅ LinkedIn (professional profiles)
   - ✅ Career Pages (company careers site)
   - ✅ Company Website (official contacts)
   - ✅ Manual Entry (type email manually)

### Select Recruiter

**You'll see results like:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Wipro Talent Team
careers@wipro.com
Source: LinkedIn ✓ Verified
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Click to select** → Email template auto-generates

---

## ✉️ Email Template

### Auto-Generated Template

Once you select a recruiter:

```
Subject Line:
"Frontend Developer Application - Excited to Join Wipro"

Email Body:
"Dear Wipro Talent Team,

I am writing to express my strong interest in the 
Frontend Developer position at Wipro...

**Why I'm a Great Fit:**
- Contribute to innovative projects
- Work with talented teams
- Grow my skills in dynamic environment

**My Key Strengths:**
- Strong technical skills
- Proven experience in quality results
- Excellent communication
- Passion for learning

Best regards,
[YOUR NAME]"
```

### Customize Email

- ✏️ **Edit Subject:** Change to personalize more
- ✏️ **Edit Body:** Add your resume details, achievements
- 👁️ **Preview:** Read full content before submitting

---

## 📊 Manage Applications

### View Details

**Click 👁️ Eye Icon** to expand row:

```
📋 JOB DETAILS          👤 RECRUITER DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Company: Wipro          Name: Wipro Talent Team
Position: Frontend Dev   Email: careers@wipro.com
Location: India         LinkedIn: profile.link
Experience: 1-3 years   Phone: +91-XXXX
Status: Applied         
Date: 2026-07-12        

✉️ EMAIL CONTENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subject: Frontend Developer Application...
Body: [Full email preview]
```

### Change Status

**Click Status Dropdown:**

```
✅ Applied     → Successfully sent application
⏳ Pending     → Waiting for interview/response
❌ Skipped     → Didn't apply to this job
```

**Auto-saved!** No need to click save.

### Copy Email

**Click 📋 Copy Icon** next to recruiter email:

```
1. Email copied to clipboard
2. Open Gmail/Outlook
3. Paste and send manually
4. Update status to "Applied"
```

### Delete Application

**Click 🗑️ Trash Icon:**

```
1. Confirmation dialog appears
2. Click "OK" to confirm
3. Application removed
```

### Sort Applications

**Click Column Headers** to sort:

```
Click "Company" → Sort by company name (A-Z)
Click "Position" → Sort by job title
Click "Status" → Sort by Applied/Pending/Skipped
Click "Applied" → Sort by date (oldest/newest)
```

---

## 💾 Export Data

### Excel Export

```
1. Click "Export to Excel" button
2. File downloads: job-applications-2026-07-12.xls
3. Opens in Microsoft Excel / Google Sheets
4. Includes all 15 data columns
```

**Excel File Contains:**
```
✓ Company Name
✓ Job Title
✓ Job Location
✓ Experience Required
✓ Job URL (clickable link)
✓ Application Date
✓ Recruiter Name
✓ Recruiter Email
✓ Recruiter LinkedIn
✓ Company Website
✓ HR Contact Number
✓ Application Status
✓ Email Subject
✓ Email Body
✓ Notes
```

**Excel Features:**
- 🎨 Formatted header row (blue background)
- 📌 Frozen header row (stays visible while scrolling)
- 📏 Auto-sized columns
- 🔗 Clickable links for URLs

### CSV Export

```
1. Click "Export to CSV" button
2. File downloads: job-applications-2026-07-12.csv
3. Works with Excel, Google Sheets, Numbers
4. Plain text format (universal)
```

---

## 📈 Dashboard Stats

**Top of application table shows:**

```
┌──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│ Total        │ Applied      │ Pending      │ Skipped      │ Verified     │
├──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│      25      │      18      │       5      │       2      │      24      │
│ (Total Apps) │ (Sent)       │ (Waiting)    │ (Rejected)   │ (With Email) │
└──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘
```

**Real-time Updates:**
- 📊 Stats update automatically when you add/delete applications
- ✅ Verified count = applications with valid recruiter emails
- 🎯 Helps track your application progress

---

## 🔧 Features Explained

### ✉️ Email Generation

**How it works:**
- ✅ Auto-generates professional subject lines
- ✅ Personalizes with recruiter & company name
- ✅ Extracts key points from job description
- ✅ Professional greeting and closing
- ✅ Ready to copy and send

**Example:**
```
Job Description: "Must have 5+ years React experience..."
         ↓
Email: "- Strong React development expertise
        - Proven experience with complex projects
        - Familiar with modern tooling"
```

### 📧 Mandatory Email Verification

**Why required?**
- ✅ Ensures recruiter email is valid format
- ✅ Prevents duplicate entries
- ✅ Won't save without verified email
- ✅ Only uses legitimate contacts

**Validation:**
```
❌ Invalid: "john@" → Missing domain
❌ Invalid: "john.example" → Missing @
✅ Valid: "john@example.com" → Correct format
```

### 💾 Local Storage

**Where is data stored?**
- 📍 In your browser's local storage
- 🔒 NOT on cloud or external servers
- 🛡️ Your data stays private and local
- 🔄 Survives page refresh and browser restart

**Works offline:**
- ✅ Add applications without internet
- ✅ View applications offline
- ✅ Export data anytime
- ⚠️ Sync not available (local only)

### 🔄 Search Priority

**Recruiter search order:**

```
1. Google Search
   └─ Searches public web for recruiter emails
   └─ Highest priority - verified sources

2. LinkedIn
   └─ Professional profiles and company pages
   └─ Career pages and company LinkedIn

3. Career Pages
   └─ Company careers website
   └─ Official HR contact emails

4. Company Website
   └─ Direct contact pages
   └─ Public email addresses

5. Manual Entry
   └─ Type email manually if not found
   └─ Enter any valid email address
```

---

## 📝 Example Workflow

### Day 1: Apply to Wipro

```
1. Click "Add Application"
2. Enter:
   Company: Wipro
   Position: Frontend Developer
   Location: India
   Experience: 1-3 years

3. Click "Search for Recruiter"
4. Results show: careers@wipro.com
5. Click to select recruiter
6. Email generates automatically
7. Review & customize email
8. Click "Submit Application"

✅ Application saved!
```

### Day 7: Interview Call Received

```
1. Open Job Application Tracker
2. Find Wipro application
3. Click status dropdown
4. Change: Applied → Pending
5. Status auto-saved

📊 Dashboard updates:
   Applied: 18 → 17
   Pending: 5 → 6
```

### Day 30: Export & Review

```
1. Review all applications
2. Update statuses (Pending → Applied)
3. Click "Export to Excel"
4. Open job-applications.xls
5. Analyze progress:
   - Success rate: 18/25 = 72%
   - Pending interviews: 6
   - Rejected: 2

💾 Backup saved locally
```

---

## ⚙️ Configuration

### Optional: Enable Google Search API

**For better recruiter search results:**

1. **Get Google API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project
   - Enable "Custom Search API"
   - Create API key

2. **Get Search Engine ID:**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Create custom search engine
   - Copy search engine ID

3. **Add to .env file:**
   ```env
   VITE_GOOGLE_API_KEY=your_api_key_here
   VITE_GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here
   ```

4. **Restart development server:**
   ```bash
   npm run dev
   ```

---

## 🆘 Troubleshooting

### ❓ Recruiter not found in search?

**Solutions:**
```
1. Try different company name variations
   Example: "Tata Consultancy Services" vs "TCS"

2. Check company website manually
   Visit: company.com/careers → Find HR email

3. Enter email manually
   Click form, scroll down, enter email directly

4. Search LinkedIn directly
   Find company page → Look for HR department
```

### ❓ Can't export to Excel?

**Solutions:**
```
1. Try CSV export instead
   Works with all spreadsheet apps

2. Check browser download permissions
   Settings → Privacy → Download restrictions

3. Use incognito/private mode
   Fresh browser session

4. Clear browser cache
   Settings → Clear browsing data
```

### ❓ Data lost after refresh?

**Solutions:**
```
1. Check if localStorage is enabled
   Settings → Privacy → Storage permissions

2. Not in private/incognito mode
   Data doesn't persist in private mode

3. Export regularly to Excel
   Backup outside browser

4. Don't clear browser cache
   Cache stores your data
```

### ❓ Email content looks incomplete?

**Solutions:**
```
1. Click expand (👁️) to view full content
   Shows complete formatted email

2. Edit subject/body if needed
   Customize before submitting

3. Use "Copy Email" to send manually
   Copy → Gmail → Paste → Send

4. Check if job description was pasted
   Better description = better email personalization
```

---

## 🎯 Pro Tips

### 💡 Tip 1: Paste Job Description
```
Paste full JD in "Job Description" field
↓
System extracts key requirements
↓
Email automatically personalizes
↓
Better match with recruiter expectations ✅
```

### 💡 Tip 2: Update Status Regularly
```
Day 1: Applied
Day 5: Pending (interview call received)
Day 10: Applied (second round scheduled)
Day 20: Pending (waiting for offer)
↓
Track your journey clearly
```

### 💡 Tip 3: Export Weekly
```
Every Sunday: Click "Export to Excel"
↓
Save: job-applications-week1.xls
↓
Keep 4 backups (one per week)
↓
Never lose your data 🔒
```

### 💡 Tip 4: Use Copy Email Feature
```
1. Click copy icon (📋)
2. Open Gmail → Compose
3. Paste recipient email
4. Paste body in message
5. Add attachment (resume)
6. Send directly ✉️
```

### 💡 Tip 5: Fill All Fields
```
More complete data:
✓ Better for your records
✓ Easier to remember job details
✓ Better for export and analysis
✓ Professional organization
```

---

## 🌐 Deploy Online

### Deploy to Vercel (Recommended)

**Easiest method:**

1. Go to [Vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import: `github.com/iuzaifa/job-tracker-pro`
4. Click **"Deploy"**
5. Wait 2-3 minutes
6. **Your app is live!** 🎉

**Get live URL:** `https://job-tracker-pro-xxx.vercel.app`

### Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow prompts → App deployed in seconds

### Deploy to Netlify

```bash
npm run build
# Upload 'dist' folder to Netlify
```

### Build Locally

```bash
npm run build
# Creates optimized 'dist' folder
# Ready for any hosting service
```

---

## 📚 Additional Resources

- **GitHub:** [job-tracker-pro](https://github.com/iuzaifa/job-tracker-pro)
- **Issues:** [Report bugs](https://github.com/iuzaifa/job-tracker-pro/issues)
- **Documentation:** [README.md](./README.md)

---

## ✨ Quick Reference

```
┌─────────────────────────────────────────┐
│        QUICK ACTION REFERENCE           │
├─────────────────────────────────────────┤
│ ➕ Add Application  → "Add Application" │
│ 🔍 Search Recruiter → "Search" button   │
│ 👁️  View Details    → Eye icon          │
│ 📋 Copy Email       → Copy icon         │
│ 📊 Change Status    → Dropdown menu     │
│ 🗑️  Delete          → Trash icon        │
│ ⬆️⬇️ Sort            → Click header      │
│ 📥 Export Excel     → "Export" button   │
│ 📤 Export CSV       → "Export CSV" btn  │
└─────────────────────────────────────────┘
```

---

**Ready to track your job applications? 🚀 Start now!**

For detailed features, check [README.md](./README.md)
