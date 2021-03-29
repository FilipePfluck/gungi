import styled from 'styled-components'

interface PieceProps {
    team: 'white' | 'black'
}

export const Container = styled.div`
    width: 400px;
    height: 600px;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(19, 1fr);
`

export const Piece = styled.div<PieceProps>`

    height: 60px;
    width: 60px;

    border-radius: 50%;

    background-color: ${props => props.team === 'white' ? '#EEE': "#252525"};
    border: 1px solid #252525;

    display: flex;
    align-items: center;
    justify-content: center;

    div{
        height: 80%;
        width: 80%; 

        background-color: #EEE;
        border: 1px solid #252525;
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    p{
        color: #353535;
        font-size: 10px;
    }
`