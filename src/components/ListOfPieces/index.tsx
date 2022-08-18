import Image from 'next/image'

import { UseBoard } from '../../context/boardContext'
import * as S from './styles'

const ListOfPieces = () => {
    const { pieces, clickPieceInBench } = UseBoard()
    
    return (
        <S.Container>
            {pieces.map(piece => (
                <S.Piece 
                    key={piece.id} 
                    team={piece.team} 
                    onClick={()=>{clickPieceInBench(piece)}}
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