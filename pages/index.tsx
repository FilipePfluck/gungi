import Board from '../src/screens/Board'

import Global from '../src/styles/global'

import { BoardProvider } from '../src/context/boardContext'

export default function Home() {
  return (
    <BoardProvider>
      <Board/>
      <Global/>
    </BoardProvider>
  )
}
