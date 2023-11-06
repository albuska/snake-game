import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Food } from "./components/Food/Food";
import { Snake } from "./components/Snake/Snake";
import {
  AppContainer,
  NameBox,
  CountBox,
  ArrowMsg,
  GameOver,
  Button,
  Backdrop,
  Input,
  InputBox,
  Modal,
  ButtonBox,
  TitleRecord,
  ModalRecord,
  ThTable,
  TdTable,
  Table,
  TrTable,
  Icon,
  IconPause,
} from "./App.styled";
import { GlobalStyle } from "./components/GlobalStyles";
import appleImg from "./assets/images/apple.png";
import pearImg from "./assets/images/pear.png";
import strawberryImg from "./assets/images/strawberry.png";
import iconCross from "./assets/icons/cross.svg";
import iconPause from "./assets/icons/pause.svg";
import iconPlay from "./assets/icons/play.svg";

const fruits = [appleImg, pearImg, strawberryImg];

const getRandomFruit = () => {
  const randomIndex = Math.floor(Math.random() * fruits.length);
  return fruits[randomIndex];
};

const randomFoodPosition = () => {
  const pos = { x: 0, y: 0, image: getRandomFruit() };
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
  speed: 150,
};

function App() {
  const [snake, setSnake] = useState(initialSnake.snake);
  const [lastDirection, setLastDirection] = useState(initialSnake.direction);
  const [foodPosition, setFoodPosition] = useState(randomFoodPosition);
  const [isStarted, setIsStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [isRecordsVisible, setRecordsVisible] = useState(false);
  const [listOfBestPlayers, setListOfBestPlayers] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [eatenFruits, setEatenFruits] = useState(0);

  const playgroundRef = useRef();

  axios.defaults.baseURL = "https://snake-game-backend-three.vercel.app";

  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleSave = async () => {
    try {
      await axios.post("/api/games/createGame", {
        player_name: playerName,
        score: totalScore,
      });
      setRecordsVisible(true);
    } catch (error) {
      console.error("Помилка при відправці даних на сервер:", error);
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // function checkSelfCollision(snake) {
  //   const head = snake[snake.length - 1];

  //   for (let i = 0; i < snake.length - 1; i++) {
  //     const segment = snake[i];
  //     if (head.x === segment.x && head.y === segment.y) {
  //       return true;
  //     }
  //   }

  //   return false;
  // }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        togglePause();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/games/bestPlayers");
      setListOfBestPlayers(data.players);
    })();
  }, []);

  useEffect(() => {
    if (!isStarted || isPaused) return;

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
      else {
        setFoodPosition(randomFoodPosition());
        setEatenFruits(eatenFruits + 1);
      }

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

    if (totalScore <= 50) {
      const interval = setInterval(move, initialSnake.speed);
      return () => clearInterval(interval);
    } else if (totalScore <= 100) {
      const interval = setInterval(move, initialSnake.speed - 50);
      return () => clearInterval(interval);
    } else if (totalScore <= 150) {
      const interval = setInterval(move, initialSnake.speed - 100);
      return () => clearInterval(interval);
    }
  }, [
    eatenFruits,
    foodPosition.x,
    foodPosition.y,
    isPaused,
    isStarted,
    lastDirection,
    snake,
    totalScore,
  ]);

  useEffect(() => {
    if (eatenFruits === 1) {
      setTotalScore((prev) => prev + 1);
    } else if (eatenFruits === 2) {
      setTotalScore((prev) => prev + 5);
    } else if (eatenFruits >= 3) {
      setTotalScore((prev) => prev + 10);
    }
  }, [eatenFruits]);

  return (
    <>
      <AppContainer
        onKeyDown={(e) => setLastDirection(e.key)}
        ref={playgroundRef}
        tabIndex={0}
      >
        {isStarted && (
          <>
            <div>
              <NameBox>
                name: <span style={{ color: "#FFF" }}>{playerName}</span>
              </NameBox>
              <IconPause onClick={togglePause}>
                {isPaused ? (
                  <use
                    href={`${iconPlay}#blue_copy`}
                    fill="#FFF"
                    width="35px"
                    height="35px"
                  />
                ) : (
                  <use
                    href={`${iconPause}#Capa_2`}
                    fill="#FFF"
                    width="20px"
                    height="20px"
                  />
                )}
              </IconPause>
              <CountBox>
                score: <span style={{ color: "#FFF" }}>{totalScore}</span>
              </CountBox>
            </div>
          </>
        )}
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
              {playerName && (
                <ButtonBox>
                  <Button
                    onClick={() => {
                      setIsStarted(true);
                      playgroundRef.current.focus();
                    }}
                    type="submit"
                  >
                    Start
                  </Button>
                  && <ArrowMsg>Press Arrows keys to play!</ArrowMsg>
                </ButtonBox>
              )}
            </Modal>
          </Backdrop>
        )}
        {isRecordsVisible && (
          <Backdrop>
            <ModalRecord>
              <TitleRecord>List of record holders</TitleRecord>
              <Table>
                <thead>
                  <TrTable>
                    <ThTable>№</ThTable>
                    <ThTable>Name</ThTable>
                    <ThTable>Scores</ThTable>
                  </TrTable>
                </thead>
                <tbody>
                  {listOfBestPlayers.map((item, idx) => {
                    return (
                      <TrTable key={idx}>
                        <TdTable>{idx + 1}</TdTable>
                        <TdTable>{item.player_name}</TdTable>
                        <TdTable>{item.score}</TdTable>
                      </TrTable>
                    );
                  })}
                </tbody>
              </Table>
            </ModalRecord>
            <Icon
              width="15px"
              height="15px"
              onClick={() => {
                setIsStarted(false);
                setRecordsVisible(false);
              }}
            >
              <use href={`${iconCross}#Capa_1`} />
            </Icon>
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
                playgroundRef.current.focus();
                setTotalScore(0);
              }}
              type="submit"
            >
              Restart
            </Button>
            <Button
              style={{ backgroundColor: "green", color: "#FFF" }}
              onClick={handleSave}
              type="submit"
            >
              Close
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
