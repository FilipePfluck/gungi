import React from 'react'
import { UseBoard } from '../../context/boardContext'
import * as S from './styles'

interface PieceProps {
  id: string
  name: string
  team: 'white' | 'black'
}

interface TileProps {
  pieces: PieceProps[]
  tileId: string
  rowId: string
}

const Tile: React.FC<TileProps> = ({ pieces, rowId, tileId }) => {
  const {
    verifyIfSelectedPieceCanMoveToThisTile,
    handleClickTile,
    selectedPieceTileId,
    movedFromTileId,
    movedToTileId,
  } = UseBoard()

  const selectedPieceCanMoveToThisTIle =
    verifyIfSelectedPieceCanMoveToThisTile(tileId)

  const array = [movedFromTileId, movedToTileId]

  const isLightBrown = array.includes(tileId)

  return (
    <S.Container
      onClick={() => handleClickTile({ pieces, rowId, tileId })}
      isGreen={selectedPieceCanMoveToThisTIle}
      isDarkBrown={tileId === selectedPieceTileId}
      isLightBrown={isLightBrown}
    >
      {pieces.map((piece) => (
        <S.Piece key={piece.id} team={piece.team}>
          <div>
            <img src={`/${piece.name}.svg`} alt={piece.name} />
          </div>
        </S.Piece>
      ))}
    </S.Container>
  )
}

export default Tile
