import * as S from './styles'

interface PieceProps {
    id: number
    name: string
    team: string
}

interface TileProps {
    pieces: PieceProps[]
}

const Tile: React.FC<TileProps> = ({pieces}) => {
    return(
        <S.Container>
            {pieces.map(piece => (
                <S.Piece team={piece.team}>
                    <div>
                        <p>{piece.name}</p>
                    </div>
                </S.Piece>
            ))}
        </S.Container>
    )
}

export default Tile