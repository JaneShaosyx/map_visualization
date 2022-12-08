import USAStateBase from "./components/USAState/USAStateBase";
import { useUSAtlas } from "./actions/getUSA";
import { useStatesInfo } from "./actions/getStatesInfo";
import { useClustersInfo } from "./actions/getCluster";
import USAPoint from "./components/USAPoint/USAPoint";

function App() {
    const USAtlas = useUSAtlas();
    const statesInfo = useStatesInfo();
    const clustersInfo = useClustersInfo();

    if (!USAtlas || !statesInfo || !clustersInfo) {
        return <pre>Loading...</pre>;
    }
    return (
        <div className="App">
            <USAStateBase USAtlas={USAtlas} statesInfo={statesInfo} />
            <USAPoint USAtlas={USAtlas} clustersInfo={clustersInfo} />
        </div>
    );
}

export default App;
