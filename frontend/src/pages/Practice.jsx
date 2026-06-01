import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Play, Code, Terminal, ChevronDown, RefreshCw, Lightbulb, BookOpen } from 'lucide-react';

const LANGUAGES = [
  { value: 'python',     label: 'Python',     id: 71 },
  { value: 'javascript', label: 'JavaScript', id: 63 },
  { value: 'java',       label: 'Java',       id: 62 },
  { value: 'c',          label: 'C',          id: 50 },
  { value: 'cpp',        label: 'C++',        id: 54 },
];

const STARTER_CODE = {
  python: `# Python — Write your solution here
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test
print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
`,
  javascript: `// JavaScript — Write your solution here
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
`,
  java: `public class Main {
    public static int[] twoSum(int[] nums, int target) {
        java.util.Map<Integer, Integer> seen = new java.util.HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{};
    }

    public static void main(String[] args) {
        int[] result = twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(result[0] + ", " + result[1]);
    }
}`,
  c: `#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target) {
    int* result = (int*)malloc(2 * sizeof(int));
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i; result[1] = j;
                return result;
            }
        }
    }
    return result;
}

int main() {
    int nums[] = {2, 7, 11, 15};
    int* res = twoSum(nums, 4, 9);
    printf("[%d, %d]\\n", res[0], res[1]);
    free(res);
    return 0;
}`,
  cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    auto res = twoSum(nums, 9);
    cout << "[" << res[0] << ", " << res[1] << "]" << endl;
    return 0;
}`,
};

const TIPS = [
  'Think about time complexity before writing code — aim for O(n) or better where possible.',
  'Use a hash map to trade space for time — it often reduces O(n²) to O(n).',
  'Always walk through your logic with a simple example before implementing.',
  'Edge cases matter: empty arrays, single elements, duplicate values — consider them all.',
];

export default function Practice() {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(STARTER_CODE.python);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [tipIndex] = useState(Math.floor(Math.random() * TIPS.length));

  const selectedLang = LANGUAGES.find(l => l.value === language);

  const handleLanguageChange = (lang) => {
    setLanguage(lang.value);
    setCode(STARTER_CODE[lang.value]);
    setOutput('');
    setShowLangMenu(false);
  };

  const runCode = async () => {
    setRunning(true);
    setOutput('');
    try {
      const res = await axios.post(
        'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
        { source_code: code, language_id: selectedLang.id },
        {
          headers: {
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            'X-RapidAPI-Key': import.meta.env.VITE_JUDGE0_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      const result = res.data;
      if (result.stdout) setOutput(result.stdout);
      else if (result.stderr) setOutput(`Error:\n${result.stderr}`);
      else if (result.compile_output) setOutput(`Compile error:\n${result.compile_output}`);
      else setOutput('No output.');
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Header */}
      <section style={{ paddingTop: '88px', borderBottom: '1px solid var(--color-border)', background: 'white' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code size={20} color="var(--color-teal)" />
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>Code Practice IDE</h1>
              <p style={{ fontSize: '13px', color: 'var(--color-ink-3)' }}>Write, run, and test your code in the browser</p>
            </div>
          </div>

          {/* Language selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLangMenu(p => !p)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 16px', borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--color-border)', background: 'white',
                cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: 'var(--color-ink)',
                transition: 'all 0.2s ease', minWidth: '140px', justifyContent: 'space-between',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-teal)'}
              onMouseLeave={e => { if (!showLangMenu) e.currentTarget.style.borderColor = 'var(--color-border)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code size={14} color="var(--color-teal)" />
                {selectedLang.label}
              </div>
              <ChevronDown size={14} color="var(--color-ink-3)" style={{ transform: showLangMenu ? 'rotate(180deg)' : '', transition: 'transform 0.2s' }} />
            </button>
            {showLangMenu && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', left: 0,
                background: 'white', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)',
                minWidth: '160px', zIndex: 10, overflow: 'hidden',
              }}>
                {LANGUAGES.map(lang => (
                  <button key={lang.value} onClick={() => handleLanguageChange(lang)} style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                    padding: '10px 16px', border: 'none', background: language === lang.value ? 'var(--color-teal-light)' : 'white',
                    color: language === lang.value ? 'var(--color-teal)' : 'var(--color-ink-2)',
                    fontSize: '14px', fontWeight: language === lang.value ? 600 : 400,
                    cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => { if (language !== lang.value) e.currentTarget.style.background = 'var(--color-bg-subtle)'; }}
                    onMouseLeave={e => { if (language !== lang.value) e.currentTarget.style.background = 'white'; }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* IDE */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 200px)' }} className="ide-grid">
        {/* Editor */}
        <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--color-border)' }}>
          <div style={{ padding: '12px 20px', background: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink-3)', letterSpacing: '0.02em' }}>EDITOR</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
                <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
              ))}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Editor
              height="100%"
              language={language === 'cpp' ? 'cpp' : language}
              value={code}
              theme="light"
              onChange={(val) => setCode(val || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontLigatures: true,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                padding: { top: 16, bottom: 16 },
                renderLineHighlight: 'gutter',
                smoothScrolling: true,
              }}
            />
          </div>
        </div>

        {/* Output panel */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 20px', background: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink-3)', letterSpacing: '0.02em' }}>OUTPUT</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setOutput('')} title="Clear" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ink-4)', padding: '2px', display: 'flex' }}>
                <RefreshCw size={14} />
              </button>
              <button
                onClick={runCode}
                disabled={running}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '6px 16px', borderRadius: 'var(--radius-sm)',
                  background: running ? 'var(--color-bg-muted)' : 'var(--color-teal)',
                  color: running ? 'var(--color-ink-3)' : 'white',
                  border: 'none', cursor: running ? 'wait' : 'pointer',
                  fontSize: '13px', fontWeight: 600, transition: 'all 0.2s',
                }}
              >
                {running ? <><div style={{ width: '12px', height: '12px', border: '2px solid rgba(0,0,0,0.2)', borderTopColor: 'var(--color-teal)', borderRadius: '50%', animation: 'spin-slow 0.7s linear infinite' }} /> Running</> : <><Play size={13} fill="white" /> Run</>}
              </button>
            </div>
          </div>

          <div style={{ flex: 1, padding: '20px', fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: '13px', lineHeight: 1.7, color: output.startsWith('Error') ? '#dc2626' : 'var(--color-ink)', background: 'white', whiteSpace: 'pre-wrap', overflowY: 'auto', minHeight: '200px' }}>
            {!output && !running && (
              <span style={{ color: 'var(--color-ink-4)', fontStyle: 'italic' }}>Click "Run" to execute your code...</span>
            )}
            {output}
          </div>

          {/* Tip panel */}
          <div style={{ padding: '16px 20px', background: 'var(--color-amber-light)', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <Lightbulb size={15} color="var(--color-amber)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '12px', color: 'var(--color-ink-2)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--color-amber)' }}>Pro tip: </strong>{TIPS[tipIndex]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom links */}
      <div style={{ padding: '20px 0', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '14px', color: 'var(--color-ink-3)' }}>Ready to put your skills to the test in a real interview scenario?</p>
          <Link to="/upload" className="btn btn-primary btn-sm">Start Mock Interview →</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ide-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
