# Smart Student Hub

Smart Student Hub is a centralized, AI-powered academic and career growth platform built for Higher Education Institutions (HEIs). It helps students, faculty, and administrators manage student records, achievements, certificates, coding profiles, and mentoring workflows from one unified digital ecosystem.

This project is designed around the vision of creating a complete and verifiable student profile that supports institutional reporting, placement readiness, and long-term academic tracking.

## Problem Statement

Most institutions still store student achievements across disconnected systems, spreadsheets, and paper documents. This causes:

- Fragmented student records
- Delayed verification and approval workflows
- Difficulty in generating reports for accreditation and compliance
- Poor visibility of student progression for mentors and administrators

Smart Student Hub solves this by providing one integrated platform for student lifecycle data, approvals, analytics, and AI-assisted tools.

## Core Platform Highlights

- Centralized student academic and activity records
- Role-based dashboards for Student, Teacher, and Admin
- AI resume and portfolio generation workflows
- Certificate upload, OCR extraction, and verification pipeline
- LeetCode and CodeChef profile integration
- Progress tracking with approval status visibility
- Mentorship and faculty-level monitoring
- Institution-wide analytics and compliance-oriented reporting

## User Roles

- Student
- Teacher (Mentor)
- Admin

## Student Module Features

- Secure student login and personalized dashboard
- AI Resume Generator for structured, editable professional resumes
- AI Portfolio Generator with customizable portfolio output
- Resume Analyzer with ATS-style insights
- Skill gap detection and recommendation workflows
- Internship and course guidance suggestions
- Certificate upload and validation request submission
- OCR-driven certificate data extraction
- Fake/modified certificate detection support pipeline
- Project portfolio management for academic and personal work
- Coding profile integration:
	- LeetCode stats
	- CodeChef ratings and activity
- Searchable records and profile-level progress visibility

## Teacher (Mentor) Module Features

- Secure teacher login and dashboard access
- Assigned student visibility with progress insights
- Certificate verification queue with approve/reject actions
- AI-assisted authenticity support in verification flow
- Feedback and decision communication to students
- Mentoring and counselling support workflows
- Student performance monitoring across projects and certifications
- Report generation for student progress and approvals

## Admin Module Features

- Secure admin login and control center access
- User management (students, faculty, admins)
- Role and allocation management (including faculty-student mapping)
- Department and institution-level oversight
- Workflow monitoring and operational governance
- Institutional analytics and data visibility
- Reporting support for compliance and accreditation use cases

## AI and Automation Features

- AI-assisted resume and portfolio creation
- AI resume analysis and recommendation engine
- OCR pipeline for certificate text extraction
- Intelligent certificate authenticity checks
- Search assistance and profile lookup workflows

## Functional Coverage

- Academic records and student profile management
- Certificate lifecycle tracking (upload, verify, status)
- Mentorship communication and review operations
- Coding achievement integration and display
- Institutional reporting and analytics support

## Project Structure

```text
sih-smart-student-hub/
|- Backend/
|  |- app.js
|  |- models/
|  |- routes/
|  |- utils/
|  |- config/
|- Frontend/
|  |- smart-student-hub/
|     |- src/
|     |  |- components/
|     |  |- services/
|     |  |- utils/
|- SmartStudentHubMobile/
|  |- src/
|     |- screens/
|     |- services/
```

## Technology Stack

- Frontend Web: React, Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express.js
- Database: MongoDB (via model-based architecture)
- Mobile: React Native
- AI/OCR Integrations: resume analysis, portfolio generation, and certificate scan utilities
- External Integrations: LeetCode, CodeChef

## Quick Start

### 1. Clone Repository

```bash
git clone <your-repository-url>
cd sih-smart-student-hub
```

### 2. Install Dependencies

Backend:

```bash
cd Backend
npm install
```

Frontend:

```bash
cd ../Frontend/smart-student-hub
npm install
```

Mobile App (optional):

```bash
cd ../../SmartStudentHubMobile
npm install
```

### 3. Run Services

Run backend server:

```bash
cd Backend
npm start
```

Run frontend web app:

```bash
cd Frontend/smart-student-hub
npm run dev
```

Build frontend:

```bash
npm run build
```

## Suggested Environment Configuration

Configure environment variables in backend and frontend based on your deployment setup, including:

- Database connection string
- API base URLs
- JWT/auth secrets
- Cloud storage keys (if used)
- OAuth/provider keys (if enabled)
- AI provider credentials (if enabled)

## Use Cases

- Student profile and achievement digitization
- Faculty-led mentoring and verification workflows
- Institutional data governance and monitoring
- Placement and career readiness tracking
- Accreditation and compliance report support

## Security and Governance Notes

- Use role-based access control for all dashboards
- Restrict admin-level routes and sensitive actions
- Keep secrets only in environment files, never hard-code credentials
- Validate uploaded documents before storage and processing

## Roadmap Possibilities

- Expanded analytics dashboards with predictive indicators
- Additional coding platform integrations
- Advanced recommendation engine for personalized growth plans
- Deeper mobile workflow parity with web platform

## Team and Authors

### Developed By

ERROR SQUAD X 2027 AIML BRANCH

### About Authors

This platform is developed in a collaborative manner by:

- Malipeddi Sekhar
- Durgaprased

Both authors contributed to the design, implementation, and integration of the Smart Student Hub modules across web, backend, and system workflow layers.

## License

This project is intended for academic and institutional innovation use. Add a formal license file if you plan public/open-source distribution.
