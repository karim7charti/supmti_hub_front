import React, {Component} from 'react';
import MyButton from "../../../CustomCompenents/MyButton";
import '../../../../css/CustomCompenentsStyle.css'
import ProfilePicture from "../../Profile/ProfilePicture";
import {AddCircleRounded} from "@material-ui/icons";
import MultimediaList from "./MultimediaList";
import uploader from "../../../../Services/UploaderService";
import axios from "axios";
import swal from "sweetalert";



class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multimedia:[],
            files:[],
            postDetails:'',
            displayLoading:'none',

        }


    }

    close = () =>{
        this.props.close('none');
    }

    componentDidMount() {



    }

    removeMultimedia = (id) =>{

        let index =-1
         this.state.multimedia.forEach((item,i) =>{
            if(item.id === id)
                 index=i;
        })

        const files=this.state.files.filter((item,i)=>{
            if(index!==i)
                return item
        })
         const newMultimedia=this.state.multimedia.filter((item,i)=>{
            if(index!==i)
                return item
        })
        this.setState({
            multimedia: newMultimedia,
            files:files
        },()=>{
             console.log(this.state.multimedia)
            console.log(this.state.files)
        })


    }

    getMedias=(e)=>{
        let files=e.target.files;

        const allowedExtensions=['png','jpg','mp4','jpeg']


        let n=4-this.state.files.length
        if(n===0)
        {
             swal('','Le nombre maximum de fichier à partager est 4',"warning")
        }
        else {
            for(let i=0;i<n;i++)
           {
               if(files.length>i)
               {
                       const extension = files[i]['type'].split('/')[1]
                    if(allowedExtensions.includes(extension))
                    {
                        const maxFileSize=100;
                        const fileSize=files[i]["size"]/(1024*1024)
                        if(fileSize<=maxFileSize)
                        {
                            let objectURL = URL.createObjectURL(files[i]);

                            this.setState(prev=>((
                                          {
                                              multimedia:[{
                                                        id:prev.multimedia.length,
                                                        img: objectURL,
                                                        title: files[i].name,
                                                        author: 'author',
                                                        featured: true,
                                                        typeVideo:(extension==="mp4")
                                              },...prev.multimedia],
                                              files:[files[i],...prev.files],

                                          }
                                      )))

                            }
                        else
                            swal('','La taille maximale de fichier ne doit pas dépasser 100 MO',"warning")

                    }


               }


            }
        }
    }

    handleUpload=()=>{
        var fileButton = document.getElementById('selecProfilImage');
        fileButton.value=null
         var clickEvent = new MouseEvent('click', {bubbles: true});
         fileButton.dispatchEvent(clickEvent);
    }
    getAllFilsSizeSum=(len)=>{
        let sum=0
        for(let i=0;i<len;i++)
        {
            sum+=this.state.files[i]["size"]
        }

        return sum
    }
    upload=(e)=>{
        if(uploader.isUploading)
        {
            swal('','Vous etes entrain de partager une autre pub veillez patienter',"warning")
        }
        else
        {

                    const len=this.state.files.length
                    if(this.state.postDetails==="" && len===0)
                    {
                        swal('','Vous pouver pas poster un poste vide',"warning")
                    }
                    else {
                        if(len===0)
                        {
                            let frm=new FormData()
                            frm.append("postDetails",this.state.postDetails)
                            let config = {
                                      headers: {
                                        'Content-Type': "multipart/form-data",
                                      }
                                    }
                            axios.post('/api/post/',frm,config).then(res=>{
                                swal({
                                        title: "Good job!",
                                          text: "Poste publier avec succés",
                                          icon: "success",
                                 });
                                this.setState({
                                    multimedia:[],
                                    files:[],
                                    postDetails:'',
                                 })
                                this.props.close("none")

                            })

                        }
                        else
                        {

                            uploader.countFiles=len
                            uploader.AllFilesSizeSum=this.getAllFilsSizeSum(len)
                            uploader.files=this.state.files
                            uploader.postDetails=this.state.postDetails
                            uploader.SizeRemaining=null
                            uploader.endOfFile=false
                            uploader.currentFile=1
                            uploader.isUploading=true
                            uploader.upload()
                            this.props.showProgress()
                            this.props.close("none")
                        }

                    }
        }




    }

    render() {
        return (
            <>
                <div className="row  p-2">
                    <div className="col-lg-1 col-md-1 col-sm-1 col-2">
                        <ProfilePicture width={45} height={45} display={"block"} FirstLater={this.props.data.last_name.charAt(0).toUpperCase()}  picture={this.props.data.profile_image_path}fontSize={15}/>
                    </div>
                    <div className="col-lg-10  col-md-10 col-sm-10 col-10">
                        <div className="row px-3">
                            <div className="col-lg-12" id="name_user">
                                {this.props.data.last_name +" "+ this.props.data.first_name }
                            </div>
                            <div className="col-lg-12">
                                <span id="target">Publique</span>
                            </div>
                        </div>

                    </div>

                </div>
                <form>
                    <div className="row p-2">
                        <div className="col-lg-12">
                            <textarea  id="post_text" style={{minHeight:"2em",maxHeight:"2em"}}
                                       role="textbox" placeholder="À propos de votre publication..."  contentEditable autoFocus
                                       onChange={(e)=>this.setState({
                                           postDetails:e.target.value
                                       })}
                                       value={this.state.postDetails}
                            />
                        </div>

                    </div>

                    <MultimediaList itemData={this.state.multimedia} remove={this.removeMultimedia}/>

                    <div className="row">
                        <div className="col-lg-12 mt-2">
                            <input id={"selecProfilImage"}
                                   onChange={this.getMedias}
                                   multiple={true} accept=".png, .jpg, .jpeg, .mp4" type={"file"} style={{display:'none'}}/>
                            <MyButton

                                label={"Ajouter un Photo/Video"}
                                icon={<AddCircleRounded/>}
                                disabled={false}
                                background={"lightgray"}
                                color={"white"}
                                radius={"9px"}
                                border={"0"}
                                hoverback={"gray"}
                                hovercolor={"white"}
                                 iconDisplay={this.state.displayLoading}
                                onClick={this.handleUpload}


                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12 mb-2 mt-0">
                            <MyButton
                                label={"Publier"}
                                icon={null}
                                disabled={false}
                                background={"#106765"}
                                color={"white"}
                                radius={"9px"}
                                border={"0"}
                                hoverback={"#014d80"}
                                hovercolor={"white"}
                                iconDisplay={"none"}
                                onClick={this.upload}

                            />
                        </div>
                    </div>
                </form>


            </>
        );
    }
}
Post.defaultProps = {
    FirstLater:"A",
    picture:null,


}

export default Post;
