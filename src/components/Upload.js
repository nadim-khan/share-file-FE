import React, { Component } from 'react'
import DragAndDrop from './DragAndDrop'
import uploadLogo from './upload.svg'

export class upload extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            files: [
            ]
          }
    }

    handleDrop = (files) => {
        let fileList = this.state.files
        for (var i = 0; i < files.length; i++) {
          if (!files[i].name) return
          fileList.push(files[i].name)
        }
        this.setState({files: fileList})
      }
    
    render() {
        return (
            <section className="download">
            {!this.state.files.length && <DragAndDrop handleDrop={this.handleDrop}>
                <div style={{height: 300, width: 250}}>
                    {this.state.files.map((file,i) =>
                        <div key={i}>{file}</div>
                    )}
                </div>
                </DragAndDrop>
            }
            <div class="send-btn-container">
            {
                this.state.files.length ? 
                    <div className="fileList">
                        <button id = "x" onClick={()=>{this.setState({files:[]})}}>X </button>
                        {this.state.files.map((file,i) =>
                            <div key={i}>{file}</div>
                        )}
                        <button type="file">Upload above file
                            <div className="download__meta">
                                <img src={uploadLogo} alt="upload SVG File" title="upload SVG File"/>
                            </div>
                        </button>
                    </div> :
                    <div>
                        <button type="file">Upload file
                            <div className="download__meta">
                                <img src={uploadLogo} alt="upload SVG File" title="upload SVG File"/>
                            </div>
                        </button>
                    </div>
            } 
            </div>
        </section>
        )
    }
}

export default upload
