import React, { useEffect } from "react";

const ActiveServices = () => {
  useEffect(() => {
    console.log("-------- This is active services. ---------");
  }, []);
  return (
    <div className="grid">
      <p>This is active services.</p>
    </div>
  );
};

export default ActiveServices;
