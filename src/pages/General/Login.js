import React,{Component} from "react";
import logo from './../../imgs/logo.png'
import  '../../css/LoginStyle.css'
import axios from "axios";

import swal from "sweetalert";
import MyButton from "../CustomCompenents/MyButton";

class Login extends Component{
    constructor(props) {
        super(props);
         var tent=sessionStorage.getItem("tent");

        if(tent===null)
        {
            sessionStorage.setItem("tent",1)
            this.props.history.push('/home');
        }

        this.state={
            disabled:false,
            showSpinner:false,
            showSpinner1:false,
            email:"",
            password:"",
            passError:false,
            isLoading:false
        }
    }
     handleInput=e=>{
        this.setState({
            [e.target.name]:e.target.value,
              passError:false,
        })
    }
    login=(e)=>{
        e.preventDefault()
        this.setState({
            disabled:true,
            showSpinner:true,
        },()=>{
            const payload={username:this.state.email,password:this.state.password}
            fetch(axios.defaults.baseURL+"api/login_check",{
                method:"POST",
                body:JSON.stringify(payload),
                headers:new Headers({
                    'Authorization': '',
                     'Content-Type': 'application/json'
                }),
            }).then(res=>{
                if(res.status===200)
                {
                    this.setState({
                                disabled:false,
                                showSpinner:false,
                            })
                    res.json().then(data=>{

                        localStorage.setItem("token",data.token)
                         localStorage.setItem("refreshToken",data.refresh_token)
                        this.props.history.push('/home');
                    })

                }
                else if(res.status===401)
                {
                        this.setState({
                            disabled:false,
                            showSpinner:false,
                            passError:true,
                        })
                }
            })

        })
    }


    resetPassword=(e)=>{
        if(!this.state.isLoading)
        {
            this.setState({
                 showSpinner1:true,
                isLoading:true
            },()=>{
                axios.post("/send-reset-link",{email:this.state.email}).then(res=>{

                    if(res.status===200)
                    {
                        swal({
                          title: "Good job!",
                          text: "Nous avons envoyé un lien de récuperation à votre mail!",
                          icon: "success",
                        });
                    }
                    this.setState({
                        showSpinner1:false,
                        isLoading:false
                    })
                }).catch(err=>{

                     if(err.response.status===404)
                     {
                         swal({
                            title: "oops!",
                            text: "cet email n'est pas associé à aucun utilisateur !",
                            icon: "error",
                        });

                     }
                      this.setState({
                        showSpinner1:false,
                        isLoading:false
                    })
                })
            })
        }
    }
    render() {
        return(
            <>

                <div className="row mx-auto" id="loginRow">
                    <div className="col-lg-4  col-md-5 col-sm-10 col-11 p-4" id="loginDiv">
                        <div className="row">
                            <form onSubmit={this.login} method="post">


                                <div className=" col-lg-5  col-md-5 text-center  col-6  col-sm-6 logodiv mx-auto mb-3">
                                    <span><img src={logo} alt={"logo"}  id="logo"/></span>
                                </div>
                                <div className="col-lg-11 text-center mx-auto mb-2">
                                    <span className="title">Connexion</span>
                                </div>
                                <div className="col-lg-11 text-center mx-auto mb-4">
                                    <p className="register">
                                        Utiliser votre pré-registre compte
                                    </p>
                                </div>
                                <div className="col-lg-11 my-2 mx-auto">
                                    <input type="email" required={true} placeholder="Adresse e-mail" name={"email"} value={this.state.email} onChange={this.handleInput}  style={{
                                        borderColor:this.state.passError? "red":"lightgray"
                                    }}/>
                                </div>
                                <div className="col-lg-11 my-2 mx-auto">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="password" required={true} placeholder="Mot de passe"  name={"password"} value={this.state.password} onChange={this.handleInput}  style={{
                                                borderColor:this.state.passError? "red":"lightgray",
                                            }}/>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 mx-auto mt-2" style={{
                                            display: this.state.passError? "block":"none"
                                        }}>
                                            <div className="row">

                                                <div className="col-lg-1 col-md-1 col-sm-1 col-1" style={{
                                                    marginRight:-10,
                                                    marginTop:-3,
                                                }}>
                                                    <box-icon type='solid' name='error-circle'
                                                    color="red"
                                                    size="0.9em"
                                                    > </box-icon>
                                                </div>
                                                <div className="col-lg-11 col-md-11 col-sm-11 col-11 error">
                                                     Email ou mot de passe incorrecte! .
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div className="col-lg-11 mt-4 mb-5 mx-auto">
                                    <p className="p">
                                        Contacter l'administrateur de votre école si vous n'avez pas d'identifications de  connexion
                                    </p>
                                </div>
                                <div className="col-lg-11 mx-auto" >
                                    <div className="row">
                                        <div onClick={this.resetPassword} className="col-lg-7 col-md-7 col-sm-8 col-8 mx-auto my-auto passwordForget" >
                                            Mot de passe oublié ? <span className="spinner-border spinner-border-sm" style={{display:this.state.showSpinner1?"inline-block":"none"}} ></span>
                                        </div>

                                        <div className="col-lg-4 col-md-4 col-sm-4 col-4 mx-auto mt-2 passwordForget" >
                                            <MyButton
                                                label={"Connecter"}

                                                disabled={this.state.disabled}
                                                background={"#106765"}
                                                color={"white"}
                                                radius={"4px"}
                                                border={"0"}
                                                hoverback={"#16a8a5"}
                                                hovercolor={"white"}
                                                upperCase={false}
                                                iconDisplay={this.state.showSpinner?"inline":"none"}
                                                type={'submit'}
                                            />

                                        </div>
                                    </div>

                                </div>


                            </form>

                        </div>
                    </div>
                </div>


            </>
        );
    }
}

export default Login;
