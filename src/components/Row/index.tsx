import * as S from './styles'

import Tile from '../Tile'

interface PieceProps {
    id: number
    name: string
    team: string
}

interface TileProps {
    pieces: PieceProps[]
}

interface RowProps {
    tiles: TileProps[]
}

const Row: React.FC<RowProps> = ({tiles}) => {
    return(
        <S.Container>
            {tiles.map(tile => (
                <Tile pieces={tile.pieces}/>
            ))}
        </S.Container>
    )
}

export default Row