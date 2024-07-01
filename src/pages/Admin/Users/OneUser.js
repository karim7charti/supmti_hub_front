import React,{Component} from "react";
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

import swal from "sweetalert";
import  '../../../css/AdminStyle.css'
import axios from "axios";

import AddDrawer from "./AddDrawer";
import ProfilePicture from "../../Users/Profile/ProfilePicture";




class OneUser extends Component{
    state={
            id:this.props.id,
            fname:this.props.fname,
            lname:this.props.lname,
            email:this.props.email,
            img:this.props.img,
            npost:this.props.npost,
            back:this.props.back,

        }
        delete=()=>{
        swal({
            title: "Etes vous sure?",
            icon: "warning",
            buttons: ["Annuler", "Supprimer"],
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    await axios.delete('/api/admin/delete/'+this.state.id).then(response=>{
                        if(response.status===200)
                        {
                            this.props.updateData()
                            swal("Good job!", "utilisateur supprimé avec succes !","success");

                        }
                        else {
                            swal("oops!", "Une erreur s'est produite ,réessayer!","error");
                        }
                    }).catch(function (err){
                        swal({
                            title: "oops!",
                            text: "Une erreur s'est produite ,réessayer!",
                            icon: "error",
                        });

                    })

                }
            });

        }
    render() {
        const userData={
            id:this.state.id,
            fname:this.state.fname,
            lname:this.state.lname,
            email:this.state.email,
        }
        return(
            <>
                <div className="row px-2 mt-2" id="users" style={{
                    backgroundColor:this.state.back? "rgba(0, 0, 0, 0.02)":"transparent",
                    borderRadius:9,

                }}>

                    <div className="col-lg-2 col-md-2 col-sm-2 col-3 my-auto p-1" id={this.state.img===null?" ":"the_image"}>
                        <ProfilePicture width={55} height={55} display={this.state.img===null?"block":"none"} FirstLater={this.state.lname.charAt(0).toUpperCase()} fontSize={25}  picture={this.state.img}/>

                    </div>

                    <div className="col-lg-9 col-md-9 col-sm-9 col-8 info my-auto">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12 col-12 my-auto  ">
                                {this.state.fname} {this.state.lname}
                            </div>



                            <div className="col-lg-6 col-md-6 col-sm-12  info col-12 my-auto">
                                {this.state.email}
                            </div>

                            <div className="col-lg-3  col-md-3 col-sm-12 col-12 info my-auto">
                                {this.state.npost}&nbsp;Publications
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-1 col-md-1 col-sm-1 col-1 my-auto">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12 my-auto align-items-center">
                                <AddDrawer isStudent={this.props.isStudent}
                                           isAdmin={this.props.isAdmin}
                                           isEdit={true}
                                           userDataOnEdit={userData}
                                           updatedata={this.props.updateData}
                                />

                            </div>

                            <div className="col-lg-6  col-md-6 col-sm-12 col-12 text-end">

                                    <DeleteForeverTwoToneIcon onClick={this.delete} style={{ color: "rgba(0, 87, 146, 0.8)", fontSize:30,cursor:"pointer"  }}/>

                            </div>
                        </div>
                    </div>






                </div>


            </>
        );
    }

}

export default OneUser;
