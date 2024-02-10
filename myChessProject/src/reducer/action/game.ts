import { actionType } from "../actionType";

export const generateCandidates=({candidates,piece}:{candidates:[number,number][],piece:string})=>{
    return {
        type:actionType.Generate_Candidates,
        payload:{candidates,piece}
    }
}

export const clearCandidates=(piece:string)=>{
    return {
        type:actionType.Clear_Candidates,
        payload:piece
    }
}

export const promotionUpdate=(piece:string,x:number,y:number,file:number,rank:number)=>{
    return{
        type:actionType.Promotion_Update,
        payload:{piece,x,y,file,rank}
    }
}

export const promotionAction=(newPosition:string[][])=>{

    return {
        type:actionType.Promotion_Action,
        payload:newPosition
    }
}