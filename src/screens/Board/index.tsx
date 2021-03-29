import { useEffect } from 'react'
import Row from '../../components/Row'
import { UseBoard } from '../../context/boardContext'

import ListOfPieces from '../../components/ListOfPieces'

import * as S from './styles'

const Board = () => {
    const { board } = UseBoard()

    return(
        <S.Container>
            <ListOfPieces/>
            <S.Board>
                {board.map(row => (
                    <Row key={row.id} tiles={row.tiles}/>
                ))}
            </S.Board>
        </S.Container>
    )
}

export default Board