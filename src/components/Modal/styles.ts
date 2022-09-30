import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
  inset: 0;
  position: fixed;
  background: rgb(0, 0, 0, 0.2);
  z-index: 9;
`

export const Content = styled(Dialog.Content)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
  background-color: #232323;
  width: 600px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 16px;
`

export const Close = styled(Dialog.Close)`
  background: transparent;
  border: 0;
  color: white;
  position: fixed;
  top: 16px;
  right: 16px;
`

export const RestartButton = styled.button`
  background-color: green;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  color: white;
  margin-top: 16px;
`
