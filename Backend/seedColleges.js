require('dotenv').config();
const mongoose = require('mongoose');
const College = require('./models/College');

const colleges = [
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
  {
    name: 'Harvard University',
    code: 'HARVRD',
    address: 'Cambridge, MA, USA',
    createdBy: 'SYSTEM',
    departments: [
      { name: 'Electrical Engineering', code: 'EE' },
      { name: 'Mechanical Engineering', code: 'ME' },
    ],
  },
];

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not set in environment');
    }
    await mongoose.connect(process.env.MONGODB_URI);

    for (const c of colleges) {
      const existing = await College.findOne({ name: c.name });
      if (existing) {
        console.log(`Skipping existing college: ${c.name}`);
        continue;
      }
      const doc = new College(c);
      await doc.save();
      console.log(`Inserted college: ${doc.name}`);
    }

    console.log('Colleges seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
}

seed();



