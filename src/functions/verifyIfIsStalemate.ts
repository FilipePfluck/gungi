import { verifyIfIsStalemateProps } from '../types'

export const verifyIfIsStalemate = ({
  isChecked,
  isStarting,
  pieces,
  piecesInTheBoard,
  playingNow,
  verifyLegalMoves,
}: verifyIfIsStalemateProps) => {
  if (isStarting) return false

  if (isChecked) return false

  const myPiecesInTheBench = pieces.filter((piece) => piece.team === playingNow)

  if (myPiecesInTheBench.length !== 0) return false

  const myPiecesInTheBoard = Object.entries(piecesInTheBoard)
    .map(([id, piece]) => {
      return { id, ...piece }
    })
    .filter((piece) => {
      return piece.team === playingNow
    })

  const nonePieceHasAMove = myPiecesInTheBoard.every((piece) => {
    const validMoves = verifyLegalMoves({
      columnNumber: piece.columnIndex + 1,
      rowNumber: piece.rowIndex + 1,
      piece: {
        name: piece.name,
        team: piece.team,
        id: piece.id,
      },
      tier: piece.tier,
    })

    return validMoves.length === 0
  })

  return nonePieceHasAMove
}
