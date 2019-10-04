import React, {useCallback, useState} from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Button, Stack} from '@shopify/polaris';
import axios from "axios";

export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '', imagePreviewUrl: this.props.logo};
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
        axios.post('/settings/logo', this.gatherFormData(this.state.file))
            .then(
                (response) => {
                    console.log('successfully uploaded');
                },
                (error) => {
                    console.log('could not upload');
                }
            );
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    /**
     * Gather the form data for the photo upload.
     */
    gatherFormData(image) {
        const data = new FormData();
        data.append('logo', image);
        return data;
    }

    removeLogo() {
        // We need to gather a fresh FormData instance with the profile photo appended to
        // the data so we can POST it up to the server. This will allow us to do async
        // uploads of the profile photos. We will update the user after this action.
        axios.post('/settings/logo/remove')
            .then(
                () => {
                    console.log('successfully removed');
                },
                (error) => {
                    console.log('could not remove');
                }
            );
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} style={{width: '100%'}} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <div className="previewComponent">
                <div className="imgPreview">
                    {$imagePreview}
                </div>
                <br />
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                <Stack>
                    <Stack.Item fill>
                        <input className="fileInput"
                               type="file"
                               onChange={(e)=>this._handleImageChange(e)} />
                    </Stack.Item>
                    <Stack.Item>
                        <Button submit={true} onClick={(e)=>this._handleSubmit(e)}>Upload Image</Button>
                    </Stack.Item>
                </Stack>
                </form>
            </div>
        )
    }
}
