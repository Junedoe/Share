import React, { Component } from 'react';
import api from '../../api';

class AddPicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
    }
    handleChange(e) {
        console.log('handleChange');
        console.log('DEBUG e.target.files[0]', e.target.files[0]);
        this.setState({
            file: e.target.files[0]
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        api.addPicture(this.state.file);
    }
    render() {
        return (
            <div className="Upload">
                <p>1. Upload a picture</p>

                <form onSubmit={e => this.handleSubmit(e)} encType="multipart/form-data">
                    <input multiple type="file" name="Upload" onChange={e => this.handleChange(e)} />{' '}
                    <br />
                    <button onClick={this.props.onChange}>
                        Save new product picture {console.log(this.state.file)}
                    </button>
                </form>
            </div>
        );
    }
}

export default AddPicture;
