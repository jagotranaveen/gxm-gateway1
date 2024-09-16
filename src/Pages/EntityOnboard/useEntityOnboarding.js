import { useState } from "react";

const useEntityOnboarding = (steps = []) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleBack = () => {
    setActiveIndex((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex((prevActiveStep) =>
      Math.min(prevActiveStep + 1, steps.length - 1)
    );
  };
  const handleSave = () => {
    console.log("-------------save-------------");
  };

  return {
    handleBack,
    handleNext,
    handleSave,
    activeIndex,
  };
};

export default useEntityOnboarding;
