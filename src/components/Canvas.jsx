import React, { useEffect } from "react";
import colorPalette from "../utils/colorPalette";

export default function Canvas({
  setYellowScore,
  setBlueScore,
  setBlackScore,
  setRedScore,
}) {
  const { yellow, blue, black, red } = colorPalette;

  useEffect(() => {
    const canvas = document.getElementById("boardCanvas");
    const canvasContext = canvas.getContext("2d");

    const SQUARE_SIZE = 40;
    const MIN_SPEED = 5;
    const MAX_SPEED = 10;

    const numSquaresX = canvas.width / SQUARE_SIZE;
    const numSquaresY = canvas.height / SQUARE_SIZE;

    const squares = [];

    // Initialize squares with four different colors for each block
    for (let i = 0; i < numSquaresX; i++) {
      squares[i] = [];
      for (let j = 0; j < numSquaresY; j++) {
        if (i < numSquaresX / 2) {
          squares[i][j] = j < numSquaresY / 2 ? yellow : black;
        } else {
          squares[i][j] = j < numSquaresY / 2 ? blue : red;
        }
      }
    }

    // Initialize balls for each block with random starting positions within their respective block
    const balls = [
      {
        x: Math.random() * (canvas.width / 4),
        y: Math.random() * (canvas.height / 4),
        dx: 8,
        dy: -8,
        reverseColor: yellow,
        ballColor: blue,
      },
      {
        x: (canvas.width / 4) * 3 + Math.random() * (canvas.width / 4),
        y: Math.random() * (canvas.height / 4),
        dx: -8,
        dy: -8,
        reverseColor: blue,
        ballColor: yellow,
      },
      {
        x: Math.random() * (canvas.width / 4),
        y: (canvas.height / 4) * 3 + Math.random() * (canvas.height / 4),
        dx: 8,
        dy: 8,
        reverseColor: black,
        ballColor: red,
      },
      {
        x: (canvas.width / 4) * 3 + Math.random() * (canvas.width / 4),
        y: (canvas.height / 4) * 3 + Math.random() * (canvas.height / 4),
        dx: -8,
        dy: 8,
        reverseColor: red,
        ballColor: black,
      },
    ];

    // Function to draw balls
    function drawBall(ball) {
      canvasContext.beginPath();
      canvasContext.arc(ball.x, ball.y, SQUARE_SIZE / 4, 0, Math.PI * 2, false); // Increased ball radius
      canvasContext.fillStyle = ball.ballColor;
      canvasContext.fill();
      canvasContext.closePath();
    }

    // Function to draw colored squares
    function drawSquares() {
      let yellowScore = 0;
      let blueScore = 0;
      let blackScore = 0;
      let redScore = 0;

      for (let i = 0; i < numSquaresX; i++) {
        for (let j = 0; j < numSquaresY; j++) {
          canvasContext.fillStyle = squares[i][j];
          canvasContext.fillRect(
            i * SQUARE_SIZE,
            j * SQUARE_SIZE,
            SQUARE_SIZE,
            SQUARE_SIZE
          );

          if (squares[i][j] === yellow || squares[i][j] === black)
            yellowScore++;
          if (squares[i][j] === blue || squares[i][j] === red) blueScore++;
          if (squares[i][j] === black) blackScore++;
          if (squares[i][j] === red) redScore++;
        }
      }

      setYellowScore(yellowScore);
      setBlueScore(blueScore);
      setBlackScore(blackScore);
      setRedScore(redScore);
    }

    // Function to check collision with squares and change direction
    function checkSquareCollision(ball) {
      const i = Math.floor(ball.x / SQUARE_SIZE);
      const j = Math.floor(ball.y / SQUARE_SIZE);

      if (i >= 0 && i < numSquaresX && j >= 0 && j < numSquaresY) {
        if (squares[i][j] !== ball.reverseColor) {
          squares[i][j] = ball.reverseColor;

          // Calculate the distance between the ball's center and the square's center
          const distX = Math.abs(ball.x - (i * SQUARE_SIZE + SQUARE_SIZE / 2));
          const distY = Math.abs(ball.y - (j * SQUARE_SIZE + SQUARE_SIZE / 2));

          // Calculate the overlap between the ball and the square
          const overlapX = SQUARE_SIZE / 2 + SQUARE_SIZE / 2 - distX;
          const overlapY = SQUARE_SIZE / 2 + SQUARE_SIZE / 2 - distY;

          // Resolve the overlap and reverse the ball's direction
          if (overlapX > 0 && overlapY > 0) {
            if (overlapX < overlapY) {
              ball.dx = -ball.dx;
            } else {
              ball.dy = -ball.dy;
            }
          }
        }
      }
    }

    // Function to check boundary collision and change direction
    // Function to check boundary collision and change direction
    function checkBoundaryCollision(ball) {
      if (
        ball.x + ball.dx > canvas.width - SQUARE_SIZE / 4 ||
        ball.x + ball.dx < SQUARE_SIZE / 4
      ) {
        ball.dx = -ball.dx;
      }
      if (
        ball.y + ball.dy > canvas.height - SQUARE_SIZE / 4 ||
        ball.y + ball.dy < SQUARE_SIZE / 4
      ) {
        ball.dy = -ball.dy;
      }
    }

    function randomize(ball) {
      ball.dx += Math.random() * 0.01 - 0.005;
      ball.dy += Math.random() * 0.01 - 0.005;

      ball.dx = Math.min(Math.max(ball.dx, -MAX_SPEED), MAX_SPEED);
      ball.dy = Math.min(Math.max(ball.dy, -MAX_SPEED), MAX_SPEED);

      if (Math.abs(ball.dx) < MIN_SPEED)
        ball.dx = ball.dx > 0 ? MIN_SPEED : -MIN_SPEED;
      if (Math.abs(ball.dy) < MIN_SPEED)
        ball.dy = ball.dy > 0 ? MIN_SPEED : -MIN_SPEED;
    }

    // Main draw function
    function draw() {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      drawSquares();

      balls.forEach((ball) => {
        drawBall(ball);
        checkSquareCollision(ball);
        checkBoundaryCollision(ball);
        ball.x += ball.dx;
        ball.y += ball.dy;

        randomize(ball);
      });

      requestAnimationFrame(draw);
    }

    // Initial draw call
    draw();
  }, [
    black,
    blue,
    red,
    setBlackScore,
    setBlueScore,
    setRedScore,
    setYellowScore,
    yellow,
  ]);

  return (
    <canvas
      id="boardCanvas"
      width="720"
      height="720"
      style={{ borderRadius: "10px" }}
    />
  );
}
