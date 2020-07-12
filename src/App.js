import React from 'react';
import './App.scss';
import './components/Sidebar';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import LoginPage from "./components/content/LoginPage";

function App() {
  return (
    <div className="wrapper">
      <Sidebar />
        <div className="main-panel" id="main-panel">
            <NavBar/>
            <Header/>
            <div className="content">
                <LoginPage/>
            </div>
        </div>
    </div>
  );
}

export default App;
