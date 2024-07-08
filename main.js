const pause = document.getElementById("pause")

//imports

import variables from "./imports/useful/variables.js";
import { changeDirection } from "./imports/useful/changeDirection.js";

import { player } from "./imports/objects/npc/player.js";
import { NPC } from "./imports/objects/npc/npc.js";
import { Sprite } from "./imports/objects/sprite.js";

//variables

const marcos = new NPC({ nome: "marcos", type: "talker" }, 
                { x: 256, y: 256, lastGrid: {x: 3, y: 3}, nowGrid: {x: 3, y: 3}, futureGrid: {x: 3, y: 3}, gridNumber: 3}, 
                new Sprite(256, 256, 4, 4, "./assets/enemy.png"));

var grid = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
let paused = false;
const GRID_SPACE = 64

//useful functions

function moving() {
        if(player.location.x % GRID_SPACE === 0 && player.location.y % GRID_SPACE === 0){

            player.state.isMoving = false;
            DirectionAtt(player, "")
            player.sprite.moveHorizontal(0)

            player.location.lastGrid.x = player.location.nowGrid.x
            player.location.lastGrid.y = player.location.nowGrid.y

            player.location.nowGrid.x = player.location.futureGrid.x
            player.location.nowGrid.y = player.location.futureGrid.y

            grid[player.location.lastGrid.x][player.location.lastGrid.y] = 0
            grid[player.location.futureGrid.x][player.location.futureGrid.y] = 1
        }

        if (player.state.direction.right.state) {
            player.location.x += 8;
            changeDirection(player, player.state.direction.right.row)
            player.location.futureGrid.x = attGridPosition(player.location.x, "positive")
        }
        if (player.state.direction.left.state) {
            player.location.x -= 8;
            changeDirection(player, player.state.direction.left.row)
            player.location.futureGrid.x = attGridPosition(player.location.x, "negative")
        }
        if (player.state.direction.front.state) {
            player.location.y += 8;
            changeDirection(player, player.state.direction.front.row)
            player.location.futureGrid.y = attGridPosition(player.location.y, "positive")
        }
        if (player.state.direction.back.state) {
            player.location.y -= 8;
            changeDirection(player, player.state.direction.back.row)
            player.location.futureGrid.y = attGridPosition(player.location.y, "negative")
        }

        if(playerCollision(player.location.futureGrid)){
            player.location.x = player.location.lastGrid.x * GRID_SPACE
            player.location.y = player.location.lastGrid.y * GRID_SPACE 
            player.location.futureGrid.x = player.location.nowGrid.x
            player.location.futureGrid.y = player.location.nowGrid.y
        }
}

function attGridPosition(position, type){
    if(type === "negative"){
        return Math.floor(position / GRID_SPACE)
    }else{
        return Math.ceil(position / GRID_SPACE)
    }
}

function DirectionAtt(obj, direction){
    obj.state.direction.right.state = false
    obj.state.direction.left.state = false
    obj.state.direction.back.state = false
    obj.state.direction.front.state = false

    switch (direction) {
        case "right":
            obj.state.direction.right.state = true
            break;
        case "left":
            obj.state.direction.left.state = true
            break;
        case "back":
            obj.state.direction.back.state = true
            break;
        case "front":
            obj.state.direction.front.state = true
            break;
    }
}

function playerCollision(position){
    return (grid[position.x][position.y] == 3)
}

function showGrid() {
    let gridString = "[\n";
    for (let i = 0; i < grid.length; i++) {
        gridString += "    [";
        for (let j = 0; j < grid[i].length; j++) {
            gridString += grid[i][j];
            if (j < grid[i].length - 1) {
                gridString += ", ";
            }
        }
        gridString += "]";
        if (i < grid.length - 1) {
            gridString += ",\n";
        }
    }
    gridString += "\n];";
    console.log(gridString);
}
//game functions

function setup() {
    document.addEventListener("keydown", (k) => {
        if (!player.state.isMoving){
            switch (k.key) {
                case "d":
                case "ArrowRight":
                    player.state.isMoving = true;
                    DirectionAtt(player, "right")
                    player.location.x += 8
                    break;
                case "a":
                case "ArrowLeft":
                    player.state.isMoving = true;
                    DirectionAtt(player, "left")
                    player.location.x -= 8
                    break;
                case "s":
                case "ArrowDown":
                    player.state.isMoving = true;
                    DirectionAtt(player, "front")
                    player.location.y += 8
                    break;
                case "w":
                case "ArrowUp":
                    player.state.isMoving = true;
                    DirectionAtt(player, "back")
                    player.location.y -= 8
                    break;
            }
        }
    });
    pause.addEventListener("click", () => {
        paused = !paused
    })

    player.sprite = new Sprite(192, 256, 3, 4, "./assets/player1.png")
    player.sprite.img.onload = function() {
        draw();
    };
}

setup();




function draw() {
    if(!paused){

        variables.ctx.clearRect(0, 0, variables.canvas.width, variables.canvas.height);
    
        moving();
    
        variables.ctx.beginPath();
        variables.ctx.drawImage(
            player.sprite.img,
            player.sprite.x, player.sprite.y,
            player.sprite.frame.width, player.sprite.frame.height,
            player.location.x, player.location.y,
            player.sprite.frame.width, player.sprite.frame.height
        );  
    
        marcos.draw();
        marcos.moving(marcos, [0, 1, 0, 1, 0, 1, 0, 2, 0, 2, 0, 2, 0])

        if(player.state.isMoving){
            //console.log(player.location.lastGrid.x, player.location.lastGrid.y)
            showGrid()
            console.log(playerCollision(player.location.futureGrid))
        }
        grid[3][3] = 3
    }else{
        variables.ctx.clearRect(0, 0, variables.canvas.width, variables.canvas.height);
    }
    requestAnimationFrame(draw);
}
    