import React from "react"
import { Routes, Route, Link } from "react-router-dom";
import GoogleSheetSearchData from "./GoogleSheetEmail";
import GoogleSheetCreate from "./GoogleSheetCreate";
import Home from "./Home";


const App = () => {
  return (
<div>
      <nav>
        <Link to="/"></Link>
        <Link to="/information">Email Information</Link>
        <Link to="/create">generate csv</Link>
      </nav>
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