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