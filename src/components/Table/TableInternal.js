import React, { useState, useEffect } from "react";
import { axiosLocalhost } from "../../axios/axiosInstances";
import { LOCALHOST_GET_EVENTS_URL } from "../../axios/constants";
import "./Table.css";

const TableInternal = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosLocalhost.get(LOCALHOST_GET_EVENTS_URL);
        setEvents(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <div className="table-container">
      <h2>Test Table</h2>
      <table>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Sensor ID</th>
            <th>Timestamp</th>
            <th>Event Type</th>
            <th>Event Data</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.eventId}</td>
              <td>{event.sensorId}</td>
              <td>{event.timestamp}</td>
              <td>{event.eventType}</td>
              <td>{event.eventData}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableInternal;
