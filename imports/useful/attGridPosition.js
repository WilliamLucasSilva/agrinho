import variables from "./variables.js"

export function attGridPosition(position, type){
    if(type === "negative"){
        return Math.floor(position / variables.GRID_SPACE)
    }else{
        return Math.ceil(position / variables.GRID_SPACE)
    }
}