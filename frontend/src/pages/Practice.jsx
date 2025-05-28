import Editor from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import QuickLinksPage from "../components/QuickLinks";
import { FaPlay } from "react-icons/fa";

const languageOptions = {
  python: 71,
  javascript: 63,
  c: 50,
  cpp: 54,
  java: 62,
};

const initialCode = {
  python: "# Write your Python code here",
  javascript: "// Write your JavaScript code here",
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  c: `#include <stdio.h>
int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
};

const OnlineIDE = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(initialCode[language]);
  const [output, setOutput] = useState("");

  const handleLanguageChange = (e) => {
    const selected = e.target.value;
    setLanguage(selected);
    setCode(initialCode[selected]);
  };

  const runCode = async () => {
    setOutput("⏳ Running...");
    try {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: languageOptions[language],
        },
        {
          headers: {
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": import.meta.env.VITE_JUDGE0_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      setOutput(response.data.stdout || response.data.stderr || "⚠️ No output.");
    } catch (error) {
      setOutput("❌ Error running code: " + error.message);
    }
  };

  return (
    <>
    <div className="relative min-h-screen bg-black text-white overflow-hidden  ">
        {/* Background blobs */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />

        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-500 opacity-30 rounded-full blur-3xl mix-blend-lighten z-0" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-purple-500 opacity-30 rounded-full blur-3xl mix-blend-lighten z-0" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-blue-500 opacity-30 rounded-full blur-3xl mix-blend-lighten z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />

        <Navbar/>
      

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center gap-8 py-16 lg:pt-35 px-3">
          <h1 className="text-5xl font-bold text-center mb-2 drop-shadow-xl">Online IDE</h1>

          <div className="flex flex-col lg:flex-row gap-8 w-full">
            {/* Editor and language selector */}
            <div className="w-full lg:w-1/2 space-y-4">
              <select
                className="w-full p-3 bg-black border border-gray-600 text-white rounded-lg"
                data-aos='flip-right'
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
              </select>

              <div className="border border-gray-700 rounded-xl overflow-hidden shadow-xl"
              data-aos='flip-right'>
                <Editor
                  height="400px"
                  language={language}
                  value={code}
                  theme="vs-dark"
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    fontFamily: "'Fira Code', monospace",
                    fontLigatures: true,
                    theme: "vs-dark",
                  }}
                />
              </div>
            </div>

            {/* Run + Output */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <button
                onClick={runCode}
                data-aos='flip-left'
                className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
              >
                <FaPlay /> Run Code
              </button>

              <div className="bg-gray-800 bg-opacity-90 text-white rounded-lg p-5 h-[400px] overflow-y-auto shadow-inner whitespace-pre-wrap font-mono text-sm"
              data-aos="flip-left">
                {output}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto">
        <QuickLinksPage />
      </div>
    </>
  );
};

export default OnlineIDE;
