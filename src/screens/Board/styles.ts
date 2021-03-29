import styled from 'styled-components'

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const Board = styled.main`
    width: 560px;
    height: 560px;

    display: grid;
    grid-template-rows: repeat(9, 1fr); 
`