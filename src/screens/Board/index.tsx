import { useEffect } from 'react'
import Row from '../../components/Row'
import { UseBoard } from '../../context/boardContext'

import ListOfPieces from '../../components/ListOfPieces'

import * as S from './styles'

const Board = () => {
    const { board, playingNow } = UseBoard()

    return(
        <S.Container>
            <ListOfPieces/>
            <S.RightContainer>
                <strong>Brancas {playingNow === 'white' && '- Jogando'}</strong>
                <S.Board>
                    {board.map(row => (
                        <Row rowId={row.id} key={row.id} tiles={row.tiles}/>
                    ))}
                </S.Board>
                <strong>Pretas {playingNow === 'black' && '- Jogando'}</strong>
            </S.RightContainer>
        </S.Container>
    )
}

export default Board