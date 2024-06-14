const canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//imports

import { player } from "./imports/player.js";

//classes

class NPC {
    constructor(info, location, spriteImg) {
        this.info = info;
        this.location = location;
        this.sprite = new Sprite(256, 256, 4, 4, spriteImg)
        this.state = {
            direction: {
                front: 0,
                left: 1,
                right: 2,
                back: 3,
            },
        }
        this.move = [0, 0]
    }

    draw(){
        ctx.beginPath();
        ctx.drawImage(
            this.sprite.img,
            this.sprite.x, this.sprite.y,
            this.sprite.frame.width, this.sprite.frame.height,
            this.location.x, this.location.y,
            this.sprite.frame.width, this.sprite.frame.height
        );
    }

    moving(obj, moveList) {
        if(this.move[1] == 8){
            this.move[0]++
            this.move[1] = 0
            obj.sprite.moveHorizontal(2)
        }
        if(this.move[0] == moveList.length){
            this.move[0] = 0
        }
        switch (moveList[this.move[0]]) {
            case 1:
                this.location.x += 8;
                changeDirection(obj, this.state.direction.right)
                break;
            case 2:
                this.location.x -= 8;
                changeDirection(obj, this.state.direction.left)
                break;
            case 3:
                this.location.y -= 8;
                changeDirection(obj, this.state.direction.back)
                break;
            case 4:
                this.location.y += 8;
                changeDirection(obj, this.state.direction.front)
                break;
        }
        this.move[1]++           
    }
}


class Talker extends NPC {
    constructor(info, location, spriteImg){
        super(info, location, spriteImg)
    }
}

class Sprite{
    constructor(width, height, rows, columns, img){
        this.img = new Image()
        this.width = width
        this.height = height
        this.x = 0
        this.y = 0
        this.rows = rows
        this.columns = columns
        this.frame = {
            width: (width/rows),
            height: (height/columns),
            row: 1,
            column: 1,
        }
        this.img.src = img
    }

    moveHorizontal(n){
        if(n > this.rows){return;}
        this.x = n * this.frame.width
    }

    moveVertical(n){
        if(n > this.columns){return;}
        this.y = n * this.frame.height
    }
}

//variables

const marcos = new NPC({ nome: "marcos", type: "talker" }, { x: 256, y: 256 }, "./assets/enemy.png");
let moveList = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
]
let index = 0

//util functions

function moving() {
    if(!((player.location.x > 896) ||
       (player.location.x < 0) ||
       (player.location.y > 640) ||
       (player.location.y < 0))){
        if(player.location.x % 64 === 0 && player.location.y % 64 === 0){
            player.state.isMoving = false;
            DirectionAtt(player, "")
            player.sprite.moveHorizontal(2)
        }

        if (player.state.direction.right.state) {
            player.location.x += 8;
            changeDirection(player, player.state.direction.right.row)
        }
        if (player.state.direction.left.state) {
            player.location.x -= 8;
            changeDirection(player, player.state.direction.left.row)
        }
        if (player.state.direction.front.state) {
            player.location.y += 8;
            changeDirection(player, player.state.direction.front.row)
        }
        if (player.state.direction.back.state) {
            player.location.y -= 8;
            changeDirection(player, player.state.direction.back.row)
        }
        player.location.last.x = player.location.x
        player.location.last.y = player.location.y
    }
    else {
        player.state.isMoving = false;
        DirectionAtt(player, "")
        player.location.x = player.location.last.x 
        player.location.y = player.location.last.y 
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

function changeDirection(obj, y){
    let x = (obj.sprite.x / obj.sprite.frame.width) + 1 == obj.sprite.columns ? 1  : (obj.sprite.x / obj.sprite.frame.width) + 1 
    obj.sprite.moveHorizontal(x)
    obj.sprite.moveVertical(y)
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

    player.sprite = new Sprite(256, 256, 4, 4, "./assets/sprites.png")
    player.sprite.img.onload = function() {
        draw();
    };
}

setup();




function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moving();

    ctx.beginPath();
    ctx.drawImage(
        player.sprite.img,
        player.sprite.x, player.sprite.y,
        player.sprite.frame.width, player.sprite.frame.height,
        player.location.x, player.location.y,
        player.sprite.frame.width, player.sprite.frame.height
    );

    marcos.draw();
    marcos.moving(marcos, [0, 1, 0, 1, 0, 1, 0, 2, 0, 2, 0, 2, 0])

    requestAnimationFrame(draw);
}
    