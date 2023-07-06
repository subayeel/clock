import React from "react";
import { indianHolidays } from "../data/indianHolidays";
import "../styles/holidays.css";
function Holidays() {
  return (
    <>
      <div className="holidays-container">
        <div className="holiday-card">
          <p>Holidays in your Region</p>
          <hr></hr>
          <table>
            <tbody>
              {indianHolidays.map((holid) => (
                <tr>
                  <td>{holid.holiday}</td>
                  <td>{holid.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Holidays;
