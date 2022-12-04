import { useState, useEffect } from "react";
import { csv } from "d3";

const csvFile = "https://gist.githubusercontent.com/JaneShaosyx/717a90505abe201d67d15d10606e8de7/raw/b1fc59770a52b23c2e9df84059ce50340e3aadd0/state_mean.csv";

export const useStatesInfo = (month) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv(csvFile).then(setData);
    }, []);

    return data;
};
