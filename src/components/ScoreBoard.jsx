import React from "react";
import colorPalette from "../utils/colorPalette";

export default function ScoreBoard({
  yellowScore,
  blueScore,
  blackScore,
  redScore,
}) {
  const { yellow, blue, black, red } = colorPalette;

  return (
    <div style={{ marginTop: "20px" }}>
      <p>
        <span style={{ color: yellow, fontWeight: 700 }}>
          Yellow: {yellowScore}
        </span>{" "}
        |{" "}
        <span style={{ color: blue, fontWeight: 700 }}>Blue: {blueScore}</span>{" "}
        |{" "}
        <span style={{ color: black, fontWeight: 700 }}>
          Black: {blackScore}
        </span>{" "}
        | <span style={{ color: red, fontWeight: 700 }}>Red: {redScore}</span>
      </p>
      <p style={{ marginTop: "20px" }}>Made by Andrii Iurchenko</p>
      <p
        style={{ display: "flex", justifyContent: "center", marginTop: "4px" }}
      >
        Inspired by Koen van Gilst (
        <a href="https://github.com/vnglst/pong-wars">GitHub</a>)
      </p>
    </div>
  );
}
