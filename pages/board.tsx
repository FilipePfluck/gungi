import Board from '../src/screens/Board'

import { BoardProvider } from '../src/context/boardContext'

export default function BoardPage() {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  )
}
