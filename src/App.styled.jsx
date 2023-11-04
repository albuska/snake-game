import { styled } from "styled-components";

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

export const ButtonBox = styled.div`
 margin-top : 50px;
 display: flex;
 flex-direction: column;
align-items: center;
`

 export const Button = styled.button`
    font-family: inherit;
    font-size: 1.5rem;
    border-radius: 10px;
    color: black;
    width: 50%;
    max-width: 150px;
    height: 50px;
    border: none;
    background-color: #e73d9f;
    font-weight: 600;
    z-index: 4;
    cursor: pointer;
 ` 

export const Text = styled.div`
  color: #eb2d2d;
  z-index: 4;
  opacity: 0.5;
`;

export const ArrowMsg = styled(Text)`
    font-size: 1rem;
    margin: 10px;
`

export const GameOver = styled(Text)`
    font-size: 3rem;  
`

export const CountBox = styled.div`
  position: absolute;
  font-size: 2rem;
  bottom: 0px;
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
  position: relative;
  border-radius: 30px;
  background-color: #000;
  height: 194px;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  width: 250px;
  height: 40px;
  text-align: center;
  background-color: transparent;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  letter-spacing: 0.28px;
`;
