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
    const { addPieceFromTheBenchToTheBoard, selectedPiece, setSelectedPiece, verifyMoves, playingNow, verifyIfSelectedPieceCanMoveToThisTile } = UseBoard()

    const selectedPieceCanMoveToThisTIle = verifyIfSelectedPieceCanMoveToThisTile(tileId)

    const handleClickTile = useCallback(()=>{
        if(selectedPiece){
            addPieceFromTheBenchToTheBoard({
                rowId, 
                tileId, 
                playingNowState: playingNow, 
                selectedPieceState: selectedPiece 
            })
        }

        const coordinate = tileId.replace('tile', '')

        const [rowNumber, columnNumber] = coordinate.split('-')

        if(pieces[0]){
            verifyMoves({
                piece: pieces[pieces.length -1],
                tier: pieces.length,
                columnNumber: Number(columnNumber),
                rowNumber: Number(rowNumber)
            })
        }
    },[selectedPiece])

    return(
        <S.Container
            onClick={handleClickTile}
            isGreen={selectedPieceCanMoveToThisTIle}
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