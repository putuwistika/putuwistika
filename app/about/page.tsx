import React from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Calendar, Award } from 'lucide-react';

const CombinedAnimation = ({ text, className }) => (
  <h1 className={className}>{text}</h1>
);

const TechLogo = ({ icon, name }) => (
  <div className="flex items-center gap-2 bg-gray-800/60 px-3 py-2 rounded-lg hover:bg-gray-700/60 transition-all">
    <img src={icon} alt={name} className="w-6 h-6 invert" />
    <span className="text-sm">{name}</span>
  </div>
);

const ExperienceCard = ({ role, company, period, location, achievements }) => (
  <div className="relative pl-4 pb-12">
    <div className="absolute left-0 top-2 h-full w-0.5 bg-blue-500"></div>
    <div className="absolute left-[-5px] top-2 h-3 w-3 rounded-full bg-blue-500"></div>
    <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl ml-6">
      <h3 className="text-xl font-bold text-white">{role}</h3>
      <div className="flex flex-wrap gap-4 text-gray-400 mt-1 mb-4">
        <span className="flex items-center gap-1">
          <Award className="w-4 h-4" />
          {company}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {period}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {location}
        </span>
      </div>
      <ul className="space-y-2">
        {achievements.map((achievement, index) => (
          <li key={index} className="text-gray-300 flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            {achievement}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const LeadershipCard = ({ role, organization, period, achievements }) => (
  <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl hover:bg-gray-800/60 transition-all">
    <h3 className="text-xl font-bold text-white mb-2">{role}</h3>
    <div className="flex items-center gap-2 text-gray-400 mb-4">
      <span>{organization}</span>
      <span>•</span>
      <span>{period}</span>
    </div>
    <ul className="space-y-2">
      {achievements.map((achievement, index) => (
        <li key={index} className="text-gray-300 flex items-start gap-2">
          <span className="text-blue-400 mt-1">•</span>
          {achievement}
        </li>
      ))}
    </ul>
  </div>
);

const ResumePage = () => {
  const skills = {
    languages: [
      { name: "Python", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/python.svg" },
      { name: "PostgreSQL", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/postgresql.svg" },
      { name: "MongoDB", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/mongodb.svg" },
      { name: "Docker", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/docker.svg" }
    ],
    ml: [
      { name: "TensorFlow", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/tensorflow.svg" },
      { name: "PyTorch", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/pytorch.svg" },
      { name: "Scikit-learn", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/scikitlearn.svg" },
      { name: "Pandas", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/pandas.svg" }
    ],
    tools: [
      { name: "Airflow", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/apacheairflow.svg" },
      { name: "Git", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/git.svg" },
      { name: "VSCode", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/visualstudiocode.svg" },
      { name: "Linux", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/linux.svg" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5 bg-cover bg-center" />
      
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-30"></div>

        <header className="container mx-auto px-4 pt-32 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <CombinedAnimation
              text="I PUTU FERRY WISTIKA"
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
            />
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <a href="mailto:putuferrywistika@gmail.com" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
                <span>putuferrywistika@gmail.com</span>
              </a>
              <a href="tel:+6281236627276" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Phone className="w-5 h-5" />
                <span>+62 81236627276</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Bandung, West Java</span>
              </div>
            </div>
            <div className="flex justify-center gap-4 mb-8">
              <a href="http://github.com/putuwistika" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="http://linkedin.com/in/putuwistika/" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Graduate of Institut Teknologi Bandung with expertise in Data Science, Analytics, and Engineering. Currently a Data Scientist at Digistar Telkom Indonesia and Data Engineer at ITB Career Center, developing AI-driven solutions to boost efficiency. During my Data Scientist internship, I built NLP models integrated with Llama 3.1, while my Data Engineer internship refined my skills in database management, process modeling, and teamwork. Passionate about leveraging analytical skills to deliver strategic insights and support business growth.
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4">
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Technical Skill</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Languages Programming & Databases</h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.languages.map((skill, index) => (
                    <TechLogo key={index} {...skill} />
                  ))}
                </div>
              </div>
              <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Machine Learning</h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.ml.map((skill, index) => (
                    <TechLogo key={index} {...skill} />
                  ))}
                </div>
              </div>
              <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Development Tools</h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.tools.map((skill, index) => (
                    <TechLogo key={index} {...skill} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Experience</h2>
            <div className="space-y-2">
              <ExperienceCard 
                role="Data Scientist and Back End Hacker"
                company="Program Digistar Telkom Indonesia"
                period="Sept 2024 - Oct 2024"
                location="Bandung"
                achievements={[
                  "Conducted extensive data mining, crawling over 80,000 datasets from the padiUMKM website",
                  "Developed NLP model for feature engineering product recommendations, improving accuracy by 85%",
                  "Successfully integrated the Llama 3.1 model, enhancing system performance by 60%",
                  "Built REST API endpoints using Flask for the frontend, increasing data transfer efficiency by 75%"
                ]}
              />
              <ExperienceCard 
                role="Data Engineer Intern"
                company="ITB CAREER CENTER"
                period="May 2024 - July 2024"
                location="Bandung"
                achievements={[
                  "Implemented technical consulting best practices for data warehouse design",
                  "Developed and maintained 2 ETL pipelines, increasing data processing efficiency by 80%",
                  "Created data visualizations using Tableau to communicate insights to stakeholders",
                  "Collaborated with cross-functional teams to reduce data quality issues by 50%"
                ]}
              />
            </div>
          </section>


          <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Education</h2>
              <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-bold">Bachelor of Science in Meteorology</h3>
                <p className="text-blue-400">Bandung Institute of Technology</p>
                <p className="text-gray-400 mb-4">2020 - 2024</p>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Award className="w-5 h-5" />
                  <span>ITB Ambassador 2022</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Certifications</h2>
              <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl space-y-4">
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <h3 className="font-bold">Full Stack Data Science</h3>
                  <p className="text-gray-400">ITB's Directorate of Non-Regular Education</p>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <h3 className="font-bold">Fast Track Data Engineer</h3>
                  <p className="text-gray-400">Digital Skola Bootcamp</p>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <h3 className="font-bold">Microsoft Azure AI Fundamentals</h3>
                  <p className="text-gray-400">Microsoft</p>
                </div>
              </div>
            </div>
          </section>


          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Leadership & Volunteer Experience</h2>
            <LeadershipCard 
              role="Data Science Coordinator"
              organization="Festival Tari Bali Nasional by MGG ITB"
              period="June 2023 - June 2024"
              achievements={[
                "Managed PostgreSQL server for 500+ competition participants, handling registration to final results",
                "Processed and analyzed judges' scores for accurate competition results",
                "Created data visualization dashboards for key metrics and performance indicators",
                "Coordinated with event organizers to ensure accurate data collection"
              ]}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default ResumePage;