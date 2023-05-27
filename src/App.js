import React from "react"
import { Routes, Route, Link } from "react-router-dom";
import GoogleSheetSearchData from "./GoogleSheetEmail";
import GoogleSheetCreate from "./GoogleSheetCreate";


const App = () => {
  return (
<div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/information">Email Information</Link>
        <Link to="/create">generate csv</Link>
        {/* <Link to="/instructions">Instructions</Link> */}
      </nav>
      <div>
        <Routes>
          <Route path="/information" element={<GoogleSheetSearchData />} />
          <Route path="/create" element={<GoogleSheetCreate />} />
          {/* <Route path="/instructions" element={<HowToUse />} /> */}
        </Routes>
      </div>
    </div>
  )
}

export default App