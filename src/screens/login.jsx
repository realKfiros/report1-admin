import React, { useState } from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    TextField,
    Typography
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Axios from 'axios';
import { SignIn } from '../redux/actions';

function LoginScreen() {
    const [code, setCode] = useState('');
    const dispatch = useDispatch();

    async function login() {
        const request = await Axios('/group/exists', {
            params: {
                key: code
            }
        });
        if (request.data) {
            dispatch(SignIn(code));
        }
    }

    async function createGroup() {
        const request = await Axios.post('/group');
        dispatch(SignIn(request.data));
    }

    return (
        <>
            <LoginCard>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        הזן קוד קבוצה
                    </Typography>
                    <TextField
                        label="קוד קבוצה"
                        value={code}
                        onChange={event => setCode(event.target.value)}
                        fullWidth />
                </CardContent>
                <CardActions>
                    <Button onClick={login}>היכנס</Button>
                    <Button onClick={createGroup}>צור קבוצה</Button>
                </CardActions>
            </LoginCard>
        </>
    )
}

const Grow = keyframes`
    from {
        transform: scaleY(0);
        opacity: 0;
    }
    to {
        transform: scaleY(1);
        opacity: 1;
    }
`;

const LoginCard = styled(Card)`
    margin: 20px auto;
    width: auto;
    animation: ${Grow} 0.25s;
    @media only screen and (orientation: landscape) {
        max-width: 500px;
    }
`;

export {
    LoginScreen
};