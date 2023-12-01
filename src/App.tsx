import TopNavbar from "./components/TopNavbar";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Learn from "./pages/Learn";
import Review from "./pages/Review";
import News from "./pages/News";

function App() {
  return (
    <>
      <TopNavbar />
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/review" element={<Review />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
