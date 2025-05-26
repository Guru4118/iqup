// src/pages/HomePage.jsx
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import aiimg from "../assets/aiimg.avif"
import aiimg1 from "../assets/modern.jpg";
import QuickLinksPage from '../components/QuickLinks';
export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden  ">
      {/* Glowing Background Blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />

      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-10 right-0 w-[300px] h-[300px] bg-purple-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-blue-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />
      <Navbar />
      {/* Main Content */}
<div className="grid grid-cols-1 md:grid-cols-2 mt-4 md:mt-0">

        <div
          data-aos="flip-left"
          className="relative z-10 flex flex-col items-center ml-5 mt-0 justify-center min-h-screen text-center px-4"
        >
          <h1 className="text-4xl font-bold mb-4">
            Welcome to AI Mock Interview System
          </h1>
          <p className="mb-6 text-lg max-w-xl">
            Upload your resume, get AI-generated interview questions, and answer them with live webcam feedback and voice input.
          </p>
          <div className="mt-1 max-w-2xl text-sm md:text-base text-white px-6 hidden md:block">
            <p>
              <span className="font-semibold text-white">iQup</span> is your AI-powered interview companion. Our platform simulates real interview scenarios with voice, webcam, and smart feedback – preparing you with confidence for any opportunity.
              Whether you're a student, job seeker, or professional, iQup helps you sharpen your communication skills, improve answer quality, and track progress — all in one place.
            </p>
          </div>
          <button
            onClick={() => navigate('/upload')}
            className="bg-green-500 mt-8 px-6 py-3 rounded-lg text-white text-lg hover:bg-green-600 transition"
          >
            Start Interview
          </button>

          {/* Additional Description */}

        </div>

        <div className="flex justify-center items-center  md:mt-16 px-4">
          <div className="relative group p-1 rounded-3xl border-4 border-pink-500"
            data-aos="flip-right">
            <div className="p-1 rounded-2xl border-4 border-purple-500">
              <div className="p-1 rounded-xl border-4 border-blue-500">
                {/* Image and overlay */}
                <div className="relative w-full max-w-md">
                  <img
                    src={aiimg}
                    alt="AI Interview"
                    className="rounded-lg w-full object-cover transition duration-300 ease-in-out group-hover:blur-sm"
                  />
                  {/* Overlay text on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 
                       transition duration-300 ease-in-out">
                    <p className="text-white font-bold text-xl text-center px-4">
                      Empower Your Interview Journey With <span className='text-4xl md:text-2xl md:text-white text-pink-600'>IQUP</span>
                    </p>


                  </div>

                  <div className=" absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out pt-32 text-4xl">
                    <button
                      onClick={() => navigate('/upload')}
                      className='border-2 px-3 text-black pb-2 bg-green-400 rounded-2xl'>
                      Start
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        


      </div>
      
      

<div 
  className="relative mt-16 px-6 text-center text-white max-w-4xl mx-auto rounded-lg p-10 "
  style={{ 
    backgroundImage: `url(${aiimg})`, // replace with your actual bg image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '300px',
  }}
>
  {/* Dark overlay to improve text readability */}
  <div className="absolute inset-0 bg-black bg-opacity-70 rounded-lg"></div>
<div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-10 right-0 w-[300px] h-[300px] bg-purple-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-blue-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />
      
  {/* Text content */}
  <div className="relative z-10"
  data-aos='zoom-in'>
    <h2 className="text-4xl  font-bold mb-6 drop-shadow-lg">Our Goal</h2>
    <p className="leading-relaxed drop-shadow-lg max-w-3xl mx-auto text-base md:text-sm">
  <span className="block md:inline">
    Our goal with <span className="font-semibold text-white">iQup</span> is to revolutionize interview preparation using artificial intelligence. 
    We aim to provide a realistic and intelligent mock interview platform that helps individuals gain confidence, 
    improve communication skills, and get personalized feedback — all in a stress-free and accessible environment. 
    Whether you're preparing for your first job or your next big opportunity, iQup is here to guide you every step of the way.
  </span>

  {/* Hidden on small screens, visible on medium and up */}
  <span className="hidden md:inline">
    <br /><br />
    Unlike traditional mock interviews, our system adapts to your unique resume, generates targeted questions, and even evaluates your responses using natural language processing. With real-time feedback on tone, clarity, and content, you’ll know exactly where to improve. 
    <br /><br />
    We believe that preparation should not only be effective but also engaging. That’s why iQup integrates voice interaction, webcam-based presence simulation, and AI-driven insights to mimic real interview conditions. 
    <br /><br />
    Our vision is to bridge the gap between academic learning and real-world opportunities by building confidence through practice. As the hiring landscape evolves, so should your preparation. With iQup, you're not just practicing — you're preparing smartly and purposefully.
  </span>
</p>


  </div>
  
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-10 right-0 w-[300px] h-[300px] bg-purple-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-blue-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />
      
</div>


<div data-aos='fade-up'>
<QuickLinksPage/>
</div>
    </div>
  );
}
