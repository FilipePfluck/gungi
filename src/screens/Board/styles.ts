import styled from 'styled-components'

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const RightContainer = styled.div`
    display: flex;
    flex-direction: column;

    strong{
        margin: 16px 0;
        font-size: 24px;
    }
`

export const Board = styled.main`
    width: 560px;
    height: 560px;

    display: grid;
    grid-template-rows: repeat(9, 1fr); 
`

export const Button = styled.button`
    padding: 4px;
    border-radius: 4px;
    background-color: #121212;
    color: #FFF;
    border: 0;
`