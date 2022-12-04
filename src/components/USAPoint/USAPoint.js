import {
    geoAlbersUsa,
    geoPath,
    max,
    interpolateBlues,
    scaleSequential,
} from "d3";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { useState, useEffect, Fragment } from "react";
import Container from "@mui/material/Container";
// import "./styles.css";
import { AbbrToFull } from "../../constants/StateHash";

const projection = geoAlbersUsa();
const path = geoPath(projection);

const width = 960;
const height = 500;

const USAPoint = ({ USAtlas: { states, interiors } }) => {
    const [month, setMonth] = useState(1);
    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };
    const months = Array.from(Array(12), (_, i) => i + 1);
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
            <svg width={width} height={height}>
                <g className="marks">
                    {states.features.map((feature) => {
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
        </Container>
    );
};

export default USAPoint;
