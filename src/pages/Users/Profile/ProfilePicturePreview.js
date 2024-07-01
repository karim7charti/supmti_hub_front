import React, {Component} from "react";
import ProfilePicture from "./ProfilePicture";
import '../../../css/CustomCompenentsStyle.css'
import MyButton from "../../CustomCompenents/MyButton";
import PublishIcon from '@material-ui/icons/Publish';
import CachedIcon from '@material-ui/icons/Cached';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SaveIcon from '@material-ui/icons/Save';
import axios from "axios";
import swal from "sweetalert";

class ProfilePicturePreview extends Component{
    state={
        img:this.props.img,
        isFound:this.props.isFound,
        isNew:false,
        firstLetter:this.props.firstLetter,
        displaySave:"block",
        imgDisplay:this.props.imgDisplay,
        disableBtn:false,
        errors:{}
    }

    handleClose  = (e) => {
        this.props.setModalDisplay("none")
    };

    upLoadImg=(e)=>{

        var fileButton = document.getElementById('selecProfilImage');
           fileButton.value=null
         var clickEvent = new MouseEvent('click', {bubbles: true});
         fileButton.dispatchEvent(clickEvent);

    }

    previwImg=(e)=>{
         console.log("tttt")
        var file = e.target.files[0];

        if(file && file['type'].split('/')[0] === 'image')
        {


            let reader=new FileReader();
            reader.onloadend = (ev)=>{
                this.setState({
                    img:ev.target.result,
                    isFound:true,
                    isNew:true,
                    errors:{}
                })
            }

              reader.readAsDataURL(file);
        }
        else
            swal('','Veuillez charger une image valide',"warning")
    }

    saveImage=(e)=>{
        if(this.state.img!==this.props.img)
        {

            this.setState({
                disableBtn:true

            },()=>{
                  const payload={profile_image:this.state.img}
              axios.post("/api/upload-profile-image",payload).then(res=>{

                    this.setState({
                        disableBtn:false
                    })

                    if(res.data.status===400)
                    {

                        this.setState({
                            errors:res.data.errors
                        })
                    }
                    else {

                                swal({
                                    title: "Good job!",
                                      text: "Photo de profile modifier avec succés",
                                      icon: "success",
                             });

                                  setTimeout(()=>{
                                                        window.location.reload(false);
                                                    },2000)

                    }



                }).catch(err=>{

                       this.setState({
                      disableBtn:false
                          })
                        swal({
                          title: "oops!",
                          text: "Une erreur s'est produite ,réessayer!",
                          icon: "error",

                      })

                })
            })

        }
    }
    remove=(e)=>{
        if(this.state.img!==this.props.img)
        {
            this.setState({
                img:this.props.img,
                isNew:false,
            })
        }
        else {
            swal({
            title: "Etes vous sure?",
            icon: "warning",
            buttons: ["Annuler", "Supprimer"],
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    this.setState({
                        disableBtn:true
                    }, ()=>{

                        axios.delete('/api/delete-profile-image').then(response=>{
                                        if(response.status===200)
                                        {
                                            swal("Good job!", "Photo de profile supprimé avec succes !","success");
                                            setTimeout(()=>{
                                                window.location.reload(false);
                                            },2000)

                                        }
                                        this.setState({
                                            disableBtn:false
                                        })
                                }).catch(err=>{
                                     this.setState({
                                        disableBtn:false
                                        })
                                        swal({
                                            title: "oops!",
                                            text: "Une erreur s'est produite ,réessayer!",
                                            icon: "error",
                                        });


                                })

                    })


                }
            });

        }
    }



    render() {
        return(
            <>
                <div id="the_modal"  style={{
                    width:"100vw",
                    height:"100vh",
                    position:"fixed",
                    backgroundColor:"rgba(0, 0, 0, 0.11)",
                    zIndex:910,
                    padding:0,
                    left:0,
                    top:0,
                    overflowY:"scroll",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    backdropFilter:"blur(4px)"

                }}>
                    <div className="col-lg-6 col-md-8 col-11 col-sm-10 mx-auto mt-5 p-3" id="photo_change" style={{

                    }}>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="row justify-content-between">
                                    <div className="col-lg-4 col-md-5 col-sm-8 col-8 my-auto title">
                                        Profile photo
                                    </div>
                                    <div className="col-lg-5 col-md-5 col-sm-4 col-4 text-end">
                                        <button type="button" className="btn-close my-0" aria-label="Close" style={{color:"white"}} onClick={this.handleClose}> </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12 mx-auto text-center my-5">
                                <ProfilePicture width={170} height={170} display={this.state.imgDisplay} FirstLater={this.state.firstLetter}  picture={this.state.img}/>
                                <span className={"text-danger"}>{this.state.errors.image}</span>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12 mx-auto text-center px-0 ">
                                <hr/>

                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="row justify-content-between">
                                    <div className="col-lg-7 col-md-7 col-sm-8 col-11">
                                        <div className="row justify-content-between">
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">

                                                <input type="file" onChange={this.previwImg} accept="image/png, image/jpeg"  id={"selecProfilImage"} style={{display:"none"}}/>
                                                <MyButton

                                                    label={this.state.isFound?"Changer":"charger"}
                                                    icon={this.state.isFound?<PublishIcon/>:<CachedIcon/>}
                                                    disabled={false}
                                                    background={"#106765"}
                                                    color={"white"}
                                                    radius={"45px"}
                                                    border={"2px solid #106765"}
                                                    hoverback={"#014d80"}
                                                    hovercolor={"white"}
                                                    onClick={this.upLoadImg}


                                                />
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                <MyButton
                                                    label={"Supprimer"}
                                                    onClick={this.remove}
                                                    icon={<DeleteForeverIcon/>}
                                                    disabled={!this.state.isFound || this.state.disableBtn}
                                                    background={"#5B5A5A9E"}
                                                    color={"rgb(255,255,255)"}
                                                    radius={"45px"}
                                                    hoverback={"#5b5a5a"}
                                                    hovercolor={"white"}
                                                    border={"2px solid rgba(91,90,90,0.1)"}
                                                    hoverborder={"2px solid #5b5a5a"}
                                                    iconDisplay={this.state.disableBtn?"inline":"none"}
                                                />
                                            </div>
                                        </div>



                                    </div>

                                    <div className="col-lg-4 col-md-5 col-sm-4 col-11 text-end">
                                        <MyButton
                                            label={"Sauvegarder"}
                                            icon={<SaveIcon/>}
                                            disabled={!this.state.isFound || !this.state.isNew || this.state.disableBtn}
                                            background={"#106765"}
                                            color={"white"}
                                            radius={"45px"}
                                            border={"2px solid #106765"}
                                            hoverback={"#014d80"}
                                            hovercolor={"white"}
                                            onClick={this.saveImage}
                                            iconDisplay={this.state.disableBtn?"inline":"none"}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </>
        )
    }


} export default ProfilePicturePreview;



















