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
    setSelectedPiece: Dispatch<SetStateAction<PieceProps>>
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
                    id: 'tile' + (j * (i+1))
                }

                row.tiles.push(tile)
            }

            initialState.push(row)
        }

        return initialState
    })

    const [selectedPiece, setSelectedPiece] = useState<PieceProps>(null)

/*     const addPieceToTile = useCallback((id)=>{
        const newArray = board.map(b => {})
    },[]) */

    const value={
        board,
        pieces,
        selectedPiece,
        setSelectedPiece
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