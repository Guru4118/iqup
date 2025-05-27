import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import QuickLinksPage from '../components/QuickLinks';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Glowing Background Blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-10 right-0 w-[300px] h-[300px] bg-purple-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-blue-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />

      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center z-10">
        <img
          src=""
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-0"
        />
        <div
          className="relative z-10 text-center px-6"
          data-aos="fade-up"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            AI-Powered Mock Interviews
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            Practice your interviews with real-time voice Q&A, smart feedback, and resume-driven questions.
          </p>
        </div>
      </div>

      {/* Goals Section */}
      <div className="relative z-10 py-16 px-6 md:px-20">
        <h2
          className="text-3xl md:text-4xl font-semibold text-center mb-12"
          data-aos="fade-up"
        >
          Our 3 Core Goals
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up">
          {/* Goal Card 1 */}
          {/* Goal Card 1 */}
{/* Goal Card 1 */}
<div className="bg-white/5 p-6 rounded-2xl shadow-md hover:shadow-pink-400/50 hover:scale-105 transition-all duration-300 backdrop-blur-md"
data-aos="flip-right">
  <h3 className="text-xl font-bold text-pink-400 mb-3">Realistic Interview Simulation</h3>
  <p className="text-gray-300">
    Engage in a fully simulated voice-driven interview experience, tailored to your resume.
  </p>
  <span className="hidden lg:block mt-3 text-sm text-gray-400">
    The AI uses your resume to ask personalized questions, mimicking real-time recruiter behavior. It evaluates your response fluency, pauses, filler words, and tone of voice.<br /><br />
    Sessions are timed, questions vary in complexity, and you're tested across soft skills, domain knowledge, and problem-solving scenarios to build interview confidence.
  </span>
</div>

{/* Goal Card 2 */}
<div className="bg-white/5 p-6 rounded-2xl shadow-md hover:shadow-purple-400/50 hover:scale-105 transition-all duration-300 backdrop-blur-md" data-aos="flip-right">
  <h3 className="text-xl font-bold text-purple-400 mb-3">Smart Feedback & Scoring</h3>
  <p className="text-gray-300">
    Get detailed AI-generated feedback on each answer and overall performance.
  </p>
  <span className="hidden lg:block mt-3 text-sm text-gray-400">
    After each response, receive real-time analytics on clarity, coherence, and relevance. AI gives line-by-line suggestions on how to improve tone, remove hesitation, and align with industry expectations.<br /><br />
    A final summary includes section-wise performance, a numeric score, and actionable advice to help you prepare better for actual interviews.
  </span>
</div>

{/* Goal Card 3 */}
<div className="bg-white/5 p-6 rounded-2xl shadow-md hover:shadow-blue-400/50 hover:scale-105 transition-all duration-300 backdrop-blur-md" data-aos="flip-right">
  <h3 className="text-xl font-bold text-blue-400 mb-3">Privacy-First Design</h3>
  <p className="text-gray-300">
    All data including resumes and audio recordings are deleted after the session for total privacy.
  </p>
  <span className="hidden lg:block mt-3 text-sm text-gray-400">
    Your session runs entirely on secured encrypted APIs. No resume data, audio, or feedback is stored post-session — ensuring GDPR and user-first data practices.<br /><br />
    This guarantees peace of mind for job seekers who prioritize confidentiality and want full control over their personal information.
  </span>
</div>


        </div>
      </div>
      <div>
        <QuickLinksPage/>
      </div>
    </div>
  );
};

export default About;
