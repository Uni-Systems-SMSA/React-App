// src/components/Map/MapWithData.js

import React, { useState, useEffect } from "react";
import Map from "./Map";
import {
  CICICOM_LOGIN_URL,
  CICICOM_LOGIN_TOKEN,
  CICICOM_PARKING_SENSORS_URL,
  CICICOM_OATH,
} from "../../axios/constants";
import { axiosCicicom } from "../../axios/axiosInstances";

const MapWithData = ({ visibleSpots }) => {
  const [data, setData] = useState([]);
  const [authToken, setAuthToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axiosCicicom.post(
          CICICOM_LOGIN_URL,
          CICICOM_LOGIN_TOKEN
        );
        if (response.data.Success) {
          setAuthToken(response.data.Result.TokenValue);
        } else {
          setError("Failed to acquire token");
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (authToken) {
      const fetchData = async () => {
        try {
          const response = await axiosCicicom.get(CICICOM_PARKING_SENSORS_URL, {
            headers: {
              Authorization: `${CICICOM_OATH} ${authToken}`,
            },
          });
          setData(response.data.Result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [authToken]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  return <Map data={data} visibleSpots={visibleSpots} />;
};

export default MapWithData;
