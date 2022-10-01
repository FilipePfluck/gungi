import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
`

export const Subtitle = styled.strong`
  font-size: 24px;
  margin: 24px 0;
`

export const Text = styled.p`
  font-size: 20px;
  color: '#f4f4f4';
  margin-bottom: 12px;
  width: 100%;
`

export const ImageGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`

export const Image = styled.img`
  width: 100%;
  margin-bottom: 8px;
`
