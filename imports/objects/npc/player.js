export const player = {
    location: {
        x: 0,
        y: 0,
        lastGrid: {x: 0, y: 0},
        nowGrid: {x:0, y: 0},
        futureGrid: {x: 0, y: 0},
    },
    state: {
        direction: {
            front: {
                state: false,
                row: 0,
            },
            left: {
                state: false,
                row: 3,
            },
            right: {
                state: false,
                row: 2,
            },
            back: {
                state: false,
                row: 1,
            },
        },
        isMoving: false,
    },
};