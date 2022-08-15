import React from 'react';
import './App.css';
import Navbar from "./components/Navbar"
import Main from './components/Main';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProfilePage from './components/ProfilePage';
import PostDisplayOverlay from './components/PostDisplayOverlay';
import NewPost from './components/NewPost';

function App() {
  let [showNewPost, setShowNewPost] = React.useState(false);
  React.useEffect(() => {
    if (showNewPost){
      document.body.style.overflow = 'hidden';
    }
    else{
      document.body.style.overflow = 'auto';
    }
  })
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={
            <>
              {showNewPost ? <NewPost show={setShowNewPost} /> : null}
              <MainContainer>
                <Navbar show={setShowNewPost} current={showNewPost} />
                <Main />
              </MainContainer>
            </>
          }>
          </Route>
          <Route exact path="/login" element={
            <Login />
          }>
          </Route>
          <Route exact path="/signup" element={
            <SignUp />
          }>
          </Route>
          <Route path="/post/:post" element={
            <>
              {showNewPost ? <NewPost show={setShowNewPost} /> : null}
              <MainContainer>
                <Navbar show={setShowNewPost} current={showNewPost} />
                <PostDisplayOverlay />
              </MainContainer>
            </>
          }>
          </Route>
          <Route path="/:profileName" element={
            <>
              {showNewPost ? <NewPost show={setShowNewPost} /> : null}
              <MainContainer>
                <Navbar show={setShowNewPost} current={showNewPost} />
                <ProfilePage />
              </MainContainer>
            </>
          }>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`

export default App;
