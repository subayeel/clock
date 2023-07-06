import React, { useState, useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
function Card({ time, id, addata, arr }) {
  const [load, setload] = useState(false);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("item") || [])
  );
  const handleDelete = (ind) => {
    let tmp = arr?.filter((item, index) => {
      if (index != ind) {
        return item;
      }
    });
    addata(tmp);
    setData(arr);
    console.log(data, arr);
    localStorage.setItem("item", JSON.stringify(tmp));
    // loadagain(true);
  };
  useEffect(() => {}, [load]);
  return (
    <div className="alarm-card_container">
      <div className="single_card_container">
        <div className="card_hour">
          {time.split(":")[0] +
            ":" +
            time.split(":")[1] +
            " " +
            time.split(":")[2]}
        </div>
        <div className="del-btn-conn">
          <button className="del-btn" onClick={() => handleDelete(id)}>
            <DeleteForeverIcon
              sx={{ backgroundColor: "rgb(251, 72, 72)", height: "20px" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
