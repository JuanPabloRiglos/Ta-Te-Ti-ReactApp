export function Square({ children, updateBoard, isSelected, index }) {
    //isSelected solo para seccion de Turnos
    const squareClassName = `square ${isSelected ? 'is-selected' : ''}`

    const handlerTurnd = () => {
        updateBoard(index)
    }

    return (
        <div onClick={handlerTurnd} className={squareClassName}>
            {children}
        </div>
    )
}