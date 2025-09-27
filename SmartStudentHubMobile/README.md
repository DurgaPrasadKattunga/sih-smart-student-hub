# Smart Student Hub Mobile App

A comprehensive React Native mobile application for managing student activity records in Higher Education Institutions (HEIs).

## Features

### 🎓 Student Features
- **Student Registration & Login**: Secure authentication system
- **Dashboard**: Overview of certificates, projects, and academic progress
- **Certificate Management**: Add and manage personal certificates
- **Academic Records**: Submit academic certificates for review
- **Project Portfolio**: Showcase coding projects and achievements
- **Profile Management**: Complete student profile with documents

### 👨‍🏫 Teacher Features
- **Teacher Registration & Login**: Dedicated teacher authentication
- **Student Management**: View and manage student records
- **Certificate Review**: Approve/reject student academic certificates
- **Group Management**: Create and manage student groups
- **Analytics**: Track student progress and achievements

### 🛡️ Admin Features
- **Admin Registration & Login**: Administrative access control
- **System Management**: Manage colleges, departments, and users
- **Certificate Oversight**: Review and approve all certificates
- **Student Administration**: Complete student record management
- **System Analytics**: Comprehensive reporting and insights

## Technology Stack

- **Frontend**: React Native with Expo
- **Navigation**: React Navigation v6
- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Authentication**: bcrypt for password hashing
- **File Upload**: Multer for document handling
- **API**: RESTful API with Axios

## Project Structure

```
SmartStudentHubMobile/
├── src/
│   ├── screens/           # All app screens
│   │   ├── LandingScreen.js
│   │   ├── StudentLoginScreen.js
│   │   ├── StudentRegisterScreen.js
│   │   ├── StudentDashboardScreen.js
│   │   ├── TeacherLoginScreen.js
│   │   ├── TeacherRegisterScreen.js
│   │   ├── TeacherDashboardScreen.js
│   │   ├── AdminLoginScreen.js
│   │   ├── AdminRegisterScreen.js
│   │   └── AdminDashboardScreen.js
│   ├── services/          # API services
│   │   └── api.js
│   └── components/        # Reusable components
├── App.js                 # Main app component
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- MongoDB (local or cloud)
- Android Studio / Xcode (for device testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SmartStudentHubMobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   cd ../Backend
   npm install
   npm start
   ```

4. **Start the mobile app**
   ```bash
   cd ../SmartStudentHubMobile
   npx expo start
   ```

### Running the App

1. **Expo Go App**: Install Expo Go on your mobile device and scan the QR code
2. **Android Emulator**: Press 'a' in the terminal to open Android emulator
3. **iOS Simulator**: Press 'i' in the terminal to open iOS simulator (Mac only)
4. **Web Browser**: Press 'w' in the terminal to open in web browser

## API Endpoints

### Student Endpoints
- `POST /api/register` - Student registration
- `POST /api/login` - Student login
- `GET /api/profile/:studentId` - Get student profile
- `PUT /api/profile/:studentId` - Update student profile
- `GET /api/certificates/:studentId` - Get personal certificates
- `POST /api/certificates` - Add personal certificate
- `GET /api/academic-certificates/:studentId` - Get academic certificates
- `POST /api/academic-certificates` - Submit academic certificate
- `GET /api/projects/:studentId` - Get student projects
- `POST /api/projects` - Add project

### Teacher Endpoints
- `POST /api/teacher/register` - Teacher registration
- `POST /api/teacher/login` - Teacher login
- `GET /api/teacher/groups/:teacherId` - Get teacher groups
- `GET /api/admin/students` - Get all students
- `GET /api/review/academic-certificates` - Get pending certificates
- `POST /api/review/academic-certificates/:studentId/:certificateId/approve` - Approve certificate
- `POST /api/review/academic-certificates/:studentId/:certificateId/reject` - Reject certificate

### Admin Endpoints
- `POST /api/admin/register` - Admin registration
- `POST /api/admin/login` - Admin login
- `GET /api/colleges` - Get all colleges
- `GET /api/admin/students` - Get all students
- `GET /api/review/academic-certificates` - Get pending certificates
- `POST /api/review/academic-certificates/:studentId/:certificateId/approve` - Approve certificate
- `POST /api/review/academic-certificates/:studentId/:certificateId/reject` - Reject certificate

## Features Overview

### 🎨 Modern UI/UX
- Clean, intuitive interface
- Responsive design for all screen sizes
- Color-coded user roles (Student: Blue, Teacher: Green, Admin: Red)
- Smooth navigation between screens
- Loading states and error handling

### 🔐 Security
- Password hashing with bcrypt
- Secure API endpoints
- Input validation and sanitization
- File upload security

### 📱 Mobile-First Design
- Touch-friendly interface
- Optimized for mobile devices
- Cross-platform compatibility (iOS & Android)
- Offline-ready architecture

## Development

### Adding New Features
1. Create new screen components in `src/screens/`
2. Add API endpoints in `src/services/api.js`
3. Update navigation in `App.js`
4. Test on both iOS and Android

### Code Style
- Use functional components with hooks
- Follow React Native best practices
- Consistent naming conventions
- Proper error handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
