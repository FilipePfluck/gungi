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
            attack?: Directions
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
                up: 2, 
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
                up: 2, 
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
                upRight: 2,
                upLeft: 2,
                left: 2,
                right: 2,
                down: 2,
                downRight: 2,
                downLeft: 2,
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
                type: 'continuous'
            },
            attack: {
                type: 'jump',
                tiles: [
                    {x:0, y:2}
                ]
            }
        },
        2: {
            moves: {
                up: 1,
                left: 1,
                right: 1,
                down: 1,
                type: 'continuous'
            },
            attack: {
                type: 'jump',
                tiles: [
                    {x:0, y:2},
                    {x:0, y:3}
                ]
            }
        },
        3: {
            moves: {
                up: 1,
                left: 1,
                right: 1,
                down: 1,
                downRight: 1,
                downLeft: 1,
                type: 'continuous'
            },
            attack: {
                type: 'jump',
                tiles: [
                    {x:0, y:2},
                    {x:0, y:3},
                    {x:1, y:2},
                    {x:-1, y:2},
                ]
            }
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
                up: 1,
                left: 1,
                right: 1,
                down: 1
            },
            attack: {
                type: 'continuous',
                up: 1
            }
        },
        2: {
            moves: {
                type: 'continuous',
                up: 1,
                left: 1,
                right: 1,
                down: 1,
                downRight: 1,
                downLeft: 1
            },
            attack: {
                type: 'continuous',
                up: 2
            }
        },
        3: {
            moves: {
                type: 'continuous',
                up: 1,
                left: 1,
                right: 1,
                down: 1,
                downRight: 1,
                downLeft: 1,
                upRight: 1,
                upLeft: 1
            },
            attack: {
                type: 'continuous',
                up: 2,
                upRight: 1,
                upLeft: 1
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
                type: 'continuous'
            }
        },
        2: {
            moves: {
                type: 'jump',
                tiles: [
                    {x: 1, y:0},
                    {x: -1, y:0},
                    {x: 0, y:1},
                    {x: 0, y:-1},

                    {x: 2, y:2},
                    {x: -2, y:2},
                    {x: 2, y:-2},
                    {x: -2, y:-2},
                ]
            }
        },
        3: {
            moves: {
                type: 'jump',
                tiles: [
                    {x: 1, y:0},
                    {x: -1, y:0},
                    {x: 0, y:1},
                    {x: 0, y:-1},
                    {x: 1, y:1},
                    {x: -1, y:1},
                    {x: 1, y:-1},
                    {x: -1, y:-1},

                    {x: 3, y:0},
                    {x: -3, y:0},
                    {x: 0, y:3},
                    {x: 0, y:-3},
                    {x: 3, y:3},
                    {x: -3, y:3},
                    {x: 3, y:-3},
                    {x: -3, y:-3},
                ]
            }
        }
    },

    samurai: {
        1: {
            moves: {
                type: 'continuous',
                upRight: 1,
                upLeft: 1,
                downRight: 1,
                downLeft: 1
            }
        },
        2: {
            moves: {
                type: 'continuous',
                upRight: 2,
                upLeft: 2,
                downRight: 2,
                downLeft: 2
            }
        },
        3:{
            moves: {
                type: 'continuous',
                upRight: 9,
                upLeft: 9,
                downRight: 9,
                downLeft: 9
            }
        }
    },

    fortress: {
        1: {
            moves: {
                type: 'continuous',
                up: 1,
                left: 1,
                right: 1,
                down: 1
            }
        },
        2: {
            moves: {
                type: 'continuous',
                up: 2,
                left: 2,
                right: 2,
                down: 2
            }
        },
        3:{
            moves: {
                type: 'continuous',
                up: 9,
                left: 9,
                right: 9,
                down: 9
            }
        }
    },

    cannon: {
        1: {
            moves: {
                type: 'continuous',
                up: 1,
                left: 1,
                right: 1,
                down: 1
            },
            attack: {
                type: 'continuous',
                up: 2,
            }
        },
        2: {
            moves: {
                type: 'continuous',
                up: 1,
                left: 1,
                right: 1,
                down: 1
            },
            attack: {
                type: 'continuous',
                up: 3,
            }
        },
        3: {
            moves: {
                type: 'continuous',
                up: 1,
                left: 1,
                right: 1,
                down: 1
            },
            attack: {
                type: 'continuous',
                up: 4,
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
                type: 'continuous',
                up: 9,
                upRight: 9,
                upLeft: 9,
                left: 9,
                right: 9,
                downLeft: 9,
                downRight: 9,
                down: 9
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