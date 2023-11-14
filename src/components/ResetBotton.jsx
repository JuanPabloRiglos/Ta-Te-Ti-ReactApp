export function ResetBoton({ resStartGame }) {

    const handlerRestart = () => {
        resStartGame()
    }
    return (
        <section>
            <button onClick={handlerRestart}> Resetear Partida </button>
        </section>
    )
}
