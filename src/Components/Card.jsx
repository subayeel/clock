import React, { useState, useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
function Card({ Hour, Minute, Type, id, data, setData }) {
  // const [data, setData] = useState(
  //   JSON.parse(localStorage.getItem("item") || [])
  // );
  const handleDelete = (id) => {
    let arr = data?.filter((item, index) => {
      if (index != id) {
        return item;
      }
    });
    setData(arr);
    console.log(data, arr);
    localStorage.setItem("item", JSON.stringify(arr));
  };
  return (
    <div className="alarm-card_container">
      <div className="single_card_container">
        <div className="card_hour">
          {Hour}:{Minute} {Type}
        </div>
        <div className="del-btn-con">
          <button className="del-btn" onClick={() => handleDelete(id)}>
            Remove{" "}
            <DeleteForeverIcon
              sx={{ backgroundColor: "rgb(251, 72, 72)", marginTop: "-3px" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
