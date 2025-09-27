import axios from 'axios';

const API_BASE_URL = 'http://10.171.156.171:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Student API calls
export const studentAPI = {
  register: (studentData) => api.post('/register', studentData),
  login: (credentials) => api.post('/login', credentials),
  getProfile: (studentId) => api.get(`/profile/${studentId}`),
  updateProfile: (studentId, profileData) => api.put(`/profile/${studentId}`, profileData),
  getCertificates: (studentId) => api.get(`/certificates/${studentId}`),
  addCertificate: (certificateData) => api.post('/certificates', certificateData),
  deleteCertificate: (studentId, certificateId) => api.delete(`/certificates/${studentId}/${certificateId}`),
  getAcademicCertificates: (studentId) => api.get(`/academic-certificates/${studentId}`),
  addAcademicCertificate: (certificateData) => api.post('/academic-certificates', certificateData),
  deleteAcademicCertificate: (studentId, certificateId) => api.delete(`/academic-certificates/${studentId}/${certificateId}`),
  getProjects: (studentId) => api.get(`/projects/${studentId}`),
  addProject: (projectData) => api.post('/projects', projectData),
  deleteProject: (studentId, projectId) => api.delete(`/projects/${studentId}/${projectId}`),
};

// Teacher API calls
export const teacherAPI = {
  register: (teacherData) => api.post('/teacher/register', teacherData),
  login: (credentials) => api.post('/teacher/login', credentials),
  getGroups: (teacherId) => api.get(`/teacher/groups/${teacherId}`),
  getStudents: () => api.get('/admin/students'),
  getPendingCertificates: () => api.get('/review/academic-certificates'),
  approveCertificate: (studentId, certificateId, feedback) => 
    api.post(`/review/academic-certificates/${studentId}/${certificateId}/approve`, { feedback }),
  rejectCertificate: (studentId, certificateId, feedback) => 
    api.post(`/review/academic-certificates/${studentId}/${certificateId}/reject`, { feedback }),
};

// Admin API calls
export const adminAPI = {
  register: (adminData) => api.post('/admin/register', adminData),
  login: (credentials) => api.post('/admin/login', credentials),
  getColleges: () => api.get('/colleges'),
  getStudents: () => api.get('/admin/students'),
  getPendingCertificates: () => api.get('/review/academic-certificates'),
  approveCertificate: (studentId, certificateId, feedback) => 
    api.post(`/review/academic-certificates/${studentId}/${certificateId}/approve`, { feedback }),
  rejectCertificate: (studentId, certificateId, feedback) => 
    api.post(`/review/academic-certificates/${studentId}/${certificateId}/reject`, { feedback }),
};

export default api;
