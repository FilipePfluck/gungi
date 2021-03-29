import * as S from './styles'

interface PieceProps {
    id: string
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
                <S.Piece key={piece.id} team={piece.team}>
                    <div>
                        <p>{piece.name}</p>
                    </div>
                </S.Piece>
            ))}
        </S.Container>
    )
}

export default Tile