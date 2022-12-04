import { useState, useEffect } from "react";
import { csv } from "d3";

const csvFile = "../data/month_1.csv";

export const getCluster = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv(csvFile).then(setData);
    }, []);

    return data;
};
