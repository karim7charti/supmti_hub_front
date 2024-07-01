import React, {Component} from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import ProfilePicture from "../../Profile/ProfilePicture";
import MyButton from "../../../CustomCompenents/MyButton";
import img1 from './../../../../imgs/img1.png'
import pdf from './../../../../imgs/pdf.png'
import word from './../../../../imgs/word.png'
import excel from './../../../../imgs/excel.png'
import power from './../../../../imgs/power.png'
import text from './../../../../imgs/text.png'
import script from './../../../../imgs/script.png'
import CourFile from "./CourFile";
import './../../../../css/PostsStyles.css'
import axios from "axios";
import swal from "sweetalert";

class CourPost extends Component {
    constructor(props) {
        super(props);
        this.state={
            drop:false,
            dropLabel:"Publique",
            classes:[],
            files:[],
            fileNames:[],
            classId:'',
            title:'',
            description:"",
            errors:{},
            disable:false,
            showIcon:"none",
            isLoading:true
        }
    }

    componentDidMount() {

        axios.get('/api/courses/target-classes').then(res=>{
            this.setState({
                classes:res.data,
                 classId:res.data[0].id,
                isLoading:false
            })
        }).catch(err=>{
            this.setState({
                isLoading:false
            })
        })

    }

    handleDrop = () =>{

        this.setState({
            drop:!this.state.drop
        })
    }

    handleTarget = (e) =>{
        this.setState({
            dropLabel:e.target.title,
            classId:e.target.id,
            drop:!this.state.drop
        })


    }

    handleFocus=()=>{
        this.setState({
            drop:false
        })
    }

    handleUpload=()=>{
        var fileButton = document.getElementById('selecProfilImage');
        fileButton.value=null
         var clickEvent = new MouseEvent('click', {bubbles: true});
         fileButton.dispatchEvent(clickEvent);
    }

    getFiles= (e)=>{
        let files=e.target.files;
        if(this.state.fileNames.length<4) {
            const types = ['jpeg', 'png', 'jpg', 'pdf', 'x-pdf', 'vnd.ms-powerpoint', 'plain', 'html', 'msword',
                'vnd.openxmlformats-officedocument.presentationml.presentation',
                'vnd.openxmlformats-officedocument.wordprocessingml.document',
                'vnd.openxmlformats-officedocument.spreadsheetml.sheet']
            let AllFiles = []
            let fileNames = []
            let n = files.length
            let max = 4 - this.state.fileNames.length
            if (n >= max)
                n = max
            for (let i = 0; i < n; i++) {
                const extension = files[i]['type'].split('/')[1]
                const size = files[i]['size'] / 1000000

                if (types.includes(extension)) {
                    fileNames.push(files[i]['name'])

                    let reader = new FileReader();
                    reader.onloadend = (ev) => {
                        AllFiles.push(ev.target.result)
                        this.setState(prev => ({
                            files: [ev.target.result, ...prev.files],
                            fileNames: [files[i]['name'], ...prev.fileNames],
                        }))
                    }

                    reader.readAsDataURL(files[i]);
                }
            }
        }

        else
        {
            swal('','Le nombre maximum de fichier est 4',"warning")

        }


    }

    deleteFile=(index)=>{
        let arr=this.state.fileNames.map(item=>item)
        let arr1=this.state.files.map(item=>item)
        arr.splice(index,1)
        arr1.splice(index,1)
        this.setState({
            files:arr1,
            fileNames:arr
        })

    }

    publish=(e)=>{
                const payload={title:this.state.title,description: this.state.description,
            file_names:this.state.fileNames,
            target_id:this.state.classId,files:this.state.files}


        this.setState({
            disable:true,
            showIcon:"inline",
        },()=>{
            axios.post('/api/courses/publish-course',payload).then(res=>{
                if(res.data.status===400)
                {
                    this.setState({
                        errors:res.data.errors,
                        disable:false,
                        showIcon:"none",
                    })
                }
                else {
                    this.setState({
                            errors:{},
                        disable:false,
                        showIcon:"none",
                        title:'',
                    description:"",
                        files:[],
                    fileNames:[],

                        })
                        swal({
                            title: "Good job!",
                              text: "Cours publier avec succés",
                              icon: "success",
                     });

                    this.props.close('none');
                }

               }).catch(err=>{


                   this.setState({
                        disable:false,
                        showIcon:"none",
                    })
                    swal({
                          title: "oops!",
                          text: "Une erreur s'est produite ,réessayer!",
                          icon: "error",

                      })

               })
        })

    }
    handleInputs=(e)=>{
            this.setState({
            [e.target.name]:e.target.value,
            errors:{}
        })
    }
    render() {

        let classes="",files=""
        if(!this.state.isLoading)
            classes=this.state.classes.map(item=>{
                return <span className="dropdown-item" id={item.id} title={item.label} onClick={this.handleTarget}>{item.label}</span>
            })
        files=this.state.fileNames.map((item,index)=>{
            let arr=item.split('.')
            let extension=arr[arr.length-1];
            let img;
            if(['jpeg','png','jpg'].includes(extension))
                img=img1
            else if(['doc','docx'].includes(extension))
                img=word
            else if(['ppt','pptx'].includes(extension))
                img=power
            else if(extension==="pdf")
                img=pdf
            else if(extension==="txt")
                img=text
            else if(extension==="html")
                img=script
              else if(extension==="xlsx")
                img=excel
            return <CourFile index={index} errors={this.state.errors} delete={this.deleteFile} img={img} name={extension.toUpperCase()} title={item} public={false}/>
        })



        return (
            <>
                <div className="row  p-2" id="cour_body">
                    <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                        <ProfilePicture width={45} height={45} display={"block"} FirstLater={this.props.data.last_name.charAt(0).toUpperCase()}  picture={this.props.data.profile_image_path} fontSize={15}/>
                    </div>
                    <div className="col-lg-10  col-md-10 col-sm-10 col-10">
                        <div className="row px-3">
                            <div className="col-lg-12" id="name_user">
                                {this.props.data.last_name +" "+ this.props.data.first_name}
                            </div>
                            <div className="col-lg-12">
                                <div>
                                    <button type="button" onClick={this.handleDrop} className="btn btn-secondary dropdown-toggle"
                                             data-toggle="dropdown" aria-expanded="false" id="drop_btn"
                                            data-offset="10,20">
                                        {this.state.dropLabel}
                                    </button>
                                    <div className="dropdown-menu mt-1" onMouseLeave={this.handleFocus} style={{
                                        display:this.state.drop?"block":"none"
                                    }}>
                                        {classes}

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <form>
                    <div className="row p-2">
                        <div className="col-lg-12">
                            <input  id="post_text"placeholder="Titre" name={"title"} value={this.state.title} onChange={this.handleInputs} contentEditable autoFocus/>
                        </div>
                          <span className={"text-danger"} style={{fontSize:12}}>{this.state.errors.title}</span>
                        <div className="col-lg-12">
                            <textarea  id="post_text" name={"description"} value={this.state.description} onChange={this.handleInputs} role="textbox" placeholder="À propos de cour..."/>
                        </div>
                        <span className={"text-danger"} style={{fontSize:12}}>{this.state.errors.description}</span>
                    </div>

                    {files}


                    <div className="row">
                        <div className="col-lg-12 mt-2">

                            <input id={"selecProfilImage"} onChange={this.getFiles} multiple={true} type={"file"} style={{display:'none'}}/>
                            <MyButton

                                label={"Importer un fichier"}
                                icon={<PublishIcon/>}
                                disabled={false}
                                background={"rgba(211, 211, 211, 1)"}
                                color={"white"}
                                radius={"9px"}
                                border={"0"}
                                hoverback={"gray"}
                                hovercolor={"white"}
                                onClick={this.handleUpload}



                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12 mb-2 mt-0">
                            <MyButton
                                label={"Publier"}
                                icon={null}
                                disabled={this.state.disable}
                                background={"#106765"}
                                color={"white"}
                                radius={"9px"}
                                border={"0"}
                                hoverback={"#014d80"}
                                hovercolor={"white"}
                                onClick={this.publish}
                                iconDisplay={this.state.showIcon}


                            />
                        </div>
                    </div>
                </form>


            </>
        );
    }
}

CourPost.propTypes = {};

export default CourPost;
