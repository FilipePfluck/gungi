import { Dispatch, SetStateAction } from 'react'

export interface PieceProps {
  id: string
  name: string
  team: 'white' | 'black'
}

export interface TileProps {
  pieces: PieceProps[]
  id: string
}

export interface RowProps {
  tiles: TileProps[]
  id: string
}

export interface verifyMovesProps {
  piece: PieceProps
  tier: number
  rowNumber: number
  columnNumber: number
  board: RowProps[]
  clearSelectedPiece: () => void
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

export interface verifyIfKingIsCheckedProps {
  team: 'white' | 'black'
  piecesInTheBoard: PieceInTheBoard
  board: RowProps[]
  isStarting: boolean
  verifyMoves: (props: verifyMovesProps) => any[]
  clearSelectedPiece: () => void
}

interface verifyLegalMovesProps {
  piece: PieceProps
  tier: number
  columnNumber: number
  rowNumber: number
}

export interface verifyIfIsCheckmateProps {
  isChecked: boolean
  piecesInTheBoard: PieceInTheBoard
  playingNow: 'white' | 'black'
  verifyLegalMoves: (props: verifyLegalMovesProps) => TileProps[]
  verifyValidTilesToPlaceANewPiece: () => any
  pieces: PieceProps[]
}

export interface verifyIfIsStalemateProps {
  isChecked: boolean
  isStarting: boolean
  piecesInTheBoard: PieceInTheBoard
  playingNow: 'white' | 'black'
  verifyLegalMoves: (props: verifyLegalMovesProps) => TileProps[]
  pieces: PieceProps[]
}

interface handleClickTileProps {
  pieces: PieceProps[]
  tileId: string
  rowId: string
}

export interface verifyIfPieceCanMoveToThisTileProps {
  tileId: string
  piece: PieceProps
  tier: number
  piecePosition?: {
    pieceRowIndex: number
    pieceColumnIndex: number
  }
}

export interface verifyIfGameEndedProps {
  isChecked: boolean
}

export interface ContextValue {
  board: RowProps[]
  pieces: PieceProps[]
  selectedPiece: PieceProps | null
  setSelectedPiece: Dispatch<SetStateAction<PieceProps>>
  playingNow: 'white' | 'black'
  selectedPieceTileId: string
  movedFromTileId: string | null
  movedToTileId: string | null
  verifyIfSelectedPieceCanMoveToThisTile: (id: string) => boolean
  handleClickTile: (props: handleClickTileProps) => void
  clickPieceInBench: (piece: PieceProps) => void
  isCheckmate: (data: verifyIfGameEndedProps) => boolean
  isChecked: () => boolean
  isStalemate: (data: verifyIfGameEndedProps) => boolean
  handleRestart: () => void
}

interface Coordinate {
  rowIndex: number
  columnIndex: number
}

export interface addPieceToNewTileProps extends Coordinate {
  virtualBoard?: RowProps[]
  virtualPiecesInTheBoard?: PieceInTheBoard
  piece: PieceProps
  piecePosition?: {
    pieceRowIndex: number
    pieceColumnIndex: number
  }
  preventVerifyingIfPieceCanMove?: boolean
}

export interface RemoveTopPieceProps {
  serializedBoard?: RowProps[]
  rowIndex: number
  columnIndex: number
}

export interface verifyIfTIleIsLegalProps {
  tile: TileProps
  piece: PieceProps
  piecePosition?: {
    pieceColumnIndex: number
    pieceRowIndex: number
  }
  team?: 'white' | 'black'
  preventVerifyingIfPieceCanMove?: boolean
}
