import { verifyIfKingIsCheckedProps } from '../types'

export const verifyIfKingIsChecked = ({
  team,
  piecesInTheBoard,
  board,
  isStarting,
  verifyMoves,
  clearSelectedPiece,
}: verifyIfKingIsCheckedProps) => {
  if (isStarting) return

  const enemyPieces = Object.entries(piecesInTheBoard).filter(
    ([key, value]) => {
      return value.team === (team === 'white' ? 'black' : 'white')
    },
  )

  const king = piecesInTheBoard[`${team}-king-1`]

  return enemyPieces?.some(([id, value]) => {
    if (!value) return false

    const enemyPieceMove = verifyMoves({
      piece: {
        id,
        name: value.name,
        team: value.team,
      },
      tier: value.tier,
      columnNumber: value.columnIndex + 1,
      rowNumber: value.rowIndex + 1,
      board,
      clearSelectedPiece,
    })

    return enemyPieceMove?.some((move) => {
      const coordinate = move.id.replace('tile', '')
      const [rowNumber, columnNumber] = coordinate.split('-')

      return (
        king.columnIndex + 1 === Number(columnNumber) &&
        king.rowIndex + 1 === Number(rowNumber)
      )
    })
  })
}
