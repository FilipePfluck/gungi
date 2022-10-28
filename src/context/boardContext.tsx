import React, { createContext, useEffect, useState, useContext } from 'react'

import startingPiecesState from '../utils/startingPieces'

import { verifyMoves } from '../functions/verifyMoves'
import { verifyIfKingIsChecked } from '../functions/verifyIfKingIsChecked'
import { verifyIfIsCheckmate } from '../functions/verifyIfIsCheckmate'
import { verifyIfIsStalemate } from '../functions/verifyIfIsStalemate'
import { verifyValidTilesToPlaceANewPiece } from '../functions/verifyValidTilesToPlaceANewPiece'

import {
  PieceProps,
  TileProps,
  RowProps,
  PieceInTheBoard,
  ContextValue,
  Coordinate,
  RemoveTopPieceProps,
  addPieceToNewTileProps,
  handleClickTileProps,
  verifyIfGameEndedProps,
  verifyIfPieceCanMoveToThisTileProps,
  verifyIfTIleIsLegalProps,
} from '../types'

const BoardContext = createContext({} as ContextValue)

export const BoardProvider: React.FC = ({ children }) => {
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
  const isStarting = roundNumber <= 2

  const [movedFromTileId, setMovedFromTileId] = useState<string | null>(null)
  const [movedToTileId, setMovedToTileId] = useState<string | null>(null)

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
    setMovedFromTileId(null)
    setMovedToTileId(null)
  }

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
      board,
      clearSelectedPiece: () => setSelectedPiece(null),
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

      if (piecePosition) {
        const { pieceColumnIndex, pieceRowIndex } = piecePosition

        const piecePositionTile =
          boardCopy[pieceRowIndex].tiles[pieceColumnIndex]

        setMovedFromTileId(piecePositionTile.id)
      } else {
        setMovedFromTileId(null)
      }

      setMovedToTileId(tile.id)

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
      board: virtualBoard || board,
      piecesInTheBoard: virtualPiecesInTheBoard || piecesInTheBoard,
      clearSelectedPiece: () => setSelectedPiece(null),
      isStarting,
      verifyMoves,
    })

    return !isKingChecked
  }

  const verifyLegalMoves = ({ piece, tier, columnNumber, rowNumber }) => {
    const selectedPieceMoves: TileProps[] = verifyMoves({
      piece,
      tier,
      columnNumber,
      rowNumber,
      board,
      clearSelectedPiece: () => setSelectedPiece(null),
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

        const validTilesIds = verifyValidTilesToPlaceANewPiece({
          board,
          playingNow,
          selectedPiece,
          verifyIfTIleIsLegal,
        })

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

  const isChecked = () => {
    return verifyIfKingIsChecked({
      board,
      clearSelectedPiece: () => setSelectedPiece(null),
      isStarting,
      piecesInTheBoard,
      team: playingNow,
      verifyMoves,
    })
  }

  const isCheckmate = ({ isChecked }: verifyIfGameEndedProps) => {
    return verifyIfIsCheckmate({
      isChecked,
      pieces,
      piecesInTheBoard,
      playingNow,
      verifyLegalMoves,
      verifyValidTilesToPlaceANewPiece: () =>
        verifyValidTilesToPlaceANewPiece({
          board,
          playingNow,
          selectedPiece,
          verifyIfTIleIsLegal,
        }),
    })
  }

  const isStalemate = ({ isChecked }: verifyIfGameEndedProps) => {
    return verifyIfIsStalemate({
      isChecked,
      isStarting,
      pieces,
      piecesInTheBoard,
      playingNow,
      verifyLegalMoves,
    })
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
    isCheckmate,
    isChecked,
    isStalemate,
    handleRestart,
    movedFromTileId,
    movedToTileId,
  }

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}

export function UseBoard() {
  const context = useContext(BoardContext)

  return context
}
