import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/layout/Nav";
import Beerlist from "./components/BeerList";
import LoginPage from "./components/login/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import Admin from "./components/admin/Admin";
import Beerdetail from "./components/BeerDetail";
import Contact from "./components/Contact";
import Favourites from "./components/Favourites";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Nav />
          <Routes>
            <Route exact path="/" element={<Beerlist />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route path="/detail/:id" element={<Beerdetail />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/favourites" element={<Favourites />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
