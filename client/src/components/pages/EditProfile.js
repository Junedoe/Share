import React, { Component } from 'react';
// import api from '../../api';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            subtitle: '',
            image: '',
            message: null,
            file: null
        };
    }
    render() {
        return <h1>something</h1>;
    }
}

export default EditProfile;
