import './App.css';
import Navbar from "./components/Navbar"
import Main from './components/Main';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProfilePage from './components/ProfilePage';
import PostDisplayOverlay from './components/PostDisplayOverlay';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={
            <MainContainer>
              <Navbar />
              <Main />
            </MainContainer>
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

            <MainContainer>
              <Navbar />
              <PostDisplayOverlay />
            </MainContainer>
          }>
          </Route>
          <Route path="/:profileName" element={
            <MainContainer>
              <Navbar />
              <ProfilePage />
            </MainContainer>
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
