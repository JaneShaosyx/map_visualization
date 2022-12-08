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

const projection = geoAlbersUsa();
const path = geoPath(projection);

const width = 960;
const height = 500;

const USAPoint = ({ USAtlas: { states, interiors }, clustersInfo }) => {
    const [month, setMonth] = useState(1);
    const [curData, setCurData] = useState(clustersInfo[0]);
    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };
    const months = Array.from(Array(12), (_, i) => i + 1);
    const myColor = scaleSequential()
        .domain([1, 10])
        .interpolator(interpolateSinebow);

    const handleMouseOver = (e, data) => {
        setCurData(data);
    };

    return (
        <Container>
            <Box display="flex" alignItems="center" justifyContent="center">
                <FormControl sx={{ m: 2, minWidth: 120 }}>
                    <InputLabel>month</InputLabel>
                    <Select
                        value={month}
                        label="Month"
                        onChange={handleMonthChange}
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
                <Typography>{`state: ${AbbrToFull[curData?.STATE]} longitude: ${
                    curData?.LONGITUDE
                } latitude: ${curData?.LATITUDE}`}</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
                <svg width={width} height={height}>
                    <g className="marks2">
                        {states.features.map((feature) => {
                            return (
                                <path
                                    className="states2"
                                    key={feature.id}
                                    d={path(feature)}
                                />
                            );
                        })}
                        <path className="interiors2" d={path(interiors)} />
                        {clustersInfo.map((d) => {
                            if (d.MONTH == month) {
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
                                        onMouseOver={(e) =>
                                            handleMouseOver(e, d)
                                        }
                                        key={`${d.STATION}_${d.YEAR}`}
                                    />
                                );
                            }
                        })}
                    </g>
                </svg>
            </Box>
        </Container>
    );
};

export default USAPoint;
