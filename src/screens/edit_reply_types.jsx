import React, { forwardRef, useState, useEffect } from 'react';
import {
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
    ButtonBase,
    Card,
    CardContent,
    Grid,
    DialogTitle,
    DialogContent,
    TextField,
    FormControlLabel,
    Checkbox,
    DialogActions,
    Button,
    CardHeader
} from '@material-ui/core';
import {
    Close,
    Add,
    Edit,
    Delete,
    Save
} from '@material-ui/icons';
import styled from 'styled-components';
import Axios from 'axios';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function EditReplyTypes({ open, onClose, group }) {
    const [replies, setReplies] = useState([]);
    const [addReplyDialogOpen, setAddReplyDialogOpen] = useState(false);

    useEffect(() => {
        if (open) {
            componentDidMount();
        }
    }, [open]);

    async function componentDidMount() {
        let request = await Axios('/replyType', {
            params: {
                group: group
            }
        });
        setReplies(request.data);
    }

    async function addReplyType(reply, allowFutureReply) {
        setAddReplyDialogOpen(false);
        await Axios('/replyType/add', {
            params: {
                group,
                reply,
                future: allowFutureReply
            }
        });
        componentDidMount();
    }

    async function removeReplyType(reply) {
        await Axios('/replyType/delete', {
            params: {
                key: reply
            }
        });
        componentDidMount();
    }

    async function editReplyType(key, reply, allowFutureReply) {
        await Axios('/replyType/update', {
            params: {
                key,
                reply,
                future: allowFutureReply
            }
        });
        componentDidMount();
    }

    return (
        <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
            <AppBar position="static">
                <RToolbar>
                    <IconButton onClick={onClose} edge="start">
                        <Close />
                    </IconButton>
                    <Title variant="h6">עריכת סטטוסים</Title>
                </RToolbar>
            </AppBar>
            <Grid container spacing={1} dir="rtl">
                {replies.map((reply) => <ReplyOption key={reply.key} reply={reply} remove={() => removeReplyType(reply.key)} edit={editReplyType}/>)}
                <AddReplyButton onClick={() => setAddReplyDialogOpen(true)}/>
            </Grid>
            <AddReplyDialog open={addReplyDialogOpen} onClose={() => setAddReplyDialogOpen(false)} submit={addReplyType}/>
        </Dialog>
    );
}

function ReplyOption({ reply, edit, remove }) {
    const [editMode, setEditMode] = useState(false);
    const [editReply, setEditReply] = useState(reply.reply);
    const [editAllowFutureReply, setEditAllowFutureReply] = useState(reply.allowFutureReply);

    return (
        <Item item xs={6}>
            <ReplyCard>
                <CardHeader
                    avatar={
                        editMode ? (
                            <IconButton onClick={() => setEditMode(false)}>
                                <Close />
                            </IconButton>
                        ) : (
                            <IconButton onClick={() => setEditMode(true)}>
                                <Edit />
                            </IconButton>
                        )
                    }
                    action={
                        editMode ? (
                            <IconButton onClick={() => {
                                edit(reply.key, editReply, editAllowFutureReply);
                                setEditMode(false);
                                setEditReply(reply.reply);
                                setEditAllowFutureReply(reply.allowFutureReply);
                            }}>
                                <Save />
                            </IconButton>
                        ) : (
                            <IconButton onClick={remove}>
                                <Delete />
                            </IconButton>
                        )
                    }
                    title={
                        editMode ? (
                            <TextField
                                label="שם תגובה"
                                value={editReply}
                                onChange={event => setEditReply(event.target.value)}
                                fullWidth />
                        ) : <Typography variant="h4">{reply.reply}</Typography>}
                    subheader={
                        editMode ? (
                            <FormControlLabel 
                                control={
                                    <Checkbox
                                        checked={editAllowFutureReply}
                                        onChange={() => setEditAllowFutureReply(!editAllowFutureReply)}/>
                                }
                                label="אפשר תגובה עתידית"
                                dir="rtl"/>
                        ) : <Typography variant="subtitle1">{reply.allowFutureReply ? 'ניתן לדווח מראש' : 'לא ניתן לדווח מראש'}</Typography>}/>
            </ReplyCard>
        </Item>
    )
}

function AddReplyButton({ onClick }) {
    return (
        <Item item xs={6}>
            <Touchable onClick={onClick}>
                <TouchableReplyCard>
                    <CardContent>
                        <Add />
                    </CardContent>
                </TouchableReplyCard>
            </Touchable>
        </Item>
    )
}

function AddReplyDialog({ open, onClose, submit }) {
    const [reply, setReply] = useState('');
    const [allowFutureReply, setAllowFutureReply] = useState(false);
    return (
        <RDialog open={open} onClose={onClose}>
            <DialogTitle>הוסף אפשרות תגובה</DialogTitle>
            <DialogContent>
                <TextField
                    label="שם תגובה"
                    value={reply}
                    onChange={event => setReply(event.target.value)}
                    fullWidth />
                <FormControlLabel 
                    control={
                        <Checkbox
                            checked={allowFutureReply}
                            onChange={() => setAllowFutureReply(!allowFutureReply)}/>
                    }
                    label="אפשר תגובה עתידית"
                    dir="rtl"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    submit(reply, allowFutureReply);
                    setAllowFutureReply(false);
                    setReply('');
                }}>הוסף אפשרות תגובה</Button>
            </DialogActions>
        </RDialog>
    )
}

const RToolbar = styled(Toolbar)`
    text-align: right;
    direction: rtl;
`;

const RDialog = styled(Dialog)`
    text-align: right;
    direction: rtl;
`;

const Title = styled(Typography)`
    text-align: right;
`;

const Touchable = styled(ButtonBase)`
    margin: 10px auto;
    flex: 1;
    width: calc(100% - 20px);
`;

const ReplyCard = styled(Card)`
    width: 100%;
    margin: 10px auto;
    flex: 1;
    width: calc(100% - 20px);
`;

const TouchableReplyCard = styled(Card)`
    width: 100%;
`;

const Item = styled(Grid)`
    text-align: center;
    padding: 50px;
`;

export {
    EditReplyTypes
}