import React, { useState } from "react";
import axios from "axios";
import { axiosCicicom } from "../../axios/axiosInstances";
import "./Form.css";
import { LOCALHOST_POST_EVENT_URL } from "../../axios/constants";

const Form = () => {
  const [formData, setFormData] = useState({
    eventId: "0",
    sensorId: "",
    timestamp: getCurrentTimestamp(),
    eventType: "",
    eventData: "",
  });

  function getCurrentTimestamp() {
    const now = new Date();
    // return now.toISOString().slice(0, 19).replace("T", " ");
    return now.toISOString();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosCicicom.post(
        LOCALHOST_POST_EVENT_URL,
        formData
      );
      console.log("POST request successful:", response.data);

      setFormData({
        eventId: "0",
        sensorId: "",
        eventType: "",
        eventData: "",
        timestamp: getCurrentTimestamp(),
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Submit Event Data</h2>
      <form onSubmit={handleSubmit}>
        {/* <div className="form-group">
          <label htmlFor="eventId">Event ID:</label>
          <input
            type="text"
            id="eventId"
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
            required
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="sensorId">Sensor ID:</label>
          <input
            type="text"
            id="sensorId"
            name="sensorId"
            value={formData.sensorId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="timestamp">Timestamp:</label>
          <input
            type="text"
            id="timestamp"
            name="timestamp"
            value={formData.timestamp}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventType">Event Type:</label>
          <input
            type="text"
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventData">Event Data:</label>
          <input
            type="text"
            id="eventData"
            name="eventData"
            value={formData.eventData}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
