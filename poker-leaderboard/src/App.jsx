import React, { useEffect, useState } from "react";

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("https://opensheet.elk.sh/16Qpc9Uv54GUV5tZYU9Z6bSzqKFCqKHFUrkC8WAnImUU/Sheet1")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => {
          const netA = Number(a.totalWinnings) - Number(a.totalBuyIns);
          const netB = Number(b.totalWinnings) - Number(b.totalBuyIns);
          return netB - netA; // Descending order
        });
        setPlayers(sorted);
      })
      .catch((err) => console.error("Failed to load sheet data:", err));
  }, []);

  return (
    <div
      className="min-h-screen bg-repeat bg-top p-6"
      style={{ backgroundImage: "url('/images/dadbods-logo.jpg')" }}
    >
      <h1 className="text-3xl font-bold text-center -mt-4 mb-8 text-black drop-shadow">
        DadBods Poker League Stat Sheet
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player, index) => {
  const net =
    Number(player.totalWinnings) - Number(player.totalBuyIns);
  const netColor = net >= 0 ? "text-green-600" : "text-red-600";

  let rankDisplay;
  if (index === 0) {
    rankDisplay = (
      <img
        src="/images/first-place-medal.png"
        alt="Gold Medal"
        className="w-10 h-10"
      />
    );
  } else if (index === 1) {
    rankDisplay = (
      <img
        src="/images/second-place-medal.png"
        alt="Silver Medal"
        className="w-10 h-10"
      />
    );
  } else if (index === 2) {
    rankDisplay = (
      <img
        src="/images/third-place-medal.png"
        alt="Bronze Medal"
        className="w-10 h-10"
      />
    );
  } else {
    rankDisplay = (
      <div className="text-base font-semibold text-gray-700">#{index + 1}</div>
    );
  }

  return (
    <div
      key={player.name}
      className="bg-white border-2 border-black rounded-xl shadow-md p-6 flex flex-col text-center relative"
    >
      {/* Rank badge on left side, vertically aligned with image */}
      <div className="absolute left-4 top-6">{rankDisplay}</div>

      {/* Centered player image */}
      <img
        src={player.imageUrl}
        alt={player.name}
        style={{ width: "50px", height: "50px" }}
        className="rounded-full object-cover border mx-auto mb-2"
      />

      {/* Player name below image */}
      <h2 className="text-xl font-bold mb-4">{player.name}</h2>

      {/* Stats */}
      <div className="w-full">
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-gray-600">Buy-Ins:</span>
          <span>{Number(player.totalBuyIns).toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-gray-600">Winnings:</span>
          <span>{Number(player.totalWinnings).toLocaleString()}</span>
        </div>
        <div className="flex justify-between mt-2 text-lg font-semibold">
          <span>Net:</span>
          <span className={netColor}>{net.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
})}

      </div>
    </div>
  );
}

export default App;
