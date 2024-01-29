import { useAppContext } from "../../context/context";
import copyPosition from "../../helper";
import { clearCandidates } from "../../reducer/action/game";
import { makeNewMove } from "../../reducer/action/move";
import Piece from "./Piece";
import './Pieces.css';
import { useRef } from "react";


const Pieces = () => {
    const { appState, dispatch } = useAppContext();
    const ref = useRef<HTMLDivElement>(null);

    const currentPosition: string[][] = appState.position[appState.position.length - 1];
    const candidates = appState.candidates;

    const calculateCordinate = (e: React.DragEvent): number[] => {
        const element = ref.current;
        const cords: { top: number, left: number, width: number } | undefined = element?.getBoundingClientRect();
        if (cords) {
            const x = Math.floor((e.clientX - cords.left) / 60);
            const y = Math.floor(8 - (e.clientY - cords.top) / 60);
            return [x, y];
        }
        return []
    }

    const isValidMove = (x: number, y: number) => {
        let ans = false;
        candidates.forEach((candi) => {
            if (x === candi[1] && y === candi[0]) {
                ans = true;
                return;
            }
        })
        return ans;
    }
    const makeNewPosition = (rank: string, file: string, x: number, y: number, piece: string): string[][] => {
        const rankNum = Number(rank);
        const fileNum = Number(file);
        if (piece[1] === 'p' && y !== rankNum && x !== fileNum) {
            const newPosition = copyPosition(currentPosition);
            newPosition[rankNum][fileNum] = '';
            newPosition[rankNum][x]='';
            newPosition[y][x] = piece;
            return newPosition;

        }
        else if(piece[1]==='k' && Math.abs(fileNum-x)>1){
            const [change,shift]=(x-fileNum>0)?[7,-1]:[0,1];
            
            const newPosition = copyPosition(currentPosition);
            newPosition[rankNum][fileNum] = '';
            newPosition[y][x+shift]=newPosition[y][change];
            newPosition[y][change]='';
            newPosition[y][x] = piece;
            return newPosition;
        }
        else {
            const newPosition = copyPosition(currentPosition);
            newPosition[rankNum][fileNum] = '';
            newPosition[y][x] = piece;
            return newPosition;
        }
    }
    const move = (e: React.DragEvent) => {
        const [piece, rank, file] = e.dataTransfer.getData('text').split(',');
        const [x, y] = calculateCordinate(e);
        if (isValidMove(x, y)) {
            const newPosition = makeNewPosition(rank, file, x, y, piece)
            const actionForNewMove = makeNewMove(newPosition);
            dispatch(actionForNewMove);
        }
        dispatch(clearCandidates(piece));
    }

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        move(e);
    }

    const onDragOver = (e: React.DragEvent) => { e.preventDefault() }

    return <div
        className="pieces"
        onDrop={onDrop}
        onDragOver={onDragOver}
        ref={ref}
    >
        {currentPosition.map((rank, i) => (
            rank.map((p, j) => (
                (p === '') ? null :
                    <Piece key={`${i}${j}`} rank={i} piece={currentPosition[i][j]} file={j} />
            ))
        ))}
    </div>
}

export default Pieces;