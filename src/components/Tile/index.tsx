import { useCallback } from 'react'
import { UseBoard } from '../../context/boardContext'
import * as S from './styles'

interface PieceProps {
    id: string
    name: string
    team: string
}

interface TileProps {
    pieces: PieceProps[],
    tileId: string,
    rowId: string
}

const Tile: React.FC<TileProps> = ({pieces, rowId, tileId}) => {
    const { play, selectedPiece } = UseBoard()

    const handleClickTile = useCallback(()=>{
        if(selectedPiece){
            play({rowId, tileId})
        }
    },[selectedPiece])

    return(
        <S.Container
            onClick={handleClickTile}
        >
            {pieces.map(piece => (
                <S.Piece key={piece.id} team={piece.team}>
                    <div>
                        <img src={`/${piece.name}.svg`} alt={piece.name}/>
                    </div>
                </S.Piece>
            ))}
        </S.Container>
    )
}

export default Tile