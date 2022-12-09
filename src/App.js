import USAStateBase from "./components/USAState/USAStateBase";
import { useUSAtlas } from "./actions/getUSA";
import { useStatesInfo } from "./actions/getStatesInfo";
import { useClustersInfo } from "./actions/getCluster";
import USAPoint from "./components/USAPoint/USAPoint";
import USAPointPredict from "./components/USAPointPredict/USAPointPredict";
import LineChart from "./components/LineChart/LineChart";
import Container from "@mui/material/Container";
import * as api from "./api/index";

function App() {
    const USAtlas = useUSAtlas();
    const statesInfo = useStatesInfo();
    const clustersInfo = useClustersInfo();

    if (!USAtlas || !statesInfo || !clustersInfo) {
        return <pre>Loading...</pre>;
    }
    return (
        <div className="App">
            <Container>
                <USAPointPredict
                    USAtlas={USAtlas}
                    clustersInfo={clustersInfo}
                />
                <LineChart statesInfo={statesInfo} />
                <USAStateBase USAtlas={USAtlas} statesInfo={statesInfo} />
                <USAPoint USAtlas={USAtlas} clustersInfo={clustersInfo} />
            </Container>
        </div>
    );
}

export default App;
