import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./features/header/Header";
import Home from "./features/home/Home";
import Creator from "./features/signup/creator/Creator";
import Viewer from "./features/signup/viewer/Viewer";

function App() {
  return (
    <div className="h-screen max-w-screen-xl mx-auto">
      <Header />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup/creator" element={<Creator />} />
          <Route path="/signup/viewer" element={<Viewer />} />
          <Route
            path="*"
            element={
              <div className="h-screen flex items-center justify-center text-7xl">
                Opps! Route not found
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
