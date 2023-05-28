import React from "react"
import { Routes, Route, Link } from "react-router-dom";
import GoogleSheetSearchData from "./GoogleSheetEmail";
import GoogleSheetCreate from "./GoogleSheetCreate";
import Home from "./Home";
import "./App.css"


const App = () => {
  return (
    <div>
      <header>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/information">Email Information</Link>
        <Link to="/create">CSV</Link>
      </nav>
    </header>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/information" element={<GoogleSheetSearchData />} />
          <Route path="/create" element={<GoogleSheetCreate />} />
          {/* <Route path="*" element={<useNavigate to ="/Home" />} /> */}
        </Routes>
      </div>
    </div>
  )
}

export default App