export function changeDirection(obj, y){
    let x = (obj.sprite.x / obj.sprite.frame.width) + 1 == obj.sprite.columns - 1 ? 1  : (obj.sprite.x / obj.sprite.frame.width) + 1 
    obj.sprite.moveHorizontal(x)
    obj.sprite.moveVertical(y)
}