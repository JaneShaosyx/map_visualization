import { geoAlbersUsa, geoPath, interpolateSinebow, scaleSequential } from "d3";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { useState, useEffect, Fragment } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import "./styles.css";
import { AbbrToFull } from "../../constants/StateHash";
import { predictData } from "../../constants/predictData";
import * as api from "../../api/index";
import Button from "@mui/material/Button";

const projection = geoAlbersUsa();
const path = geoPath(projection);

const width = 960;
const height = 500;

const USAPointPredict = ({ USAtlas: { states, interiors }, clustersInfo }) => {
    const attributes = Array.from(Object.keys(predictData));

    const [curData, setCurData] = useState(clustersInfo[0]);
    const [cluster, setCluster] = useState(1);
    const [curCluster, setCurCluster] = useState(clustersInfo);
    const [formData, setFormData] = useState({
        MonthlyAvgPreciptation: predictData["MonthlyAvgPreciptation"][0],
        MonthlyAvgSnowfall: predictData["MonthlyAvgSnowfall"][0],
        MonthlyTotalSnowfall: predictData["MonthlyTotalSnowfall"][0],
        MonthlyAvgDaylight: predictData["MonthlyAvgDaylight"][0],
        MonthlyAvgTemp: predictData["MonthlyAvgTemp"][0],
        MonthlyAvgTempDiff: predictData["MonthlyAvgTempDiff"][0],
        MonthlyAvgRelativeHumidity:
            predictData["MonthlyAvgRelativeHumidity"][0],
        MonthlyAvgWindSpeed: predictData["MonthlyAvgWindSpeed"][0],
        month: 1,
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        let newClusterData = [];
        for (const d of clustersInfo) {
            if (d.MONTH == formData.month && d.cluster == cluster) {
                newClusterData.push(d);
            }
        }
        setCurCluster(newClusterData);
    }, [cluster]);

    // api.getPrediction({ area: 2.8 }).then((d) => console.log(d));

    const months = Array.from(Array(12), (_, i) => i + 1);
    const myColor = scaleSequential()
        .domain([1, 10])
        .interpolator(interpolateSinebow);

    const handleMouseOver = (e, data) => {
        setCurData(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.getPrediction(formData).then((d) => {
            setCluster(d.data);
        });
    };

    return (
        <Box sx={{ m: "5em auto" }}>
            <form onSubmit={handleSubmit}>
                {attributes.map((attr, i) => {
                    return (
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <FormControl sx={{ m: 2, minWidth: 240 }}>
                                <InputLabel>{attr}</InputLabel>
                                <Select
                                    name={attr}
                                    label={attr}
                                    onChange={changeHandler}
                                    value={formData[attr]}
                                    autoWidth
                                >
                                    {predictData[attr].map((v, i) => {
                                        return (
                                            <MenuItem key={i} value={v}>
                                                {v}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                    );
                })}
                <Box display="flex" alignItems="center" justifyContent="center">
                    <FormControl sx={{ m: 2, minWidth: 240 }}>
                        <InputLabel>month</InputLabel>
                        <Select
                            label="Month"
                            name={"month"}
                            value={formData["month"]}
                            onChange={changeHandler}
                            autoWidth
                        >
                            {months.map((m, i) => {
                                return (
                                    <MenuItem key={i} value={m}>
                                        {m}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Button variant="outlined" type="submit">
                        Get Predict
                    </Button>
                </Box>
            </form>
            <Box display="flex" alignItems="center" justifyContent="center">
                <Typography>{`state: ${AbbrToFull[curData?.STATE]} longitude: ${
                    curData?.LONGITUDE
                } latitude: ${curData?.LATITUDE}`}</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
                <svg width={width} height={height}>
                    <g className="marks4">
                        {states.features.map((feature) => {
                            return (
                                <path
                                    className="states4"
                                    key={feature.id}
                                    d={path(feature)}
                                />
                            );
                        })}
                        <path className="interiors4" d={path(interiors)} />
                        {curCluster.map((d) => {
                            const [x, y] = projection([
                                d.LONGITUDE,
                                d.LATITUDE,
                            ]);
                            return (
                                <circle
                                    cx={x}
                                    cy={y}
                                    r={5}
                                    fill={myColor(d.cluster - 1)}
                                    onMouseOver={(e) => handleMouseOver(e, d)}
                                    key={`${d.STATION}_${d.YEAR}`}
                                />
                            );
                        })}
                    </g>
                </svg>
            </Box>
        </Box>
    );
};

export default USAPointPredict;
