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
    play: ({tileId, rowId})=>void
    playingNow: 'white' | 'black'
}

const BoardContext = createContext({} as ContextValue)

export const BoardProvider: React.FC = ({children}) => {
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
                name: 'major-general',
                team: 'white'
            })
        }

        for(let i=0; i<4; i++){
            initialState.push({
                id: 'black-major-general-'+i,
                name: 'major-general',
                team: 'black'
            })
        }

        //lieutenant general

        for(let i=0; i<4; i++){
            initialState.push({
                id: 'white-lieutenant-general-'+i,
                name: 'lieutenant-general',
                team: 'white'
            })
        }

        for(let i=0; i<4; i++){
            initialState.push({
                id: 'black-lieutenant-general-'+i,
                name: 'lieutenant-general',
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

    const [playingNow, setPlayingNow] = useState<'white' | 'black'>('white')

    const play = useCallback(
        ({tileId, rowId}: {tileId: string, rowId: string}
    )=>{

        setPlayingNow(playingNowState => {
            setSelectedPiece(selectedPieceState => {
                let shouldRemoveFromTheBench = true
                
                setBoard(boardState=>{
                    const newArray = boardState.map(row => {
                        if(row.id === rowId){
        
                            const newTiles = row.tiles.map(tile => {
                                if(tile.id === tileId){
                                    const towerHeight = tile.pieces.length
                                    const lastPiece = tile.pieces[towerHeight - 1]

                                    //add piece to the tower
                                    if(towerHeight > 0){
                                        const topPieceIsFromSameTeam = lastPiece.team === playingNowState

                                        console.log(towerHeight, topPieceIsFromSameTeam)

                                        //tier up
                                        if(topPieceIsFromSameTeam){
                                            if(towerHeight === 3){
                                                shouldRemoveFromTheBench = false
        
                                                return {
                                                    id: tileId,
                                                    pieces: [...tile.pieces]
                                                }
                                            }

                                            return {
                                                id: tileId,
                                                pieces: [...tile.pieces, selectedPieceState]
                                            }
                                        }
                                        
                                        //capture enemy piece
                                        else{
                                            const piecesTowerWithoutLastPiece = tile.pieces.filter(piece =>{
                                                return piece.id !== lastPiece.id
                                            })

                                            console.log(piecesTowerWithoutLastPiece)

                                            return{
                                                id: tileId,
                                                pieces: [...piecesTowerWithoutLastPiece, selectedPieceState]
                                            }
                                        }

                                    }
                                    //add piece to empty tile
                                    else{
                                        return {
                                            id: tileId,
                                            pieces: [...tile.pieces, selectedPieceState]
                                        }
                                    }
                                }

                                if(shouldRemoveFromTheBench){
                                    removePieceFromBench(selectedPieceState)
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
    
                return null
            })

            return playingNowState === 'white' 
                ? 'black'
                : 'white'
        })
    },[])

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

    const value={
        board,
        pieces,
        selectedPiece,
        setSelectedPiece,
        play,
        playingNow
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