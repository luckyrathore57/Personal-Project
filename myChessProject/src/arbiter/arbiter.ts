import { MovesInterface, getBisopMove, getKingMove, getKnightMove, getPawnMove, getQueenMove, getRookMove } from "./getMoves";
// import { movePawn, movePiece } from "./movesUse";

export const getMove = ({ currentPosition,prevPosition,castling, piece, file, rank }: MovesInterface) => {
    const pieceType = piece[1]
    switch (pieceType) {
        case 'r': {
            return getRookMove({ currentPosition, piece, file, rank });
        }
        case 'b':{
            return getBisopMove({currentPosition,piece,file,rank});
        }
        case 'n':{
            return getKnightMove({currentPosition,piece,file,rank})
        }
        case 'q':{
            return getQueenMove({currentPosition,piece,file,rank})
        }
        case 'k':{
            return getKingMove({currentPosition,castling,piece,file,rank})
        }
        case 'p':{
            return getPawnMove({currentPosition,prevPosition,piece,file,rank})
        }
        default:{
            return [];
        }

    }
}

























// export const isInCheck=({position,positionAfterMove,turn,castling}:{position:string[][],positionAfterMove:string[][],turn:string,castling:string}):boolean=>{
//     let ans=true;
//     const enemy=(turn==='w')?'b':'w';
//     const enemyPieces=getPieces({position,player:enemy});
//     const kigPosition=getKingPosition({position,player:turn});
//     const enemyMoves = enemyPieces.reduce((acc,p) => {acc = [
//         ...acc,
//         ...getMove({currentPosition:positionAfterMove,prevPosition:position,castling,...p})
//     ]}, [])

//     return ans;
// }

// export const getPieces=({position,player}:{position:string[][],player:string}):{piece:string,rank:number,file:number}[]=>{
//     const enemyPieces:{piece:string,rank:number,file:number}[]=[];
//     for(let i=0;i<8;i++){
//         for(let j=0;j<8;j++){
//             if(position[i][j].startsWith(player)){
//                 enemyPieces.push({piece:position[i][j],rank:i,file:j});
//             }
//         }
//     }

//     return enemyPieces
// }

// export const getKingPosition=({position,player}:{position:string[][],player:string}):[number,number]{
//     const kingPos:[number,number]=[-1,-1];
//     for(let i=0;i<8;i++){
//         for(let j=0;j<8;j++){
//             if(position[i][j]===`${player}k`){
//                 kingPos[0]=j;
//                 kingPos[1]=i;
//                 return kingPos;
//             }

//         }
//     }
//     return kingPos;
// }

// // export const candidateMoveforCheck=({position,enemyPieces}:{position:string[][],enemyPieces:{piece:string,rank:number,file:number}[]}):[number,number][]=>{
// //     let  moves:[number,number][]=[];
// //     const length=enemyPieces.length;
// //     for(let i=0;i<length;i++){
// //         const {piece,rank,file}=enemyPieces[i];
// //         moves=moves.concat(performMoves(position,piece,rank,file));
// //     }
// //     return moves;
// // }

// export const performMoves=(position:string[][],piece:string,rank:number,file:number,x:number,y:number):string[][]=>{
//     const piecetype=piece[1];
//         if(piecetype==='p'){
//             return movePawn({position,piece,rank,file,x,y});
//         }
//         else{
//             return movePiece({position,piece,rank,file,x,y});
//         }
        
// }