import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Table from "./components/Table/Table";
import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import "./App.css";
import TableTest from "./components/Table/TableTest";
import Form from "./components/Form/Form";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/table" element={<Table />} />
            <Route path="/table-test" element={<TableTest />} />
            <Route path="/map" element={<Map />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
