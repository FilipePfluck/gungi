import * as Dialog from '@radix-ui/react-dialog'
import { UseBoard } from '../../context/boardContext'

import * as S from './styles'

interface ModalProps {
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const Modal = ({ title, open, onOpenChange }: ModalProps) => {
  const { handleRestart } = UseBoard()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <S.Overlay>
          <S.Content>
            <Dialog.Title>{title}</Dialog.Title>
            <S.Close>X</S.Close>
            <S.RestartButton
              onClick={() => {
                handleRestart()
                onOpenChange(false)
              }}
            >
              Reiniciar
            </S.RestartButton>
          </S.Content>
        </S.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
