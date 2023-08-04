import { useState } from "react";
import "./App.css";

export default function Board() {

  const [squares, setSquares] = useState([Array(9).fill(null)]);
  const [isTurnX, setIsTurnX] = useState(true);
  const [winner, setWinner] = useState(null);
  const [highlightWinner, setHighLightWinner] = useState(Array(9).fill(null));
  const players = ["X", "O"];

  function onHistoryButtonClick(item) {
    setSquares(squares.filter((value,index) => index < item))

    if(item % 2 == 0) {
      setIsTurnX(false)
    } else {
      setIsTurnX(true)
    }
    
    setHighLightWinner(Array(9).fill(null))
    setWinner(null);
  }
  
  function handleSquareClick(i) {
    const tmpArray =  squares[squares.length-1].slice()
    if(winner || tmpArray[i])
      return;

    if(isTurnX) {      
      tmpArray[i] = players[0];
      setIsTurnX(false)
    }
    else {
      tmpArray[i] = players[1];
      setIsTurnX(true)
    }

    let winnerName = checkWinner(tmpArray);
    setSquares([...squares, tmpArray]);

    if(winnerName){
      setWinner(winnerName)
    }

    if(squares.length == 9 && !winnerName)
    setWinner("Draw")
  }

  function checkWinner(tmpArray) {
    const winnerLine = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ]
  
    for(let item of winnerLine) {
      const [a,b,c] = item;
      if(tmpArray[a] && tmpArray[a] === tmpArray[b] && tmpArray[a] === tmpArray[c]) {
        const winArr = highlightWinner.slice();
        [winArr[a], winArr[b], winArr[c]] = [tmpArray[a], tmpArray[b], tmpArray[c]];
        setHighLightWinner(winArr);
        return tmpArray[a] == players[0] ? players[0] : players[1];         
      } 
    }

    return null;   
  }

  function getWinnerLabel(winner) {
    switch (winner) {
      case null:
        return "Game in progress";
      case "Draw":
        return "Draw"
      default:
        return `Winner is ${winner}`;
    }
  }

  return(
    <div className="game">
    <h1 className="winnerLabel">{getWinnerLabel(winner)}</h1>
    <div className="main-container">
    <div className="additionalInfo">{
      squares.map((item, index) => { 
        return <p key={index}><button className="historyBtn" onClick={() => onHistoryButtonClick(index + 1)}>
                       {index === 0 ? "Start" : `Move: ${index}`}
                </button></p>
      })    
    }</div>

    <div className="board">
    {   
      squares[squares.length - 1].map((item, index) => {
        return (
          <Square
            key={index}
            value={squares[squares.length - 1][index]}
            winner={highlightWinner[index] ? true : false}
            onSquareClick={() => handleSquareClick(index)}
          />
        );
      })
  }  
    </div>
    <div className="additionalInfo"></div>
    </div>
    </div>
  )
}

function Square({ value, winner, onSquareClick }) {
  return(
    <button className={winner ? "winButton myButton" : "myButton"} 
            onClick={onSquareClick}>
            {value}
    </button>
  )
}



