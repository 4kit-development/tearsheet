import React, {useCallback, useState} from 'react';
import {AppProvider, RadioButton, Stack} from '@shopify/polaris';
import enTranslations from "@shopify/polaris/locales/en";

export default class Enabled extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppProvider i18n={enTranslations}>
                <Stack vertical>
                    <RadioButton
                        label="Enabled"
                        checked={this.props.value === 'enabled'}
                        id="enabled"
                        name="status"
                        onChange={this.props.onChangeEnabled}
                    />
                    <RadioButton
                        label="Disabled"
                        checked={this.props.value === 'disabled'}
                        id="disabled"
                        name="status"
                        onChange={this.props.onChangeEnabled}
                    />
                </Stack>
            </AppProvider>
        );
    }
}
