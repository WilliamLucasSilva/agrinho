import variables from "../../useful/variables.js";
import { changeDirection } from "../../useful/changeDirection.js";

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
        if(this.move[1] == 8){
            this.move[0]++
            this.move[1] = 0
            obj.sprite.moveHorizontal(2)
        }
        if(this.move[0] == moveList.length){
            this.move[0] = 0
        }
        switch (moveList[this.move[0]]) {
            case 0:
                this.location.lastGrid.x = this.location.nowGrid.x
                this.location.nowGrid.x = this.location.futureGrid.x
                break
            case 1:
                this.location.x += 8;
                changeDirection(obj, this.state.direction.right)
                if(this.location.futureGrid.x - 1 != this.location.nowGrid.x){
                    this.location.futureGrid.x += 1
                }
                break;
            case 2:
                this.location.x -= 8;
                changeDirection(obj, this.state.direction.left)
                if(this.location.futureGrid.x + 1 != this.location.nowGrid.x){
                    this.location.futureGrid.x -= 1
                }
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