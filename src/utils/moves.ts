type Tiles = {x: number, y: number}[]

type Directions = {
    type: 'continuous' | 'jump'
    up?: number
    down?: number
    left?: number
    right?: number
    upLeft?: number
    upRight?: number
    downLeft?: number
    downRight?: number
    tiles?: Tiles
}

interface moveProps{
    [piece: string]: {
        [tier: number]: {
            moves: Directions,
        }
    }
}

const moves: moveProps = {
    pawn: {
        1: {
            moves: {
                up: 1,
                type: 'continuous'
            }
        },
        2: {
            moves: {
                up: 1,
                upRight: 1,
                upLeft: 1,
                type: 'continuous'
            }
        },
        3: {
            moves: {
                up: 1,
                upRight: 1,
                upLeft: 1,
                downRight: 1,
                downLeft: 1,
                type: 'continuous'
            }
        }
    },

    majorGeneral: {
        1: {
            moves: {
                up: 1,
                upRight: 1,
                upLeft: 1,
                type: 'continuous'
            }
        },
        2: {
            moves: {
                up: 1,
                upRight: 1,
                upLeft: 1,
                downRight: 1,
                downLeft: 1,
                type: 'continuous'
            }
        },
        3: {
            moves: {
                up: 1,
                upRight: 1,
                upLeft: 1,
                left: 1,
                right: 1,
                down: 1,
                type: 'continuous'
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
                downLeft: 1,
                type: 'continuous'
            }
        },
        2: {
            moves: {
                up: 1,
                upRight: 1,
                upLeft: 1,
                left: 1,
                right: 1,
                down: 1,
                type: 'continuous'
            }
        },
        3: {
            moves: {
                up: 1, 
                upRight: 1,
                upLeft: 1,
                left: 1,
                right: 1,
                down: 1,
                downRight: 1,
                downLeft: 1,
                type: 'continuous'
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
                down: 1,
                type: 'continuous'
            }
        },
        2: {
            moves: {
                up: 1, 
                upRight: 1,
                upLeft: 1,
                left: 1,
                right: 1,
                down: 1,
                downRight: 1,
                downLeft: 1,
                type: 'continuous'
            }
        },
        3: {
            moves: {
                up: 2, 
                upRight: 1,
                upLeft: 1,
                left: 2,
                right: 2,
                down: 2,
                downRight: 1,
                downLeft: 1,
                type: 'continuous'
            }
        }
    },

    archer: {
        1: {
            moves: {
                up: 1,
                left: 1,
                right: 1,
                down: 1,
                upLeft: 1,
                downLeft: 1,
                upRight: 1,
                downRight: 1,
                type: 'continuous'
            },
        },
        2: {
            moves: {
                tiles: [
                    {x:0, y: 1},
                    {x:0, y: 2},
                    {x:0, y: -1},
                    {x:0, y: -2},
                    {x: 1, y: 0},
                    {x: 2, y: 0},
                    {x: -1, y: 0},
                    {x: -2, y: 0},
                    {x: 1, y: 1},
                    {x: -1, y: 1},
                    {x: 1, y: -1},
                    {x: -1, y: -1},
                ],
                type: 'jump'
            },
        },
        3: {
            moves: {
                tiles: [
                    {x:0, y: 1},
                    {x:0, y: 2},
                    {x:0, y: -1},
                    {x:0, y: -2},
                    {x: 1, y: 0},
                    {x: 2, y: 0},
                    {x: -1, y: 0},
                    {x: -2, y: 0},
                    {x: 1, y: 1},
                    {x: -1, y: 1},
                    {x: 1, y: -1},
                    {x: -1, y: -1},
                    {x: 2, y: 1},
                    {x: 1, y: 2},
                    {x: 2, y: -1},
                    {x: 1, y: -2},
                    {x: -2, y: 1},
                    {x: -1, y: 2},
                    {x: -2, y: -1},
                    {x: -1, y: -2},
                ],
                type: 'jump'
            },
        }
    },

    knight: {
        1: {
            moves: {
                type: 'continuous',
                down: 1,
                left: 1,
                right: 1,
                upRight: 1,
                upLeft: 1
            }
        },
        2: {
            moves: {
                type: 'jump',
                tiles: [
                    {x:1, y:2},
                    {x:1, y:-2},
                    {x:-1, y:2},
                    {x:-1, y:-2},
                    {x:2, y:1},
                    {x:2, y:-1},
                    {x:-2, y:1},
                    {x:-2, y:-1},
                ]
            }
        },
        3: {
            moves: {
                type: 'jump',
                tiles: [
                    {x:1, y:2},
                    {x:1, y:-2},
                    {x:-1, y:2},
                    {x:-1, y:-2},
                    {x:2, y:1},
                    {x:2, y:-1},
                    {x:-2, y:1},
                    {x:-2, y:-1},
                    {x:1, y:0},
                    {x:-1, y:0},
                    {x:0, y:1},
                    {x:0, y:-1},
                ]
            }
        }  
    },

    musketeer: {
        1: {
            moves: {
                type: 'continuous',
                up: 2,
                left: 2,
                right: 2,
                down: 2
            }
        },
        2: {
            moves: {
                type: 'continuous',
                up: 2,
                left: 2,
                right: 2,
                down: 2,
                upLeft: 1,
                upRight: 1,
                downLeft: 1,
                downRight: 1
            }
        },
        3: {
            moves: {
                type: 'continuous',
                up: 3,
                left: 3,
                right: 3,
                down: 3,
                upLeft: 1,
                upRight: 1,
                downLeft: 1,
                downRight: 1
            }
        }
    },

    counsel: {
        1: {
            moves: {
                up: 1,
                left: 1,
                right: 1,
                down: 1,
                upLeft: 1,
                upRight: 1,
                downLeft: 1,
                downRight: 1,
                type: 'continuous'
            }
        },
        2: {
            moves: {
                up: 2,
                left: 2,
                right: 2,
                down: 2,
                upLeft: 2,
                upRight: 2,
                downLeft: 2,
                downRight: 2,
                type: 'continuous'
            }
        },
        3: {
            moves: {
                up: 3,
                left: 3,
                right: 3,
                down: 3,
                upLeft: 3,
                upRight: 3,
                downLeft: 3,
                downRight: 3,
                type: 'continuous'
            }
        }
    },

    samurai: {
        1: {
            moves: {
                type: 'continuous',
                upRight: 2,
                upLeft: 2,
                downRight: 2,
                downLeft: 2
            }
        },
        2: {
            moves: {
                type: 'continuous',
                upRight: 4,
                upLeft: 4,
                downRight: 4,
                downLeft: 4
            }
        },
        3:{
            moves: {
                type: 'continuous',
                upRight: 8,
                upLeft: 8,
                downRight: 8,
                downLeft: 8
            }
        }
    },

    fortress: {
        1: {
            moves: {
                type: 'continuous',
                up: 2,
                left: 2,
                right: 2,
                down: 2
            }
        },
        2: {
            moves: {
                type: 'continuous',
                up: 4,
                left: 4,
                right: 4,
                down: 4
            }
        },
        3:{
            moves: {
                type: 'continuous',
                up: 8,
                left: 8,
                right: 8,
                down: 8
            }
        }
    },

    cannon: {
        1: {
            moves: {
                type: 'continuous',
                up: 2,
                left: 2,
                right: 2,
                down: 2,
                upLeft: 1,
                upRight: 1,
                downLeft: 1,
                downRight: 1
            }
        },
        2: {
            moves: {
                type: 'continuous',
                up: 3,
                left: 3,
                right: 3,
                down: 3,
                upLeft: 1,
                upRight: 1,
                downLeft: 1,
                downRight: 1
            }
        },
        3: {
            moves: {
                type: 'continuous',
                up: 4,
                left: 4,
                right: 4,
                down: 4,
                upLeft: 1,
                upRight: 1,
                downLeft: 1,
                downRight: 1
            }
        }
    },

    spy: {
        1: {
            moves: {
                type: 'jump',
                tiles: [
                    {x:-2, y:0},
                    {x:2, y:0},
                    {x:0, y:2},
                    {x:0, y:-2},
                    {x:-1, y:-1},
                    {x:1, y:1},
                    {x:-1, y:1},
                    {x:1, y:-1},
                ]
            }
        },
        2: {
            moves: {
                type: 'jump',
                tiles: [
                    {x:-2, y:0},
                    {x:2, y:0},
                    {x:0, y:2},
                    {x:0, y:-2},

                    {x:-1, y:-1},
                    {x:1, y:1},
                    {x:-1, y:1},
                    {x:1, y:-1},

                    {x:-2, y:-2},
                    {x:2, y:2},
                    {x:-2, y:2},
                    {x:2, y:-2},
                ]
            }
        },
        3: {
            moves: {
                type: 'jump',
                tiles: [
                    {x:-2, y:0},
                    {x:2, y:0},
                    {x:0, y:2},
                    {x:0, y:-2},

                    {x:-1, y:-1},
                    {x:1, y:1},
                    {x:-1, y:1},
                    {x:1, y:-1},

                    {x:-2, y:-2},
                    {x:2, y:2},
                    {x:-2, y:2},
                    {x:2, y:-2},

                    {x: 3, y: 1},
                    {x: 3, y: -1},
                    {x: -3, y: 1},
                    {x: -3, y: -1},

                    {x: 1, y: 3},
                    {x: 1, y: -3},
                    {x: -1, y: 3},
                    {x: -1, y: -3},
                ]
            }
        }
    },

    king: {
        1: {
            moves: {
                up: 1, 
                upRight: 1,
                upLeft: 1,
                left: 1,
                right: 1,
                down: 1,
                downRight: 1,
                downLeft: 1,
                type: 'continuous'
            }
        },
        2: {
            moves: {
                up: 1, 
                upRight: 1,
                upLeft: 1,
                left: 1,
                right: 1,
                down: 1,
                downRight: 1,
                downLeft: 1,
                type: 'continuous'
            }
        },
        3: {
            moves: {
                up: 1, 
                upRight: 1,
                upLeft: 1,
                left: 1,
                right: 1,
                down: 1,
                downRight: 1,
                downLeft: 1,
                type: 'continuous'
            }
        }
    }
}

export default moves