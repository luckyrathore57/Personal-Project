import { useAppContext } from "../../context/context";
import { Promotion } from "./Promotion";
import './popup.css'

export function Popup() {

    const { appState } = useAppContext();
    if (appState.promotion[0]>=0) {
        return (
            <div className="popUp">
                <Promotion turn={appState.turn} x={appState.promotion[0]} />
            </div>
        )
    }
    return(
        <></>
    )

}

