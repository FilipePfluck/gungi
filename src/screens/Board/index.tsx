import { useEffect, useState } from 'react'

import Row from '../../components/Row'
import { UseBoard } from '../../context/boardContext'

import ListOfPieces from '../../components/ListOfPieces'

import * as S from './styles'
import { Modal } from '../../components/Modal'

const Board = () => {
  const {
    board,
    playingNow,
    verifyIfIsCheckmate,
    verifyIfKingIsChecked,
    verifyIfIsStalemate,
  } = UseBoard()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')

  useEffect(() => {
    const isChecked = verifyIfKingIsChecked({ team: playingNow })

    if (isChecked) {
      const isCheckmate = verifyIfIsCheckmate({ isChecked })

      if (isCheckmate) {
        setIsModalOpen(true)
        setModalTitle(
          `${
            playingNow === 'white' ? 'pretas' : 'brancas'
          } ganham por cheque mate`,
        )
      }
    } else {
      const isStalemate = verifyIfIsStalemate({ isChecked })

      if (isStalemate) {
        setIsModalOpen(true)
        setModalTitle('A partida empatou por afogamento')
      }
    }

    // eslint-disable-next-line
  }, [playingNow])

  return (
    <S.Container>
      <ListOfPieces />
      <S.RightContainer>
        <strong>Brancas {playingNow === 'white' && '- Jogando'}</strong>
        <S.Board>
          {board.map((row) => (
            <Row rowId={row.id} key={row.id} tiles={row.tiles} />
          ))}
        </S.Board>
        <strong>Pretas {playingNow === 'black' && '- Jogando'}</strong>
      </S.RightContainer>
      <Modal
        open={isModalOpen}
        onOpenChange={(isOpen) => setIsModalOpen(isOpen)}
        title={modalTitle}
      />
    </S.Container>
  )
}

export default Board
