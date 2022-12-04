import USAStateBase from "./components/USAState/USAStateBase";
import { useUSAtlas } from "./actions/getUSA";
import { useStatesInfo } from "./actions/getStatesInfo";
import USAPoint from "./components/USAPoint/USAPoint";

function App() {
    const USAtlas = useUSAtlas();
    const statesInfo = useStatesInfo();

    if (!USAtlas || !statesInfo) {
        return <pre>Loading...</pre>;
    }
    return (
        <div className="App">
            <USAStateBase USAtlas={USAtlas} statesInfo={statesInfo} />
            <USAPoint USAtlas={USAtlas} />
        </div>
    );
}

export default App;
