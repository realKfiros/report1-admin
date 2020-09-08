import React, { useState, useEffect } from 'react';
import {
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
    Paper,
    IconButton,
    ButtonBase,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Icon
} from '@material-ui/core';
import {
    FileCopy,
    Add,
    Delete
} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Axios from 'axios';
import io from 'socket.io-client';

function MainScreen() {
    const [users, setUsers] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const socket = io('http://localhost:3001');

    const { group } = useSelector(store => store.group);

    useEffect(() => {
        componentDidMount();
        socket.on('refresh', () => {
            componentDidMount();
        });
    }, []);

    async function componentDidMount() {
        let request = await Axios('/group/members', {
            params: {
                key: group
            }
        });
        setUsers(request.data);
    }

    function copyCode() {
        const dummy = document.createElement('textarea');
        document.body.appendChild(dummy);
        dummy.value = group;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    async function addMember(name, phoneNumber = '') {
        setAddDialogOpen(false);
        await Axios('/group/member', {
            params: {
                name,
                phoneNumber,
                group
            }
        });
        await componentDidMount();
    }

    async function removeMember(key) {
        await Axios('/group/member/remove', {
            params: {
                key,
                group
            }
        });
        await componentDidMount();
    }

    return (
        <>
            <Text variant="h5">
                קוד קבוצה: {group}
                <IconButton onClick={copyCode}>
                    <FileCopy />
                </IconButton>    
            </Text>
            <TContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <Cell>הסר</Cell>
                            <Cell>שם</Cell>
                            <Cell>קוד</Cell>
                            <Cell>סטטוס יומי</Cell>
                            <Cell>מספר טלפון</Cell>
                            <Cell>שליחה לווטסאפ</Cell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => <User key={user.key} user={user} remove={() => removeMember(user.key)}/>)}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <CenterButtonBase component={Cell} colSpan={6} onClick={() => setAddDialogOpen(true)}>
                                <Add />
                            </CenterButtonBase>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TContainer>
            <AddMemberDialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} submit={addMember} />
        </>
    )
}

function AddMemberDialog({ open, onClose, submit }) {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <Dialog open={open} onClose={onClose}>
            <DTitle>הוסף לקבוצה</DTitle>
            <DialogContent>
                <Field
                    value={name}
                    onChange={event => setName(event.target.value)}
                    label="שם"
                    fullWidth />
                <Field
                    value={phoneNumber}
                    onChange={event => setPhoneNumber(event.target.value)}
                    label="מספר טלפון"
                    fullWidth />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => submit(name, phoneNumber)}>הוסף לקבוצה</Button>
            </DialogActions>
        </Dialog>
    )
}

function User({ user, remove }) {
    function whatsapp() {
        window.location = `https://api.whatsapp.com/send?phone=${user.phoneNumber}&text=%D7%A0%D7%90%20%D7%9E%D7%9C%D7%90%20%D7%93%D7%95%D7%B4%D7%97%201%20%D7%91%D7%9B%D7%AA%D7%95%D7%91%D7%AA%20https://doh-ehad.herokuapp.com/%20%D7%A2%D7%9D%20%D7%94%D7%A7%D7%95%D7%93%20${user.key}`;
    }

    return (
        <TableRow>
            <Cell>
                <IconButton onClick={remove}>
                    <Delete />
                </IconButton>
            </Cell>
            <Cell>{user.name}</Cell>
            <Cell>{user.key}</Cell>
            <Cell>{user.replyToday}</Cell>
            <Cell>{user.phoneNumber}</Cell>
            <Cell>
                <IconButton onClick={whatsapp}>
                    <Icon className="fa fa-whatsapp" />
                </IconButton>
            </Cell>
        </TableRow>
    );
}

const Text = styled(Typography)`
    margin: 20px;
`;

const TContainer = styled(TableContainer)`
    margin: 20px;
    width: calc(100vw - 40px);
`;

const Cell = styled(TableCell)`
    text-align: right;
`;

const CenterButtonBase = styled(ButtonBase)`
    text-align: center;
`;

const DTitle = styled(DialogTitle)`
    text-align: right;
`;

const Field = styled(TextField)`
    direction: rtl;
`;

export {
    MainScreen
};