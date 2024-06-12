import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignIn } from './SignIn';
import { Profile } from './updateProfile';
import { TweetList } from './TweetList';
import { CreateTweet } from './createTweets';
import { useEffect } from 'react';



function App() {
  useEffect(() => {
    console.log('Process.env', process.env.REACT_APP_API_URL);
  }, []);
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
                <Route path="/tweets" element={<TweetList/>} />
                <Route path="/create-tweet" element={<CreateTweet />} />
                {/* その他のすべてのURLパスに対してAuthコンポーネントをレンダリングする */}
                <Route path="/" element={<SignIn/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
