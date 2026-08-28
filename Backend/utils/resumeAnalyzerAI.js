const Groq = require("groq-sdk");

let _groq = null;
function getGroq() {
  if (!_groq) {
    _groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return _groq;
}

function detectResumeRole(resumeText = '') {
  const text = resumeText.toLowerCase();
  const roles = [
    {
      id: 'mern-full-stack',
      label: 'MERN / Full-Stack Web Development',
      keywords: ['react', 'node.js', 'nodejs', 'express', 'mongodb', 'javascript', 'full-stack', 'full stack', 'rest api', 'jwt']
    },
    {
      id: 'java-backend',
      label: 'Java Backend Development',
      keywords: ['java', 'spring boot', 'spring framework', 'hibernate', 'microservices']
    },
    {
      id: 'python-data',
      label: 'Python / Data Science',
      keywords: ['python', 'pandas', 'numpy', 'tensorflow', 'pytorch', 'machine learning', 'data science']
    },
    {
      id: 'cloud-devops',
      label: 'Cloud / DevOps',
      keywords: ['aws', 'azure', 'docker', 'kubernetes', 'terraform', 'jenkins', 'devops']
    }
  ];

  const ranked = roles.map(role => ({
    ...role,
    score: role.keywords.reduce((total, keyword) => total + (text.includes(keyword) ? 1 : 0), 0)
  })).sort((a, b) => b.score - a.score);
  const primary = ranked[0]?.score > 0 ? ranked[0] : {
    id: 'general-software',
    label: 'Software Development',
    keywords: [],
    score: 0
  };

  return {
    id: primary.id,
    label: primary.label,
    matchedKeywords: primary.keywords.filter(keyword => text.includes(keyword)),
    confidence: primary.score
  };
}

function calculateAtsScore(resumeText = '', role) {
  const text = resumeText.toLowerCase();
  const sectionScore = ['experience', 'education', 'projects', 'skills', 'certifications', 'achievements']
    .reduce((score, section) => score + (new RegExp(`\\b${section}\\b`, 'i').test(text) ? 5 : 0), 0);
  const contactScore = [/@/.test(text), /(?:github|linkedin)/i.test(text), /\+?\d[\d\s().-]{7,}/.test(text)]
    .filter(Boolean).length * 3;
  const roleScore = Math.min((role?.confidence || 0) * 3, 18);
  const actionScore = Math.min((text.match(/\b(?:developed|built|integrated|engineered|delivered|implemented|solved|created)\b/gi) || []).length * 1.5, 10);
  const quantifiedScore = Math.min((text.match(/\b\d+(?:\.\d+)?\s*(?:%|years?|months?|users?|projects?|apis?|features?)\b/gi) || []).length * 2, 8);
  const lengthScore = text.length >= 1200 ? 6 : text.length >= 600 ? 3 : 0;

  return Math.round(Math.min(100, sectionScore + contactScore + roleScore + actionScore + quantifiedScore + lengthScore));
}

function calculateResumeCategoryScores(resumeText = '', role) {
  const text = resumeText.toLowerCase();
  const has = pattern => pattern.test(text);
  const technicalSkills = Math.min(10, 2 + Math.min(8, (role?.confidence || 0)));
  const projects = has(/\bprojects?\b/) ? (has(/built|developed|engineered|implemented|platform|application/) ? 8 : 6) : 2;
  const education = has(/\beducation\b|b\. ?tech|bachelor|degree|university|institute|college/) ? 8 : 3;
  const experience = has(/\bexperience\b|\bintern(ship)?\b|employment/) ? 7 : 2;
  const codingProfiles = has(/leetcode|codechef|hackerrank|geeksforgeeks|github/) ? 7 : 2;

  return { technicalSkills, projects, education, experience, codingProfiles };
}

function recommendationText(item) {
  return Object.values(item || {}).flatMap(value => Array.isArray(value) ? value : [value])
    .filter(value => typeof value === 'string').join(' ').toLowerCase();
}

function getRoleFallbackRecommendations(roleId) {
  const fallbacks = {
    'mern-full-stack': {
      recommendedCourses: [
        { title: 'Full Stack Open', platform: 'University of Helsinki', courseUrl: 'https://fullstackopen.com/en/', instructor: 'University of Helsinki', level: 'intermediate', duration: '12 weeks', reason: 'Builds production-style React, Node.js, Express, REST API, and MongoDB skills.', free: true, tags: ['React', 'Node.js', 'Express', 'MongoDB'] },
        { title: 'The Odin Project: Full Stack JavaScript', platform: 'The Odin Project', courseUrl: 'https://www.theodinproject.com/paths/full-stack-javascript', instructor: 'The Odin Project', level: 'intermediate', duration: '20 weeks', reason: 'Strengthens JavaScript, React, Node.js, databases, and full-stack project development.', free: true, tags: ['JavaScript', 'React', 'Node.js', 'Full Stack'] },
        { title: 'React Tutorial', platform: 'freeCodeCamp', courseUrl: 'https://www.freecodecamp.org/learn/front-end-development-libraries/', instructor: 'freeCodeCamp', level: 'beginner', duration: '8 weeks', reason: 'Improves React fundamentals for frontend and MERN applications.', free: true, tags: ['React', 'JavaScript', 'Frontend'] },
        { title: 'Node.js and Express.js Documentation', platform: 'Node.js', courseUrl: 'https://nodejs.org/en/learn', instructor: 'Node.js', level: 'intermediate', duration: '4 weeks', reason: 'Improves backend API development with Node.js and Express concepts.', free: true, tags: ['Node.js', 'Express', 'REST APIs'] },
        { title: 'MongoDB University Developer Path', platform: 'MongoDB University', courseUrl: 'https://learn.mongodb.com/catalog', instructor: 'MongoDB', level: 'beginner', duration: '6 weeks', reason: 'Develops practical MongoDB data modeling and application integration skills.', free: true, tags: ['MongoDB', 'Database', 'JavaScript'] }
        ,{ title: 'MERN Stack Tutorial', platform: 'freeCodeCamp', courseUrl: 'https://www.freecodecamp.org/news/mern-stack-tutorial/', instructor: 'freeCodeCamp', level: 'intermediate', duration: '6 weeks', reason: 'Combines MongoDB, Express, React, and Node.js in a complete web application.', free: true, tags: ['MERN', 'React', 'Node.js', 'MongoDB'] }
        ,{ title: 'REST API Design and Development', platform: 'Microsoft Learn', courseUrl: 'https://learn.microsoft.com/en-us/training/browse/?terms=REST%20API', instructor: 'Microsoft Learn', level: 'intermediate', duration: '4 weeks', reason: 'Improves REST API design and backend integration for full-stack applications.', free: true, tags: ['REST APIs', 'Backend', 'JavaScript'] }
      ],
      recommendedInternships: [
        { title: 'MERN Stack Developer Intern', company: 'MERN Stack startup roles', platform: 'Internshala', applyUrl: 'https://internshala.com/internships/mern-stack-development-internship/', matchReason: 'Directly matches React, Node.js, Express, MongoDB, and full-stack project experience.', requiredSkills: ['React', 'Node.js', 'Express', 'MongoDB'], matchedSkills: ['React', 'Node.js', 'Express', 'MongoDB'], stipend: 'Varies', duration: '3-6 months', type: 'hybrid', difficulty: 'intermediate' },
        { title: 'Full Stack Web Development Intern', company: 'Software product startups', platform: 'LinkedIn', applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=full%20stack%20developer%20intern', matchReason: 'Matches full-stack web development and REST API project experience.', requiredSkills: ['JavaScript', 'React', 'Node.js'], matchedSkills: ['JavaScript', 'React', 'Node.js'], stipend: 'Varies', duration: '3-6 months', type: 'hybrid', difficulty: 'intermediate' }
        ,{ title: 'React Developer Intern', company: 'Web product startups', platform: 'Internshala', applyUrl: 'https://internshala.com/internships/react.js-development-internship/', matchReason: 'Uses the React frontend skills shown in the resume.', requiredSkills: ['React', 'JavaScript'], matchedSkills: ['React', 'JavaScript'], stipend: 'Varies', duration: '3-6 months', type: 'remote', difficulty: 'intermediate' }
        ,{ title: 'Node.js Developer Intern', company: 'Backend product startups', platform: 'LinkedIn', applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=node.js%20developer%20intern', matchReason: 'Matches Node.js, Express, and REST API experience.', requiredSkills: ['Node.js', 'Express', 'REST APIs'], matchedSkills: ['Node.js', 'Express', 'REST APIs'], stipend: 'Varies', duration: '3-6 months', type: 'hybrid', difficulty: 'intermediate' }
        ,{ title: 'Backend Developer Intern', company: 'Early-stage technology companies', platform: 'Indeed', applyUrl: 'https://in.indeed.com/jobs?q=backend+developer+intern+node.js', matchReason: 'Builds on backend APIs and database work listed in the resume.', requiredSkills: ['Node.js', 'MongoDB', 'REST APIs'], matchedSkills: ['Node.js', 'MongoDB', 'REST APIs'], stipend: 'Varies', duration: '3-6 months', type: 'onsite', difficulty: 'intermediate' }
        ,{ title: 'JavaScript Developer Intern', company: 'Software development companies', platform: 'Internshala', applyUrl: 'https://internshala.com/internships/javascript-development-internship/', matchReason: 'Matches the resume JavaScript and web development experience.', requiredSkills: ['JavaScript', 'HTML', 'CSS'], matchedSkills: ['JavaScript', 'HTML', 'CSS'], stipend: 'Varies', duration: '3-6 months', type: 'remote', difficulty: 'beginner' }
        ,{ title: 'Web Application Developer Intern', company: 'Web application teams', platform: 'Naukri', applyUrl: 'https://www.naukri.com/web-developer-internship-jobs', matchReason: 'Matches frontend, backend, and web application development experience.', requiredSkills: ['JavaScript', 'React', 'Node.js'], matchedSkills: ['JavaScript', 'React', 'Node.js'], stipend: 'Varies', duration: '3-6 months', type: 'hybrid', difficulty: 'intermediate' }
      ]
    },
    'python-data': {
      recommendedCourses: [
        { title: 'Machine Learning Specialization', platform: 'Coursera', courseUrl: 'https://www.coursera.org/specializations/machine-learning-introduction', instructor: 'DeepLearning.AI and Stanford Online', level: 'intermediate', duration: '10 weeks', reason: 'Builds core supervised and unsupervised machine learning skills with Python.', free: false, tags: ['Python', 'Machine Learning', 'Statistics'] },
        { title: 'Python for Data Science', platform: 'freeCodeCamp', courseUrl: 'https://www.freecodecamp.org/learn/data-analysis-with-python/', instructor: 'freeCodeCamp', level: 'beginner', duration: '6 weeks', reason: 'Develops Python, NumPy, pandas, and data analysis skills.', free: true, tags: ['Python', 'pandas', 'NumPy', 'Data Analysis'] },
        { title: 'Practical Deep Learning for Coders', platform: 'fast.ai', courseUrl: 'https://course.fast.ai/', instructor: 'Jeremy Howard', level: 'advanced', duration: '8 weeks', reason: 'Applies practical deep learning techniques to real projects.', free: true, tags: ['Python', 'Deep Learning', 'PyTorch'] },
        { title: 'Google Machine Learning Crash Course', platform: 'Google', courseUrl: 'https://developers.google.com/machine-learning/crash-course', instructor: 'Google', level: 'intermediate', duration: '15 hours', reason: 'Strengthens machine learning concepts, model evaluation, and TensorFlow fundamentals.', free: true, tags: ['Machine Learning', 'TensorFlow', 'Python'] },
        { title: 'IBM Data Science Professional Certificate', platform: 'Coursera', courseUrl: 'https://www.coursera.org/professional-certificates/ibm-data-science', instructor: 'IBM', level: 'beginner', duration: '12 weeks', reason: 'Covers Python, SQL, visualization, and applied data science workflows.', free: false, tags: ['Python', 'SQL', 'Data Science'] },
        { title: 'Introduction to Machine Learning', platform: 'Kaggle Learn', courseUrl: 'https://www.kaggle.com/learn/intro-to-machine-learning', instructor: 'Kaggle', level: 'beginner', duration: '4 hours', reason: 'Provides a focused introduction to building and validating machine learning models.', free: true, tags: ['Python', 'Machine Learning', 'pandas'] },
        { title: 'Deep Learning with Python', platform: 'DataCamp', courseUrl: 'https://www.datacamp.com/courses/deep-learning-in-python', instructor: 'DataCamp', level: 'intermediate', duration: '4 weeks', reason: 'Introduces neural networks and deep learning implementation with Python.', free: false, tags: ['Python', 'Deep Learning', 'Neural Networks'] }
      ],
      recommendedInternships: [
        { title: 'Machine Learning Intern', company: 'Machine learning teams', platform: 'LinkedIn', applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=machine%20learning%20intern', matchReason: 'Directly matches Python and machine learning experience.', requiredSkills: ['Python', 'Machine Learning', 'pandas'], matchedSkills: ['Python', 'Machine Learning'], stipend: 'Varies', duration: '3-6 months', type: 'hybrid', difficulty: 'intermediate' },
        { title: 'Data Science Intern', company: 'Data-driven companies', platform: 'Internshala', applyUrl: 'https://internshala.com/internships/data-science-internship/', matchReason: 'Matches Python data analysis and model-building skills.', requiredSkills: ['Python', 'pandas', 'SQL'], matchedSkills: ['Python'], stipend: 'Varies', duration: '3-6 months', type: 'remote', difficulty: 'intermediate' },
        { title: 'Python Developer Intern', company: 'Software product companies', platform: 'Internshala', applyUrl: 'https://internshala.com/internships/python-development-internship/', matchReason: 'Builds on the Python programming foundation in the resume.', requiredSkills: ['Python', ' APIs', 'Git'], matchedSkills: ['Python'], stipend: 'Varies', duration: '3-6 months', type: 'hybrid', difficulty: 'beginner' },
        { title: 'AI Research Intern', company: 'Artificial intelligence research teams', platform: 'LinkedIn', applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=artificial%20intelligence%20research%20intern', matchReason: 'Suitable for resumes showing machine learning and deep learning interests.', requiredSkills: ['Python', 'Machine Learning', 'Deep Learning'], matchedSkills: ['Python', 'Machine Learning'], stipend: 'Varies', duration: '3-6 months', type: 'onsite', difficulty: 'advanced' },
        { title: 'Data Analyst Intern', company: 'Analytics teams', platform: 'Indeed', applyUrl: 'https://in.indeed.com/jobs?q=data+analyst+intern+python', matchReason: 'Matches Python, data analysis, and quantitative problem-solving skills.', requiredSkills: ['Python', 'SQL', 'Data Analysis'], matchedSkills: ['Python'], stipend: 'Varies', duration: '3-6 months', type: 'onsite', difficulty: 'beginner' },
        { title: 'Computer Vision Intern', company: 'Computer vision product teams', platform: 'LinkedIn', applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=computer%20vision%20intern', matchReason: 'A relevant adjacent role for Python and deep learning candidates.', requiredSkills: ['Python', 'OpenCV', 'Deep Learning'], matchedSkills: ['Python'], stipend: 'Varies', duration: '3-6 months', type: 'hybrid', difficulty: 'advanced' },
        { title: 'Machine Learning Engineer Intern', company: 'AI product companies', platform: 'Naukri', applyUrl: 'https://www.naukri.com/machine-learning-internship-jobs', matchReason: 'Matches Python model development, experimentation, and machine learning project work.', requiredSkills: ['Python', 'Machine Learning', 'Model Evaluation'], matchedSkills: ['Python', 'Machine Learning'], stipend: 'Varies', duration: '3-6 months', type: 'hybrid', difficulty: 'intermediate' }
      ]
    }
  };
  return fallbacks[roleId] || { recommendedCourses: [], recommendedInternships: [] };
}

function enforceRelevantRecommendations(analysis, resumeText = '') {
  const role = detectResumeRole(resumeText);
  const roleTerms = {
    'mern-full-stack': ['mern', 'full stack', 'full-stack', 'frontend', 'front-end', 'backend', 'back-end', 'react', 'node', 'express', 'mongodb', 'javascript', 'web development'],
    'java-backend': ['java', 'spring', 'backend', 'microservices', 'hibernate'],
    'python-data': ['python', 'data science', 'machine learning', 'analytics', 'pandas', 'tensorflow'],
    'cloud-devops': ['cloud', 'devops', 'aws', 'azure', 'docker', 'kubernetes'],
    'general-software': ['software', 'developer', 'programming']
  }[role.id];
  const isRelevant = item => roleTerms.some(term => recommendationText(item).includes(term));
  const filterRecommendations = (items, minimum) => {
    const relevant = (items || []).filter(isRelevant);
    return relevant.length >= minimum ? relevant : (items || []).filter(item =>
      role.id === 'mern-full-stack'
        ? /web|software|developer|javascript|react|node|api/i.test(recommendationText(item))
        : isRelevant(item)
    );
  };

  const fallback = getRoleFallbackRecommendations(role.id);
  const relevantCourses = filterRecommendations(analysis.recommendedCourses, 7);
  const relevantInternships = filterRecommendations(analysis.recommendedInternships, 7);
  analysis.recommendedCourses = [...relevantCourses, ...fallback.recommendedCourses]
    .filter((item, index, items) => items.findIndex(candidate => candidate.title === item.title) === index)
    .slice(0, 7);
  analysis.recommendedInternships = [...relevantInternships, ...fallback.recommendedInternships]
    .filter((item, index, items) => items.findIndex(candidate => candidate.title === item.title) === index)
    .slice(0, 7);
  analysis.primaryRole = role.label;
  analysis.primaryRoleKeywords = role.matchedKeywords;

  if (resumeText) {
    const atsScore = calculateAtsScore(resumeText, role);
    analysis.resumeAnalysis = analysis.resumeAnalysis || {};
    analysis.resumeAnalysis.overallScore = atsScore;
    const categoryScores = calculateResumeCategoryScores(resumeText, role);
    ['technicalSkills', 'projects', 'education', 'experience', 'codingProfiles'].forEach(category => {
      analysis.resumeAnalysis[category] = analysis.resumeAnalysis[category] || {};
      analysis.resumeAnalysis[category].score = categoryScores[category];
    });
    analysis.resumeAnalysis.overallFeedback = `ATS score based on the uploaded resume. Primary target: ${role.label}.`;
  }

  return analysis;
}

/**
 * Aggregates all student data into a structured profile object
 */
function buildStudentProfile(student, profileData, portfolioData, certs, projects) {
  const approvedCerts = (certs || []).filter(c => c && c.status === 'approved');
  const internshipCerts = approvedCerts.filter(c => c.domain === 'internship');
  const techCerts = approvedCerts.filter(c => c.domain !== 'internship');

  const certSkills = new Set();
  approvedCerts.forEach(c => {
    if (c.extractedSkills && Array.isArray(c.extractedSkills)) {
      c.extractedSkills.forEach(s => certSkills.add(s));
    }
    if (c.domain) certSkills.add(c.domain);
  });

  const editorSkills = portfolioData?.customSkills || [];
  const allSkills = [...new Set([...certSkills, ...editorSkills])];

  const projectTechs = new Set();
  (projects || []).forEach(p => {
    if (p?.technologies) {
      p.technologies.split(/[,;]/).map(t => t.trim()).filter(Boolean).forEach(t => projectTechs.add(t));
    }
  });

  return {
    name: student?.name || 'Student',
    department: student?.department || '',
    college: student?.college || '',
    year: student?.year || '',
    semester: student?.semester || '',
    cgpa: profileData?.overallCGPA || 0,
    sgpa: profileData?.currentSGPA || 0,
    skills: allSkills,
    projectTechnologies: [...projectTechs],
    projects: (projects || []).map(p => ({
      title: p?.title || '',
      description: p?.description || '',
      technologies: p?.technologies || ''
    })),
    certifications: techCerts.map(c => ({
      name: c.certificateName || '',
      issuer: c.issuedBy || '',
      domain: c.domain || ''
    })),
    internships: internshipCerts.map(c => ({
      name: c.certificateName || '',
      organization: c.issuedBy || '',
      description: c.description || ''
    })),
    editorEducation: portfolioData?.education || [],
    editorExperience: portfolioData?.experience || [],
    headline: portfolioData?.headline || '',
    objectiveSummary: portfolioData?.objectiveSummary || '',
    aboutMe: portfolioData?.aboutMe || '',
    leetcode: {
      solved: student?.leetcode?.totalSolved || 0,
      easy: student?.leetcode?.easySolved || 0,
      medium: student?.leetcode?.mediumSolved || 0,
      hard: student?.leetcode?.hardSolved || 0,
      ranking: student?.leetcode?.ranking || 0
    },
    codechef: {
      rating: student?.codechef?.rating || 0,
      stars: student?.codechef?.stars || '',
      problemsSolved: student?.codechef?.problemsSolved || 0
    },
    linkedinProfile: profileData?.linkedinProfile || '',
    githubProfile: profileData?.githubProfile || ''
  };
}

/**
 * Calls Groq AI (ultra-fast LPU inference) to analyze resume + recommend internships
 */
async function analyzeResumeWithAI(studentProfile) {
  const isUploadedResume = studentProfile.resumeText ? true : false;
  
  const detectedRole = detectResumeRole(studentProfile.resumeText || '');
  const prompt = `You are an expert career counselor and internship advisor. Analyze the following student profile${isUploadedResume ? ' and uploaded resume' : ''} and provide:

1. **Resume Strength Analysis** — Rate each area out of 10 and give brief feedback:
   - Technical Skills
   - Projects
   - Education
   - Experience / Internships
   - Coding Profiles (LeetCode/CodeChef)
   - Overall Resume Score (out of 100)

2. **Skill Gap Analysis** — What skills are missing or weak based on current tech industry demands for their department/field?

3. **Improvement Tips** — 3-5 specific, actionable tips to strengthen their resume.

4. **Recommended Real Internships** — Suggest 8-10 REAL internship opportunities that match this student's profile. For each internship provide:
   - title: Job title
   - company: Real company name
   - platform: Where to find/apply (e.g., "Internshala", "LinkedIn", "company website", "Stipendio", "LetsIntern", "AngelList")
   - applyUrl: A real, working search URL where they can find this type of role
   - matchReason: Why this matches the student's profile (1-2 sentences)
   - requiredSkills: Array of skills needed
   - matchedSkills: Array of skills the student already has
   - stipend: Estimated stipend range (if applicable)
   - duration: Typical duration
   - type: "remote" | "onsite" | "hybrid"
   - difficulty: "beginner" | "intermediate" | "advanced"

5. **Recommended Courses** — Suggest 6-8 REAL online courses that align with the student's skills, profile, and goals. For each course provide:
   - title: Course name (must be a real course)
   - platform: Real platform (e.g., "Coursera", "Udemy", "edX", "Pluralsight", "freeCodeCamp", "NPTEL", "Google", "AWS", "Microsoft Learn", "Codecademy")
   - courseUrl: A real, working URL to the course page or search page on the platform
   - instructor: Instructor or organization name
   - level: "beginner" | "intermediate" | "advanced"
   - duration: Estimated duration (e.g., "4 weeks", "20 hours")
   - reason: Why this course is relevant (1-2 sentences)
   - free: true if the course is free, false if paid
   - tags: Array of skill tags the course covers

${isUploadedResume ? `

UPLOADED RESUME TEXT:
\`\`\`
${studentProfile.resumeText || 'No text extracted'}
\`\`\`

**PRIMARY ANALYSIS SOURCE: Use the uploaded resume text as the main source of truth for analyzing the student's skills, experience, and background.**
` : ''}

STUDENT PROFILE:
${JSON.stringify(studentProfile, null, 2)}

IMPORTANT: 
- Primary role detected locally: ${detectedRole.label}. Treat this as the controlling role for recommendations.
- **If this is an uploaded resume, prioritize information from the resume text over the profile data.**
- Identify the primary technology stack/career path from the resume (e.g., Java, Spring Boot, Microservices = Java/Spring backend; React, Node = MERN/Web development; Python, Data structures = Data Science)
- **AT LEAST 60% of internship recommendations MUST align with the PRIMARY tech stack identified in the resume.**
- For example: If resume shows Java + Spring Boot experience, recommend backend/microservices/cloud internships. If it shows JavaScript/React + Node, recommend full-stack/MERN internships. If it shows Python, recommend Python/data science internships.
- The remaining internships can explore related/adjacent domains.
- Recommend REAL companies and REAL platforms where these internships can be found.
- Tailor recommendations based on the student's explicitly stated interests/skills FIRST, then department (${studentProfile.department}), other context, and experience level.
- **COURSES MUST directly align with the PRIMARY tech stack identified.** If the resume shows Java/Spring, recommend Spring/Microservices courses. If it shows JavaScript, recommend React/Node courses. At LEAST 5-6 of the courses must match the primary tech stack.
- Include a mix of well-known companies and startups.
- Include Indian platforms like Internshala, Stipendio for Indian students, and global ones like LinkedIn, AngelList.

Respond ONLY with valid JSON in this exact format (no markdown, no code blocks, no extra text):
{
  "resumeAnalysis": {
    "technicalSkills": { "score": 0, "feedback": "" },
    "projects": { "score": 0, "feedback": "" },
    "education": { "score": 0, "feedback": "" },
    "experience": { "score": 0, "feedback": "" },
    "codingProfiles": { "score": 0, "feedback": "" },
    "overallScore": 0,
    "overallFeedback": ""
  },
  "skillGaps": [
    { "skill": "", "importance": "high|medium|low", "reason": "" }
  ],
  "improvementTips": [
    { "tip": "", "priority": "high|medium|low", "category": "" }
  ],
  "recommendedInternships": [
    {
      "title": "",
      "company": "",
      "platform": "",
      "applyUrl": "",
      "matchReason": "",
      "requiredSkills": [],
      "matchedSkills": [],
      "stipend": "",
      "duration": "",
      "type": "remote|onsite|hybrid",
      "difficulty": "beginner|intermediate|advanced"
    }
  ],
  "recommendedCourses": [
    {
      "title": "",
      "platform": "",
      "courseUrl": "",
      "instructor": "",
      "level": "beginner|intermediate|advanced",
      "duration": "",
      "reason": "",
      "free": true,
      "tags": []
    }
  ]
}`;

  // Try models in order: fastest & most accurate first
  const models = ["openai/gpt-oss-20b", "openai/gpt-oss-120b"];
  let lastError;

  for (const modelName of models) {
    try {
      console.log(`[Groq] Trying model: ${modelName}`);
      const startTime = Date.now();

      const chatCompletion = await getGroq().chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a JSON-only response bot. You respond ONLY with valid JSON, no markdown, no explanation, no code blocks."
          },
          { role: "user", content: prompt }
        ],
        model: modelName,
        temperature: 0.3,
        max_tokens: 3072,
        response_format: { type: "json_object" }
      });

      const elapsed = Date.now() - startTime;
      console.log(`[Groq] Success with ${modelName} in ${elapsed}ms`);

      const text = chatCompletion.choices[0]?.message?.content || '';

      try {
        return enforceRelevantRecommendations(JSON.parse(text), studentProfile.resumeText || '');
      } catch (parseErr) {
        // Try to extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) return enforceRelevantRecommendations(JSON.parse(jsonMatch[0]), studentProfile.resumeText || '');
        console.error('[Groq] Failed to parse:', text.substring(0, 300));
        throw new Error('AI returned invalid JSON. Please try again.');
      }
    } catch (err) {
      lastError = err;
      const isRateLimit = err.status === 429 || err.message?.includes('429') || err.message?.includes('rate');
      if (isRateLimit) {
        console.log(`[Groq] Rate limited on ${modelName}, trying next model...`);
        continue;
      }
      if (err.message?.includes('JSON')) throw err;
      console.error(`[Groq] Error with ${modelName}:`, err.message);
      continue;
    }
  }

  throw lastError || new Error('All AI models failed. Please try again.');
}

/**
 * Extract text from PDF file
 */
async function extractTextFromPDF(filePath) {
  try {
    const fs = require('fs').promises;
    const axios = require('axios');

    let fileBuffer;

    // Check if filePath is a URL (Cloudinary)
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      console.log(`[PDF] Downloading from URL...`);
      const response = await axios.get(filePath, { 
        responseType: 'arraybuffer',
        timeout: 30000
      });
      fileBuffer = Buffer.from(response.data);
      console.log(`[PDF] Downloaded ${fileBuffer.length} bytes`);
    } else {
      // Local file
      fileBuffer = await fs.readFile(filePath);
      console.log(`[PDF] Read ${fileBuffer.length} bytes from local file`);
    }

    console.log('[PDF] Starting PDF parsing...');
    const { PDFParse } = require('pdf-parse');
    const parser = new PDFParse({ data: fileBuffer });
    try {
      const data = await parser.getText();
      const text = data?.text || '';
      console.log(`[PDF] Parse successful, text length: ${text.length}`);

      if (!text.trim()) {
        throw new Error('PDF parsed but contains no extractable text');
      }

      return text.trim();
    } finally {
      await parser.destroy();
    }
  } catch (error) {
    console.error(`[PDF] Extraction failed: ${error.message}`);
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
}

/**
 * Extract text from image using Tesseract OCR
 */
async function extractTextFromImage(filePath) {
  try {
    const Tesseract = require('tesseract.js');
    const axios = require('axios');
    const fs = require('fs').promises;
    const path = require('path');
    const os = require('os');

    let localFilePath = filePath;

    // Check if filePath is a URL (Cloudinary)
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      console.log(`Downloading image from URL: ${filePath}`);
      const response = await axios.get(filePath, { responseType: 'arraybuffer' });
      
      // Save to temp file
      const tempDir = os.tmpdir();
      const fileName = `resume-ocr-${Date.now()}.png`;
      localFilePath = path.join(tempDir, fileName);
      
      await fs.writeFile(localFilePath, Buffer.from(response.data));
      console.log(`Saved temp image to: ${localFilePath}`);
    }

    const result = await Tesseract.recognize(localFilePath, 'eng', {
      logger: (m) => console.log('[OCR]', m.status, Math.round(m.progress * 100) + '%')
    });

    // Clean up temp file if it was created
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      try {
        await fs.unlink(localFilePath);
      } catch (e) {
        console.log('Could not delete temp file:', e.message);
      }
    }

    return result.data.text || '';
  } catch (error) {
    console.error('Image OCR error:', error.message);
    throw new Error(`Failed to extract text from image: ${error.message}`);
  }
}

/**
 * Build a profile from uploaded resume text
 */
function buildProfileFromResumeText(resumeText, student) {
  // Extract key information from resume text using pattern matching
  const skillsMatch = resumeText.match(/(?:skills?|technologies?)[:\s]*([^.]*?)(?=\n|experience|projects|education|$)/is);
  const skillsText = skillsMatch?.[1] || '';
  const listedSkills = skillsText
    .split(/[,;]/)
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .slice(0, 20);
  const knownSkills = ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'REST APIs', 'JWT', 'WebRTC', 'Socket.io', 'Cloudinary', 'MVC', 'Java', 'Python', 'C++', 'C'];
  const detectedSkills = knownSkills.filter(skill => {
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(?:^|\\W)${escapedSkill}(?:$|\\W)`, 'i').test(resumeText);
  });
  const skills = [...new Set([...listedSkills, ...detectedSkills])].slice(0, 20);

  return {
    name: student?.name || 'Student',
    department: student?.department || '',
    college: student?.college || '',
    year: student?.year || '',
    semester: student?.semester || '',
    cgpa: 0,
    sgpa: 0,
    skills: skills.length > 0 ? skills : [],
    projectTechnologies: [],
    projects: [],
    certifications: [],
    internships: [],
    editorEducation: [],
    editorExperience: [],
    headline: `Experienced in: ${skills.slice(0, 5).join(', ')}`,
    objectiveSummary: 'Seeking opportunities in ' + (skills.join(' and ').substring(0, 100) || 'technology'),
    aboutMe: '',
    leetcode: { solved: 0, easy: 0, medium: 0, hard: 0, ranking: 0 },
    codechef: { rating: 0, stars: '', problemsSolved: 0 },
    linkedinProfile: '',
    githubProfile: '',
    resumeText: resumeText.substring(0, 5000) // Include raw resume text for AI context
  };
}

module.exports = {
  buildStudentProfile,
  analyzeResumeWithAI,
  extractTextFromPDF,
  extractTextFromImage,
  buildProfileFromResumeText,
  detectResumeRole,
  calculateAtsScore,
  enforceRelevantRecommendations
};
