const mongoose = require("mongoose");

const academicCertificateSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  feedback: { type: String },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AcademicCertificate", academicCertificateSchema);