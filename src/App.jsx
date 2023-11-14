import { useState } from 'react'
// components abajo
import { Square } from './components/Square';
import { TURNS } from './components/utils/logic';
import { WINNER_COMBOS } from './components/utils/logic';
import './App.css'
import { WinnerModal } from './components/WinnerModal';
import confetti from "canvas-confetti"

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null)

  //checkea el tablero a ver si salio una de las jugadas ganadoras
  const checkWinner = (checkedBoard) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (checkedBoard[a] && checkedBoard[a] === checkedBoard[b] && checkedBoard[a] === checkedBoard[c]) {
        return checkedBoard[a]
      }
    }
    return null
  };

  const checkEnGame = (checkedBoard) => {
    return checkedBoard.every((square) => square != null)
  }

  const updateBoard = (index) => {
    //chequeo si hay algo en ese indice, si lo hay, corto la peticion, no deberia poder reescribir
    if (board[index] || winner) return;
    // si pasa el if previon, toca actualizar el tablero y excribir la X o la O
    let newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //actualiza el turno
    let newTurn = turn === TURNS.X ? TURNS.o : TURNS.X;
    setTurn(newTurn)

    const newWiner = checkWinner(newBoard);
    if (newWiner) {
      setWinner(newWiner)
      confetti()
    } else if (checkEnGame(newBoard)) {
      setWinner(false)
    }
  }

  const resStartGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null)
  }

  return (
    <>
      <main className='board'>
        <h1>Ta Te Ti</h1>
        <section className='game'>
          {board.map((_, index) => {
            return (
              <Square
                index={index}
                key={index}
                updateBoard={updateBoard} >
                {board[index]}
              </Square>
            )
          })}

        </section>
        {/*Seccion de abajo solo para casillero de "a quien le toca el turno"*/}
        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
        </section>
      </main>
      {winner != null && (<WinnerModal winner={winner} resStartGame={resStartGame} />)}

    </>
  )
}

export default App
