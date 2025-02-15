import { useState } from "react";

export default function App() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState("");

  const flamesMeaning = {
    F: "Friends",
    L: "Lovers",
    A: "Affectionate",
    M: "Marriage",
    E: "Enemies",
    S: "Siblings",
  };

  const calculateFlames = () => {
    if (!name1 || !name2) {
      setResult("Please enter both names!");
      return;
    }

    let combinedName = name1.replace(/\s+/g, "").toLowerCase() + name2.replace(/\s+/g, "").toLowerCase();
    let uniqueChars = new Set(combinedName);
    let flamesCount = uniqueChars.size % 6;

    let flamesKeys = Object.keys(flamesMeaning);
    setResult(flamesMeaning[flamesKeys[flamesCount]]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDDCDC]">
      <div className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-pink-600 text-3xl font-bold font-cursive">FLAMES</h1>
        <div className="flex justify-center my-2 text-2xl space-x-2">
          <span>❤️</span> <span>💘</span> <span>💕</span>
        </div>
        <div className="w-full my-4">
          <label className="block text-pink-700 font-semibold">Your Name</label>
          <input
            type="text"
            className="w-full p-2 border-2 rounded-lg outline-none text-center text-pink-800"
            style={{ borderColor: "#D873A3", backgroundColor: "#FDE0E6" }}
            value={name1}
            onChange={(e) => setName1(e.target.value)}
          />
        </div>
        <div className="w-full my-4">
          <label className="block text-pink-700 font-semibold">Partner's Name</label>
          <input
            type="text"
            className="w-full p-2 border-2 rounded-lg outline-none text-center text-pink-800"
            style={{ borderColor: "#D873A3", backgroundColor: "#FDE0E6" }}
            value={name2}
            onChange={(e) => setName2(e.target.value)}
          />
        </div>
        <button
          className="text-white px-6 py-2 rounded-lg hover:opacity-90 transition w-full flex items-center justify-center"
          onClick={calculateFlames}
          style={{ backgroundColor: "#D6407A" }}
        >
          ❤️ Calculate
        </button>
        {result && <p className="mt-4 text-lg font-semibold text-pink-700">💖 {result} 💖</p>}
        <p className="text-sm text-gray-500 mt-4">
          F - Friends | L - Lovers | A - Affectionate | M - Marriage | E - Enemies | S - Siblings
        </p>
      </div>
    </div>
  );
}
