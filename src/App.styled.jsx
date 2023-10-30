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
