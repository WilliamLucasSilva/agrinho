export const player = {
    location: {
        x: 0,
        y: 0,
        last: {x: 0, y: 0},
    },
    state: {
        direction: {
            front: {
                state: false,
                row: 0,
            },
            left: {
                state: false,
                row: 1,
            },
            right: {
                state: false,
                row: 2,
            },
            back: {
                state: false,
                row: 3,
            },
        },
        isMoving: false,
    },
};