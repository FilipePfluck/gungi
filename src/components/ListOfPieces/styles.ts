import styled from 'styled-components'

interface PieceProps {
  team: 'white' | 'black'
}

export const Container = styled.div`
  width: 500px;
  height: 600px;

  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(19, 1fr);
  gap: 4px;
`

export const Piece = styled.div<PieceProps>`
  height: 50px;
  width: 50px;

  border-radius: 50%;

  background-color: ${(props) => (props.team === 'white' ? '#EEE' : '#151515')};
  border: 1px solid #252525;

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    height: 80%;
    width: 80%;

    background-color: #eee;
    border: 1px solid #252525;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 70%;
      width: 70%;
    }
  }

  p {
    color: #353535;
    font-size: 10px;
  }
`
