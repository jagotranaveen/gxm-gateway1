import React, { useEffect } from "react";
const GeneralInformation = () => {
  useEffect(() => {
    console.log("-------- This is General Information. ---------");
  }, []);
  return (
    <div className="grid">
      <p>This is General Information.</p>
    </div>
  );
};

export default GeneralInformation;
