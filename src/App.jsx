import React, { useState } from "react";
import Canvas from "./components/Canvas";
import ScoreBoard from "./components/ScoreBoard";

const App = () => {
  const [yellowScore, setYellowScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [blackScore, setBlackScore] = useState(0);
  const [redScore, setRedScore] = useState(0);

  return (
    <div id="container" style={{ textAlign: "center", padding: "20px" }}>
      <Canvas
        setYellowScore={setYellowScore}
        setBlueScore={setBlueScore}
        setBlackScore={setBlackScore}
        setRedScore={setRedScore}
      />
      <ScoreBoard
        yellowScore={yellowScore}
        blueScore={blueScore}
        blackScore={blackScore}
        redScore={redScore}
      />
    </div>
  );
};

export default App;
