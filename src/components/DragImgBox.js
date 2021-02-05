import React, { Component } from 'react';

import Upload from 'antd/lib/upload';
import axios from 'axios';
import './custom.css';
import Progress from 'antd/lib/progress';
import 'antd/dist/antd.css';

const { Dragger } = Upload;

export default class extends Component {
  state = {
    percent: 0,
    showProcessing: false,
    successing: 'active'
  }

  render() {
    const {
      setDropped,
      handleReceivedImg
    } = this.props;

    const props = {
      name: 'file',
      multiple: false,
      onChange: info => {

        const url = 'https://www.slazzer.com/api/v1/remove_image_background';
        const fData = new FormData();
        fData.append('source_image_file', info.file);
        fData.append('output_image_format', 'base64');

        axios.post(
          url,
          fData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'API-KEY': '9fd6e94f3dd24659b7961cae090cdac6'
            },
            onUploadProgress: progressEvent => {
              this.setState({
                percent: Math.floor((progressEvent.loaded * 100) / progressEvent.total)
              })

              if (this.state.percent !== 0) {
                this.setState({
                  showProcessing: true
                })
              }

            }
          },
        )
          .then((res) => {
            this.setState({
              successing: 'success'
            })

            setTimeout(() => {
              setDropped()
              handleReceivedImg(res.data.output_image_base64)
            }, 1200);

          })
          .catch(errors => console.log(errors.data));
      },

      beforeUpload: file => {
        return false
      },
    };

    return (
      <>
        {!this.state.showProcessing ?
          <div className="drag-box">
            <Dragger {...props}>
              <div className="upload-box"></div>
            </Dragger>
          </div>
          :
          <div className="process-box">
            <Progress percent={this.state.percent} status={this.state.successing} />
          </div>
        }
      </>
    );
  }
}