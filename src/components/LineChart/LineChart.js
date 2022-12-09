import {
    scaleLinear,
    scaleTime,
    extent,
    timeFormat,
    axisBottom,
    select,
    axisLeft,
    min,
    max,
    line,
    area,
    curveMonotoneX,
} from "d3";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect, Fragment } from "react";
import Container from "@mui/material/Container";
import { AbbrToFull } from "../../constants/StateHash";
import "./styles.css";

const margin = { top: 40, right: 80, bottom: 60, left: 50 };
const width = 960;
const height = 320;

const LineChart = ({ statesInfo }) => {
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
    const states = Array.from(Object.keys(AbbrToFull));
    const months = Array.from(Array(12), (_, i) => i + 1);

    const [attribute, setAttribute] = useState(cols[0]);
    const [state, setState] = useState(states[0]);
    const [data, setData] = useState([]);
    const [yMinValue, setYMinValue] = useState(-1);
    const [yMaxValue, setYMaxValue] = useState(-1);

    useEffect(() => {
        setData(changeData());
    }, [attribute, state]);

    useEffect(() => {
        setYMaxValue(max(data, (d) => Number(d.value)));
        setYMinValue(min(data, (d) => Number(d.value)));
    }, [data]);

    const changeData = () => {
        let newData = [];
        statesInfo.forEach((d) => {
            if (d.STATE == state) {
                let obj = {};
                obj["month"] = d.MONTH;
                obj["value"] = Number(d[attribute]);
                newData.push(obj);
            }
        });
        return newData;
    };

    const handleAttriChange = (event) => {
        setAttribute(event.target.value);
    };

    const handleStateChange = (event) => {
        setState(event.target.value);
    };

    const color = "OrangeRed";

    const getX = scaleLinear().domain([1, 12]).range([25, width]);

    const getY = scaleLinear()
        .domain([yMinValue - 1, yMaxValue + 2])
        .range([height, 0]);

    const getXAxis = (ref) => {
        const xAxis = axisBottom(getX);
        select(ref).call(xAxis);
    };

    const getYAxis = (ref) => {
        const yAxis = axisLeft(getY).tickSize(-width).tickPadding(8);
        select(ref).call(yAxis);
    };

    const linePath = line()
        .x((d) => getX(d.month))
        .y((d) => getY(d.value))
        .curve(curveMonotoneX)(data);

    const areaPath = area()
        .x((d) => getX(d.month))
        .y0((d) => getY(d.value))
        .y1(() => getY(yMinValue - 1))
        .curve(curveMonotoneX)(data);

    return (
        <Box sx={{ m: '5em auto' }}>
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
                    <InputLabel>state</InputLabel>
                    <Select
                        value={state}
                        label="State"
                        onChange={handleStateChange}
                        autoWidth
                    >
                        {states.map((s, i) => {
                            return (
                                <MenuItem key={i} value={s}>
                                    {s}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Box>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                className="wrapper"
            >
                <svg width={width} height={height} className="lineChart">
                    // x- and y-axes
                    <g className="axis" ref={getYAxis} />
                    <g
                        className="axis xAxis"
                        ref={getXAxis}
                        transform={`translate(0,${height})`}
                    />
                    <text
                        transform={`translate(${width/2-4},${height})`}
                        dy="2em"
                        fill={'#666'}
                    >
                        {"month"}
                    </text>
                    // area and line paths
                    <path fill={color} d={areaPath} opacity={0.3} />
                    <path
                        strokeWidth={3}
                        fill="none"
                        stroke={color}
                        d={linePath}
                    />
                    // y-axis label
                    <text
                        transform={"rotate(-90)"}
                        x={0 - height / 2}
                        y={0 - margin.left}
                        dy="1em"
                        fill={'#666'}
                    >
                        {"value"}
                    </text>
                    {data.map((item, index) => {
                        return (
                            <g key={index}>
                                // hovering text
                                <text
                                    fill={"blue"}
                                    x={getX(item.month)}
                                    y={getY(item.value) - 20}
                                    textAnchor="middle"
                                >
                                    {Number(item.value).toFixed(2)}
                                </text>
                                // hovering circle
                                <circle
                                    cx={getX(item.month)}
                                    cy={getY(item.value)}
                                    r={4}
                                    fill={color}
                                    strokeWidth={0}
                                    stroke="#fff"
                                    style={{ transition: "ease-out .1s" }}
                                />
                            </g>
                        );
                    })}
                </svg>
            </Box>
        </Box>
    );
};

export default LineChart;
