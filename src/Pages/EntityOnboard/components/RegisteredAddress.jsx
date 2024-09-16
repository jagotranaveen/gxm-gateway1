import React, { useEffect } from "react";
const RegisteredAddress = () => {
  useEffect(() => {
    console.log("-------- This is RegisteredAddress. ---------");
  }, []);
  return (
    <div className="grid">
      <p>This is RegisteredAddress.</p>
    </div>
  );
};
export default RegisteredAddress;
