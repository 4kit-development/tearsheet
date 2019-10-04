import React, {Component} from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Button, ButtonGroup, Card, FormLayout, Heading, Layout, Page, Stack} from '@shopify/polaris';
import axios from 'axios';
import Enabled from './enabled';
import ImageUpload from './image-upload';
import Contact from './contact';
import LayoutSelection from './layout';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enabled: this.props.enabled,
            logo: this.props.logo,
            contact: this.props.contact,
            layout: this.props.layout
        };
    }

    handleChangeEnabled = (checked, newValue) => this.setState({enabled: newValue});
    handleChangeContact = e => this.setState({contact: e});
    handleChangeLayout = (checked, newValue) => this.setState({layout: newValue});

    submit(state) {
        axios.post('/settings/update', state)
            .then((response) => {
                console.log(response);
            });
    }

    render() {
        return (
            <AppProvider i18n={enTranslations}>
                <Page>
                    <Stack>
                        <Stack.Item fill>
                            <Heading>Tear sheet Settings</Heading>
                        </Stack.Item>
                        <Stack.Item>
                            <ButtonGroup>
                                <Button>Preview Tearsheet</Button>
                                <Button primary onClick={this.submit(this.state)}>Save Settings</Button>
                            </ButtonGroup>
                        </Stack.Item>
                    </Stack>
                    <br />
                    <Layout>

                        <Layout.AnnotatedSection
                            title="Enable Tearsheet"
                            description="Set tear sheet to show up on product page."
                        >
                            <Card sectioned>
                                <FormLayout>
                                    <Enabled {...{'enabled': this.props.enabled}} value={this.state.enabled} onChangeEnabled={this.handleChangeEnabled}  />
                                </FormLayout>
                            </Card>
                        </Layout.AnnotatedSection>
                        <Layout.AnnotatedSection
                            title="Upload Image"
                            description="Upload your companies logo to be displayed on tearsheet.     (Recommended 350 x 150)"
                        >
                            <Card sectioned>
                                <FormLayout>
                                    <ImageUpload {...{'logo': this.props.logo}} value={this.state.logo} onChangeLogo={this.handleChangeLogo}  />
                                </FormLayout>
                            </Card>
                        </Layout.AnnotatedSection>
                        <Layout.AnnotatedSection
                            title="Layout Selection"
                            description="Select which layout you want for the tearsheet."
                        >
                            <Card sectioned>
                                <FormLayout>
                                    <LayoutSelection {...{'layout': this.props.layout }} value={this.state.layout} onChangeLayout={this.handleChangeLayout}  />
                                </FormLayout>
                            </Card>
                        </Layout.AnnotatedSection>
                        <Layout.AnnotatedSection
                            title="Contact Details"
                            description="Provide contact details to be displayed on tear sheet."
                        >
                            <Card sectioned>
                                <FormLayout>
                                    <Contact {...{'contact': this.props.contact}} value={this.state.contact} onChangeContact={this.handleChangeContact} />
                                </FormLayout>
                            </Card>
                        </Layout.AnnotatedSection>
                    </Layout>
                </Page>
            </AppProvider>
        );
    };
}
