import { verifyMovesProps } from '../types'
import moves from '../utils/moves'

export const verifyMoves = ({
  piece,
  tier,
  columnNumber,
  rowNumber,
  board,
  clearSelectedPiece,
}: verifyMovesProps) => {
  const tile = board[rowNumber - 1].tiles[columnNumber - 1]
  const tileHeight = tile.pieces.length

  // pieces that are below other pieces cannot move
  if (tileHeight !== tier) return

  const pieceMove = moves[piece.name][tier]?.moves

  const tilesArray = []

  function calculateContinuousMoves(direction: string) {
    let shouldBreak = false

    /* const directions = {
      up: {
        direction: 'vertical',
        increasing: true,
        inverse: 'down',
      },
      down: {
        direction: 'vertical',
        increasing: false,
        inverse: 'up',
      },
      left: {
        direction: 'horizontal',
        increasing: false,
        inverse: 'right',
      },
      right: {
        direction: 'horizontal',
        increasing: true,
        inverse: 'left',
      },
    } */

    for (let i = 1; i <= pieceMove[direction]; i++) {
      if (shouldBreak) {
        shouldBreak = false
        break
      }

      /* let surpassedBoard = false

              Object.keys(directions).forEach(key=>{
                  const _direction = piece.team === 'white' 
                      ? directions[key] 
                      : directions[directions[key].inverse]

                  const index = _direction.direction === 'horizontal' 
                      ? rowNumber 
                      : columnNumber

                  if(direction.toLowerCase().includes(_direction)){
                      surpassedBoard = _direction.increasing 
                          ? index+i > 9
                          : index-i < 1
                  }
              })

              if(surpassedBoard) break */

      if (
        (direction.toLowerCase().includes('up') && piece.team === 'white') ||
        (direction.toLowerCase().includes('down') && piece.team === 'black')
      ) {
        if (rowNumber + i > 9) break
      }

      if (
        (direction.toLowerCase().includes('down') && piece.team === 'white') ||
        (direction.toLowerCase().includes('up') && piece.team === 'black')
      ) {
        if (rowNumber - i < 1) break
      }

      if (
        (direction.toLowerCase().includes('right') && piece.team === 'white') ||
        (direction.toLowerCase().includes('left') && piece.team === 'black')
      ) {
        if (columnNumber + i > 9) break
      }

      if (
        (direction.toLowerCase().includes('left') && piece.team === 'white') ||
        (direction.toLowerCase().includes('right') && piece.team === 'black')
      ) {
        if (columnNumber - i < 1) break
      }

      // I baseado no time,
      // considerando que as prestas se movem no sentido contrário das brancas
      const teamI = piece.team === 'white' ? i : -i

      // Índice do Board
      const rowIndex = direction.toLowerCase().includes('up')
        ? rowNumber - 1 + teamI
        : direction.toLowerCase().includes('down')
        ? rowNumber - 1 - teamI
        : rowNumber - 1

      // Índice dos tiles
      const tileIndex = direction.toLowerCase().includes('right')
        ? columnNumber - 1 + teamI
        : direction.toLowerCase().includes('left')
        ? columnNumber - 1 - teamI
        : columnNumber - 1

      const tile = board[rowIndex].tiles[tileIndex]

      const tilePieces = tile.pieces
      const lastPiece = tilePieces[tileHeight - 1]

      if (lastPiece?.name === 'king' && lastPiece.team === piece.team) break
      if (tilePieces[2] && tilePieces[2].team === piece.team) break

      shouldBreak = !!tilePieces[0]

      tilesArray.push(tile)
    }
  }

  function calculateJumpMoves(tiles: { x: number; y: number }[]) {
    tiles.forEach((tile) => {
      const r = rowNumber - 1 + tile.y
      const t = columnNumber - 1 + tile.x

      if (r >= 0 && r <= 8 && t >= 0 && t <= 8) {
        const tileToGo = board[r].tiles[t]
        const lastPiece = tileToGo.pieces[tileToGo.pieces.length - 1]

        if (
          !(tileToGo.pieces[2] && tileToGo.pieces[2].team === piece.team) &&
          !(lastPiece?.name === 'king' && lastPiece.team === piece.team)
        ) {
          tilesArray.push(board[r].tiles[t])
        }
      }
    })
  }

  // if(piece.team !== piece.team) return

  if (pieceMove.type === 'continuous') {
    const keys = Object.keys(pieceMove).filter(
      (key) => key !== 'type' && key !== 'tiles',
    )

    keys.forEach((key) => {
      calculateContinuousMoves(key)
    })
  }

  if (pieceMove.type === 'jump') {
    if (pieceMove.tiles[0]) {
      calculateJumpMoves(pieceMove.tiles)
    }
  }

  if (!tilesArray.length) {
    clearSelectedPiece()
    return
  }

  return tilesArray
}
