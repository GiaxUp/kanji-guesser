import TopNavbar from "./components/TopNavbar";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Review from "./pages/Review";
import History from "./pages/History";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style/App.css";

function App() {
  return (
    <>
      <TopNavbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/review" element={<Review />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
