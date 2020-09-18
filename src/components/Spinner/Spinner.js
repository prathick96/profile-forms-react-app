import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "./spinner.css";

const Spinner = (props) => {
  const { promiseInProgress } = usePromiseTracker({
    area: props.area,
    delay: 0
  });

  return (
    promiseInProgress && (
      <div className="spinner">
        <Loader type="TailSpin" color="#bf1650" height="100" width="100" />
      </div>
    )
  );
};

export default Spinner;
