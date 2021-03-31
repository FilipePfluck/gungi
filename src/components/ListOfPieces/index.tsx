import Image from 'next/image'

import { UseBoard } from '../../context/boardContext'
import * as S from './styles'

const ListOfPieces = () => {
    const { pieces, setSelectedPiece, playingNow } = UseBoard()
    
    return (
        <S.Container>
            {pieces.map(piece => (
                <S.Piece 
                    key={piece.id} 
                    team={piece.team} 
                    onClick={()=>{
                        playingNow === piece.team && setSelectedPiece(piece)
                    }}
                >
                    <div>
                        <img src={`/${piece.name}.svg`} alt={piece.name}/>
                    </div>
                </S.Piece>
            ))}
        </S.Container>
    )
}

export default ListOfPieces