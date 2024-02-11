import './Board.css'
import { Tile } from './Tile';
import { getCharacter } from '../../helper';
import Ranks from './bits/Ranks';
import Files from './bits/Files';
import Pieces from '../pieces/Pieces';
import { useAppContext } from '../../context/context';
import { Popup } from '../popup/Popup';

function Board() {
    const ranks: number[] = new Array(8).fill(0).map((rank, i) => 8 - i);
    const files: number[] = new Array(8).fill(0).map((file, i) => i + 1);
    const { appState } = useAppContext();
    const { candidates,check } = appState;
    const currentPosition=appState.position[appState.position.length-1];
    // console.log(candidates);
    
    const getClassName=(i:number,j:number):string=>{
        let classt=""
        candidates.forEach((candi) => {  
            if (i === candi[0] && j === candi[1]) {
                if(!currentPosition[i][j]){
                    classt = "candidate";
                    return;
                }
                else{
                    classt= "candidate attack"
                    return;
                }
            }
        })

        if(check && i===Number(check[1]) && j===Number(check[2])){
            classt=`${classt} check`
        }
        return classt;
    }
    
    return (
        <div className='board'>
            <Ranks ranks={ranks} />
            <div className='tiles'>
                {
                    ranks.map((rank, i) => (
                        files.map((file, j) => (
                            <Tile key={`${getCharacter(file)}${rank}`} className={getClassName(rank-1,file-1)} rank={rank} file={file} />
                        ))
                    ))}
            </div>

            <Pieces />
            <Popup/>

            <Files files={files}></Files>
        </div>
    )
}

export default Board;