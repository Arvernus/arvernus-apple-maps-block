/**
 * WordPress dependencies
 */
const {
    __,
    sprintf
} = wp.i18n;
const {
    Fragment,
} = wp.element;
const {
    PanelBody,
    TextControl,
    TextareaControl,
    ToggleControl,
    SelectControl,
    Button,
    Notice
} = wp.components;
const {
    registerBlockType,
} = wp.blocks;
const {
    InspectorControls,
    InspectorAdvancedControls,
    withColors,
    PanelColorSettings,
} = wp.editor;


class Authenticate extends wp.element.Component {
    constructor(props) {
        super(props);
        this.toggleIsEditing = this.toggleIsEditing.bind(this);
        this.onSave = this.onSave.bind(this);
        this.state = {
            privateKey: null,
            keyId: null,
            teamId: null,
            isEditing: false,
            isLoading: false,
            isSaving: false,
            isSavingPrivateKey: false,
            isSavingTeamId: false,
            isSavingKeyId: false,
            savingHasFailed: false
        }
    }

    componentWillMount() {
        wp.apiFetch({
            path: '/AppleMapKit/v1/private_key/get/'
        }).then(response => {
            this.setState({
                privateKey: JSON.parse(response),
            });
        }).catch(error => { console.log(error) });

        wp.apiFetch({
            path: '/AppleMapKit/v1/team_id/get/'
        }).then(response => {
            this.setState({
                teamId: JSON.parse(response),
            });
        }).catch(error => { console.log(error) });

        wp.apiFetch({
            path: '/AppleMapKit/v1/key_id/get/'
        }).then(response => {
            this.setState({
                keyId: JSON.parse(response),
            });
        }).catch(error => { console.log(error) });
    }


    toggleIsEditing() {
        this.setState({
            isEditing: !this.state.isEditing,
        });
    }

    onSave() {
        this.setState({
            isSaving: true,
            isSavingPrivateKey: true,
            isSavingTeamId: true,
            isSavingKeyId: true
        })

        wp.apiFetch({
            path: '/AppleMapKit/v1/private_key/',
            method: 'POST',
            data: this.state.privateKey
        }).then(response => {
            this.setState({
                isSavingPrivateKey: false,
            });
        }).catch(error => {
            console.log(error);
            this.setState({
                savingHasFailed: true,
            })
        });

        wp.apiFetch({
            path: '/AppleMapKit/v1/team_id/',
            method: 'POST',
            data: this.state.teamId
        }).then(response => {
            this.setState({
                isSavingTeamId: false,
            });
        }).catch(error => {
            console.log(error);
            this.setState({
                savingHasFailed: true,
            })
        });

        wp.apiFetch({
            path: '/AppleMapKit/v1/key_id/',
            method: 'POST',
            data: this.state.keyId
        }).then(response => {
            this.setState({
                isSavingKeyId: false,
            });
        }).catch(error => {
            console.log(error);
            this.setState({
                savingHasFailed: true,
            })
        });
    }

    componentDidUpdate() {
        const {
            isSavingKeyId,
            isSavingPrivateKey,
            isSavingTeamId,
            isSaving,
            savingHasFailed
        } = this.state;
        if (!isSavingKeyId && !isSavingPrivateKey && !isSavingTeamId && isSaving) {
            this.setState({
                isSaving: false,
                savingHasFailed: false
            });
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.isEditing ? (
                    <form>
                        <TextareaControl
                            label="Please enter your private Key"
                            readonly={this.state.isSaving}
                            name="private_key"
                            value={this.state.privateKey}
                            onChange={privateKey => this.setState({ privateKey })}
                        />
                        <TextControl
                            label="Please enter your Key ID"
                            readonly={this.state.isSaving}
                            name="key_id"
                            value={this.state.keyId}
                            onChange={keyId => this.setState({ keyId })}
                        />
                        <TextControl
                            label="Please enter your Team ID"
                            readonly={this.state.isSaving}
                            name="team_id"
                            value={this.state.teamId}
                            onChange={teamId => this.setState({ teamId })}
                        />
                        <p>
                            <Button
                                isButton
                                isPrimary
                                disabled={this.state.isSaving}
                                isBusy={this.state.isSaving}
                                onClick={this.onSave}
                            >
                                Save API Key
                    </Button>{" "}
                            <Button
                                isButton
                                disabled={this.state.isSaving}
                                onClick={this.toggleIsEditing}
                            >
                                Cancel
                    </Button>
                        </p>
                        <p>
                            <a
                                href="https://developer.apple.com/documentation/mapkitjs/setting_up_mapkit_js"
                                target="_blank"
                            >
                                Instructions for getting a your Apple Maps Credentials.
                    </a>
                        </p>
                    </form>
                ) : (
                        <Fragment>
                            <p>API Key Saved</p>
                            <p>
                                <Button className="is-button" onClick={this.toggleIsEditing}>
                                    Edit API Key
                </Button>
                            </p>
                        </Fragment>
                    )
                }
                {this.state.savingHasFailed &&
                    <Notice status="error">
                        <p>Something has gone wrong. Please try Again</p>
                    </Notice>
                }
            </Fragment>
        )
    }
}
export default Authenticate;