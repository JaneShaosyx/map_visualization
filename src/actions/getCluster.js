import { useState, useEffect } from "react";
import { csv } from "d3";

const csvFile =
    "https://gist.githubusercontent.com/JaneShaosyx/b6575791dcf3812e7fb504329c82a838/raw/c5f4a7f2c43a41f9ce1596d37b97a8bb1ae666a8/clusters.csv";

export const useClustersInfo = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv(csvFile).then(setData);
    }, []);

    return data;
};
