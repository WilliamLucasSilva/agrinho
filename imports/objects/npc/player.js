export const player = {
    location: {
        x: 64,
        y: 128,
        lastGrid: {x: 1, y: 2},
        nowGrid: {x: 1, y: 2},
        futureGrid: {x: 1, y: 2},
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