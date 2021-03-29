import styled from 'styled-components'

interface PieceProps {
    team: 'white' | 'black'
}

export const Container = styled.div`
    position: relative;

    background-color: #CFAB4D;
    border: 1px solid #845F2A;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const Piece = styled.div<PieceProps>`

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    :nth-child(2){
        z-index: 10;
        transform: translate(-50%, -65%);
    }
    :nth-child(3){
        z-index: 10;
        transform: translate(-50%, -80%);
    }

    height: 80%;
    width: 80%;

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
    }
`