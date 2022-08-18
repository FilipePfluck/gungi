const handleClickPieceInBench = () => {

}

const handleClickTile = () => {
  if(!selectedPiece) {
    selectPiece()
    verifyMoves()
    return
  }

  if(selectedPieceIsFromBench){
    placeItIntoBoardAndRemoveFromBench()
    passTurn()
    return
  }

  verifyIfCanMoveToThisTile()
  if(!piece){
    placeItIntoTheBoard()
    passTurn()
    return
  }

  if(pieceIsEnemy){
    handleCapture()
    passTurn()
    return
  }

  
}