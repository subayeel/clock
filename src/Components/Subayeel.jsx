import React, { useEffect } from "react";

function Subayeel() {
  const addelem = () => {
    let data = [{ Hour: 11, Minute: 15, Type: "am", Id: 0 }];
    localStorage.setItem("item", JSON.stringify(data));
  };
  useEffect(() => {
    // addelem();
  }, []);
  return (
    <div>
      <button onClick={() => addelem()}>click</button>
    </div>
  );
}

export default Subayeel;
