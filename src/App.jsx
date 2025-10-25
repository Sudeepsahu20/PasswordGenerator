import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberallowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (symbolAllowed) str += "@#$%^&()/*_+";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, symbolAllowed]);

  const CopyPassword = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, symbolAllowed, generatePassword]);

  return (
    <div className="min-h-screen flex items-center justify-center  from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md mx-auto bg-gray-800 text-orange-400 shadow-2xl rounded-2xl p-6">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          🔐 Password Generator
        </h1>

  
        <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden shadow-md mb-6">
          <input
            type="text"
            className="flex-1 text-lg text-gray-900 bg-white px-4 py-2 outline-none font-mono"
            readOnly
            placeholder="Your password will appear here..."
            value={password}
            ref={passwordRef}
          />
          <button
            onClick={CopyPassword}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 transition-all duration-200"
          >
            Copy
          </button>
        </div>

        <div className="space-y-4">
        
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="text-sm font-medium text-white">
              Password Length: <span className="text-blue-400">{length}</span>
            </label>
            <input
              type="range"
              id="length"
              min={6}
              max={20}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer accent-blue-500"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="checkbox"
                className="accent-green-500 h-4 w-4"
                defaultChecked={numberAllowed}
                onChange={() => setNumberallowed((prev) => !prev)}
              />
              Include Numbers
            </label>

            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="checkbox"
                className="accent-yellow-400 h-4 w-4"
                defaultChecked={symbolAllowed}
                onChange={() => setSymbolAllowed((prev) => !prev)}
              />
              Include Symbols
            </label>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={generatePassword}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
          >
            Generate New Password
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          Made with ❤️ by Bunty
        </p>
      </div>
    </div>
  );
}

export default App;
