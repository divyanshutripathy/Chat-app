import { Card, CardContent, Typography } from '@material-ui/core';
import React, { forwardRef } from 'react';
import "./Message.css";

const Message = forwardRef(({message, username}, ref) => {
    const isUser = username === message.username;
    return (
        <div className="messageCard" ref={ref}>
            <Card className={isUser ? "userCard" : "couserCard"}>
                <CardContent>
                    <Typography color="white" variant="outlined" component="h2">
                        {/* The below line makes the user's own texts appear without a username */}
                    {!isUser && `${message.username}: `} {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message
