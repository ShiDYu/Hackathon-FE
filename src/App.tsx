import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Profile } from './login/updateProfile';
import { TweetList } from './Tweet/TweetList';
import { CreateTweet } from './Tweet/createTweets';
import { useEffect } from 'react';
import { firebaseConfig } from './firebase';
import { SignUp } from './login/SignUp';
import { SignIn } from './login/SignIn';
import { MantineProvider } from '@mantine/core';
import { Sidebar } from './Sidebar';
import { TweetPage } from './Tweet/TweetPage';


function App() {
  {/*useEffect(() => {
    console.log('Process.env', firebaseConfig);
  }, []);*/}
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
      <MantineProvider>
        <Router>
              <Routes>
                  {/* path="/profile"に一致するURLがアクセスされたときにProfileコンポーネントをレンダリングする */}
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="/tweets" element={<TweetList/>} />
                  <Route path="/create-tweet" element={<CreateTweet />} />
                  <Route path="/tweet/:id" element={<TweetPage />} />
                  {/* その他のすべてのURLパスに対してAuthコンポーネントをレンダリングする */}
                  <Route path="/" element={<SignIn />} />
              </Routes>
        </Router>
      </MantineProvider>
    </div>
  );
}

export default App;
