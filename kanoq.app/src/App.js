import "./App.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Content from "./Components/Content";

import { createPortal } from "react-dom";
import Notifications from "./Components/Notification/Notifications";

function App() {
  return (
    <div className="App">
      {createPortal(
        <Notifications />,
        document.getElementById("custom-notifications")
      )}
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
