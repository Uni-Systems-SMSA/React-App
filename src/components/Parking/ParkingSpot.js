import React from "react";
import "./ParkingSpot.css";

const ParkingSpot = ({ spot }) => {
  return (
    <tr>
      <td>{spot.ParkingSpaceName}</td>
      <td>{spot.ZoneName}</td>
      <td>{spot.CityName}</td>
      <td>{spot.IsFree ? "Free" : "Occupied"}</td>
      <td>{spot.BatteryStatus}</td>
      <td>{new Date(spot.LastReport).toLocaleString()}</td>
    </tr>
  );
};

export default ParkingSpot;
