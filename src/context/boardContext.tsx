import {createContext, useEffect, useState, useCallback, useContext, SetStateAction, Dispatch} from 'react'

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
    verifyMoves: (piece: PieceProps, tier: number) => void
    finishPlacingPieces: () => void
}

interface addPieceFromBenchToBoardProps {
    tileId: string
    rowId: string
    playingNowState: 'white' | 'black'
    selectedPieceState: PieceProps | null
}

const BoardContext = createContext({} as ContextValue)

export const BoardProvider: React.FC = ({children}) => {
    const [moves, setMoves] = useState({
        pawn: {
            1: {
                moves: {
                    up: 1
                }
            },
            2: {
                moves: {
                    up: 1,
                    upRight: 1,
                    upLeft: 1
                }
            },
            3: {
                moves: {
                    up: 1,
                    upRight: 1,
                    upLeft: 1,
                    downRight: 1,
                    downLeft: 1
                }
            }
        },

        majorGeneral: {
            1: {
                moves: {
                    up: 1,
                    upRight: 1,
                    upLeft: 1
                }
            },
            2: {
                moves: {
                    up: 1,
                    upRight: 1,
                    upLeft: 1,
                    downRight: 1,
                    downLeft: 1
                }
            },
            3: {
                moves: {
                    up: 1,
                    upRight: 1,
                    upLeft: 1,
                    left: 1,
                    right: 1,
                    down: 1
                }
            }
        },

        lieutenantGeneral: {
            1: {
                moves: {
                    up: 1,
                    upRight: 1,
                    upLeft: 1,
                    downRight: 1,
                    downLeft: 1
                }
            },
            2: {
                moves: {
                    up: 1,
                    upRight: 1,
                    upLeft: 1,
                    left: 1,
                    right: 1,
                    down: 1
                }
            },
            3: {
                moves: {
                    up: 2, 
                    upRight: 1,
                    upLeft: 1,
                    left: 1,
                    right: 1,
                    down: 1,
                    downRight: 1,
                    downLeft: 1
                }
            }
        },

        general: {
            1: {
                moves: {
                    up: 1,
                    upRight: 1,
                    upLeft: 1,
                    left: 1,
                    right: 1,
                    down: 1
                }
            },
            2: {
                moves: {
                    up: 2, 
                    upRight: 1,
                    upLeft: 1,
                    left: 1,
                    right: 1,
                    down: 1,
                    downRight: 1,
                    downLeft: 1
                }
            },
            3: {
                moves: {
                    up: 2, 
                    upRight: 2,
                    upLeft: 2,
                    left: 2,
                    right: 2,
                    down: 2,
                    downRight: 2,
                    downLeft: 2
                }
            }
        },

        archer: {

        }
    })

    const [pieces, setPieces] = useState<PieceProps[]>(()=>{
        let initialState: PieceProps[] = []

        //Pawns

        for(let i=0; i<9; i++){
            initialState.push({
                id: 'white-pawn-'+i,
                name: 'pawn',
                team: 'white'
            })
        }

        for(let i=0; i<9; i++){
            initialState.push({
                id: 'black-pawn-'+i,
                name: 'pawn',
                team: 'black'
            })
        }

        //Major generals
        
        for(let i=0; i<4; i++){
            initialState.push({
                id: 'white-major-general-'+i,
                name: 'majorGeneral',
                team: 'white'
            })
        }

        for(let i=0; i<4; i++){
            initialState.push({
                id: 'black-major-general-'+i,
                name: 'majorGeneral',
                team: 'black'
            })
        }

        //lieutenant general

        for(let i=0; i<4; i++){
            initialState.push({
                id: 'white-lieutenant-general-'+i,
                name: 'lieutenantGeneral',
                team: 'white'
            })
        }

        for(let i=0; i<4; i++){
            initialState.push({
                id: 'black-lieutenant-general-'+i,
                name: 'lieutenantGeneral',
                team: 'black'
            })
        }
        
        //General 

        for(let i=0; i<6; i++){
            initialState.push({
                id: 'white-general-'+i,
                name: 'general',
                team: 'white'
            })
        }

        for(let i=0; i<6; i++){
            initialState.push({
                id: 'black-general-'+i,
                name: 'general',
                team: 'black'
            })
        }

        // Archer

        for(let i=0; i<2; i++){
            initialState.push({
                id: 'white-archer-'+i,
                name: 'archer',
                team: 'white'
            })
        }

        for(let i=0; i<2; i++){
            initialState.push({
                id: 'black-archer-'+i,
                name: 'archer',
                team: 'black'
            })
        }

        //Knight

        for(let i=0; i<2; i++){
            initialState.push({
                id: 'white-knight-'+i,
                name: 'knight',
                team: 'white'
            })
        }

        for(let i=0; i<2; i++){
            initialState.push({
                id: 'black-knight-'+i,
                name: 'knight',
                team: 'black'
            })
        }

        //Musketeer

        initialState.push({
            id: 'white-musketeer-'+1,
            name: 'musketeer',
            team: 'white'
        })

        initialState.push({
            id: 'black-musketeer-'+1,
            name: 'musketeer',
            team: 'black'
        })

        //Counsel

        initialState.push({
            id: 'white-counsel-'+1,
            name: 'counsel',
            team: 'white'
        })

        initialState.push({
            id: 'black-counsel-'+1,
            name: 'counsel',
            team: 'black'
        })

        //Samurai 

        for(let i=0; i<2; i++){
            initialState.push({
                id: 'white-samurai-'+i,
                name: 'samurai',
                team: 'white'
            })
        }

        for(let i=0; i<2; i++){
            initialState.push({
                id: 'black-samurai-'+i,
                name: 'samurai',
                team: 'black'
            })
        }

        //Fortress 

        for(let i=0; i<2; i++){
            initialState.push({
                id: 'white-fortress-'+i,
                name: 'fortress',
                team: 'white'
            })
        }

        for(let i=0; i<2; i++){
            initialState.push({
                id: 'black-fortress-'+i,
                name: 'fortress',
                team: 'black'
            })
        }

        //Cannon 

        for(let i=0; i<2; i++){
            initialState.push({
                id: 'white-cannon-'+i,
                name: 'cannon',
                team: 'white'
            })
        }

        for(let i=0; i<2; i++){
            initialState.push({
                id: 'black-cannon-'+i,
                name: 'cannon',
                team: 'black'
            })
        }

        //Spy

        for(let i=0; i<2; i++){
            initialState.push({
                id: 'white-spy-'+i,
                name: 'spy',
                team: 'white'
            })
        }

        for(let i=0; i<2; i++){
            initialState.push({
                id: 'black-spy-'+i,
                name: 'spy',
                team: 'black'
            })
        }

        //Marshall

        initialState.push({
            id: 'white-king-'+1,
            name: 'king',
            team: 'white'
        })

        initialState.push({
            id: 'black-king-'+1,
            name: 'king',
            team: 'black'
        })

        return initialState
    })

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

    const [playingNow, setPlayingNow] = useState<'white' | 'black'>(null)

    const [isWhiteOpening, setIsWhiteOpening] = useState(true)
    const [isBlackOpening, setIsBlackOpening] = useState(true)

    //Esse estado serve pra monitorar quando um movimento válido ocorre
    //Para alterar em um UseEffect a vez de quem joga e remover a peça selecionada
    const [validMoveIdentifier, setValidMoveIdentifier] = useState(false)

    const verifyMoves = useCallback((piece: PieceProps, tier: number)=>{
        console.log(moves[piece.name][tier])
    },[moves])

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
        finishPlacingPieces
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