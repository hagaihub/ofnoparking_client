import React, { useEffect, useState, useRef } from "react";
import useOnScreen from "../_helpers/useOnScreen.js";

//let IsRender = false;
const NumberCounter = (props) => {
  // label of counter
  // number to increment to
  // duration of count in seconds
  const { label, number, duration } = props;
  // number displayed by component
  const [count, setCount] = useState("0");
  const ref = useRef();
  const onScreen = useOnScreen(ref);
  const ref_render = useRef({
    renderCount: 0,
  });

  useEffect(() => {
    let timer;
    if (onScreen && ref_render.current.renderCount < 2) {
      let start = 0;
      // first three numbers from props
      const end = parseInt(number.substring(0, 3));
      // if zero, return
      if (start === end) return;
      ref_render.current.renderCount += 1;
      // find duration per increment
      let totalMilSecDur = parseInt(duration);
      let incrementTime = (totalMilSecDur / end) * 1000;
      
      // timer increments start counter
      // then updates count
      // ends if start reaches end
      timer = setInterval(() => {
        start += 1;
        setCount(String(start) + number.substring(3));
        if (start === end) {
          clearInterval(timer);
        }
      }, incrementTime);
    }

    return () => {
      clearInterval(timer);
    };
    // dependency array
  }, [number, duration, onScreen]);

  return (
    <>
      <span ref={ref}>
        {label} {count}
      </span>
    </>
  );
};

export default NumberCounter;
