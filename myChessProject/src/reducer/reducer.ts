
import { appState } from "../context/context";
import { actionType } from "./actionType";

export interface ActionInterface{
    type:string,
    payload?:any
}

export const reducer=(state:appState,action:ActionInterface):appState=>{
    switch(action.type){
        case actionType.NEW_MOVE:{
            let {position,turn}=state
     
            position=[
                ...position,
                action.payload
            ]
            turn = turn==='w'?'b':'w';
            return {
                ...state,
                position,
                turn
            }
        }

        case actionType.Generate_Candidates:{
            return{
                ...state,candidates:action.payload.candidates,activePiece:action.payload.piece
            }
        }

        case actionType.Clear_Candidates:{
            return{
                ...state,candidates:[],activePiece:action.payload.piece
            }
        }

        case actionType.Promotion_Update:{
            const {x,y,file,rank}=action.payload;
            const promotion:[number,number,number,number]=[x,y,file,rank]
            return{
                ...state,promotion
            }
        }
        case actionType.Promotion_Action:{
            let {position,turn}=state
     
            position=[
                ...position,
                action.payload
            ]
            turn = turn==='w'?'b':'w';
            return {
                ...state,
                position,
                turn
            }
        }


        default:{
            return state
        }
    }
}