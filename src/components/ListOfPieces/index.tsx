import { UseBoard } from '../../context/boardContext'
import * as S from './styles'

const ListOfPieces = () => {
    const { pieces, setSelectedPiece } = UseBoard()
    
    return (
        <S.Container>
            {pieces.map(piece => (
                <S.Piece 
                    key={piece.id} 
                    team={piece.team} 
                    onClick={()=>{setSelectedPiece(piece)}}
                >
                    <div>
                        <p>{piece.name}</p>
                    </div>
                </S.Piece>
            ))}
        </S.Container>
    )
}

export default ListOfPieces