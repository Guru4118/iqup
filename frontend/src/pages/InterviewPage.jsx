import { useEffect, useState, useRef } from 'react';
import WebcamFeed from '../components/WebcamFeed';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;

function InterviewPage() {
  const [question, setQuestion] = useState('');
  const [webcamOn, setWebcamOn] = useState(true);
  const [recording, setRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [evaluationReady, setEvaluationReady] = useState(true);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);

  const sessionId = localStorage.getItem('sessionId');
  const navigate = useNavigate();

  const fetchQuestion = async () => {
    if (!sessionId) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/question/${sessionId}`, {
        withCredentials: true,
      });
      if (res.data.question) {
        setQuestion(res.data.question);

        if (res.data.question === 'Interview completed') {
          setInterviewCompleted(true);
            // Enable evaluation button
        } else {
          setInterviewCompleted(false);
        
        }
      } else {
        setQuestion(res.data.message);
      }
      setRecognizedText('');
      setRecording(false);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const sendAnswerToBackend = async (text) => {
    if (!sessionId) return;

    try {
      await axios.post(
        `http://localhost:5000/api/question/${sessionId}`,
        { answer: text },
        { withCredentials: true }
      );
      console.log('Answer saved:', text);
      fetchQuestion();  
    } catch (error) {
      console.error('Error sending answer:', error);
    }
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Your browser does not support audio recording');
      return;
    }
    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.start();

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;

        setRecognizedText(speechResult);
        sendAnswerToBackend(speechResult);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
      };

      recognitionRef.current.start();

      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone or speech recognition:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    if (recognitionRef.current) recognitionRef.current.stop();
    setRecording(false);
  };

  const toggleWebcam = () => {
    setWebcamOn((prev) => !prev);
  };

  const handleNextQuestion = () => {
    fetchQuestion();
  };

  const handleShowEvaluation = async () => {
    try {
      // Fetch evaluation from backend
      const res = await axios.get(`http://localhost:5000/api/evaluate/${sessionId}`, {
        withCredentials: true,
      });
      if (res.data.evaluation) {
        // Navigate to evaluation page and pass evaluation data
        navigate('/evaluation', { state: { evaluation: res.data.evaluation } });
      }
    } catch (error) {
      console.error('Error fetching evaluation:', error);
      alert('Failed to fetch evaluation result.');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-900 text-white">
      <div className="p-4 flex flex-col justify-center items-center border-r border-gray-700">
        {webcamOn ? <WebcamFeed /> : <div className="text-gray-400">Webcam is off</div>}
        <button
          onClick={toggleWebcam}
          className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
        >
          {webcamOn ? 'Turn Off Camera' : 'Turn On Camera'}
        </button>
      </div>

      <div className="p-6 flex flex-col justify-center items-start">
        <h2 className="text-2xl mb-4">Interview Question</h2>
        <p className="text-lg bg-gray-800 p-4 rounded w-full">{question || 'Loading...'}</p>

        <button
          onClick={recording ? stopRecording : startRecording}
          disabled={question === 'Interview completed' || question === ''}
          className={`mt-6 px-4 py-2 rounded transition ${
            recording ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {recording ? 'Stop Recording' : 'Answer Question (Record Voice)'}
        </button>

        <button
          onClick={handleNextQuestion}
          disabled={recording || interviewCompleted || question === ''}
          className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Next Question
        </button>

        {evaluationReady && (
          <button
            onClick={handleShowEvaluation}
            className="mt-4 px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition"
          >
            Show Evaluation Result
          </button>
        )}

        {recognizedText && (
          <div className="mt-4 w-full">
            <h3 className="mb-2">Recognized Text:</h3>
            <p className="bg-gray-800 p-3 rounded break-words">{recognizedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewPage;
