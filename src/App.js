import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Data } from "./Page/Data";
import { Report } from "./Page/Report";
import AspectPage from "./Page/AspectPage";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Report />} />
          <Route path="/report" element={<Report />} />
          <Route path="/data" element={<Data />} />
          <Route path="/aspect-based" element={<AspectPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
