import React, {useCallback, useState} from 'react';
import {AppProvider, RadioButton, Stack} from '@shopify/polaris';
import enTranslations from "@shopify/polaris/locales/en";

export default class Layout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppProvider i18n={enTranslations}>
                <Stack vertical>
                    <RadioButton
                        label="Single column layout"
                        checked={this.props.value === 'single'}
                        id="single"
                        name="layout"
                        onChange={this.props.onChangeLayout}
                    />
                    <RadioButton
                        label="Double column layout"
                        checked={this.props.value === 'double'}
                        id="double"
                        name="layout"
                        onChange={this.props.onChangeLayout}
                    />
                </Stack>
            </AppProvider>
        );
    }
}
