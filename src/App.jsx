import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ResultPage from "./components/ResultPage";

const HomePage = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const navigate = useNavigate();

  const handleCalculate = () => {
    if (name1 && name2) {
      navigate(
        `/result?name1=${encodeURIComponent(name1)}&name2=${encodeURIComponent(name2)}`
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDDCDC]">
      <div className="flex flex-col items-center text-center p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-pink-600 text-3xl font-bold">FLAMES</h1>
        
        {/* Container for input fields and button */}
        <div className="flex flex-col space-y-4 w-full mt-4">
          <input
            className="p-2 border rounded w-full"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            placeholder="Your Name 🥰"
          />
          <input
            className="p-2 border rounded w-full"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            placeholder="Your crush's name!! 💘"
          />
          
          {/* Centered Button */}
          <div className="flex justify-center w-full">
            <button
              className="bg-pink-500 text-white px-4 py-2 rounded w-40"
              onClick={handleCalculate}
            >
              Calculate
            </button>
          </div>
        </div>

        {/* Text Section */}
        <div className="my-4">
          <p className="text-gray-700 text-center text-xl font-bold">
            Enter two names and unlock the fiery secrets of your fate! Will it be passion, friendship, or an unbreakable bond?
          </p>
          <p className="text-gray-700 text-center text-xl font-bold mt-4">
            Dare to discover what destiny has written for you!!!
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}
