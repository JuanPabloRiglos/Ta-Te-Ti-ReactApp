import { useState } from 'react'
// components abajo
import { Square } from './components/Square';
import { TURNS } from './components/utils/logic';
import { WINNER_COMBOS } from './components/utils/logic';
import './App.css'
import { WinnerModal } from './components/WinnerModal';
import confetti from "canvas-confetti"
import { ResetBoton } from './components/ResetBotton';


function App() {
  const [board, setBoard] = useState(() => {
    // chequeao si hay partida en el localStorage , si no lo hay, devuelvo la configuracion inicial
    const boardInLS = window.localStorage.getItem('board');
    return boardInLS ? JSON.parse(boardInLS) : Array(9).fill(null)
  });

  const [turn, setTurn] = useState(() => {
    const turnInLs = window.localStorage.getItem('turn');
    return turnInLs ? turnInLs : TURNS.X
  });
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
  // checkea si el juego termino.
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

    // guardar estado de la partida en LC
    window.localStorage.setItem('board', JSON.stringify(board));
    window.localStorage.setItem('turn', turn)

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
    setWinner(null);
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn')
  }

  return (
    <>
      <main className='board'>
        <h1>Ta Te Ti</h1>

        <ResetBoton resStartGame={resStartGame} />

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
