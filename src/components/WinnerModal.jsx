import { Square } from "./Square";

export function WinnerModal({ winner, resStartGame }) {

    const handlerResStart = () => {
        resStartGame()
    }

    return (
        <section className="winner">
            <div className='text'>
                <h2>
                    {winner === false ? 'Empate' : 'Gano'}
                </h2>
                <header className="win">
                    {winner && <Square> {winner}</Square>}
                </header>
                <footer>
                    <button onClick={handlerResStart}>Empezar de nuevo</button>
                </footer>
            </div>

        </section>
    )

};

