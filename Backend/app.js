require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/database");
const Student = require("./models/Student");
const Teacher = require("./models/Teacher");
const Admin = require("./models/Admin");
const College = require("./models/College");
const Group = require("./models/Group");
const Message = require("./models/Message");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const port = process.env.PORT || 3000;

// ✅ Replace disk storage with Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "student-hub-uploads", // any folder name you like
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
  },
});
const upload = multer({ storage });


// Connect to MongoDB
connectDB();

// Middleware


app.use(cors({
  origin: [
    'http://localhost:5173',                     // local dev
    'https://sih-smart-student-hub-2.onrender.com' // your deployed frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


// ---------------------
// Basic routes
// ---------------------
app.get("/", (req, res) => res.send("Smart Student Hub Dashboard - Please use the frontend application"));

app.get("/api/test", (req, res) => res.json({ message: "Backend connected successfully!" }));

// ---------------------
// Colleges routes
// ---------------------
app.get("/api/colleges", async (req, res) => {
  try {
    let colleges = await College.find({}, { name: 1, departments: 1 }).lean();

    if (!colleges || colleges.length === 0) {
      // Auto-seed a minimal set if empty to improve first-run UX
      const defaults = [
        {
          name: 'MIT College of Engineering',
          code: 'MITCOE',
          address: 'Pune, India',
          createdBy: 'SYSTEM',
          departments: [
            { name: 'Computer Science', code: 'CSE' },
            { name: 'Information Technology', code: 'IT' },
            { name: 'Mechanical Engineering', code: 'ME' },
          ],
        },
        {
          name: 'Stanford University',
          code: 'STANFD',
          address: 'Stanford, CA, USA',
          createdBy: 'SYSTEM',
          departments: [
            { name: 'Computer Science', code: 'CS' },
            { name: 'Electrical Engineering', code: 'EE' },
          ],
        },
      ];

      await College.insertMany(defaults);
      colleges = await College.find({}, { name: 1, departments: 1 }).lean();
    }

    res.json(colleges);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ---------------------
// Admin routes
// ---------------------
app.post("/api/admin/register", async (req, res) => {
  try {
    const { password, confirmPassword, ...adminData } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ ...adminData, password: hashedPassword });
    await admin.save();

    // Automatically create college if not exists
    const existingCollege = await College.findOne({ name: admin.institution });
    if (!existingCollege && admin.institution && admin.department) {
      const collegeCode = admin.institution.replace(/\s+/g, '').substring(0, 6).toUpperCase();
      const deptCode = admin.department.replace(/\s+/g, '').substring(0, 4).toUpperCase();
      const newCollege = new College({
        name: admin.institution,
        code: collegeCode,
        address: 'Not specified',
        departments: [{ name: admin.department, code: deptCode }],
        createdBy: admin.adminId
      });
      await newCollege.save();
    }

    res.status(201).json({ message: "Admin registered successfully", adminId: admin.adminId, name: admin.name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ error: "Invalid email or password" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(400).json({ error: "Invalid email or password" });

    res.json({ message: "Login successful", adminId: admin.adminId, name: admin.name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ---------------------
// Student routes
// ---------------------
app.post("/api/register", async (req, res) => {
  try {
    const { password, ...studentData } = req.body;

    // ✅ Hash password and save
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
      ...studentData,
      password: hashedPassword,
    });

    await student.save();

    res.status(201).json({
      message: "Student registered successfully",
      studentId: student.studentId,
    });
  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    res.status(400).json({ error: error.message });
  }
});


app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ error: "Invalid email or password" });

    const valid = await bcrypt.compare(password, student.password);
    if (!valid) return res.status(400).json({ error: "Invalid email or password" });

    res.json({ message: "Login successful", studentId: student.studentId, name: student.name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ---------------------
// Teacher routes
// ---------------------
app.post("/api/teacher/register", async (req, res) => {
  try {
    const { password, confirmPassword, experience, ...teacherData } = req.body;
    if (password !== confirmPassword) return res.status(400).json({ error: "Passwords do not match" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = new Teacher({ ...teacherData, password: hashedPassword, experience: parseInt(experience) || 0 });
    await teacher.save();

    res.status(201).json({ message: "Teacher registered successfully", teacherId: teacher.teacherId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/teacher/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(400).json({ error: "Invalid email or password" });

    const valid = await bcrypt.compare(password, teacher.password);
    if (!valid) return res.status(400).json({ error: "Invalid email or password" });

    res.json({ message: "Login successful", teacherId: teacher.teacherId, name: teacher.name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ---------------------
// Academic certificates
// ---------------------
app.post("/api/academic-certificates", upload.single("image"), async (req, res) => {
  try {
    const {
      studentId,
      domain,
      certificateName,
      certificateUrl,
      date,
      issuedBy,
      description,
      skills,
      duration,
      location,
      organizationType
    } = req.body;

    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: "Student not found" });

    const imageUrl = req.file?.path || req.body.image;

    // Safe skills parsing
    let skillsArr = [];
    try { skillsArr = skills ? JSON.parse(skills) : []; } catch (e) { skillsArr = []; }

    const newCert = {
      domain,
      certificateName,
      image: imageUrl,
      certificateUrl,
      date,
      issuedBy,
      description,
      skills: skillsArr,
      duration,
      location,
      organizationType,
      status: 'pending',
      submittedAt: new Date()
    };

    student.academicCertificates = student.academicCertificates || [];
    student.academicCertificates.push(newCert);
    await student.save();

    res.status(201).json({ message: "Certificate submitted", certificate: newCert });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.get("/api/academic-certificates/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student.academicCertificates || []);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a specific academic certificate
app.delete("/api/academic-certificates/:studentId/:certificateId", async (req, res) => {
  try {
    const { studentId, certificateId } = req.params;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: "Student not found" });

    const beforeCount = (student.academicCertificates || []).length;
    student.academicCertificates = (student.academicCertificates || []).filter((c) => String(c._id) !== String(certificateId));

    if (beforeCount === student.academicCertificates.length) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    await student.save();
    res.json({ message: "Certificate deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ---------------------
// Teacher groups
// ---------------------
app.get('/api/teacher/groups/:teacherId', async (req, res) => {
  try {
    const { teacherId } = req.params;
    const groups = await Group.find({ teacher: teacherId });
    res.json(groups);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ---------------------
// Admin students (for teacher dashboard)
// ---------------------
app.get('/api/admin/students', async (req, res) => {
  try {
    const students = await Student.find({}, { 
      studentId: 1, 
      name: 1, 
      email: 1, 
      college: 1, 
      department: 1, 
      year: 1, 
      semester: 1, 
      rollNumber: 1 
    });
    res.json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ---------------------
// Academic certificates review (teacher)
// ---------------------
app.get('/api/review/academic-certificates', async (req, res) => {
  try {
    const students = await Student.find({}, { name: 1, studentId: 1, academicCertificates: 1 }).lean();
    const items = [];

    for (const s of students) {
      for (const c of (s.academicCertificates || [])) {
        if (c.status === 'pending') {
          items.push({
            studentId: s.studentId,
            studentName: s.name,
            certificateId: String(c._id),
            domain: c.domain,
            certificateName: c.certificateName,
            image: c.image || '', // Cloudinary URL
            certificateUrl: c.certificateUrl,
            date: c.date,
            issuedBy: c.issuedBy,
            description: c.description,
            skills: c.skills || [],
            duration: c.duration,
            location: c.location,
            organizationType: c.organizationType,
            submittedAt: c.submittedAt,
          });
        }
      }
    }

    res.json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.post('/api/review/academic-certificates/:studentId/:certificateId/approve', async (req, res) => {
  try {
    const { studentId, certificateId } = req.params;
    const { feedback } = req.body;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const cert = (student.academicCertificates || []).find(c => String(c._id) === String(certificateId));
    if (!cert) return res.status(404).json({ error: 'Certificate not found' });

    cert.status = 'approved';
    cert.feedback = feedback || '';
    cert.reviewedAt = new Date();
    await student.save();

    res.json({ message: 'Certificate approved' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/review/academic-certificates/:studentId/:certificateId/reject', async (req, res) => {
  try {
    const { studentId, certificateId } = req.params;
    const { feedback } = req.body;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const cert = (student.academicCertificates || []).find(c => String(c._id) === String(certificateId));
    if (!cert) return res.status(404).json({ error: 'Certificate not found' });

    cert.status = 'rejected';
    cert.feedback = feedback || '';
    cert.reviewedAt = new Date();
    await student.save();

    res.json({ message: 'Certificate rejected' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ---------------------
// Personal achievements (personal certificates)
// ---------------------
app.get("/api/certificates/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: "Student not found" });

    // Ensure all certificate images are direct Cloudinary URLs
    const certificates = (student.personalCertificates || []).map(cert => ({
      _id: cert._id,
      name: cert.name,
      image: cert.image || "",        // Cloudinary URL
      url: cert.url || "",
      date: cert.date || "",
      category: cert.category || "",
      issuer: cert.issuer || ""
    }));

    res.json(certificates);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




app.post("/api/certificates", upload.single("image"), async (req, res) => {
  try {
    const { studentId, name, url, date, category, issuer } = req.body;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: "Student not found" });

    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "student-hub-uploads"
      });
      imageUrl = result.secure_url;
    } else if (req.body.image) {
      imageUrl = req.body.image;
    } else {
      return res.status(400).json({ error: "No image provided" });
    }

    const newCert = { name, image: imageUrl, url, date, category, issuer, submittedAt: new Date() };
    student.personalCertificates = student.personalCertificates || [];
    student.personalCertificates.push(newCert);
    await student.save();

    res.status(201).json({ message: "Certificate added", certificate: newCert });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});



app.delete("/api/certificates/:studentId/:certificateId", async (req, res) => {
  try {
    const { studentId, certificateId } = req.params;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: "Student not found" });

    const before = (student.personalCertificates || []).length;
    student.personalCertificates = (student.personalCertificates || []).filter((c) => String(c._id) !== String(certificateId));
    if (before === student.personalCertificates.length) {
      return res.status(404).json({ error: "Certificate not found" });
    }
    await student.save();
    res.json({ message: "Certificate deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ---------------------
// Student profile routes
// ---------------------
app.get("/api/profile/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student.profile || {});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put(
  "/api/profile/:studentId",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "class10Certificate", maxCount: 1 },
    { name: "class12Certificate", maxCount: 1 },
    { name: "diplomaCertificate", maxCount: 1 },
    { name: "bachelorDegree", maxCount: 1 },
    { name: "masterDegree", maxCount: 1 },
    { name: "doctorDegree", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { studentId } = req.params;
      const student = await Student.findOne({ studentId });
      if (!student) return res.status(404).json({ error: "Student not found" });

      // ✅ Updated to Cloudinary URLs
      const toUrl = (file) => (file ? file.path : undefined);

      const fileFields = [
        "profileImage",
        "class10Certificate",
        "class12Certificate",
        "diplomaCertificate",
        "bachelorDegree",
        "masterDegree",
        "doctorDegree",
      ];

      const textFields = [
        "aadharNumber",
        "mobileNumber",
        "collegeEmail",
        "linkedinProfile",
        "githubProfile",
      ];

      student.profile = student.profile || {};

      // Handle files
      for (const field of fileFields) {
        const file = req.files && req.files[field] && req.files[field][0];
        if (file) {
          student.profile[field] = toUrl(file);
        } else if (typeof req.body[field] === "string" && req.body[field].length > 0) {
          student.profile[field] = req.body[field];
        }
      }

      // Handle text fields
      for (const field of textFields) {
        if (field in req.body) {
          student.profile[field] = req.body[field];
        }
      }

      await student.save();
      res.json({ message: "Profile updated", profile: student.profile });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);


// ---------------------
// Projects
// ---------------------
app.get('/api/projects/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student.projects || []);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const { studentId, title, description, githubLink, deployLink } = req.body;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const newProject = {
      title,
      description,
      githubLink,
      deployLink,
      createdAt: new Date(),
    };

    student.projects = student.projects || [];
    student.projects.push(newProject);
    await student.save();

    res.status(201).json({ message: 'Project added', project: newProject });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/projects/:studentId/:projectId', async (req, res) => {
  try {
    const { studentId, projectId } = req.params;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const before = (student.projects || []).length;
    student.projects = (student.projects || []).filter((p) => String(p._id) !== String(projectId));
    if (before === student.projects.length) {
      return res.status(404).json({ error: 'Project not found' });
    }
    await student.save();
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
