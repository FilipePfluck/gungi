const initialPieces = []

//Pawns

for(let i=0; i<9; i++){
    initialPieces.push({
        id: 'white-pawn-'+i,
        name: 'pawn',
        team: 'white'
    })
}

for(let i=0; i<9; i++){
    initialPieces.push({
        id: 'black-pawn-'+i,
        name: 'pawn',
        team: 'black'
    })
}

//Major generals

for(let i=0; i<5; i++){
    initialPieces.push({
        id: 'white-major-general-'+i,
        name: 'majorGeneral',
        team: 'white'
    })
}

for(let i=0; i<5; i++){
    initialPieces.push({
        id: 'black-major-general-'+i,
        name: 'majorGeneral',
        team: 'black'
    })
}

//lieutenant general

for(let i=0; i<5; i++){
    initialPieces.push({
        id: 'white-lieutenant-general-'+i,
        name: 'lieutenantGeneral',
        team: 'white'
    })
}

for(let i=0; i<5; i++){
    initialPieces.push({
        id: 'black-lieutenant-general-'+i,
        name: 'lieutenantGeneral',
        team: 'black'
    })
}

//General 

for(let i=0; i<3; i++){
    initialPieces.push({
        id: 'white-general-'+i,
        name: 'general',
        team: 'white'
    })
}

for(let i=0; i<3; i++){
    initialPieces.push({
        id: 'black-general-'+i,
        name: 'general',
        team: 'black'
    })
}

// Archer

for(let i=0; i<2; i++){
    initialPieces.push({
        id: 'white-archer-'+i,
        name: 'archer',
        team: 'white'
    })
}

for(let i=0; i<2; i++){
    initialPieces.push({
        id: 'black-archer-'+i,
        name: 'archer',
        team: 'black'
    })
}

//Knight

for(let i=0; i<2; i++){
    initialPieces.push({
        id: 'white-knight-'+i,
        name: 'knight',
        team: 'white'
    })
}

for(let i=0; i<2; i++){
    initialPieces.push({
        id: 'black-knight-'+i,
        name: 'knight',
        team: 'black'
    })
}

//Musketeer

for(let i=0; i<2; i++){
    initialPieces.push({
        id: 'white-musketeer-'+i,
        name: 'musketeer',
        team: 'white'
    })
}

for(let i=0; i<2; i++){
    initialPieces.push({
        id: 'black-musketeer-'+i,
        name: 'musketeer',
        team: 'black'
    })
}

//Counsel

initialPieces.push({
    id: 'white-counsel-'+1,
    name: 'counsel',
    team: 'white'
})

initialPieces.push({
    id: 'black-counsel-'+1,
    name: 'counsel',
    team: 'black'
})

//Samurai 

for(let i=0; i<2; i++){
    initialPieces.push({
        id: 'white-samurai-'+i,
        name: 'samurai',
        team: 'white'
    })
}

for(let i=0; i<2; i++){
    initialPieces.push({
        id: 'black-samurai-'+i,
        name: 'samurai',
        team: 'black'
    })
}

//Fortress 

for(let i=0; i<2; i++){
    initialPieces.push({
        id: 'white-fortress-'+i,
        name: 'fortress',
        team: 'white'
    })
}

for(let i=0; i<2; i++){
    initialPieces.push({
        id: 'black-fortress-'+i,
        name: 'fortress',
        team: 'black'
    })
}

//Cannon 

for(let i=0; i<2; i++){
    initialPieces.push({
        id: 'white-cannon-'+i,
        name: 'cannon',
        team: 'white'
    })
}

for(let i=0; i<2; i++){
    initialPieces.push({
        id: 'black-cannon-'+i,
        name: 'cannon',
        team: 'black'
    })
}

//Spy

for(let i=0; i<2; i++){
    initialPieces.push({
        id: 'white-spy-'+i,
        name: 'spy',
        team: 'white'
    })
}

for(let i=0; i<2; i++){
    initialPieces.push({
        id: 'black-spy-'+i,
        name: 'spy',
        team: 'black'
    })
}

//Marshall

initialPieces.push({
    id: 'white-king-'+1,
    name: 'king',
    team: 'white'
})

initialPieces.push({
    id: 'black-king-'+1,
    name: 'king',
    team: 'black'
})

export default initialPieces