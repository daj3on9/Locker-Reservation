import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import FirstFloor from "../asset/map_1F.png";
import SecondFloor from "../asset/map_2F.png";

export function Map() {
    const [floor, setFloor] = React.useState("");

    const handleChange = (event) => {
        setFloor(event.target.value);
    };
    return (
        <div>
            <div>
                {floor === 1 && <img src={FirstFloor} alt="1층" />}
                {floor === 2 && <img src={SecondFloor} alt="2층" />}
            </div>
            <div style={{ backgroundColor: "#ffffff", width: "20%" }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Floor</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={floor}
                        label="Age"
                        onChange={handleChange}>
                        <MenuItem value={1}> 1층 </MenuItem>
                        <MenuItem value={2}> 2층 </MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}

export default Map;
