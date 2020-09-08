import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RTL } from './components/RTL';
import Axios from 'axios';
import io from 'socket.io-client';
import { MainScreen } from './screens/main';
import { LoginScreen } from './screens/login';

function App() {
  const [replies, setReplies] = useState([]);
  const socket = io('http://localhost:3001');

  const { group } = useSelector(store => store.group);

  useEffect(() => {
    componentDidMount();
    socket.on('refresh', () => {
      componentDidMount();
    });
  }, []);

  async function componentDidMount() {
    let request = await Axios('/replies/today');
    setReplies(request.data);
  }

  return (
    <RTL>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">דו״ח 1</Typography>
        </Toolbar>
      </AppBar>
      {group ? <MainScreen /> : <LoginScreen />}
    </RTL>
  );
}

export default App;
