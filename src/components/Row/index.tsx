import * as S from './styles'

import Tile from '../Tile'

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
    rowId: string
}

const Row: React.FC<RowProps> = ({tiles, rowId}) => {
    return(
        <S.Container>
            {tiles.map(tile => (
                <Tile 
                    rowId={rowId} 
                    tileId={tile.id} 
                    key={tile.id} 
                    pieces={tile.pieces}
                />
            ))}
        </S.Container>
    )
}

export default Row