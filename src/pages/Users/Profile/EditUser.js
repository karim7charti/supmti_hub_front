import React, {Component} from 'react';
import FormControl from "@material-ui/core/FormControl";
import {IconButton, Input, InputLabel} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import EditIcon from "@material-ui/icons/Edit";
import MyButton from "../../CustomCompenents/MyButton";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ProfilePicture from "./ProfilePicture";
import '../../../css/ProfileStyle.css'
import ClearIcon from '@material-ui/icons/Clear';
import axios from "axios";
import swal from "sweetalert";

class EditUser extends Component {

    state={
        password:"000000000000",
        NewPassword:"",
        PasswordConfirmation:"",
        img:this.props.image,
        isShow:false,
        isDisable:true,
        imageUploaded:true,
        errors:{}
    }


    handlPassword=()=>{
        const newPass=document.getElementById('newPass');
        const confirmPass=document.getElementById('confirmPass');
        if(!this.state.isShow){
            newPass.style.display="block"
            confirmPass.style.display="block"
            this.setState({
                password:"",
                isDisable:false,
                isShow:true,
            })
        }
        else{
            newPass.style.display="none"
            confirmPass.style.display="none"
            this.setState({
                password:"000000000000",
                isDisable:true,
                isShow:false,
            })
        }
    }

    componentDidMount() {
        const newPass=document.getElementById('newPass');
        const confirmPass=document.getElementById('confirmPass');
        newPass.style.display="none";
        confirmPass.style.display="none";
        this.setState({
            isShow:false,
            isDisable:true,
        })
    }
       handleInputs=(e)=>{
         this.setState({
            [e.target.name]:e.target.value,
            errors:{}
        })
    }

    updatePassword=(e)=>{

        this.setState({
            isDisable:true
        },()=>{
            const payload={password:this.state.password,
                            newpassword:this.state.NewPassword,
                            passwordConfirmation:this.state.PasswordConfirmation}
            axios.put('/api/edit-password',payload).then(res=>{
                    if(res.data.status===400)
                    {
                        this.setState({
                            errors:res.data.errors,


                        })
                    }
                    else {
                        this.setState({
                            errors:{}
                        })
                        swal({
                            title: "Good job!",
                              text: "Mot de passe modifier avec succés",
                              icon: "success",
                     });

                }
                             this.setState({
                      isDisable:false
                  })
            }).catch(err=>{
                this.setState({
                      isDisable:false,
                    errors:{}
                  })
                swal({
                  title: "oops!",
                  text: "Une erreur s'est produite ,réessayer!",
                  icon: "error",

              })
            })
        })



    }

    render() {
        return (
            <>
                <div className="row py-5 px-4 container mx-auto my-auto" >


                    <form>
                        <div className="col-lg-12 mb-4 mx-auto text-center">

                            <ProfilePicture width={120} height={120} display={"block"} FirstLater={this.props.name.toString().trim().charAt(0).toUpperCase()}  picture={this.state.img}/>

                        </div>

                        <div className="col-lg-12 my-2 mx-auto">
                               <TextField
                                   fullWidth={true}
                                   value={this.props.name}

                                   name="last_name"


                                   id="filled-required"
                                   label="Nom d'utilisateur"
                                   disabled={true}
                               />

                       </div>



                        <div className="col-lg-12 my-2 mx-auto">
                               <TextField
                                   fullWidth={true}
                                   value={this.props.email}

                                   name="email"


                                   id="filled-required"
                                   label="Email"
                                   disabled={true}
                               />

                       </div>





                        <div className="col-lg-12 mx-auto my-2">


                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="standard-adornment-password">{this.state.isShow?"Mot de passe actuel":"Mot de passe"}</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={'password'}
                                    fullWidth={true}
                                    value={this.state.password}
                                     error={(this.state.errors.password!==undefined)}

                                    name="password"
                                    onChange={this.handleInputs}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handlPassword}

                                            >
                                                {this.state.isShow?<ClearIcon style={{fontSize:24}}/>:<EditIcon style={{fontSize:19}}/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    disabled={this.state.isDisable}


                                />
                            </FormControl>

                            <span className={"text-danger"}  style={{fontSize:13}}>{this.state.errors.password}</span>


                        </div>
                        <div id="newPass" className="col-lg-12 mx-auto my-2">


                            <TextField
                                fullWidth={true}
                                type={"password"}
                                required
                                value={this.state.NewPassword}
                                onChange={this.handleInputs}
                                name="NewPassword"
                                id="filled-required"
                                label="Nouveau mot de passe"
                                error={(this.state.errors.newpassword!==undefined)}
                                helperText={this.state.errors.newpassword}
                            />


                        </div>
                        <div id="confirmPass" className="col-lg-12 mx-auto my-2">


                            <TextField
                                fullWidth={true}
                                type={"password"}

                                required
                                value={this.state.PasswordConfirmation}
                                onChange={this.handleInputs}
                                name="PasswordConfirmation"
                                id="filled-required"
                                label="Confirmation de mot de passe"
                                error={(this.state.errors.passwordConfirmation!==undefined)}
                                helperText={this.state.errors.passwordConfirmation}
                            />


                        </div>

                        <div className="col-lg-12 mx-auto mt-5 text-end">


                            <MyButton

                                label={"Valider les modification "}
                                icon={<PlaylistAddCheckIcon/>}
                                disabled={this.state.isDisable}
                                onClick={this.updatePassword}
                                background={"#106765"}
                                color={"white"}
                                radius={"4px"}
                                border={"0"}
                                hoverback={"#014d80"}
                                hovercolor={"white"}
                                iconDisplay={this.state.isDisable && this.state.isShow?"inline":"none"}



                            />


                        </div>



                    </form>



                </div>

            </>
        );
    }
}

export default EditUser;
