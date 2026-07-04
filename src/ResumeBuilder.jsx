import React, { useState } from 'react';
import { FileText, Plus, Trash2, Download } from 'lucide-react';

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    education: [{ degree: '', school: '', year: '', gpa: '' }],
    experience: [{ title: '', company: '', duration: '', description: '' }],
    skills: [''],
    projects: [{ name: '', description: '', technologies: '' }]
  });

  const [activeSection, setActiveSection] = useState('personal');

  const updatePersonalInfo = (field, value) => {
    setFormData({
      ...formData,
      personalInfo: { ...formData.personalInfo, [field]: value }
    });
  };

  const updateArrayField = (section, index, field, value) => {
    const updated = [...formData[section]];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, [section]: updated });
  };

  const updateSkill = (index, value) => {
    const updated = [...formData.skills];
    updated[index] = value;
    setFormData({ ...formData, skills: updated });
  };

  const addItem = (section) => {
    const newItem = section === 'skills' ? '' :
      section === 'education' ? { degree: '', school: '', year: '', gpa: '' } :
      section === 'experience' ? { title: '', company: '', duration: '', description: '' } :
      { name: '', description: '', technologies: '' };
    
    setFormData({ ...formData, [section]: [...formData[section], newItem] });
  };

  const removeItem = (section, index) => {
    const updated = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updated });
  };

  const downloadResume = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FileText className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Resume Builder</h1>
          </div>
          <p className="text-gray-600">Create your professional resume in minutes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 print:hidden">
            <div className="flex gap-2 mb-6 flex-wrap">
              {['personal', 'education', 'experience', 'skills', 'projects'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeSection === section
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {activeSection === 'personal' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.personalInfo.name}
                    onChange={(e) => updatePersonalInfo('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={formData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Professional Summary"
                    value={formData.personalInfo.summary}
                    onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              )}

              {activeSection === 'education' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Education</h2>
                    <button
                      onClick={() => addItem('education')}
                      className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                  {formData.education.map((edu, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Education {index + 1}</span>
                        {formData.education.length > 1 && (
                          <button
                            onClick={() => removeItem('education', index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Degree/Qualification"
                        value={edu.degree}
                        onChange={(e) => updateArrayField('education', index, 'degree', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="School/University"
                        value={edu.school}
                        onChange={(e) => updateArrayField('education', index, 'school', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Year"
                          value={edu.year}
                          onChange={(e) => updateArrayField('education', index, 'year', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="GPA (optional)"
                          value={edu.gpa}
                          onChange={(e) => updateArrayField('education', index, 'gpa', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'experience' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
                    <button
                      onClick={() => addItem('experience')}
                      className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Experience {index + 1}</span>
                        {formData.experience.length > 1 && (
                          <button
                            onClick={() => removeItem('experience', index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) => updateArrayField('experience', index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => updateArrayField('experience', index, 'company', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g., Jan 2020 - Present)"
                        value={exp.duration}
                        onChange={(e) => updateArrayField('experience', index, 'duration', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Job Description & Achievements"
                        value={exp.description}
                        onChange={(e) => updateArrayField('experience', index, 'description', e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'skills' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
                    <button
                      onClick={() => addItem('skills')}
                      className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Skill (e.g., JavaScript, Project Management)"
                        value={skill}
                        onChange={(e) => updateSkill(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      {formData.skills.length > 1 && (
                        <button
                          onClick={() => removeItem('skills', index)}
                          className="px-3 py-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'projects' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
                    <button
                      onClick={() => addItem('projects')}
                      className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                  {formData.projects.map((project, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Project {index + 1}</span>
                        {formData.projects.length > 1 && (
                          <button
                            onClick={() => removeItem('projects', index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Project Name"
                        value={project.name}
                        onChange={(e) => updateArrayField('projects', index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Project Description"
                        value={project.description}
                        onChange={(e) => updateArrayField('projects', index, 'description', e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Technologies Used"
                        value={project.technologies}
                        onChange={(e) => updateArrayField('projects', index, 'technologies', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 print:shadow-none">
            <div className="flex justify-between items-center mb-6 print:hidden">
              <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
              <button
                onClick={downloadResume}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>

            <div className="space-y-6" id="resume-content">
              {/* Header */}
              {formData.personalInfo.name && (
                <div className="text-center border-b-2 border-indigo-600 pb-4">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{formData.personalInfo.name}</h1>
                  <div className="flex justify-center gap-4 text-sm text-gray-600 flex-wrap">
                    {formData.personalInfo.email && <span>{formData.personalInfo.email}</span>}
                    {formData.personalInfo.phone && <span>• {formData.personalInfo.phone}</span>}
                    {formData.personalInfo.location && <span>• {formData.personalInfo.location}</span>}
                  </div>
                </div>
              )}

              {/* Summary */}
              {formData.personalInfo.summary && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300">PROFESSIONAL SUMMARY</h2>
                  <p className="text-gray-700 text-sm">{formData.personalInfo.summary}</p>
                </div>
              )}

              {/* Education */}
              {formData.education.some(e => e.degree || e.school) && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300">EDUCATION</h2>
                  {formData.education.map((edu, index) => (
                    (edu.degree || edu.school) && (
                      <div key={index} className="mb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                            <p className="text-gray-700 text-sm">{edu.school}</p>
                          </div>
                          <div className="text-right text-sm text-gray-600">
                            {edu.year && <p>{edu.year}</p>}
                            {edu.gpa && <p>GPA: {edu.gpa}</p>}
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}

              {/* Experience */}
              {formData.experience.some(e => e.title || e.company) && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300">WORK EXPERIENCE</h2>
                  {formData.experience.map((exp, index) => (
                    (exp.title || exp.company) && (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                            <p className="text-gray-700 text-sm">{exp.company}</p>
                          </div>
                          {exp.duration && <p className="text-sm text-gray-600">{exp.duration}</p>}
                        </div>
                        {exp.description && (
                          <p className="text-gray-700 text-sm mt-1 whitespace-pre-line">{exp.description}</p>
                        )}
                      </div>
                    )
                  ))}
                </div>
              )}

              {/* Projects */}
              {formData.projects.some(p => p.name) && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300">PROJECTS</h2>
                  {formData.projects.map((project, index) => (
                    project.name && (
                      <div key={index} className="mb-3">
                        <h3 className="font-semibold text-gray-800">{project.name}</h3>
                        {project.description && (
                          <p className="text-gray-700 text-sm mt-1">{project.description}</p>
                        )}
                        {project.technologies && (
                          <p className="text-gray-600 text-sm mt-1 italic">Technologies: {project.technologies}</p>
                        )}
                      </div>
                    )
                  ))}
                </div>
              )}

              {/* Skills */}
              {formData.skills.some(s => s.trim()) && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300">SKILLS</h2>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.filter(s => s.trim()).map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-content, #resume-content * {
            visibility: visible;
          }
          #resume-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
