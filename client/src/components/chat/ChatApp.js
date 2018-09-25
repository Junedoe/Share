import React from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './messageList';
import SendMessageForm from './sendMessageForm';
import RoomList from './roomList';
import NewRoomForm from './newRoomForm';
import api from '../../api';

import { tokenUrl, instanceLocator } from './config';

class ChatApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoomId: null,
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

                chatManager
                    .connect()
                    .then(currentUser => {
                        console.log('CURRENT USER', currentUser);
                        return this.currentUser.getJoinableRooms().then(joinableRooms => {
                            this.setState({
                                joinableRooms,
                                joinedRooms: this.currentUser.rooms
                            });
                        });
                        console.log('Bleep bloop 🤖 You are connected to Chatkit');
                    })
                    .catch(err => console.log('error connecting: ', err));
            })
            .catch(error => {
                console.error('error', error);
            });
    }

    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoomId
        });
    }

    createRoom(name) {
        this.currentUser
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
        console.log('SUBSCRIBE', this.currentUser);
        this.currentUser
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
                return this.currentUser.getJoinableRooms().then(joinableRooms => {
                    this.setState({
                        joinableRooms,
                        joinedRooms: this.currentUser.rooms
                    });
                });
            })
            .catch(err => console.log('error on subscribing: ', err));
    }

    render() {
        return (
            <div className="app">
                <RoomList
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    subscribeToRoom={this.subscribeToRoom}
                    currentRoomId={this.state.currentRoomId}
                />
                <MessageList currentRoomId={this.state.currentRoomId} messages={this.state.messages} />
                <NewRoomForm onSubmit={this.createRoom.bind(this)} />
                <SendMessageForm sendMessage={this.sendMessage} disabled={!this.state.currentRoomId} />
            </div>
        );
    }
}

export default ChatApp;
