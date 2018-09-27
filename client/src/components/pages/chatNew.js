import React from 'react';
import ChatApp from './../chat/ChatApp';

const chatNew = props => {
    console.log(props);
    console.log(props.url);
    return <ChatApp id={props.url} />;
};
export default chatNew;
