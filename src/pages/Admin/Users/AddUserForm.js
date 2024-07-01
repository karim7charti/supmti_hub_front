import React,{Component} from "react";


import  '../../../css/AdminStyle.css'
import TextField from '@material-ui/core/TextField';


import FormControl from '@material-ui/core/FormControl';

import { Input, InputLabel} from "@material-ui/core";
import MyButton from "../../CustomCompenents/MyButton";
import axios from "axios";
import swal from "sweetalert";

import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import PersonAddIcon from "@material-ui/icons/PersonAdd";



class AddUser extends Component{
    constructor(props) {
        super(props);
         this.state={
                showPass:false,
                selectValue:"",
                errors:{},
                email:(this.props.userDataOnEdit===undefined)?"":this.props.userDataOnEdit.email,
                password:"",
                last_name:(this.props.userDataOnEdit===undefined)?"":this.props.userDataOnEdit.lname,
                first_name:(this.props.userDataOnEdit===undefined)?"":this.props.userDataOnEdit.fname,
                role: this.props.role,
                isEdit:this.props.isEdit,
                isLoading:true,
                 disableBtn:false,
                id:(this.props.userDataOnEdit===undefined)?"":this.props.userDataOnEdit.id
            }
    }
    componentDidMount() {
        this.generateRandomPassword()


    }
    generateRandomPassword=()=>{
        let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
         let passwordLength = 12;
         let password = "";
          for (let i = 0; i <= passwordLength; i++) {
           let randomNumber = Math.floor(Math.random() * chars.length);
           password += chars.substring(randomNumber, randomNumber +1);
          }

          this.setState({
              password:password
          })
    }


    handlePass(){
        this.setState({
            showPass: false,
        })
    }
    handleInputs=(e)=>{
         this.setState({
            [e.target.name]:e.target.value,
            errors:{}
        })
    }
    register=()=>{
        this.setState({
            disableBtn:true
        },()=>{
                             const payload={
                       email:this.state.email, password:this.state.password, last_name:this.state.last_name,
                       first_name:this.state.first_name,role:this.state.role
                   }
                   axios.post('/api/admin/register',payload).then(res=>{

                       if (res.data.status===301)
                       {

                           this.setState({
                               errors:res.data.errors
                           })
                       }
                       else {
                             swal({
                                    title: "Good job!",
                                      text: this.state.role.split('_')[1].toLowerCase() + " ajouté avec succés",
                                      icon: "success",
                             });
                             this.generateRandomPassword()
                             this.setState({
                                   email:"",
                                    last_name:"",
                                    first_name:"",
                             })
                           this.props.updateData()
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
    edit=()=>{

         this.setState({
             disableBtn:true
         },()=>{
                              const payload={
                       email:this.state.email, last_name:this.state.last_name,
                       first_name:this.state.first_name
                   }
                   axios.put('/api/admin/edit/'+this.state.id,payload).then(res=>{


                       if (res.data.status===301)
                       {

                           this.setState({
                               errors:res.data.errors
                           })
                       }
                       else {

                             swal({
                                    title: "Good job!",
                                      text: "Utilisateur modifier avec succés",
                                      icon: "success",
                             });
                             this.props.updateData()
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

    render() {

        return(
            <>

                <div className="row py-5 px-4 container mx-auto my-auto" style={{

                }}>

                    <form>
                        <div className="col-lg-12 mx-auto">

                            <TextField
                                fullWidth={true}
                                value={this.state.last_name}
                                onChange={this.handleInputs}
                                name="last_name"

                                required
                                id="filled-required"
                                label="Nom"
                                error={(this.state.errors.last_name!==undefined)}
                                helperText={this.state.errors.last_name}
                            />

                        </div>
                        <div className="col-lg-12 my-2 mx-auto">

                            <TextField
                                fullWidth={true}
                                value={this.state.first_name}
                                onChange={this.handleInputs}
                                name="first_name"
                                required
                                id="filled-required"
                                label="Prénom"
                                error={(this.state.errors.first_name!==undefined)}
                                helperText={this.state.errors.first_name}
                            />

                        </div>

                        <div className="col-lg-12 my-2 mx-auto">


                            <TextField
                                fullWidth={true}
                                required
                                value={this.state.email}
                                onChange={this.handleInputs}
                                name="email"
                                id="filled-required"
                                label="Email"
                                error={(this.state.errors.email!==undefined)}
                                helperText={this.state.errors.email}
                            />


                        </div>


                        <div className="col-lg-12 mx-auto my-2" style={{
                            display:this.state.isEdit? "none":"block"
                        }}>


                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="standard-adornment-password">Mot de pass</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={'password'}
                                    fullWidth={true}
                                    value={this.state.password}
                                    disabled={true}

                                />
                            </FormControl>


                        </div>
                        <div className="col-lg-12 mx-auto mt-5 text-end">


                            <MyButton

                                label={this.state.isEdit? "Valider les modification ":"Créer le compte"}
                                icon={this.state.isEdit?<PlaylistAddCheckIcon/>:<PersonAddIcon />}

                                onClick={(!this.state.isEdit)?this.register:this.edit}
                                disabled={this.state.disableBtn}
                                background={"#106765"}
                                color={"white"}
                                radius={"4px"}
                                border={"0"}
                                hoverback={"#014d80"}
                                hovercolor={"white"}
                                iconDisplay={this.state.disableBtn?"inline":"none"}

                            />


                        </div>
                    </form>

                </div>

            </>
        );
    }

}

AddUser.defaultProps={
    isAdmin:false,
}

export default AddUser;
