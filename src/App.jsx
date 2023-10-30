import { useEffect, useRef, useState } from "react";
import {Food} from "./components/Food/Food";
import {Snake} from "./components/Snake/Snake";
import {AppContainer, CountBox, ArrowMsg, GameOver, Button} from './App.styled'; 
import { GlobalStyle } from "./components/GlobalStyles";

//method to get random x & y number between 0-96 for random food position
const randomFoodPosition = () => {
  const pos = { x: 0, y: 0 };
  let x = Math.floor(Math.random() * 96);
  let y = Math.floor(Math.random() * 96);
  pos.x = x - (x % 4); // to get multiple of 4
  pos.y = y - (y % 4); // to get multiple of 4
  return pos;
};

const initialSnake = {
  snake: [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 8, y: 0 },
  ],
  direction: "ArrowRight",
  speed: 100,
};

function App() {
  //snake = [{x,y},{x,y},{x,y},{x,y},...]
  const [snake, setSnake] = useState(initialSnake.snake);
  const [lastDirection, setLastDirection] = useState(initialSnake.direction);
  const [foodPosition, setFoodPosition] = useState(randomFoodPosition);
  const [isStarted, setIsStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  //to set focus on big square html box on game start
  const playgroundRef = useRef();

  useEffect(() => {
    if (!isStarted) return;

    //if snake array last element touches the box boundary then game over
    if (
      snake[snake.length - 1].x === 100 ||
      snake[snake.length - 1].x === 0 ||
      snake[snake.length - 1].y === 100 ||
      snake[snake.length - 1].y === -4
    ) {
      setGameOver(true);
      return;
    }

    //interval needed to continuously move the snake by manipulating snake array item's x & y value
    //every 'speed' milliseconds
    const interval = setInterval(move, initialSnake.speed);
    return () => clearInterval(interval);
  });

  //method to update snake array's values on keyboard event
  const move = () => {
    const tmpSnake = [...snake];
    let x = tmpSnake[tmpSnake.length - 1].x,
      y = tmpSnake[tmpSnake.length - 1].y;
    switch (lastDirection) {
      case "ArrowUp":
        y -= 4; //move by -4% top
        break;
      case "ArrowRight":
        x += 4; //move by 4% right
        break;
      case "ArrowDown":
        y += 4; //move by 4% down
        break;
      case "ArrowLeft":
        x -= 4; //move by -4% left
        break;
      default:
        break;
    }

    tmpSnake.push({
      x,
      y,
    });
    // if food position === snake newly added position, then do not remove item from an array
    // otherwise remove everytime to get feel that snake is moving forward
    // i.e - add at end and remove at start in snake array
    if (x !== foodPosition.x || y !== foodPosition.y) tmpSnake.shift();
    else setFoodPosition(randomFoodPosition());
    setSnake(tmpSnake);
  };

  return (
   <p>
      <AppContainer
        onKeyDown={(e) => setLastDirection(e.key)}
        ref={playgroundRef}
        tabIndex={0}
      >
        {isStarted && <CountBox> score: {snake.length - 3}</CountBox>}
  
        {!isStarted && (
          <>
            <Button
              onClick={() => {
                setIsStarted(true);
                playgroundRef.current.focus();
              }}
              type="submit"
            >
              Start
            </Button>
            <ArrowMsg>Press Arrows keys to play!</ArrowMsg>
          </>
        )}
        {gameOver && (
          <>
            <GameOver>Game Over!</GameOver>
            <Button
              onClick={() => {
                setIsStarted(true);
                setGameOver(false);
                setSnake(initialSnake.snake);
                setLastDirection(initialSnake.direction);
                playgroundRef.current.focus();
              }}
              type="submit"
            >
              Restart
            </Button>
          </>
        )}
        <Snake snake={snake} lastDirection={lastDirection} />
        {!gameOver && (
          <>
            <Food position={foodPosition} />
          </>
        )}
      </AppContainer>
      <GlobalStyle/>
   </p>
  );
}

export default App;
