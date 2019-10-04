import React, {useCallback, useState} from 'react';
import {AppProvider, TextField} from '@shopify/polaris';
import enTranslations from "@shopify/polaris/locales/en";

export default class Contact extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppProvider i18n={enTranslations}>
                <div>
                    <TextField
                        label="Shipping address"
                        value={this.props.value}
                        onChange={this.props.onChangeContact}
                        multiline
                    />
                </div>
            </AppProvider>
        );
    }
}
