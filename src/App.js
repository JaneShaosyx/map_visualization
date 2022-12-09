import USAStateBase from "./components/USAState/USAStateBase";
import { useUSAtlas } from "./actions/getUSA";
import { useStatesInfo } from "./actions/getStatesInfo";
import { useClustersInfo } from "./actions/getCluster";
import USAPoint from "./components/USAPoint/USAPoint";
import USAPointPredict from "./components/USAPointPredict/USAPointPredict";
import LineChart from "./components/LineChart/LineChart";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function App() {
    const USAtlas = useUSAtlas();
    const statesInfo = useStatesInfo();
    const clustersInfo = useClustersInfo();

    if (!USAtlas || !statesInfo || !clustersInfo) {
        return <pre>Loading...</pre>;
    }
    return (
        <div className="App">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ m: "5em auto auto 2em" }}
            >
                <Typography variant="h3" component="h2">
                    {"Test what place in US will you like during travel"}
                </Typography>
            </Box>
            <Container>
                <USAPointPredict
                    USAtlas={USAtlas}
                    clustersInfo={clustersInfo}
                />
                <USAPoint USAtlas={USAtlas} clustersInfo={clustersInfo} />
                <USAStateBase USAtlas={USAtlas} statesInfo={statesInfo} />
                <LineChart statesInfo={statesInfo} />
            </Container>
        </div>
    );
}

export default App;
