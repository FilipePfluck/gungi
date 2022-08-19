import {createContext, useEffect, useState, useCallback, useContext, SetStateAction, Dispatch} from 'react'

import movesInitialState from '../utils/moves'
import startingPiecesState from '../utils/startingPieces'

interface PieceProps {
    id: string
    name: string
    team: 'white' | 'black'
}

interface TileProps {
    pieces: PieceProps[],
    id: string
}

interface RowProps {
    tiles: TileProps[],
    id: string
}

interface ContextValue {
    board: RowProps[]
    pieces: PieceProps[],
    selectedPiece: PieceProps | null
    setSelectedPiece: Dispatch<SetStateAction<PieceProps>>,
    playingNow: 'white' | 'black'
    verifyIfSelectedPieceCanMoveToThisTile: (id: string) => boolean
    handleClickTile: (props: handleClickTileProps) => void
    clickPieceInBench: (piece: PieceProps) => void
}

interface verifyMoves {
    piece: PieceProps
    tier: number
    rowNumber: number
    columnNumber: number
}

interface addPieceFromBenchToBoardProps {
    tileId: string
    rowId: string
}

interface handleClickTileProps {
    pieces: PieceProps[],
    tileId: string,
    rowId: string
}

interface Coordinate {
    rowIndex: number
    columnIndex: number
}

interface RemoveTopPieceProps {
    serializedBoard?: RowProps[]
}

interface PieceInTheBoard {
    [id: string]: {
        name: string
        team: 'white' | 'black'
        rowIndex: number
        columnIndex: number,
        tier: number
    }
}

const BoardContext = createContext({} as ContextValue)

export const BoardProvider: React.FC = ({children}) => {
    const [moves] = useState(movesInitialState)

    const [pieces, setPieces] = useState<PieceProps[]>(startingPiecesState)
    const [piecesInTheBoard, setPiecesInTheBoard] = useState<PieceInTheBoard>({})

    const [board, setBoard]= useState<RowProps[]>(()=>{
        let initialState = []

        for(let i=0; i<9; i++){
            let row = {
                tiles: [],
                id: 'row'+i
            }

            for(let j=0; j<9; j++){
                let tile = {
                    pieces: [],
                    id: 'tile' + (i+1) + '-' + (j+1)
                }

                row.tiles.push(tile)
            }

            initialState.push(row)
        }

        return initialState
    })

    const [selectedPiece, setSelectedPiece] = useState<PieceProps>(null)
    const [selectedPiecePosition, setSelectedPiecePosition] = useState<Coordinate>(null)
    const [selectedPieceIsFromBench, setSelectedPieceIsFromBench] = useState(false)
    const [selectedPieceTileMoves, setSelectedPieceTileMoves] = useState<TileProps[]>(null)

    const [playingNow, setPlayingNow] = useState<'white' | 'black'>(null)
    const [roundNumber, setRoundNumber] = useState(1)
    const isStarting = roundNumber < 2

    //This state is used to watch when a valid move ocurs
    //To change in a useEffect which team is playing and unselect the selected piece
    const [validMoveIdentifier, setValidMoveIdentifier] = useState(false)

    //This useEffect watches when a valid move ocurs
    useEffect(()=>{
        setPlayingNow(state => {
            if(!state){
                return 'white'
            }else{
                if(state === 'black'){
                    setRoundNumber(state => state+1)
                    return 'white'
                }
                
                return 'black'
            }
        })
        setSelectedPiece(null)
        setSelectedPieceTileMoves([])
        setSelectedPieceIsFromBench(false)
    },[validMoveIdentifier])

    useEffect(()=>{
        console.log(piecesInTheBoard)
    },[piecesInTheBoard])

    const verifyIfSelectedPieceCanMoveToThisTile = (id: string)=>{
        if(selectedPieceTileMoves){
            const index = selectedPieceTileMoves.findIndex(tile=>{
                return tile.id === id
            })

            return index >= 0 
        }

        return false
    }

    const verifyMoves = ({ piece, tier, columnNumber, rowNumber }:verifyMoves)=>{
        const pieceMove = moves[piece.name][tier]?.moves

        const tilesArray = []

        let shouldBreak = false

        function calculateContinuousMoves (direction: string){
            const directions = {
                up: {
                    direction: 'vertical',
                    increasing: true,
                    inverse: 'down'
                },
                down: {
                    direction: 'vertical',
                    increasing: false,
                    inverse: 'up'
                },
                left: {
                    direction: 'horizontal',
                    increasing: false,
                    inverse: 'right'
                },
                right: {
                    direction: 'horizontal',
                    increasing: true,
                    inverse: 'left'
                }
            }

            for(let i=1; i<=pieceMove[direction]; i++){
                if(shouldBreak) {
                    shouldBreak = false
                    break
                }

                let surpassedBoard = false

                Object.keys(directions).forEach(key=>{
                    const _direction = playingNow === 'white' 
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

                if(surpassedBoard) break

                if(
                    (direction.toLowerCase().includes('up') && playingNow === 'white')
                    || (direction.toLowerCase().includes('down') && playingNow === 'black')
                ) {
                    if(rowNumber+i > 9) break
                }

                if(
                    (direction.toLowerCase().includes('down') && playingNow === 'white')
                    || (direction.toLowerCase().includes('up') && playingNow === 'black') 
                ){
                    if(rowNumber-i < 1) break
                }

                if(
                    (direction.toLowerCase().includes('right') && playingNow === 'white')
                    || (direction.toLowerCase().includes('left') && playingNow === 'black')
                ){
                    if(columnNumber+i > 9) break
                }

                if(
                    (direction.toLowerCase().includes('left') && playingNow === 'white')
                    || (direction.toLowerCase().includes('right') && playingNow === 'black')
                ){
                    if(columnNumber-i < 1) break
                }

                //I baseado no time, 
                //considerando que as prestas se movem no sentido contrário das brancas
                const teamI = playingNow === 'white' 
                    ? i
                    : -i

                //Índice do Board
                const rowIndex = direction.toLowerCase().includes('up') 
                    ? rowNumber-1 + teamI
                    : direction.toLowerCase().includes('down') 
                        ? rowNumber-1 - teamI
                        : rowNumber - 1

                //Índice dos tiles
                const tileIndex = direction.toLowerCase().includes('right')
                    ? columnNumber-1 + teamI
                    : direction.toLowerCase().includes('left') 
                        ? columnNumber-1 - teamI
                        : columnNumber - 1

                const tile = board[rowIndex].tiles[tileIndex]

                const tilePieces = tile.pieces
                const tileHeight = tile.pieces.length

                if(tilePieces[2] && tilePieces[2].team === playingNow) break

                shouldBreak = !!tilePieces[0]

                tilesArray.push(tile)
            }
        }

        function calculateJumpMoves (tiles: {x: number, y: number}[]){
            tiles.forEach(tile => {
                const r = rowNumber-1 + tile.y
                const t = columnNumber-1 + tile.x

                if(r >= 0 && r <= 8 && t >= 0 && t <= 8){
                    const tileToGo = board[r].tiles[t]

                    if(!(tileToGo.pieces[2] 
                        && tileToGo.pieces[2].team === playingNow
                    )){
                        tilesArray.push(board[r].tiles[t])
                    }
                }
            })
        }

        //if(piece.team !== playingNow) return

        if(pieceMove.type === 'continuous'){
            const keys = Object.keys(pieceMove)
                .filter(key => key !== 'type' && key !== 'tiles')

            keys.forEach(key => {
                calculateContinuousMoves(key)
            })
        }

        if(pieceMove.type === 'jump'){
            if(pieceMove.tiles[0]){
                calculateJumpMoves(pieceMove.tiles)
            }
        }

        if(!tilesArray.length){
            setSelectedPiece(null)
            return
        }

        return tilesArray
    }

    const verifyIfKingIsChecked = (team: 'black' | 'white') => {
        const enemyPieces = Object.entries(piecesInTheBoard).filter(([key, value]) => {
            return value.team === (team === 'white' ? 'black' : 'white')
        })
        
        const king = piecesInTheBoard[`${team}-king-1`]

        return enemyPieces?.some(([id, value]) => {
            
            if (!value) return false

            const enemyPieceMove = verifyMoves({
                piece: {
                    id,
                    name: value.name,
                    team: value.team
                },
                tier: value.tier,
                columnNumber: value.columnIndex + 1,
                rowNumber: value.rowIndex + 1
            })

            return enemyPieceMove?.some(move => {
                const coordinate = move.id.replace('tile', '')
                const [rowNumber, columnNumber] = coordinate.split('-')

                return  king.columnIndex+1 == columnNumber 
                        && king.rowIndex+1 == rowNumber
            })
        })
    }

    const clickPieceInBench = (piece: PieceProps) => {
        if(playingNow === piece.team){
            setSelectedPiece(piece)
            setSelectedPieceIsFromBench(true)
        }
    }
    
    const removePieceFromBench = ()=>{
        setPieces(piecesState => {
            const newArray = piecesState.filter(piece => {
                return piece.id !== selectedPiece.id
            })

            return newArray
        })
    }

    const removeSelectedPieceFromPreviousTile = ({serializedBoard}: RemoveTopPieceProps) => {
        const rowIndex = selectedPiecePosition.rowIndex
        const columnIndex = selectedPiecePosition.columnIndex

        const boardCopy = !!serializedBoard ? [...serializedBoard] : [...board]
        boardCopy[rowIndex].tiles[columnIndex].pieces.pop()
        return boardCopy
    }

    const addPieceToNewTile = ({rowIndex, columnIndex}: Coordinate) => {
        //The first piece to be placed must be the king
        if(roundNumber === 1 && selectedPiece.name !== 'king') return

        //prevent the player from placing a piece outside of his base
        //when the game is starting (in the first 20 rounds)
        if(
            ((playingNow === 'white' && rowIndex+1 > 3) 
            || (playingNow === 'black' && rowIndex+1 < 7))
            && isStarting
        ) return

        const boardCopy = [...board]
        const tile = boardCopy[rowIndex].tiles[columnIndex]
        
        const isAValidMove = verifyIfSelectedPieceCanMoveToThisTile(tile.id)
        
        if(!selectedPieceIsFromBench && !isAValidMove) return

        const towerHeight = tile.pieces.length
        const lastPiece = tile.pieces[towerHeight-1]

        let tierAfterMove = 1

        //there are pieces in the tile
        if(towerHeight > 0){
            const topPieceIsFromSameTeam = lastPiece.team === playingNow

            if(topPieceIsFromSameTeam){
                if(towerHeight === 3) return
                
                tierAfterMove = towerHeight + 1
                tile.pieces = [...tile.pieces, selectedPiece]
            }

            else{
                // The piece is an enemy, so don't do anything
                if(selectedPieceIsFromBench) return

                tierAfterMove = towerHeight

                //capture enemy piece
                tile.pieces.pop()
                tile.pieces = [...tile.pieces, selectedPiece]
            }
        }

        //the tile is empty
        else{      
            tile.pieces = [selectedPiece]
        }

        boardCopy[rowIndex].tiles[columnIndex] = tile

        if(selectedPieceIsFromBench){
            removePieceFromBench()
        }

        const boardAfterRemovingPieceFromPreviousTile = !selectedPieceIsFromBench 
            ? removeSelectedPieceFromPreviousTile({serializedBoard: boardCopy}) 
            : null 
            
        setBoard(boardAfterRemovingPieceFromPreviousTile || boardCopy)
        setPiecesInTheBoard({...piecesInTheBoard, [selectedPiece.id] : {
            columnIndex,
            rowIndex,
            tier: tierAfterMove,
            name: selectedPiece.name,
            team: selectedPiece.team
        }})
        setValidMoveIdentifier(state => !state)
    }

    const handleClickTile = ({rowId, tileId, pieces: tilePieces}: handleClickTileProps)=>{
        const coordinate = tileId.replace('tile', '')
        const [rowNumber, columnNumber] = coordinate.split('-')
            
        const columnIndex = Number(columnNumber) - 1
        const rowIndex = Number(rowNumber) - 1
        const piece = tilePieces[tilePieces.length -1]

        if(selectedPiece){
            if(selectedPieceIsFromBench){
                addPieceToNewTile({
                    columnIndex,
                    rowIndex,
                })
            }else{
                addPieceToNewTile({
                    columnIndex,
                    rowIndex,
                })
            }
        }

        if(tilePieces[0] && !isStarting && !selectedPiece && piece.team === playingNow){
            const selectedPieceMoves = verifyMoves({
                piece,
                tier: tilePieces.length,
                columnNumber: Number(columnNumber),
                rowNumber: Number(rowNumber)
            })

            setSelectedPieceTileMoves(selectedPieceMoves)
            setSelectedPiece(piece)
            setSelectedPiecePosition({columnIndex, rowIndex})
        }
    }

    if(roundNumber > 3){
        console.log(verifyIfKingIsChecked(playingNow))
    }

    const value={
        board,
        pieces,
        selectedPiece,
        setSelectedPiece,
        playingNow,
        verifyIfSelectedPieceCanMoveToThisTile,
        handleClickTile,
        clickPieceInBench
    }

    return(
        <BoardContext.Provider value={value}>
            {children}
        </BoardContext.Provider>
    )
}

export function UseBoard(){
    const context = useContext(BoardContext)

    return context
}