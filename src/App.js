import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from '@material-ui/core';
import { RTL } from './components/RTL';
import styled from 'styled-components';
import Axios from 'axios';
import io from 'socket.io-client';

function App() {
  const [replies, setReplies] = useState([]);
  const socket = io('http://localhost:3001');

  useEffect(() => {
    componentDidMount();
    socket.on('refresh', () => {
      componentDidMount();
    });
  }, []);

  async function componentDidMount() {
    let request = await Axios('/replies/today');
    console.log(request.data);
    setReplies(request.data);
  }

  return (
    <RTL>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">דו״ח 1</Typography>
        </Toolbar>
      </AppBar>
      <TContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <Cell>שם</Cell>
              <Cell>סטטוס</Cell>
            </TableRow>
          </TableHead>
          <TableBody>
            {replies.map(reply => <Reply name={reply.user} status={reply.reply} />)}
          </TableBody>
        </Table>
      </TContainer>
    </RTL>
  );
}

function Reply({ name, status }) {
  const _status = () => {
    switch (status) {
      case 1:
        return 'בבסיס';
      case 2:
        return 'בתפקיד חוץ';
      case 3:
        return 'ג';
      case 4:
        return 'חופש';
    }
  }
  return (
    <TableRow>
      <Cell>{name}</Cell>
      <Cell>{_status()}</Cell>
    </TableRow>
  )
}

const TContainer = styled(TableContainer)`
  margin: 20px;
  width: calc(100vw - 40px);
`;

const Cell = styled(TableCell)`
  text-align: right;
`;

export default App;
