import * as S from './styles'

export const Rules = () => {
  return (
    <S.Container>
      <S.Subtitle>O que é gungi?</S.Subtitle>
      <S.Text>
        Gungi é um jogo de tabuleiro fictício criado por Yoshihiro Togashi,
        autor do mangá Hunter x Hunter. Esse é um fan-game criado inspirado em
        sua obra. O jogo é muito semelhante ao xadrez, mas tem algumas
        diferenças e é muito mais complexo.
      </S.Text>

      <S.Subtitle>Regras</S.Subtitle>
      <S.Text>
        Diferente do xadrez, o tabuleiro do gungi começa vazio, e os jogadores
        colocam, intercaladamente, uma peça de cada vez, em qualquer casa das
        suas três primeiras fileiras. As brancas jogam primeiro, e primeira peça
        a ser colocada deve ser o rei. Nos 20 primeiros lances, não é possível
        mover as peças, apenas posicionar elas no tabuleiro. Após os 20
        primeiros lances, cada jogador em seu turno pode mover uma peça ou
        adicionar uma nova peça no tabuleiro. As peças adicionadas após os 20
        primeiros lances podem ser colocadas após a terceira fileira, no entanto
        elas não podem ser colocadas dentro das três primeiras fileiras do
        adversário, nem dando cheque no rei inimigo. Também não é possível
        adicionar uma peça nova em uma casa que esteja ocupada por uma peça
        inimiga.
      </S.Text>
      <S.Text>
        No gungi existem 13 peças diferentes: peão, major-general,
        tenente-general, general, arqueiro, cavalo, samurai, fortaleza,
        mosqueteiro, canhão, conselho, espião, e o rei. O rei é a peça mais
        importante no tabuleiro e deve ser protegido. Quando uma peça inimiga
        está atacando o rei, diz-se que ele está em cheque. Nessa situação, não
        é possível jogar qualquer lance que não proteja o rei. Caso o rei esteja
        em cheque, não possa se mover, ou nenhuma outra peça possa bloquear o
        chque ou capturar a peça inimiga que está ameaçando o rei, diz-se que é
        cheque mate e o jogo se encerra.
      </S.Text>
      <S.Text>
        Assim como no xadrez, cada peça pode se movimentar de uma maneira
        diferente das demais. No gungi, no entanto, é possível mover uma peça
        para uma casa que já esteja ocupada. É possível empilhar até três peças
        uma em cima da outra, no entanto, apenas a peça do topo pode se mover. A
        altura da peça é chamada de tier. Se uma peça for a única em uma casa,
        então ela é tier 1. Se ela estiver em cima de outra peça, ela é tier 2.
        E se ela estiver no topo de duas outras peças, ela é tier 3. O movimento
        das peças melhora a medida que sobem de tier. Uma fortaleza tier 2 pode
        se mover mais longe que uma fortaleza tier 1, e uma fortaleza tier 3
        pode se mover mais longe que uma fortaleza tier 2. A única peça cujo
        movimento não muda quando sobe de tier é o rei, e nenhuma peça pode ser
        posicionada acima do rei.
      </S.Text>
      <S.Text>
        Se você mover uma peça sua até uma casa em que a peça do topo seja
        inimiga, você captura a peça do topo e coloca sua peça no lugar. As
        peças de baixo permanecem na casa, mesmo que sejam inimigas. No entanto,
        elas não poderão se mover, pois somente a peça do topo pode se deslocar.
      </S.Text>

      <S.Subtitle>Peão</S.Subtitle>
      <S.Text>Cada jogador possui 9 peões.</S.Text>
      <S.ImageGroup>
        <div>
          <S.Image src="/moves/pawn-1.png" />
          <p>Peão tier 1</p>
        </div>
        <div>
          <S.Image src="/moves/pawn-2.png" />
          <p>Peão tier 2</p>
        </div>
        <div>
          <S.Image src="/moves/pawn-3.png" />
          <p>Peão tier 3</p>
        </div>
      </S.ImageGroup>

      <S.Subtitle>Major-general</S.Subtitle>
      <S.Text>Cada jogador possui 5 major-generais.</S.Text>
      <S.ImageGroup>
        <div>
          <S.Image src="/moves/major-general-1.png" />
          <p>Major-general tier 1</p>
        </div>
        <div>
          <S.Image src="/moves/major-general-2.png" />
          <p>Major-general tier 2</p>
        </div>
        <div>
          <S.Image src="/moves/major-general-3.png" />
          <p>Major-general tier 3</p>
        </div>
      </S.ImageGroup>

      <S.Subtitle>Tenente-general</S.Subtitle>
      <S.Text>Cada jogador possui 5 tenente-generais.</S.Text>
      <S.ImageGroup>
        <div>
          <S.Image src="/moves/lieutenant-general-1.png" />
          <p>Tenente-general tier 1</p>
        </div>
        <div>
          <S.Image src="/moves/lieutenant-general-2.png" />
          <p>Tenente-general tier 2</p>
        </div>
        <div>
          <S.Image src="/moves/lieutenant-general-3.png" />
          <p>Tenente-general tier 3</p>
        </div>
      </S.ImageGroup>

      <S.Subtitle>General</S.Subtitle>
      <S.Text>Cada jogador possui 3 generais.</S.Text>
      <S.ImageGroup>
        <div>
          <S.Image src="/moves/general-1.png" />
          <p>General tier 1</p>
        </div>
        <div>
          <S.Image src="/moves/general-2.png" />
          <p>General tier 2</p>
        </div>
        <div>
          <S.Image src="/moves/general-3.png" />
          <p>General tier 3</p>
        </div>
      </S.ImageGroup>

      <S.Subtitle>Cavalo</S.Subtitle>
      <S.Text>
        Cada jogador possui 2 cavalos. No tier 2 e 3, ele pode saltar para as
        casas, mesmo que tenham peças no caminho.
      </S.Text>
      <S.ImageGroup>
        <div>
          <S.Image src="/moves/knight-1.png" />
          <p>Cavalo tier 1</p>
        </div>
        <div>
          <S.Image src="/moves/knight-2.png" />
          <p>Cavalo tier 2</p>
        </div>
        <div>
          <S.Image src="/moves/knight-3.png" />
          <p>Cavalo tier 3</p>
        </div>
      </S.ImageGroup>

      <S.Subtitle>Samurai</S.Subtitle>
      <S.Text>
        Cada jogador possui 2 samurais. Eles se movem de forma parecida com um
        bispo do xadrez. No tier 1, ele pode andar 2 casas para qualquer
        diagonal, no tier 2 até 4 casas e no tier 3 até 8 casas.
      </S.Text>
      <S.ImageGroup>
        <div>
          <S.Image src="/moves/samurai-1.png" />
          <p>Samurai tier 1</p>
        </div>
        <div>
          <S.Image src="/moves/samurai-2.png" />
          <p>Samurai tier 2</p>
        </div>
        <div>
          <S.Image src="/moves/samurai-3.png" />
          <p>Samurai tier 3</p>
        </div>
      </S.ImageGroup>

      <S.Subtitle>Mosqueteiro</S.Subtitle>
      <S.Text>Cada jogador possui 2 mosqueteiros.</S.Text>
      <S.ImageGroup>
        <div>
          <S.Image src="/moves/musketeer-1.png" />
          <p>Mosqueteiro tier 1</p>
        </div>
        <div>
          <S.Image src="/moves/musketeer-2.png" />
          <p>Mosqueteiro tier 2</p>
        </div>
        <div>
          <S.Image src="/moves/musketeer-3.png" />
          <p>Mosqueteiro tier 3</p>
        </div>
      </S.ImageGroup>

      <S.Subtitle>Canhão</S.Subtitle>
      <S.Text>Cada jogador possui 2 canhões.</S.Text>
      <S.ImageGroup>
        <div>
          <S.Image src="/moves/cannon-1.png" />
          <p>Canhão tier 1</p>
        </div>
        <div>
          <S.Image src="/moves/cannon-2.png" />
          <p>Canhão tier 2</p>
        </div>
        <div>
          <S.Image src="/moves/cannon-3.png" />
          <p>Canhão tier 3</p>
        </div>
      </S.ImageGroup>

      <S.Subtitle>Fortaleza</S.Subtitle>
      <S.Text>Cada jogador possui 2 fortalezas.</S.Text>
      <S.ImageGroup>
        <div>
          <S.Image src="/moves/fortress-1.png" />
          <p>Fortaleza tier 1</p>
        </div>
        <div>
          <S.Image src="/moves/fortress-2.png" />
          <p>Fortaleza tier 2</p>
        </div>
        <div>
          <S.Image src="/moves/fortress-3.png" />
          <p>Fortaleza tier 3</p>
        </div>
      </S.ImageGroup>

      <S.Subtitle>Conselho</S.Subtitle>
      <S.Text>Cada jogador possui 1 conselho.</S.Text>
      <S.ImageGroup>
        <div>
          <S.Image src="/moves/counsil-1.png" />
          <p>Conselho tier 1</p>
        </div>
        <div>
          <S.Image src="/moves/counsil-2.png" />
          <p>Conselho tier 2</p>
        </div>
        <div>
          <S.Image src="/moves/counsil-3.png" />
          <p>Conselho tier 3</p>
        </div>
      </S.ImageGroup>

      <S.Subtitle>Espião</S.Subtitle>
      <S.Text>
        Cada jogador possui 2 espiões. Eles podem saltar por cima de outras
        peças
      </S.Text>
      <S.ImageGroup>
        <div>
          <S.Image src="/moves/spy-1.png" />
          <p>Espião tier 1</p>
        </div>
        <div>
          <S.Image src="/moves/spy-2.png" />
          <p>Espião tier 2</p>
        </div>
        <div>
          <S.Image src="/moves/spy-3.png" />
          <p>Espião tier 3</p>
        </div>
      </S.ImageGroup>

      <S.Subtitle>Arqueiro</S.Subtitle>
      <S.Text>
        Cada jogador possui 2 arqueiros. No tier 2 e 3 eles podem saltar por
        cima de outras peças
      </S.Text>
      <S.ImageGroup>
        <div>
          <S.Image src="/moves/archer-1.png" />
          <p>Arqueiro tier 1</p>
        </div>
        <div>
          <S.Image src="/moves/archer-2.png" />
          <p>Arqueiro tier 2</p>
        </div>
        <div>
          <S.Image src="/moves/archer-3.png" />
          <p>Arqueiro tier 3</p>
        </div>
      </S.ImageGroup>

      <S.Subtitle>Rei</S.Subtitle>
      <S.Text>
        Cada jogador possui 1 rei. Ele é a peça mais importante do jogo. Nenhuma
        peça pode ser colocada acima do rei.
      </S.Text>
      <S.ImageGroup>
        <div>
          <S.Image src="/moves/king-1.png" />
          <p>Rei tier 1</p>
        </div>
        <div>
          <S.Image src="/moves/king-2.png" />
          <p>Rei tier 2</p>
        </div>
        <div>
          <S.Image src="/moves/king-3.png" />
          <p>Rei tier 3</p>
        </div>
      </S.ImageGroup>
    </S.Container>
  )
}
