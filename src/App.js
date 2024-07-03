import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Table from "./components/Table/Table";
import MapWithData from "./components/Map/MapWithData";
import Header from "./components/Header/Header";
import "./App.css";
import TableInternal from "./components/Table/TableInternal";
import Form from "./components/Form/Form";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cicicom/table" element={<Table />} />
            <Route path="/internal/table" element={<TableInternal />} />
            <Route path="/cicicom/map" element={<MapWithData />} />
            <Route path="/internal/form" element={<Form />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
