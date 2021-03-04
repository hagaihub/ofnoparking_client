import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

function valuetext(value) {
  return `${value}m`;
}

function InputRange(props) {
  //props.rad, props.setrad,  props.inpLblText
  const [radius, setRadius] = useState(props.rad);

  const handleChange = (event, newValue) => {
    props.setrad(newValue);
    setRadius(newValue);
  };

  return (
    <>
      <div>
        <Typography id="discrete-slider">
          Within a {props.inpLblText} of {radius}m
        </Typography>
        <Slider
          value={radius}
          defaultValue={radius}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={100}
          marks
          min={100}
          max={1000}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default InputRange;
