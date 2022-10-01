import Link from 'next/link'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`

const Aside = styled.aside`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 64px;

  h1 {
    margin-top: 80px;
    font-size: 48px;
  }

  p {
    margin-top: 24px;
    font-size: 20px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  margin-top: auto;

  button {
    width: 100%;
    border: 0;
    background-color: #121212;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 12px;
  }
`

const BacgkroundImage = styled.div`
  height: 100%;
  width: 60%;
  background-image: url('/gungi-background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  right: 0;
`

export default function Home() {
  return (
    <Container>
      <Aside>
        <h1>Gungi</h1>
        <p>Fan-game baseado na obra de Yoshihiro Togashi</p>
        <ButtonContainer>
          <Link href="/rules">
            <button>Regras</button>
          </Link>
          <Link href="/board">
            <button>Jogar</button>
          </Link>
        </ButtonContainer>
      </Aside>
      <BacgkroundImage />
    </Container>
  )
}
