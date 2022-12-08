import { useState, useEffect } from "react";
import { csv } from "d3";

const csvFile = "https://gist.githubusercontent.com/JaneShaosyx/717a90505abe201d67d15d10606e8de7/raw/a5efe91834b5ed4593896961671bd1b54c63ecf4/state_mean.csv";

export const useStatesInfo = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv(csvFile).then(setData);
    }, []);

    return data;
};
