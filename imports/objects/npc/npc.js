import variables from "../../useful/variables.js";
import { changeDirection } from "../../useful/changeDirection.js";
import { grid } from "../../useful/grid.js";
import { attGridPosition } from "../../useful/attGridPosition.js";

export class NPC {
    constructor(info, location, sprite) {
        this.info = info;
        this.location = location;
        this.sprite =sprite
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
        variables.ctx.beginPath();
        variables.ctx.drawImage(
            this.sprite.img,
            this.sprite.x, this.sprite.y,
            this.sprite.frame.width, this.sprite.frame.height,
            this.location.x, this.location.y,
            this.sprite.frame.width, this.sprite.frame.height
        );
    }

    moving(obj, moveList) {
        if(grid[this.location.futureGrid.x][this.location.futureGrid.y] === 1){
            this.location.x = this.location.lastGrid.x * variables.GRID_SPACE
            this.location.y = this.location.lastGrid.y * variables.GRID_SPACE
            this.location.futureGrid.x = this.location.nowGrid.x
            this.location.futureGrid.y = this.location.nowGrid.y
            this.move[1] = 0
            grid[this.location.nowGrid.x][this.location.nowGrid.y] = 3
        }else{
            grid[this.location.futureGrid.x][this.location.futureGrid.y] = 3
        }

        if(this.move[1] == 8){   
            obj.sprite.moveHorizontal(2)
            this.move[1] = 0
            this.move[0]++
            grid[this.location.nowGrid.x][this.location.nowGrid.y] = 0
            this.location.nowGrid.x = this.location.futureGrid.x
            this.location.nowGrid.y = this.location.futureGrid.y
            this.location.lastGrid.x = this.location.nowGrid.x
            this.location.lastGrid.y = this.location.nowGrid.y
        }
        if(this.move[0] == moveList.length){
            this.move[0] = 0
        }
        switch (moveList[this.move[0]]) {
            case 1:
                this.location.x += 8;
                changeDirection(obj, this.state.direction.right)
                this.location.futureGrid.x = attGridPosition(this.location.x, "positive")
                break;
            case 2:
                this.location.x -= 8;
                changeDirection(obj, this.state.direction.left)
                this.location.futureGrid.x = attGridPosition(this.location.x, "negative")
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