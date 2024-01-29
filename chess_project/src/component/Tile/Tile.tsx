import "./tile.css"

interface Props {
    f: number,
    r: number,
    image?:string
}

export default function Tile(props: Props) {

    return (
        <div className="tile"
            style={{
                height: "60px",
                width: "60px",
                backgroundColor: ((props.f + props.r) % 2) ? "#779954" : "#E1F0DA"
            }}
        >
           {props.image && <div className="piece" style={{
            backgroundImage:`url(${props.image})` 
           }}></div>}
        </div>
    )
}