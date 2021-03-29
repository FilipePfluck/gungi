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
}

const Row: React.FC<RowProps> = ({tiles}) => {
    return(
        <S.Container>
            {tiles.map(tile => (
                <Tile key={tile.id} pieces={tile.pieces}/>
            ))}
        </S.Container>
    )
}

export default Row