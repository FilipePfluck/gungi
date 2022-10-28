import { verifyIfIsCheckmateProps } from '../types'

export const verifyIfIsCheckmate = ({
  isChecked,
  piecesInTheBoard,
  playingNow,
  verifyLegalMoves,
  verifyValidTilesToPlaceANewPiece,
  pieces,
}: verifyIfIsCheckmateProps) => {
  if (!isChecked) return false

  const king = piecesInTheBoard[`${playingNow}-king-1`]

  const kingMoves = verifyLegalMoves({
    piece: {
      id: `${playingNow}-king-1`,
      name: king.name,
      team: king.team,
    },
    tier: king.tier,
    columnNumber: king.columnIndex + 1,
    rowNumber: king.rowIndex + 1,
  })

  const kingCantMove = kingMoves.length === 0

  if (!kingCantMove) return false

  // setSelectedPieceIsFromBench(true)

  const validTilesToPlaceAPiece = verifyValidTilesToPlaceANewPiece()

  // setSelectedPieceIsFromBench(false)

  if (validTilesToPlaceAPiece.length === 0) return true

  const myPiecesInTheBench = pieces.filter((piece) => piece.team === playingNow)

  if (myPiecesInTheBench.length === 0) return true

  return false
}
