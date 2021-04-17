import {createContext, useEffect, useState, useCallback, useContext, SetStateAction, Dispatch} from 'react'

import movesInitialState from '../utils/moves'
import startingPiecesState from '../utils/startingPieces'

interface PieceProps {
    id: string
    name: string
    team: string
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
    addPieceFromTheBenchToTheBoard: (data: addPieceFromBenchToBoardProps)=>void
    playingNow: 'white' | 'black'
    verifyMoves: (data: verifyMoves) => void
    finishPlacingPieces: () => void
    verifyIfSelectedPieceCanMoveToThisTile: (id: string) => boolean
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
    playingNowState: 'white' | 'black'
    selectedPieceState: PieceProps | null
}

const BoardContext = createContext({} as ContextValue)

export const BoardProvider: React.FC = ({children}) => {
    const [moves, setMoves] = useState(movesInitialState)

    const [pieces, setPieces] = useState<PieceProps[]>(startingPiecesState)

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

    const [selectedPieceTileMoves, setSelectedPieceTileMoves] = useState<TileProps[]>(null)

    const [playingNow, setPlayingNow] = useState<'white' | 'black'>(null)

    const [isWhiteOpening, setIsWhiteOpening] = useState(true)
    const [isBlackOpening, setIsBlackOpening] = useState(true)

    //Esse estado serve pra monitorar quando um movimento válido ocorre
    //Para alterar em um UseEffect a vez de quem joga e remover a peça selecionada
    const [validMoveIdentifier, setValidMoveIdentifier] = useState(false)


    const verifyIfSelectedPieceCanMoveToThisTile = useCallback((id: string)=>{
        if(selectedPieceTileMoves){
            const index = selectedPieceTileMoves.findIndex(tile=>{
                return tile.id === id
            })

            return index < 0 ? false : true
        }

        return false
    },[selectedPieceTileMoves])

    const verifyMoves = useCallback(({ piece, tier, columnNumber, rowNumber }:verifyMoves)=>{
        const pieceMove = moves[piece.name][tier].moves

        const tilesArray = []

        let shouldBreak = false

        function returnContinuousMoves (direction: string){
            for(let i=1; i<=pieceMove[direction]; i++){
                if(shouldBreak) {
                    shouldBreak = false
                    break
                }

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
                const r = direction.toLowerCase().includes('up') 
                    ? rowNumber-1 + teamI
                    : direction.toLowerCase().includes('down') 
                        ? rowNumber-1 - teamI
                        : rowNumber - 1

                //Índice dos tiles
                const t = direction.toLowerCase().includes('right')
                    ? columnNumber-1 + teamI
                    : direction.toLowerCase().includes('left') 
                        ? columnNumber-1 - teamI
                        : columnNumber - 1

                const tile = board[r].tiles[t]

                const tilePieces = tile.pieces
                const tileHeight = tile.pieces.length

                if(tilePieces[2] && tilePieces[2].team === playingNow) break

                if(
                    tilePieces[0] && 
                    tilePieces[tileHeight-1].team !== playingNow
                ){
                    shouldBreak = true
                }else {
                    shouldBreak = false
                }

                tilesArray.push(tile)
            }
        }

        function returnJumpMoves (tiles: {x: number, y: number}[]){
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

        if(piece.team !== playingNow) return

        if(pieceMove.type === 'continuous'){
                
            if(pieceMove.up){
                returnContinuousMoves('up')
            }

            if(pieceMove.down){
                returnContinuousMoves('down')
            }

            if(pieceMove.right){
                returnContinuousMoves('right')
            }

            if(pieceMove.left){
                returnContinuousMoves('left')
            }

            if(pieceMove.upRight){
                returnContinuousMoves('upRight')
            }

            if(pieceMove.upLeft){
                returnContinuousMoves('upLeft')
            }

            if(pieceMove.downRight){
                returnContinuousMoves('downRight')
            }

            if(pieceMove.downLeft){
                returnContinuousMoves('downLeft')
            }

            console.log(tilesArray)
        }

        if(pieceMove.type === 'jump'){
            console.log('jump')

            if(pieceMove.tiles[0]){
                returnJumpMoves(pieceMove.tiles)
            }

            console.log(tilesArray)
        }

        setSelectedPieceTileMoves(tilesArray)
    },[moves, board, playingNow])

    //Esse useEffect verifica quando um movimento válido é feito 
    //Ou seja, quando o validMoveIdentifier é alterado. 
    useEffect(()=>{
        setPlayingNow(state => {
            if(!state){
                return 'white'
            }else{
                return state === 'white'
                    ? 'black'
                    : 'white'
            }
        })
        setSelectedPiece(null)
    },[validMoveIdentifier])
    
    useEffect(()=>{
        if(
            (playingNow === 'white' && !isWhiteOpening && isBlackOpening)
            || (playingNow === 'black' && !isBlackOpening && isWhiteOpening)
        ){
            setValidMoveIdentifier(state => !state)
        }
    },[playingNow])

    const addPieceFromTheBenchToTheBoard = useCallback((
        {tileId, rowId, playingNowState, selectedPieceState}: addPieceFromBenchToBoardProps
    )=>{
        try{

            setBoard(boardState=>{
                const newArray = boardState.map((row, index) => {
                    if(row.id === rowId){
                        
                        if(
                            (playingNowState === 'white' && index+1 > 3 && isWhiteOpening
                            || playingNowState === 'black' && index+1 < 7 && isBlackOpening)
                        ){
                            return row
                        }

                        const newTiles = row.tiles.map(tile => {
                            if(tile.id === tileId){
                                const towerHeight = tile.pieces.length
                                const lastPiece = tile.pieces[towerHeight-1]

                                //add piece to the tower
                                if(towerHeight > 0){
                                    const topPieceIsFromSameTeam = lastPiece.team === playingNowState

                                    console.log(towerHeight, topPieceIsFromSameTeam)

                                    //tier up
                                    if(topPieceIsFromSameTeam){
                                        if(towerHeight === 3){
            
                                            return {
                                                id: tileId,
                                                pieces: [...tile.pieces]
                                            }
                                        }
                                                
                                        removePieceFromBench(selectedPieceState)
                                        
                                        setValidMoveIdentifier(state => !state)

                                        return {
                                            id: tileId,
                                            pieces: [...tile.pieces, selectedPieceState]
                                        }
                                    }
                                            
                                            //capture enemy piece
                                            /* else{
                                                const piecesTowerWithoutLastPiece = tile.pieces.filter(piece =>{
                                                    return piece.id !== lastPiece.id
                                                })

                                                console.log(piecesTowerWithoutLastPiece)

                                                return{
                                                    id: tileId,
                                                    pieces: [...piecesTowerWithoutLastPiece, selectedPieceState]
                                                }
                                            } */

                                    else{
                                        return {
                                            id: tileId,
                                            pieces: [...tile.pieces]
                                        }
                                    }

                                }
                                //add piece to empty tile
                                else{
                                    removePieceFromBench(selectedPieceState)
                                            
                                    setValidMoveIdentifier(state => !state)

                                    return {
                                        id: tileId,
                                        pieces: [...tile.pieces, selectedPieceState]
                                    }
                                }
                            }
            
                            return tile
                        })
                
                        return {
                            id: rowId,
                            tiles: newTiles
                        }
                    }
                
                    return row
                })
            
                return newArray
            })
        }catch(err){
            console.log(err)
        }
    },[moves, isWhiteOpening, isBlackOpening])

    useEffect(()=>{
        console.log('a função foi recriada')
    },[addPieceFromTheBenchToTheBoard])

    const captureEnemyPiece = useCallback(()=>{

    },[])

    const tierUp = useCallback(()=>{

    },[])

    const removePieceFromBench = useCallback((selectedPieceState: PieceProps)=>{
        setPieces(piecesState => {
            const newArray = piecesState.filter(piece => {
                return piece.id !== selectedPieceState.id
            })

            return newArray
        })
    },[])

    const finishPlacingPieces = useCallback(()=>{
        playingNow === 'white' 
            ? setIsWhiteOpening(false)
            : setIsBlackOpening(false)

        console.log(playingNow,'terminei de posiciconar')
    },[playingNow])

    const value={
        board,
        pieces,
        selectedPiece,
        setSelectedPiece,
        addPieceFromTheBenchToTheBoard,
        playingNow,
        verifyMoves,
        finishPlacingPieces,
        verifyIfSelectedPieceCanMoveToThisTile
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