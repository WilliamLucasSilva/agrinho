export class Sprite{
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