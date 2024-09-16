import React from "react";
import PropTypes from "prop-types";
import "./stepper.scss";

const VerticalStepper = ({options,activeIndex}) => {
  return (
    <>
      {options.map((step, index) => (
        <div
          key={index}
          className={`step-item ${index <= activeIndex ? "active" : ""}`}
        >
          <div className="step-number">
            {index < activeIndex ? (
              <i className="pi pi-check" style={{ color: "white" }}></i>
            ) : (
              index + 1
            )}
          </div>
          <div className="step-label">{step.label}</div>
          {index < options.length - 1 && <div className="step-line"></div>}
        </div>
      ))}
    </>
  );
};
VerticalStepper.propTypes = {
    options: PropTypes.array.isRequired,
    activeIndex: PropTypes.number.isRequired,
  };
  
export default VerticalStepper;
