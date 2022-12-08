import {
    geoAlbersUsa,
    geoPath,
    interpolateBlues,
    interpolateYlGnBu,
    scaleSequential,
    scaleLinear,
} from "d3";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect, Fragment } from "react";
import Container from "@mui/material/Container";
import "./styles.css";
import { AbbrToFull } from "../../constants/StateHash";

const projection = geoAlbersUsa();
const path = geoPath(projection);

const width = 960;
const height = 500;

const USAStateBase = ({ USAtlas: { states, interiors }, statesInfo }) => {
    const [attribute, setAttribute] = useState("MonthlyAvgTemp");
    const [month, setMonth] = useState(1);
    const [dataMap, setDataMap] = useState(new Map());
    const [maxValue, setMaxValue] = useState(-100);
    const [minValue, setMinValue] = useState(100);
    const [stateData, setStateData] = useState(null);

    useEffect(() => {
        let newMap = changeDataMap();
        setDataMap(newMap);
    }, [month, attribute]);

    const changeDataMap = () => {
        const newMap = new Map();
        let max = -100;
        let min = 100;
        statesInfo.forEach((d) => {
            if (d.MONTH == month) {
                newMap.set(AbbrToFull[d.STATE], d[attribute]);
                max = Math.max(max, d[attribute]);
                min = Math.min(min, d[attribute]);
            }
        });
        setMaxValue(Number(max).toFixed(2));
        setMinValue(Number(min).toFixed(2));
        return newMap;
    };

    const handleAttriChange = (event) => {
        setAttribute(event.target.value);
    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleMouseOver = (e, data) => {
        setStateData(Number(data).toFixed(2));
    };

    const colorScale = scaleSequential(interpolateBlues).domain([
        minValue,
        maxValue,
    ]);

    const cols = [
        "MonthlyMaxPrecip",
        "MonthlyTotalSnowfall",
        "MonthlyMaxSnowfall",
        "MonthlyAvgTemp",
        "MonthlyAvgDaylight",
        "MonthlyAvgTempDiff",
        "MonthlyAvgPreciptation",
        "MonthlyAvgRelativeHumidity",
        "MonthlyAvgWindSpeed",
        "MonthlyAvgPeakWindSpeed",
        "MonthlyAvgSnowDepth",
        "MonthlyAvgSnowfall",
        "MonthlyMaxTempDiff",
        "MonthlyMinDailyTempDiff",
    ];

    const months = Array.from(Array(12), (_, i) => i + 1);

    return (
        <Container>
            <Box display="flex" alignItems="center" justifyContent="center">
                <FormControl sx={{ m: 2, minWidth: 120 }}>
                    <InputLabel>attribute</InputLabel>
                    <Select
                        value={attribute}
                        label="Attribute"
                        onChange={handleAttriChange}
                        autoWidth
                    >
                        {cols.map((c, i) => {
                            return (
                                <MenuItem key={i} value={c}>
                                    {c}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
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
                <Typography>{`max: ${maxValue} min: ${minValue} data: ${stateData}`}</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
                <svg width={width} height={height}>
                    <g className="marks">
                        {dataMap
                            ? states.features.map((feature) => {
                                  const data = dataMap.get(
                                      feature.properties.name
                                  );
                                  return (
                                      <path
                                          className="states"
                                          key={feature.id}
                                          d={path(feature)}
                                          fill={colorScale(data)}
                                          onMouseOver={(e) =>
                                              handleMouseOver(e, data)
                                          }
                                      />
                                  );
                              })
                            : states.features.map((feature) => {
                                  return (
                                      <path
                                          className="states"
                                          key={feature.id}
                                          d={path(feature)}
                                      />
                                  );
                              })}
                        <path className="interiors" d={path(interiors)} />
                    </g>
                </svg>
            </Box>
        </Container>
    );
};

export default USAStateBase;
