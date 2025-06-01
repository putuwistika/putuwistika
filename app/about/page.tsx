import React from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Calendar, Award, Globe, User } from 'lucide-react';

interface CombinedAnimationProps {
  text: string;
  className?: string;
}

const CombinedAnimation: React.FC<CombinedAnimationProps> = ({ text, className }) => (
  <h1 className={className}>{text}</h1>
);

interface TechLogoProps {
  icon: string;
  name: string;
}

const TechLogo: React.FC<TechLogoProps> = ({ icon, name }) => (
  <div className="flex items-center gap-2 bg-gray-800/60 px-3 py-2 rounded-lg hover:bg-gray-700/60 transition-all">
    <img src={icon} alt={name} className="w-6 h-6 invert" />
    <span className="text-sm">{name}</span>
  </div>
);

interface ExperienceCardProps {
  role: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
  current?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ role, company, period, location, achievements, current = false }) => (
  <div className="relative pl-4 pb-12">
    <div className="absolute left-0 top-2 h-full w-0.5 bg-blue-500"></div>
    <div className={`absolute left-[-5px] top-2 h-3 w-3 rounded-full ${current ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`}></div>
    <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl ml-6">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-xl font-bold text-white">{role}</h3>
        {current && <span className="bg-green-500 text-black text-xs px-2 py-1 rounded-full font-semibold">CURRENT</span>}
      </div>
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

interface LeadershipCardProps {
  role: string;
  organization: string;
  period: string;
  achievements: string[];
}

const LeadershipCard: React.FC<LeadershipCardProps> = ({ role, organization, period, achievements }) => (
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

interface Skill {
  name: string;
  icon: string;
}

interface Skills {
  programming: Skill[];
  ml: Skill[];
  tools: Skill[];
}

const AboutPage: React.FC = () => {
  const skills: Skills = {
    programming: [
      { name: "Python", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/python.svg" },
      { name: "SQL", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/mysql.svg" },
      { name: "PostgreSQL", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/postgresql.svg" },
      { name: "Docker", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/docker.svg" },
      { name: "Neo4j", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/neo4j.svg" },
      { name: "Kafka", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/apachekafka.svg" }
    ],
    ml: [
      { name: "TensorFlow", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/tensorflow.svg" },
      { name: "PyTorch", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/pytorch.svg" },
      { name: "Scikit-learn", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/scikitlearn.svg" },
      { name: "Pandas", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/pandas.svg" },
      { name: "NumPy", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/numpy.svg" },
      { name: "PySpark", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/apachespark.svg" }
    ],
    tools: [
      { name: "Airflow", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/apacheairflow.svg" },
      { name: "Git", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/git.svg" },
      { name: "Streamlit", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/streamlit.svg" },
      { name: "Matplotlib", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/plotly.svg" },
      { name: "Seaborn", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/python.svg" },
      { name: "Cloud Computing", icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/4.25.0/amazonaws.svg" }
    ]
  };

  const certifications = [
    "Machine Learning Specialist - Indonesia AI (PT. Teknologi Artifisial Indonesia)",
    "Data Science: Machine Learning Specialization - Rakamin Academy",
    "Fast Track Data Engineer - Digital Skola Bootcamp",
    "Full Stack Data Science - ITB's Directorate of Non-Regular Education & Sanbercode",
    "Data Science with Python and Algorithm - ITB Career Center",
    "Artificial Intelligence - Digital Talent Scholarship Kominfo",
    "Microsoft Office Specialist: Excel Associate (Office 2019) - Microsoft",
    "Microsoft Azure AI Fundamentals - Microsoft"
  ];

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
                <span>South Jakarta, DKI Jakarta</span>
              </div>
            </div>
            <div className="flex justify-center gap-4 mb-8">
              <a href="https://github.com/putuwistika" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/putuwistika/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://putuwistika.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                <Globe className="w-6 h-6" />
              </a>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4">
          {/* Professional Summary */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
              <User className="w-8 h-8" />
              Professional Summary
            </h2>
            <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl">
              <p className="text-lg text-gray-300 leading-relaxed">
                Fresh graduate from <span className="text-blue-400 font-semibold">Institut Teknologi Bandung</span> with expertise in <span className="text-purple-400 font-semibold">Data Science, Machine Learning research, and Data Engineering</span>. Proven track record in delivering data-driven solutions that drive measurable business impact, including achieving <span className="text-green-400 font-semibold">71% cost reduction</span> through analytical optimization and strategic data modeling.
              </p>
              <br />
              <p className="text-lg text-gray-300 leading-relaxed">
                Combines strong statistical foundation with hands-on experience in building end-to-end ML pipelines using <span className="text-blue-400 font-semibold">Apache Airflow</span>, from experimental research to production deployment. Proficient in communicating technical concepts to stakeholders and fostering effective team collaboration. Dedicated to translating complex data insights into actionable business strategies, leveraging expertise in mathematics, statistics, and advanced programming to support organizational growth.
              </p>
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills & Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
              <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 text-blue-400">Programming & Tools</h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.programming.map((skill, index) => (
                    <TechLogo key={index} {...skill} />
                  ))}
                </div>
              </div>
              <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 text-purple-400">Machine Learning & Data Science</h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.ml.map((skill, index) => (
                    <TechLogo key={index} {...skill} />
                  ))}
                </div>
              </div>
              <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 text-green-400">Development & Cloud Tools</h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills.tools.map((skill, index) => (
                    <TechLogo key={index} {...skill} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Research Interests */}
            <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold mb-4 text-orange-400">Research Interests</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "ML Algorithm Research",
                  "Advanced Time Series Analysis", 
                  "Statistical Model Development",
                  "Ensemble Methods",
                  "Deep Learning",
                  "MLOps",
                  "Natural Language Processing"
                ].map((interest, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-orange-300 border border-orange-400/30">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Work Experience & Projects</h2>
            <div className="space-y-2">
              <ExperienceCard 
                role="Data Engineer Intern"
                company="DANA Indonesia"
                period="February 2025 - Present"
                location="Jakarta"
                current={true}
                achievements={[
                  "Researched and implemented optimal storage tiers and retention policies, achieving a 71% annual reduction in storage and compute costs",
                  "Performed Pareto analysis on compute nodes and table-query access patterns to identify high-growth or inefficient jobs",
                  "Refactored complex queries (rewriting joins, adding partition pruning) to lower monthly Compute Unit consumption",
                  "Built and scheduled Apache Airflow DAGs to orchestrate end-to-end data ingestion, transformation, and delivery",
                  "Created and maintained pipelines that feed ML APIs in collaboration with ML Engineers"
                ]}
              />
              <ExperienceCard 
                role="AI Engineer Intern"
                company="PT GITS Indonesia"
                period="December 2024 - February 2025"
                location="Bandung"
                achievements={[
                  "Achieved 95% accuracy in Face Recognition and 80% accuracy in Emotion Detection",
                  "Built scalable AI pipelines by implementing DevOps practices for seamless deployment and monitoring",
                  "Designed real-time data orchestration systems using Kafka and Airflow for automated AI model training",
                  "Researched and applied Agentic AI and advanced Deep Learning techniques to enhance model performance",
                  "Effectively communicated AI-driven insights to stakeholders, aligning solutions with business objectives"
                ]}
              />
              <ExperienceCard 
                role="Back End Hacker"
                company="Program Digistar Telkom Indonesia"
                period="September 2024 - October 2024"
                location="Bandung"
                achievements={[
                  "Conducted extensive data mining, crawling more than 80,000 datasets from padiUMKM website",
                  "Developed an NLP model for feature engineering product recommendations, improving precision by 85%",
                  "Successfully integrated the Llama 3.1 model, enhancing existing system performance by 60%",
                  "Built REST API endpoints using Flask for frontend integration",
                  "Created intelligent product comparison assistant, enhancing user efficiency by 70%"
                ]}
              />
              <ExperienceCard 
                role="Data Engineer Intern"
                company="ITB CAREER CENTER"
                period="May 2024 - July 2024"
                location="Bandung"
                achievements={[
                  "Developed Kimball design data warehouse concept improving data integrity",
                  "Implemented SCD2 dimensions, conducted source table profiling, and designed optimized fact tables",
                  "Implemented manual data quality checks and automated validation processes, reducing spread of dirty data",
                  "Created and presented data visualizations using Tableau to communicate insights to stakeholders"
                ]}
              />
            </div>
          </section>

          {/* Education & Leadership */}
          <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Education</h2>
              <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-bold">Bachelor of Science in Meteorology</h3>
                <p className="text-blue-400">Bandung Institute of Technology</p>
                <p className="text-gray-400 mb-4">2020 - 2024</p>
                <div className="flex items-center gap-2 text-yellow-400 mb-4">
                  <Award className="w-5 h-5" />
                  <span>Winner of Bandung Institute Of Technology Ambassador 2022</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Relevant Coursework:</h4>
                  <p className="text-sm text-gray-400">
                    Statistics & Statistical Modeling, Numerical Methods & Mathematical Analysis, Data Science Engineering, 
                    Matrices and Vector Spaces, Risk Analysis & Probability Theory, Computational Meteorology
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Leadership Experience</h2>
              <LeadershipCard 
                role="The Chief Committee"
                organization="MGG ITB Cultural Festival: The Art of Balinese Dance"
                period="June 2023 - June 2024"
                achievements={[
                  "Demonstrated effective leadership by delegating tasks and mentoring team members",
                  "Acted as decisive leader, maintaining open communication to address challenges promptly",
                  "Successfully organized event with 98% positive feedback from participants",
                  "Achieved 99% satisfaction from attendees, showcasing exceptional organizational skills"
                ]}
              />
            </div>
          </section>

          {/* Certifications */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Certifications</h2>
            <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="p-4 bg-gray-900/50 rounded-lg">
                    <h3 className="font-semibold text-gray-300">{cert}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AboutPage;