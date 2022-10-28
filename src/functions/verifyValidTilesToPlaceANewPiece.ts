export const verifyValidTilesToPlaceANewPiece = ({
  board,
  playingNow,
  verifyIfTIleIsLegal,
  selectedPiece,
}) => {
  const validTilesIds = []

  board.forEach((row, index) => {
    if (
      (playingNow === 'white' && index >= 6) ||
      (playingNow === 'black' && index <= 2)
    )
      return

    row.tiles.forEach((tile) => {
      const length = tile.pieces.length

      if (length === 3) return

      const lastPiece = tile.pieces[length - 1]

      if (lastPiece?.name === 'king') return

      if (lastPiece && lastPiece.team !== playingNow) return

      const isMyKingNotChecked = verifyIfTIleIsLegal({
        piece: selectedPiece || {
          id: `${playingNow}-pawn-1`,
          name: 'pawn',
          team: playingNow,
        },
        tile,
        preventVerifyingIfPieceCanMove: true,
      })

      const isTheEnemyKingNotChecked = verifyIfTIleIsLegal({
        piece: selectedPiece || {
          id: `${playingNow}-pawn-1`,
          name: 'pawn',
          team: playingNow,
        },
        tile,
        team: playingNow === 'white' ? 'black' : 'white',
        preventVerifyingIfPieceCanMove: true,
      })

      // In order for the tile to be valid
      // It has to protect the check, if my king is in check
      // But you also CANNOT place a new piece checkig your oponent

      const isValid = isMyKingNotChecked && isTheEnemyKingNotChecked

      if (isValid) {
        validTilesIds.push(tile.id)
      }
    })
  })

  return validTilesIds
}
