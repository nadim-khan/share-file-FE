import React from 'react'
import axios,{post} from 'axios';
import uploadLogo from './upload.svg'

class FileUpload extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
          file:null,
          uploadedUrls:[]
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
      }
      onFormSubmit(e){
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file).then((response)=>{
            this.setState(prevState => ({
                uploadedUrls: [...prevState.uploadedUrls, response.data.file],
                file:null
              }))
        })
      }
      onChange(e) {
        this.setState({file:e.target.files[0]})
      }
      fileUpload(file){
        const url = 'https://sharefilenow.herokuapp.com/api/files';
        const formData = new FormData();
        formData.append('myfile',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
      }
    
      render() {
          const {file,uploadedUrls} = this.state;
        return (
            <section className="download">
                <form onSubmit={this.onFormSubmit}>
                <div className="download__meta">
                     <img src={uploadLogo} alt="upload SVG File" title="upload SVG File"/>
                </div>
                {uploadedUrls.length ? <div>
                    <h6>Uploaded links</h6>
                    {uploadedUrls.map((url,i)=>
                        <div key={i}>
                            <div class="flex-box-2">
                            <p>{url}</p>
                            <button onClick={() =>  navigator.clipboard.writeText(`${url}`)}>Copy</button>
                            <button onClick={()=> window.open(`${url}`, "_blank")}>Open</button>
                            </div>
                        </div>)}
                    </div> : null}
                <div className="send-btn-container">
                    {!this.state.file ? <div><input name="file" id="file" class="inputfile" type="file" onChange={this.onChange} />
                    <label for="file">Choose a file to upload</label> </div>:
                    <div>
                        <div>
                            <h6>Selected File Details</h6>
                            Name : {file.name} <br/>
                            size : {file.size} KB <br/>
                            Type : {file.type}
                        </div>
                        {uploadedUrls.length && !file ?<button onClick={()=>{this.setState({file:null})}}>Upload More</button>:<button type="submit">Upload Selected File</button>}
                    </div>
                    }
                </div>
                
            </form>
            </section>
          
       )
      }
}

export default FileUpload;