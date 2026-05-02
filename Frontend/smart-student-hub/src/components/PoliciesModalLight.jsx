import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PoliciesModalLight = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("privacy");

  const privacyContent = [
    {
      title: "1. Introduction",
      content: "Smart Student Hub ('we', 'us', 'our', or 'Company') operates the Smart Student Hub website and application. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.",
      icon: "📋"
    },
    {
      title: "2. Information Collection and Use",
      content: "We collect several different types of information for various purposes to provide and improve our Service to you. This includes personal identification information (name, email address, phone number), educational data (grades, certificates, projects), OAuth data (Microsoft/Google accounts), and usage analytics.",
      icon: "📊"
    },
    {
      title: "3. Security of Data",
      content: "The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.",
      icon: "🔒"
    },
    {
      title: "4. Cookies and Tracking",
      content: "We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.",
      icon: "🍪"
    },
    {
      title: "5. Third-Party Services",
      content: "Our Service may contain links to third-party sites that are not operated by us. This Privacy Policy does not apply to third-party websites, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party services before accessing them.",
      icon: "🔗"
    },
    {
      title: "6. Children's Privacy",
      content: "Our Service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from children under 18. If we become aware that a child under 18 has provided us with personal data, we immediately delete such information and terminate the child's account.",
      icon: "👨‍👧"
    },
    {
      title: "7. Changes to This Privacy Policy",
      content: "We may update our Privacy Policy from time to time. You will be notified of any changes by posting the new Privacy Policy on this page and updating the 'effective date' at the top of this post.",
      icon: "📝"
    },
    {
      title: "8. Contact Us",
      content: "If you have any questions about this Privacy Policy, please contact us at privacy@smartstudenthub.edu or visit our Contact page for more information.",
      icon: "📧"
    }
  ];

  const termsContent = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using the Smart Student Hub platform, you accept and agree to be bound by the terms, conditions, and notices contained or referenced in this agreement. If you do not agree to abide by these Terms of Service, please do not use this service.",
      icon: "✅"
    },
    {
      title: "2. Use License",
      content: "Permission is granted to temporarily access the materials (information or content) on Smart Student Hub for personal, educational, non-commercial transitory viewing only. You agree that you will not use this site in any way that: (a) violates any applicable laws or regulations; (b) infringes upon intellectual property rights; (c) harasses or causes distress or inconvenience to others.",
      icon: "📜"
    },
    {
      title: "3. Disclaimer of Warranties",
      content: "The materials on Smart Student Hub's website are provided on an 'as is' basis without warranties of any kind, either express or implied. Smart Student Hub disclaims all warranties, including, but not limited to, warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      icon: "⚠️"
    },
    {
      title: "4. Limitations of Liability",
      content: "In no event shall Smart Student Hub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Smart Student Hub.",
      icon: "🚫"
    },
    {
      title: "5. Accuracy of Materials",
      content: "The materials appearing on Smart Student Hub's website could include technical, typographical, or photographic errors. Smart Student Hub does not warrant that any of the materials on its website are accurate, complete, or current. Smart Student Hub may make changes to the materials contained on its website at any time without notice.",
      icon: "🔍"
    },
    {
      title: "6. Materials Copyright",
      content: "The materials on Smart Student Hub's website are protected by copyright. Except as otherwise provided in these conditions and terms, none of the materials on Smart Student Hub's website may be copied, reproduced, republished, uploaded, posted, transmitted, or distributed in any way without the prior written permission of Smart Student Hub.",
      icon: "©️"
    },
    {
      title: "7. User Accounts and Passwords",
      content: "You are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account. You must notify Smart Student Hub immediately of any unauthorized use of your account. Smart Student Hub is not liable for any loss or damage arising from unauthorized use of your account.",
      icon: "🔐"
    },
    {
      title: "8. Modifications to Terms",
      content: "Smart Student Hub may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.",
      icon: "📝"
    },
    {
      title: "9. Governing Law",
      content: "These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that location.",
      icon: "⚖️"
    }
  ];

  const contactContent = {
    title: "Get In Touch",
    description: "Contact Smart Student Hub team for any inquiries",
    channels: [
      {
        title: "General Inquiries",
        description: "For product information and general questions",
        contact: "contact@smartstudenthub.edu",
        icon: "📧"
      },
      {
        title: "Technical Support",
        description: "For technical issues and platform support",
        contact: "+91 9876 543 210",
        icon: "🔧"
      },
      {
        title: "Institutional Setup",
        description: "For college/university integration and setup",
        contact: "setup@smartstudenthub.edu",
        icon: "🏫"
      },
      {
        title: "Feedback & Suggestions",
        description: "Share your ideas to improve our platform",
        contact: "feedback@smartstudenthub.edu",
        icon: "💡"
      }
    ],
    team: [
      {
        name: "Error Squad X",
        role: "Development Team Lead",
        icon: "👨‍💼"
      },
      {
        name: "Prasad Kattunga",
        role: "Backend Developer",
        icon: "💻"
      },
      {
        name: "Sekhar",
        role: "Frontend Developer",
        icon: "🎨"
      }
    ]
  };

  const tabs = [
    { id: "privacy", label: "Privacy Policy", icon: "🔒" },
    { id: "terms", label: "Terms of Service", icon: "📜" },
    { id: "contact", label: "Contact", icon: "📧" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[90%] lg:w-4xl max-h-[85vh] z-50 rounded-2xl overflow-hidden"
          >
            {/* Modal Background */}
            <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-2xl shadow-2xl flex flex-col h-full">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-50 to-slate-50 border-b-2 border-slate-200 px-8 py-6 flex justify-between items-center">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {tabs.find(t => t.id === activeTab)?.icon} {tabs.find(t => t.id === activeTab)?.label}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <span className="text-2xl text-slate-900">×</span>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 px-8 pt-6 border-b-2 border-slate-200 flex-wrap">
                {tabs.map(tab => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-2 border-transparent"
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </motion.button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-8 py-6">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "privacy" && (
                    <div className="space-y-6">
                      {privacyContent.map((section, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200 hover:border-blue-400 transition-colors"
                        >
                          <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <span>{section.icon}</span>
                            {section.title}
                          </h3>
                          <p className="text-slate-700 text-sm leading-relaxed">
                            {section.content}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeTab === "terms" && (
                    <div className="space-y-6">
                      {termsContent.map((section, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200 hover:border-purple-400 transition-colors"
                        >
                          <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <span>{section.icon}</span>
                            {section.title}
                          </h3>
                          <p className="text-slate-700 text-sm leading-relaxed">
                            {section.content}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeTab === "contact" && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                          {contactContent.title}
                        </h3>
                        <p className="text-slate-700">
                          {contactContent.description}
                        </p>
                      </div>

                      <div className="mb-8">
                        <h4 className="text-xl font-bold text-slate-900 mb-4">Contact Channels</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {contactContent.channels.map((channel, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="bg-slate-50 rounded-lg p-4 border-2 border-slate-200 hover:border-slate-300 transition-colors"
                            >
                              <div className="text-3xl mb-2">{channel.icon}</div>
                              <h5 className="text-lg font-bold text-slate-900 mb-1">
                                {channel.title}
                              </h5>
                              <p className="text-slate-600 text-sm mb-3">
                                {channel.description}
                              </p>
                              <p className="text-slate-900 font-semibold text-sm break-all">
                                {channel.contact}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-4">Our Team</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {contactContent.team.map((member, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="bg-slate-50 rounded-lg p-4 border-2 border-slate-200 hover:border-slate-300 transition-colors text-center"
                            >
                              <div className="text-4xl mb-3">{member.icon}</div>
                              <h5 className="text-lg font-bold text-slate-900 mb-1">
                                {member.name}
                              </h5>
                              <p className="text-slate-600 text-sm">{member.role}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Footer */}
              <div className="bg-slate-50 border-t-2 border-slate-200 px-8 py-4 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-6 py-2 bg-blue-100 text-blue-700 border-2 border-blue-300 rounded-lg font-medium hover:bg-blue-200 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PoliciesModalLight;
