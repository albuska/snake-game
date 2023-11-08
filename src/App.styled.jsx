import styled, { css, keyframes } from "styled-components";

export const AppContainer = styled.div`
  width: 500px;
  height: 500px;
  border: 1px solid white;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: monospace;
  border-radius: 10px;
`;

export const Title = styled.h1`
  position: absolute;
  left: -90%;
  top: 40%; 
  text-transform: uppercase;
  color: #ffffff;
  font-size: 250px;
  font-weight: 900;

  opacity: 1;
  transition: all 1s ease;
`;

const moveTitleRight = keyframes`
  0% {
    transform: translateX(0) scale(1);
  }
  100% {
    transform: translateX(50%) scale(0.7);
  }
`;

export const InGameTitle = styled(Title)`
  position: absolute;
  font-size: 140px;
  top: 55px;
  left: 107%;
  transition: all 1s ease;
  animation: ${moveTitleRight} 1s ease;
`;

InGameTitle.defaultProps = {
 isStarted: false,
};

export const SnakeImg = styled.img`
  position: absolute;
  left: -90%;
  top: 10%;
  width: 400px;
`;

export const PauseAndScoreBox = styled.div`
  position: absolute;
  top: -10%;
  right: 50%;
`;

export const ButtonBox = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  font-family: inherit;
  font-size: 1.5rem;
  border-radius: 10px;
  color: #fff;
  width: 50%;
  max-width: 150px;
  height: 50px;
  border: none;
  font-weight: 600;
  z-index: 4;
  cursor: pointer;
  margin-top: 10px;
`;

export const Text = styled.div`
  color: #fff;
  z-index: 4;
  opacity: 0.5;
`;

export const ArrowMsg = styled(Text)`
  font-size: 1rem;
  margin: 10px;
`;

export const GameOver = styled(Text)`
  font-size: 3rem;
`;

export const CountBox = styled.div`
  display: flex;
  font-size: 2rem;
  gap: 10px;
  color: #eb2d2d;
  opacity: 0.5;
`;

export const ScoreText = styled.p`
  margin: 0;
`;

export const NameBox = styled.div`
  position: absolute;
  font-size: 2rem;
  left: 10px;
  bottom: -40px;
  color: #eb2d2d;
  opacity: 0.5;
`;

export const Backdrop = styled.div`
  width: 100%;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1200;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(97, 97, 97, 0.6);
  backdrop-filter: blur(4px);
`;

export const Modal = styled.div`
  width: 380px;
  padding-top: 50px;
  padding-bottom: 60px;
  border-radius: 30px;
  background-color: #000;
  height: 194px;
`;

export const ModalRecord = styled(Modal)`
  width: 500px;
`;

export const InputBox = styled.div`
  width: 250px;
  display: flex;
  margin-top: 25px;
  margin-bottom: 25px;
  background-color: #000;
`;

export const Input = styled.input`
  width: 100%;
  height: 30px;
  text-align: center;
  background-color: transparent;
  border-radius: 10px;
  color: #ffffff;
  font-size: 14px;
  letter-spacing: 0.28px;
`;

export const TitleRecord = styled(Text)`
  opacity: 1;
  text-align: center;
  text-transform: uppercase;
  text-decoration: underline;
`;

export const Table = styled.table`
  border: 1px solid #ffffff;
  margin: 0 auto;
  margin-top: 20px;
  padding: 10px;
  border-collapse: collapse;
  position: relative;
`;

export const TrTable = styled.tr`
  border-bottom: 1px dashed #ffffff;
`;

export const ThTable = styled.th`
  width: 100px;
  color: red;
  padding: 5px;
  border-left: 1px dashed #ffffff;
  font-size: 16px;
`;

export const TdTable = styled.td`
  color: #ffffff;
  padding: 5px;
  border-left: 1px dashed #ffffff;
  text-align: center;
  font-size: 14px;
`;

export const Icon = styled.svg`
  position: absolute;
  top: 32%;
  right: 35%;
  cursor: pointer;
`;

export const IconYes = styled.svg`
  position: absolute;
  top: 47%;
  right: -27%;
  cursor: pointer;
`;

export const IconPause = styled.svg`
  position: absolute;
  left: 197%;
  top: 30%;
  cursor: pointer;
`;
