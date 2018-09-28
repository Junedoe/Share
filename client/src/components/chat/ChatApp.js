import React from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './messageList';
import SendMessageForm from './sendMessageForm';
import RoomList from './roomList';
// import NewRoomForm from './newRoomForm';
import api from '../../api';

import { tokenUrl, instanceLocator } from './config';

class ChatApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoomId: '',
            joinableRooms: [],
            joinedRooms: [],
            messages: [],
            currentId: ''
        };
        this.subscribeToRoom = this.subscribeToRoom.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.subscribeToRoom = this.subscribeToRoom.bind(this);
    }

    componentDidMount() {
        api.getCurrentUser()
            .then(data => {
                this.setState({
                    currentId: data._id,
                    currentUsername: data.username,
                    currentScreen: 'chat'
                });
            })
            .then(data => {
                const chatManager = new Chatkit.ChatManager({
                    instanceLocator: instanceLocator,
                    userId: this.state.currentId,
                    tokenProvider: new Chatkit.TokenProvider({
                        url: tokenUrl
                    })
                });
                return chatManager;
            })
            .then(chatManager => {
                // console.log('CHATMANAGER', chatManager);
                chatManager.connect().then(currentUser => {
                    // console.log('CURRENT USER.NAME', currentUser.name);
                    // console.log('CURRENT USER', currentUser);
                    return currentUser.getJoinableRooms().then(joinableRooms => {
                        this.setState({
                            currentUser: currentUser,
                            currentUserName: currentUser.name,
                            joinableRooms,
                            joinedRooms: currentUser.rooms
                        });
                    });
                });
            })
            .catch(error => {
                console.error('error', error);
            });
    }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoomId,
            senderId: this.state.currentUser.name
        });
        console.log('this.state.currentUser.name-------->: ', this.state.currentUser.name);
    }

    createRoom(name) {
        this.state.currentUser
            .createRoom({
                name
            })
            .then(room => this.subscribeToRoom(room.id))
            .catch(err => console.log(err));
    }

    subscribeToRoom(roomId) {
        this.setState({
            messages: []
        });
        console.log('SUBSCRIBE', this.state.currentUser.name);
        this.state.currentUser
            .subscribeToRoom({
                roomId: roomId,
                hooks: {
                    onNewMessage: message => {
                        this.setState({
                            messages: [...this.state.messages, message]
                        });
                    }
                }
            })
            .then(currentRoom => {
                this.setState({ currentRoomId: currentRoom.id });
                return this.state.currentUser.getJoinableRooms().then(joinableRooms => {
                    this.setState({
                        joinableRooms,
                        joinedRooms: this.state.currentUser.rooms
                    });
                });
            })
            .catch(err => console.log('error on subscribing: ', err));
    }

    render() {
        return (
            <div className="chat-app" id="form-container-chat">
                <RoomList
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    subscribeToRoom={this.subscribeToRoom}
                    currentRoomId={this.state.currentRoomId}
                />
                <MessageList
                    currentRoomId={this.state.currentRoomId}
                    currentUsername={this.state.current}
                    messages={this.state.messages}
                />
                {/* <NewRoomForm onSubmit={this.createRoom.bind(this)} /> */}
                <SendMessageForm sendMessage={this.sendMessage} disabled={!this.state.currentRoomId} />
            </div>
        );
    }
}

export default ChatApp;
