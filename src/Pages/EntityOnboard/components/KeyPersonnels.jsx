import React, { useEffect } from "react";
const KeyPersonnels = () => {
  useEffect(() => {
    console.log("-------- This is KeyPersonnels. ---------");
  }, []);
  return (
    <div className="grid">
      <p>This is KeyPersonnels.</p>
    </div>
  );
};

export default KeyPersonnels;
