import Row from '../../components/Row'

import * as S from './styles'

const Board = () => {
    const row1 = [
        {pieces: [{id: 1, name: 'king', team: 'black'}, {id: 1, name: 'pawn', team: 'black'}, {id: 1, name: 'king', team: 'black'}]}, 
        {pieces: [{id: 1, name: 'king', team: 'white'}]},
        {pieces: []}, {pieces: []},{pieces: []}, 
        {pieces: []}, 
        {pieces: []},
        {pieces: []}, 
        {pieces: []}
    ]

    return(
        <S.Container>
            <S.Board>
                <Row tiles={row1}/>
                <Row tiles={row1}/>
                <Row tiles={row1}/>
                <Row tiles={row1}/>
                <Row tiles={row1}/>
                <Row tiles={row1}/>
                <Row tiles={row1}/>
                <Row tiles={row1}/>
                <Row tiles={row1}/>
            </S.Board>
        </S.Container>
    )
}

export default Board