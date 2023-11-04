import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Food } from "./components/Food/Food";
import { Snake } from "./components/Snake/Snake";
import {
  AppContainer,
  CountBox,
  ArrowMsg,
  GameOver,
  Button,
  Backdrop,
  Input,
  InputBox,
  Modal,
  ButtonBox,
} from "./App.styled";
import { GlobalStyle } from "./components/GlobalStyles";

const randomFoodPosition = () => {
  const pos = { x: 0, y: 0 };
  let x = Math.floor(Math.random() * 96);
  let y = Math.floor(Math.random() * 96);
  pos.x = x - (x % 4);
  pos.y = y - (y % 4);
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
  const [snake, setSnake] = useState(initialSnake.snake);
  const [lastDirection, setLastDirection] = useState(initialSnake.direction);
  const [foodPosition, setFoodPosition] = useState(randomFoodPosition);
  const [isStarted, setIsStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const playgroundRef = useRef();

  axios.defaults.baseURL = "https://snake-game-backend-three.vercel.app";

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleSave = async () => {
    try {
      await axios.post("/api/games/createGame", { playerName });
      console.log("Success");
      setIsStarted(true);
      playgroundRef.current.focus();
    } catch (error) {
      console.error("Помилка при відправці даних на сервер:", error);
    }
  };

  useEffect(() => {
    if (!isStarted) return;

    //method to update snake array's values on keyboard event
    const move = () => {
      const tmpSnake = [...snake];
      let x = tmpSnake[tmpSnake.length - 1].x,
        y = tmpSnake[tmpSnake.length - 1].y;
      switch (lastDirection) {
        case "ArrowUp":
          y -= 4;
          break;
        case "ArrowRight":
          x += 4;
          break;
        case "ArrowDown":
          y += 4;
          break;
        case "ArrowLeft":
          x -= 4;
          break;
        default:
          break;
      }

      tmpSnake.push({
        x,
        y,
      });

      if (x !== foodPosition.x || y !== foodPosition.y) tmpSnake.shift();
      else setFoodPosition(randomFoodPosition());
      setSnake(tmpSnake);
    };

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
  }, [foodPosition.x, foodPosition.y, isStarted, lastDirection, snake]);

  return (
    <>
      <AppContainer
        onKeyDown={(e) => setLastDirection(e.key)}
        ref={playgroundRef}
        tabIndex={0}
      >
        {isStarted && <CountBox> score: {snake.length - 3}</CountBox>}
        {!isStarted && (
          <Backdrop>
            <Modal>
              <InputBox>
                <Input
                  type="text"
                  placeholder="Введіть ім'я гравця"
                  onChange={handleNameChange}
                />
              </InputBox>
              {playerName && !isStarted && (
                <ButtonBox>
                  <Button onClick={handleSave} type="submit">
                    Start
                  </Button>
                  && <ArrowMsg>Press Arrows keys to play!</ArrowMsg>
                </ButtonBox>
              )}
            </Modal>
          </Backdrop>
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
                // playgroundRef.current.focus();
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
      <GlobalStyle />
    </>
  );
}

export default App;
