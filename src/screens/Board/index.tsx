import { useEffect } from 'react'
import Row from '../../components/Row'
import { UseBoard } from '../../context/boardContext'

import ListOfPieces from '../../components/ListOfPieces'

import * as S from './styles'

const Board = () => {
    const { board, finishPlacingPieces } = UseBoard()

    return(
        <S.Container>
            <ListOfPieces/>
            <S.Board>
                {board.map(row => (
                    <Row rowId={row.id} key={row.id} tiles={row.tiles}/>
                ))}
            </S.Board>
            <S.Button onClick={finishPlacingPieces}>
                Terminei de posicionar as peças
            </S.Button>
        </S.Container>
    )
}

export default Board