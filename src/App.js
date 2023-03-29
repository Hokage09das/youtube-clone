import React, { useState } from 'react';

import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import HomeScreen from './screens/home_screen/HomeScreen';
import LoginScreen from './screens/login_screen/LoginScreen';

import { PrivateRoute } from './routes';

import './_app.scss';
import WatchScreen from './screens/watch-screen/WatchScreen';
import SearchScreen from './screens/search_screen/SearchScreen';

const Layout = ({ children }) => {
  const [isSidebar, setIsSidebar] = useState(false);

  const handleToggleSidebar = () => setIsSidebar((prev) => !prev);
  return (
    <>
      <Header toggleSidebar={handleToggleSidebar} />
      <div className='app_container '>
        <Sidebar
          isSidebar={isSidebar}
          toggleSidebar={handleToggleSidebar}
        />
        <Container
          fluid
          className='app_main '
        >
          {children}
        </Container>
      </div>
    </>
  );
};

const App = () => {
  const { accessToken } = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <PrivateRoute
                Component={<HomeScreen />}
                fallbackPath='/auth'
                isAllowed={accessToken}
              />
            </Layout>
          }
        />
        <Route
          path='/auth'
          element={
            <PrivateRoute
              Component={<LoginScreen />}
              fallbackPath='/'
              isAllowed={!accessToken}
            />
          }
        />
        <Route
          path='/search/:query'
          element={
            <Layout>
              <PrivateRoute
                Component={<SearchScreen />}
                fallbackPath='/'
                isAllowed={accessToken}
              />
            </Layout>
          }
        />
        <Route
          path='/watch/:id'
          element={
            <Layout>
              <WatchScreen />
            </Layout>
          }
        />
        <Route
          path='*'
          element={<Navigate to='/' />}
        />
      </Routes>
    </>
  );
};

export default App;
