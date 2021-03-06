import _ from 'lodash'
import React, { Component } from 'react'
import ReactCropper from 'react-cropper'

// components
import Button from 'components/Button/Button'
import GeneratorModal from 'components/GeneratorModal/GeneratorModal'
import Title from 'components/Title/Title';

// constants
import globalConstants from 'constants/global'

// helpers
import helpers from 'helpers/helpers'

// services
import WebViewService from 'services/webViewService'

export default class Cropper extends Component {

    state = {
        uploadedImageFromWebView: ''
    }

    componentWillMount() {
        document.addEventListener('message', (e) => {
            this.setState({ uploadedImageFromWebView: 'data:image/png;base64,' + e.data })
        })
    }


    crop = () => {
        const image = this.cropper.getCroppedCanvas().toDataURL()
        const location = {
            pathname: `/generator/upload/${globalConstants.format.normal}`,
            state: {
                urlPath: image,
                from: 'upload'
            }
        }
        this.props.history.push(location)
    }

    closeCropper = () => {
        this.props.history.push('/')
    }

    render() {

        const image = ((_.get(this.props, 'location.state.image')) || this.state.uploadedImageFromWebView);
        const cropperStyle = {
            height: helpers.isMobile() ? 300 : 400,
            width: '70%',
            marginLeft: 'auto',
            marginRight: 'auto'
        };

        return (
            <GeneratorModal>

                {!WebViewService.isWebView && <GeneratorModal.CloseButton onClick={this.closeCropper}/>}

                <Title>
                    חיתוך התמונה
                </Title>

                <ReactCropper
                    ref={node => this.cropper = node}
                    src={image}
                    style={cropperStyle}
                    background={false}
                    autoCropArea={1}
                />

                <Button onClick={this.crop} label="אישור" center className="center-block margin-top-md"/>


            </GeneratorModal>
        )
    }

}