
import { useEffect, useRef, useState } from "react";
import Tile from "../Tile/Tile";
import "./chessboard.css"

export default function ChessBoard() {

    const [pieces, setPieces] = useState<Piece[] | undefined>();
    const [gridX, setGridX] = useState<number>(-2);
    const [gridY, setGridY] = useState<number>(-2);
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null)



    const chessboardRef = useRef<HTMLDivElement>(null)


    interface Piece {
        type: string,
        x: number,
        y: number
    }

    const board = [];
    const fileArr = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const rankArr = [1, 2, 3, 4, 5, 6, 7, 8];

    const grabPiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const element = e.target as HTMLElement;
        // let activePiece:HTMLElement=undefined;
        if (element.classList.contains("piece") && chessboardRef.current) {
            const minX = chessboardRef.current.offsetLeft + 35;
            const minY = chessboardRef.current.offsetTop + 35;
            const maxX = chessboardRef.current.offsetLeft + chessboardRef.current.clientWidth - 35;
            const maxY = chessboardRef.current.offsetTop + chessboardRef.current.clientHeight - 35;
            let x = Math.max(e.clientX, minX);
            x = Math.min(x, maxX)
            let y = Math.max(e.clientY, minY);
            y = Math.min(y, maxY);
            element.style.position = "absolute";
            element.style.left = `${x - 30}px`
            element.style.top = `${y - 30}px`
            setGridX(Math.floor((e.clientX - chessboardRef.current.offsetLeft) / 60));
            setGridY(Math.floor((480 - e.clientY + chessboardRef.current.offsetTop) / 60));
            // console.log(gridX, gridY);
            setActivePiece(element);
        }
    }

    const movePiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (activePiece && chessboardRef.current) {
            const minX = chessboardRef.current.offsetLeft + 25;
            const minY = chessboardRef.current.offsetTop + 25;
            const maxX = chessboardRef.current.offsetLeft + chessboardRef.current.clientWidth - 25;
            const maxY = chessboardRef.current.offsetTop + chessboardRef.current.clientHeight - 25;
            let x = Math.max(e.clientX, minX);
            x = Math.min(x, maxX)
            let y = Math.max(e.clientY, minY);
            y = Math.min(y, maxY)

            activePiece.style.position = "absolute";
            activePiece.style.left = `${x - 30}px`
            activePiece.style.top = `${y - 30}px`

        }
    }

    const dropPiece = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setActivePiece(null);
        if (chessboardRef.current) {
            const xx = Math.floor((e.clientX - chessboardRef.current.offsetLeft) / 60);
            const yy = Math.floor((480 - e.clientY + chessboardRef.current.offsetTop) / 60);

            if (pieces) {
                setPieces(pieces.map((p) => (
                    (p.x === gridX && p.y === gridY) ?
                        { type: p.type, x: xx, y: yy }
                        : p
                )))
            }
        }

    }


    useEffect(() => {
        const initialPieces = []
        for (let i = 0; i < 8; i++) {
            initialPieces.push({ type: "pawn_b", x: i, y: 6 });
            initialPieces.push({ type: "pawn_w", x: i, y: 1 });
        }
        for (let i = 0; i < 2; i++) {
            const bw = (i === 1) ? "b" : "w";
            const y = (i === 1) ? 7 : 0;
            initialPieces.push({ type: `rook_${bw}`, x: 0, y });
            initialPieces.push({ type: `rook_${bw}`, x: 7, y });
            initialPieces.push({ type: `knight_${bw}`, x: 1, y });
            initialPieces.push({ type: `knight_${bw}`, x: 6, y });
            initialPieces.push({ type: `bishop_${bw}`, x: 2, y });
            initialPieces.push({ type: `bishop_${bw}`, x: 5, y });
            initialPieces.push({ type: `king_${bw}`, x: 3, y });
            initialPieces.push({ type: `queen_${bw}`, x: 4, y });
        }
        setPieces(initialPieces);
    }, [])

    for (let r = rankArr.length - 1; r >= 0; r--) {
        for (let f = 0; f < fileArr.length; f++) {
            if (pieces) {
                const piece = pieces.find((p) => p.x === f && p.y === r);
                board.push(
                    <Tile
                        key={`${fileArr[f]}${rankArr[r]}`}
                        f={f}
                        r={r}
                        image={piece ? `assets/images/${piece.type}.png` : undefined}
                    />
                );
            }
        }
    }
    return (
        <div className="chessboard"
            ref={chessboardRef}
            onMouseDown={(e) => { grabPiece(e) }}
            onMouseMove={(e) => { movePiece(e) }}
            onMouseUp={(e) => { dropPiece(e) }}
            onMouseLeave={(e) => {setActivePiece(null)}}
        >
            {board}
        </div>

    )
}