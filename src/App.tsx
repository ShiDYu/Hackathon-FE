import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignIn } from './SignIn';
import { Profile } from './updateProfile';



function App() {
  return (
    <div className="App">
     {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */}
      <Router>
            <Routes>
                {/* path="/profile"に一致するURLがアクセスされたときにProfileコンポーネントをレンダリングする */}
                <Route path="/profile" element={<Profile/>} />

                {/* その他のすべてのURLパスに対してAuthコンポーネントをレンダリングする */}
                <Route path="/" element={<SignIn/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
