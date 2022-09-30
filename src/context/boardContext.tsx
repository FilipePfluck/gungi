import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
} from 'react'

import movesInitialState from '../utils/moves'
import startingPiecesState from '../utils/startingPieces'

interface PieceProps {
  id: string
  name: string
  team: 'white' | 'black'
}

interface TileProps {
  pieces: PieceProps[]
  id: string
}

interface RowProps {
  tiles: TileProps[]
  id: string
}

interface handleClickTileProps {
  pieces: PieceProps[]
  tileId: string
  rowId: string
}

interface verifyIfPieceCanMoveToThisTileProps {
  tileId: string
  piece: PieceProps
  tier: number
  piecePosition?: {
    pieceRowIndex: number
    pieceColumnIndex: number
  }
}

interface PieceInTheBoard {
  [id: string]: {
    name: string
    team: 'white' | 'black'
    rowIndex: number
    columnIndex: number
    tier: number
  }
}

interface verifyIfGameEndedProps {
  isChecked: boolean
}

interface verifyIfKingIsCheckedProps {
  team: 'white' | 'black'
  virtualPiecesInTheBoard?: PieceInTheBoard
  virtualBoard?: RowProps[]
}

interface ContextValue {
  board: RowProps[]
  pieces: PieceProps[]
  selectedPiece: PieceProps | null
  setSelectedPiece: Dispatch<SetStateAction<PieceProps>>
  playingNow: 'white' | 'black'
  selectedPieceTileId: string
  verifyIfSelectedPieceCanMoveToThisTile: (id: string) => boolean
  handleClickTile: (props: handleClickTileProps) => void
  clickPieceInBench: (piece: PieceProps) => void
  verifyIfIsCheckmate: (data: verifyIfGameEndedProps) => boolean
  verifyIfKingIsChecked: (data: verifyIfKingIsCheckedProps) => boolean
  verifyIfIsStalemate: (data: verifyIfGameEndedProps) => boolean
  handleRestart: () => void
}

interface verifyMoves {
  piece: PieceProps
  tier: number
  rowNumber: number
  columnNumber: number
  virtualBoard?: RowProps[]
}

interface Coordinate {
  rowIndex: number
  columnIndex: number
}

interface addPieceToNewTileProps extends Coordinate {
  virtualBoard?: RowProps[]
  virtualPiecesInTheBoard?: PieceInTheBoard
  piece: PieceProps
  piecePosition?: {
    pieceRowIndex: number
    pieceColumnIndex: number
  }
  preventVerifyingIfPieceCanMove?: boolean
}

interface RemoveTopPieceProps {
  serializedBoard?: RowProps[]
  rowIndex: number
  columnIndex: number
}

const BoardContext = createContext({} as ContextValue)

export const BoardProvider: React.FC = ({ children }) => {
  const [moves] = useState(movesInitialState)

  const [pieces, setPieces] = useState<PieceProps[]>(startingPiecesState)
  const [piecesInTheBoard, setPiecesInTheBoard] = useState<PieceInTheBoard>({})

  const initializeBoard = () => {
    const initialState = []

    for (let i = 0; i < 9; i++) {
      const row = {
        tiles: [],
        id: 'row' + i,
      }

      for (let j = 0; j < 9; j++) {
        const tile = {
          pieces: [],
          id: 'tile' + (i + 1) + '-' + (j + 1),
        }

        row.tiles.push(tile)
      }

      initialState.push(row)
    }

    return initialState
  }

  const [board, setBoard] = useState<RowProps[]>(initializeBoard)

  const [selectedPiece, setSelectedPiece] = useState<PieceProps>(null)
  const [selectedPiecePosition, setSelectedPiecePosition] =
    useState<Coordinate>(null)
  const [selectedPieceIsFromBench, setSelectedPieceIsFromBench] =
    useState(false)
  const [selectedPieceTileMoves, setSelectedPieceTileMoves] =
    useState<TileProps[]>(null)
  const [selectedPieceTileId, setSelectedPieceTileId] = useState('')

  const [playingNow, setPlayingNow] = useState<'white' | 'black'>(null)
  const [roundNumber, setRoundNumber] = useState(1)
  const isStarting = roundNumber < 2

  // This state is used to watch when a valid move ocurs
  // To change in a useEffect which team is playing and unselect the selected piece
  const [validMoveIdentifier, setValidMoveIdentifier] = useState(false)

  // This useEffect watches when a valid move ocurs
  useEffect(() => {
    setPlayingNow((state) => {
      if (!state) {
        return 'white'
      } else {
        if (state === 'black') {
          setRoundNumber((state) => state + 1)
          return 'white'
        }

        return 'black'
      }
    })
    setSelectedPiece(null)
    setSelectedPieceTileMoves([])
    setSelectedPieceIsFromBench(false)
    setSelectedPieceTileId('')
    setSelectedPiecePosition(null)
  }, [validMoveIdentifier])

  useEffect(() => {
    console.log(piecesInTheBoard)
  }, [piecesInTheBoard])

  const handleRestart = () => {
    setSelectedPiece(null)
    setSelectedPieceTileMoves([])
    setSelectedPieceIsFromBench(false)
    setSelectedPieceTileId('')
    setPieces(startingPiecesState)
    setPiecesInTheBoard({})
    setSelectedPiecePosition(null)
    setBoard(initializeBoard)
    setRoundNumber(1)
    setPlayingNow('white')
  }

  const verifyMoves = ({
    piece,
    tier,
    columnNumber,
    rowNumber,
    virtualBoard,
  }: verifyMoves) => {
    const _board = virtualBoard || board

    const tile = _board[rowNumber - 1].tiles[columnNumber - 1]
    const tileHeight = tile.pieces.length

    // pieces that are below other pieces cannot move
    if (tileHeight !== tier) return

    const pieceMove = moves[piece.name][tier]?.moves

    const tilesArray = []

    function calculateContinuousMoves(direction: string) {
      let shouldBreak = false

      /* const directions = {
        up: {
          direction: 'vertical',
          increasing: true,
          inverse: 'down',
        },
        down: {
          direction: 'vertical',
          increasing: false,
          inverse: 'up',
        },
        left: {
          direction: 'horizontal',
          increasing: false,
          inverse: 'right',
        },
        right: {
          direction: 'horizontal',
          increasing: true,
          inverse: 'left',
        },
      } */

      for (let i = 1; i <= pieceMove[direction]; i++) {
        if (shouldBreak) {
          shouldBreak = false
          break
        }

        /* let surpassedBoard = false

                Object.keys(directions).forEach(key=>{
                    const _direction = piece.team === 'white' 
                        ? directions[key] 
                        : directions[directions[key].inverse]

                    const index = _direction.direction === 'horizontal' 
                        ? rowNumber 
                        : columnNumber

                    if(direction.toLowerCase().includes(_direction)){
                        surpassedBoard = _direction.increasing 
                            ? index+i > 9
                            : index-i < 1
                    }
                })

                if(surpassedBoard) break */

        if (
          (direction.toLowerCase().includes('up') && piece.team === 'white') ||
          (direction.toLowerCase().includes('down') && piece.team === 'black')
        ) {
          if (rowNumber + i > 9) break
        }

        if (
          (direction.toLowerCase().includes('down') &&
            piece.team === 'white') ||
          (direction.toLowerCase().includes('up') && piece.team === 'black')
        ) {
          if (rowNumber - i < 1) break
        }

        if (
          (direction.toLowerCase().includes('right') &&
            piece.team === 'white') ||
          (direction.toLowerCase().includes('left') && piece.team === 'black')
        ) {
          if (columnNumber + i > 9) break
        }

        if (
          (direction.toLowerCase().includes('left') &&
            piece.team === 'white') ||
          (direction.toLowerCase().includes('right') && piece.team === 'black')
        ) {
          if (columnNumber - i < 1) break
        }

        // I baseado no time,
        // considerando que as prestas se movem no sentido contrário das brancas
        const teamI = piece.team === 'white' ? i : -i

        // Índice do Board
        const rowIndex = direction.toLowerCase().includes('up')
          ? rowNumber - 1 + teamI
          : direction.toLowerCase().includes('down')
          ? rowNumber - 1 - teamI
          : rowNumber - 1

        // Índice dos tiles
        const tileIndex = direction.toLowerCase().includes('right')
          ? columnNumber - 1 + teamI
          : direction.toLowerCase().includes('left')
          ? columnNumber - 1 - teamI
          : columnNumber - 1

        const tile = _board[rowIndex].tiles[tileIndex]

        const tilePieces = tile.pieces
        const lastPiece = tilePieces[tileHeight - 1]

        if (lastPiece?.name === 'king' && lastPiece.team === piece.team) break
        if (tilePieces[2] && tilePieces[2].team === piece.team) break

        shouldBreak = !!tilePieces[0]

        tilesArray.push(tile)
      }
    }

    function calculateJumpMoves(tiles: { x: number; y: number }[]) {
      tiles.forEach((tile) => {
        const r = rowNumber - 1 + tile.y
        const t = columnNumber - 1 + tile.x

        if (r >= 0 && r <= 8 && t >= 0 && t <= 8) {
          const tileToGo = _board[r].tiles[t]
          const lastPiece = tileToGo.pieces[tileToGo.pieces.length - 1]

          if (
            !(tileToGo.pieces[2] && tileToGo.pieces[2].team === piece.team) &&
            !(lastPiece?.name === 'king' && lastPiece.team === piece.team)
          ) {
            tilesArray.push(_board[r].tiles[t])
          }
        }
      })
    }

    // if(piece.team !== piece.team) return

    if (pieceMove.type === 'continuous') {
      const keys = Object.keys(pieceMove).filter(
        (key) => key !== 'type' && key !== 'tiles',
      )

      keys.forEach((key) => {
        calculateContinuousMoves(key)
      })
    }

    if (pieceMove.type === 'jump') {
      if (pieceMove.tiles[0]) {
        calculateJumpMoves(pieceMove.tiles)
      }
    }

    if (!tilesArray.length) {
      setSelectedPiece(null)
      return
    }

    return tilesArray
  }

  // TODO
  // Refactor to allow verifying if a piece
  // that is not selected can move to this file

  const verifyIfPieceCanMoveToThisTile = ({
    piece,
    piecePosition,
    tileId,
    tier,
  }: verifyIfPieceCanMoveToThisTileProps) => {
    const { pieceColumnIndex, pieceRowIndex } = piecePosition

    const pieceMoves = verifyMoves({
      piece,
      tier,
      columnNumber: pieceColumnIndex + 1,
      rowNumber: pieceRowIndex + 1,
    })

    if (pieceMoves) {
      const index = pieceMoves.findIndex((tile) => {
        return tile.id === tileId
      })

      return index >= 0
    }

    return false
  }

  const verifyIfSelectedPieceCanMoveToThisTile = (id: string) => {
    if (selectedPieceTileMoves) {
      const index = selectedPieceTileMoves.findIndex((tile) => {
        return tile.id === id
      })

      return index >= 0
    }

    return false
  }

  const verifyIfKingIsChecked = ({
    team,
    virtualPiecesInTheBoard,
    virtualBoard,
  }: verifyIfKingIsCheckedProps) => {
    const _piecesInTheBoard = virtualPiecesInTheBoard || piecesInTheBoard

    if (roundNumber === 1) return

    // console.log({ virtualBoard, virtualPiecesInTheBoard })

    const enemyPieces = Object.entries(_piecesInTheBoard).filter(
      ([key, value]) => {
        return value.team === (team === 'white' ? 'black' : 'white')
      },
    )

    const king = _piecesInTheBoard[`${team}-king-1`]

    return enemyPieces?.some(([id, value]) => {
      if (!value) return false

      const enemyPieceMove = verifyMoves({
        piece: {
          id,
          name: value.name,
          team: value.team,
        },
        tier: value.tier,
        columnNumber: value.columnIndex + 1,
        rowNumber: value.rowIndex + 1,
        virtualBoard,
      })

      return enemyPieceMove?.some((move) => {
        const coordinate = move.id.replace('tile', '')
        const [rowNumber, columnNumber] = coordinate.split('-')

        return (
          king.columnIndex + 1 === Number(columnNumber) &&
          king.rowIndex + 1 === Number(rowNumber)
        )
      })
    })
  }

  const clickPieceInBench = (piece: PieceProps) => {
    if (playingNow === piece.team) {
      setSelectedPiece(piece)
      setSelectedPieceIsFromBench(true)
    }
  }

  const removePieceFromBench = () => {
    setPieces((piecesState) => {
      const newArray = piecesState.filter((piece) => {
        return piece.id !== selectedPiece.id
      })

      return newArray
    })
  }

  const removeTopPieceFromTile = ({
    serializedBoard,
    columnIndex,
    rowIndex,
  }: RemoveTopPieceProps) => {
    const boardCopy = serializedBoard ? [...serializedBoard] : [...board]
    boardCopy[rowIndex].tiles[columnIndex].pieces.pop()
    return boardCopy
  }

  const addPieceToNewTile = ({
    rowIndex,
    columnIndex,
    virtualBoard,
    virtualPiecesInTheBoard,
    piece,
    piecePosition,
    preventVerifyingIfPieceCanMove,
  }: addPieceToNewTileProps) => {
    // The first piece to be placed must be the king
    if (roundNumber === 1 && selectedPiece.name !== 'king') return

    // prevent the player from placing a piece outside of his base
    // when the game is starting (in the first 20 rounds)
    if (
      ((playingNow === 'white' && rowIndex + 1 > 3) ||
        (playingNow === 'black' && rowIndex + 1 < 7)) &&
      isStarting
    )
      return

    const boardCopy = virtualBoard ? [...virtualBoard] : [...board]
    const tile = boardCopy[rowIndex].tiles[columnIndex]

    const _piecesInTheBoard = virtualPiecesInTheBoard || piecesInTheBoard

    if (!selectedPieceIsFromBench && !preventVerifyingIfPieceCanMove) {
      const pieceTier = _piecesInTheBoard[piece?.id]?.tier

      const isAValidMove = virtualBoard
        ? verifyIfPieceCanMoveToThisTile({
            tileId: tile.id,
            piece,
            tier: pieceTier,
            piecePosition,
          })
        : verifyIfSelectedPieceCanMoveToThisTile(tile.id)

      if (!isAValidMove) return
    }

    const towerHeight = tile.pieces.length
    const lastPiece = tile.pieces[towerHeight - 1]

    let tierAfterMove = 1

    // there are pieces in the tile
    if (towerHeight > 0) {
      const topPieceIsFromSameTeam = lastPiece.team === playingNow

      // can't play a piece on top of the king
      if (lastPiece.name === 'king') return

      if (topPieceIsFromSameTeam) {
        if (towerHeight === 3) return

        tierAfterMove = towerHeight + 1
        tile.pieces = [...tile.pieces, piece]
      } else {
        // The piece is an enemy, so don't do anything
        if (selectedPieceIsFromBench) return

        tierAfterMove = towerHeight

        // capture enemy piece
        tile.pieces.pop()
        tile.pieces = [...tile.pieces, piece]
        delete _piecesInTheBoard[lastPiece.id]
      }
    }

    // the tile is empty
    else {
      tile.pieces = [piece]
    }

    boardCopy[rowIndex].tiles[columnIndex] = tile

    if (selectedPieceIsFromBench && !virtualBoard) {
      removePieceFromBench()
    }

    const shouldNotRomve =
      !selectedPieceIsFromBench && !preventVerifyingIfPieceCanMove

    const boardAfterRemovingPieceFromPreviousTile = shouldNotRomve
      ? removeTopPieceFromTile({
          serializedBoard: boardCopy,
          columnIndex: piecePosition?.pieceColumnIndex,
          rowIndex: piecePosition?.pieceRowIndex,
        })
      : null

    // The virtual board is a fictional board
    // used to check if the king is in check after certain move,
    // so if there is a virtual board I don't want to change the actual board.

    if (!virtualBoard) {
      setBoard(boardAfterRemovingPieceFromPreviousTile || boardCopy)
      setPiecesInTheBoard((state) => {
        return {
          ...state,
          [piece.id]: {
            columnIndex,
            rowIndex,
            tier: tierAfterMove,
            name: piece.name,
            team: piece.team,
          },
        }
      })
      setValidMoveIdentifier((state) => !state)
    } else {
      virtualBoard = boardAfterRemovingPieceFromPreviousTile || boardCopy
      virtualPiecesInTheBoard[piece.id] = {
        columnIndex,
        rowIndex,
        tier: tierAfterMove,
        name: piece.name,
        team: piece.team,
      }
    }
  }

  interface verifyIfTIleIsLegalProps {
    tile: TileProps
    piece: PieceProps
    piecePosition?: {
      pieceColumnIndex: number
      pieceRowIndex: number
    }
    team?: 'white' | 'black'
    preventVerifyingIfPieceCanMove?: boolean
  }

  const verifyIfTIleIsLegal = ({
    tile,
    piece,
    piecePosition,
    team = playingNow,
    preventVerifyingIfPieceCanMove,
  }: verifyIfTIleIsLegalProps) => {
    // this makes a deep copy
    // to prevent compromising the reference of the arrays and objects
    // inside the board
    const virtualBoard = JSON.parse(JSON.stringify(board))
    const virtualPiecesInTheBoard = JSON.parse(JSON.stringify(piecesInTheBoard))
    const coordinate = tile.id.replace('tile', '')
    const [tileRowNumber, tileColumnNumber] = coordinate.split('-')

    const columnIndex = Number(tileColumnNumber) - 1
    const rowIndex = Number(tileRowNumber) - 1

    addPieceToNewTile({
      columnIndex,
      rowIndex,
      piece,
      virtualBoard,
      virtualPiecesInTheBoard,
      piecePosition,
      preventVerifyingIfPieceCanMove,
    })

    const isKingChecked = verifyIfKingIsChecked({
      team,
      virtualBoard,
      virtualPiecesInTheBoard,
    })

    return !isKingChecked
  }

  const verifyLegalMoves = ({ piece, tier, columnNumber, rowNumber }) => {
    const selectedPieceMoves: TileProps[] = verifyMoves({
      piece,
      tier,
      columnNumber,
      rowNumber,
    })

    const legalMoves = selectedPieceMoves?.filter((move) => {
      return verifyIfTIleIsLegal({
        piece,
        tile: move,
        piecePosition: {
          pieceColumnIndex: columnNumber - 1,
          pieceRowIndex: rowNumber - 1,
        },
      })
    })

    return legalMoves
  }

  const verifyValidTilesToPlaceANewPiece = () => {
    const validTilesIds = []

    board.forEach((row) => {
      row.tiles.forEach((tile) => {
        const length = tile.pieces.length

        if (length === 3) return

        const lastPiece = tile.pieces[length - 1]

        if (lastPiece?.name === 'king') return

        if (lastPiece && lastPiece.team !== playingNow) return

        const isMyKingNotChecked = verifyIfTIleIsLegal({
          piece: selectedPiece || {
            id: `${playingNow}-pawn-1`,
            name: 'pawn',
            team: playingNow,
          },
          tile,
          preventVerifyingIfPieceCanMove: true,
        })

        const isTheEnemyKingNotChecked = verifyIfTIleIsLegal({
          piece: selectedPiece || {
            id: `${playingNow}-pawn-1`,
            name: 'pawn',
            team: playingNow,
          },
          tile,
          team: playingNow === 'white' ? 'black' : 'white',
          preventVerifyingIfPieceCanMove: true,
        })

        console.log({ isMyKingNotChecked, isTheEnemyKingNotChecked, tile })

        // In order for the tile to be valid
        // It has to protect the check, if my king is in check
        // But you also CANNOT place a new piece checkig your oponent

        const isValid = isMyKingNotChecked && isTheEnemyKingNotChecked

        if (isValid) {
          validTilesIds.push(tile.id)
        }
      })
    })

    return validTilesIds
  }

  const verifyIfIsCheckmate = ({ isChecked }: verifyIfGameEndedProps) => {
    if (!isChecked) return false

    const king = piecesInTheBoard[`${playingNow}-king-1`]

    const kingMoves = verifyLegalMoves({
      piece: {
        id: `${playingNow}-king-1`,
        name: king.name,
        team: king.team,
      },
      tier: king.tier,
      columnNumber: king.columnIndex + 1,
      rowNumber: king.rowIndex + 1,
    })

    const kingCantMove = kingMoves.length === 0

    if (!kingCantMove) return false

    setSelectedPieceIsFromBench(true)

    const validTilesToPlaceAPiece = verifyValidTilesToPlaceANewPiece()

    // setSelectedPieceIsFromBench(false)

    if (validTilesToPlaceAPiece.length === 0) return true

    const myPiecesInTheBench = pieces.filter(
      (piece) => piece.team === playingNow,
    )

    if (myPiecesInTheBench.length === 0) return true

    return false
  }

  const verifyIfIsStalemate = ({ isChecked }: verifyIfGameEndedProps) => {
    if (isStarting) return false

    if (isChecked) return false

    const myPiecesInTheBench = pieces.filter(
      (piece) => piece.team === playingNow,
    )

    if (myPiecesInTheBench.length !== 0) return false

    const myPiecesInTheBoard = Object.entries(piecesInTheBoard)
      .map(([id, piece]) => {
        return { id, ...piece }
      })
      .filter((piece) => {
        return piece.team === playingNow
      })

    const nonePieceHasAMove = myPiecesInTheBoard.every((piece) => {
      const validMoves = verifyLegalMoves({
        columnNumber: piece.columnIndex + 1,
        rowNumber: piece.rowIndex + 1,
        piece: {
          name: piece.name,
          team: piece.team,
          id: piece.id,
        },
        tier: piece.tier,
      })

      return validMoves.length === 0
    })

    return nonePieceHasAMove
  }

  const handleClickTile = ({
    rowId,
    tileId,
    pieces: tilePieces,
  }: handleClickTileProps) => {
    const coordinate = tileId.replace('tile', '')
    const [rowNumber, columnNumber] = coordinate.split('-')

    const columnIndex = Number(columnNumber) - 1
    const rowIndex = Number(rowNumber) - 1
    const piece = tilePieces[tilePieces.length - 1]

    if (selectedPiece) {
      if (selectedPiece?.id === piece?.id) {
        setSelectedPiece(null)
        setSelectedPiecePosition(null)
        setSelectedPieceTileMoves(null)
        setSelectedPieceTileId('')
      }

      if (selectedPieceIsFromBench && !isStarting) {
        // const isChecked = verifyIfKingIsChecked({ team: playingNow })

        const validTilesIds = verifyValidTilesToPlaceANewPiece()

        console.log({ validTilesIds })

        const thisTileIsValid = validTilesIds.includes(tileId)

        if (!thisTileIsValid) return
      }

      const piecePosition = selectedPieceIsFromBench
        ? undefined
        : {
            pieceColumnIndex: selectedPiecePosition.columnIndex,
            pieceRowIndex: selectedPiecePosition.rowIndex,
          }

      addPieceToNewTile({
        columnIndex,
        rowIndex,
        piece: selectedPiece,
        piecePosition,
      })
    }

    if (
      tilePieces[0] &&
      !isStarting &&
      !selectedPiece &&
      piece.team === playingNow
    ) {
      const selectedPieceMoves = verifyLegalMoves({
        piece,
        tier: tilePieces.length,
        columnNumber: Number(columnNumber),
        rowNumber: Number(rowNumber),
      })

      if (selectedPieceMoves.length === 0) return

      setSelectedPieceTileMoves(selectedPieceMoves)
      setSelectedPiece(piece)
      setSelectedPiecePosition({ columnIndex, rowIndex })
      setSelectedPieceTileId(tileId)
    }
  }

  const value = {
    board,
    pieces,
    selectedPiece,
    setSelectedPiece,
    playingNow,
    handleClickTile,
    clickPieceInBench,
    verifyIfSelectedPieceCanMoveToThisTile,
    selectedPieceTileId,
    verifyIfIsCheckmate,
    verifyIfKingIsChecked,
    verifyIfIsStalemate,
    handleRestart,
  }

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}

export function UseBoard() {
  const context = useContext(BoardContext)

  return context
}
