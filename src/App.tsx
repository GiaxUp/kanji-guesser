import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { KanjiProvider } from "./context/KanjiContext";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { KanjiModal } from "./components/kanji/KanjiModal";

import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Practice from "./pages/Practice";
import Review from "./pages/Review";
import Dictionary from "./pages/Dictionary";
import History from "./pages/History";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import "./style/App.css";

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <KanjiProvider>
      <Router>
        <ScrollToTop />
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/review" element={<Review />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <KanjiModal />
      </Router>
    </KanjiProvider>
  );
}

export default App;
