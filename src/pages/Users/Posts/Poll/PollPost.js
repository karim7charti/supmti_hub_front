import React, {Component} from 'react';
import PollOption from "./PollOption";
import MyButton from "../../../CustomCompenents/MyButton";
import '../../../../css/CustomCompenentsStyle.css'
import ProfilePicture from "../../Profile/ProfilePicture";
import {AddCircleRounded} from "@material-ui/icons";
import swal from "sweetalert";
import axios from "axios";

class PollPost extends Component {
    constructor(props) {
        super(props);
           this.state={
                limitOption:true,
               errors: {},
               question:"",
               disabale:false,
               answers:[
                   {answer:""},
                   {answer:""}
               ],
                options :[
                ],
            }
    }

    componentDidMount() {
        this.setState(
            {
                    options :[
                    <PollOption optionNumber={1} noDelete={true}
                                errors={this.state.errors} setAnswer={this.setAnswer}/>,
                    <PollOption  optionNumber={2} noDelete={true} errors={this.state.errors}
                                setAnswer={this.setAnswer}/>
                ],
            }
        )
    }
    remove=(pos)=>{

        let arr=this.state.options.map(item=>item);
        let answers=this.state.answers
        arr.splice(pos-1,1);
        answers.splice(pos-1,1);
        let test=arr.map((item,index)=>{
            if (index>=(pos-1))
                return <PollOption optionNumber={index+1} noDelete={false} onDelete={this.remove} errors={this.state.errors} setAnswer={this.setAnswer}/>
            return item

        })
        this.setState({
            options:test,
            answers:answers
        })
    }
    addOption=()=>{
        if(this.state.options.length<=5)
        {
            this.setState(state=>({
                options:[...state.options,
                    <PollOption optionNumber={state.options.length+1} noDelete={false} onDelete={this.remove} errors={this.state.errors} setAnswer={this.setAnswer}/>,
                ],
                answers:[...state.answers,{answer:""}]
            }))
        }
        else
        {
            swal('','le nombre limite de réponse est 6 !',"warning")
        }
    }
    publish=(e)=>{
        this.setState({
            disable:true
        },()=>{
            const payload={
                question:this.state.question,
                answers:this.state.answers
            }
                axios.post('api/polls/create-poll',payload).then(res=>{

                    this.setState({
                        disable:false
                    })
                    if(res.data.status===400)
                    {
                        this.setState({
                            errors:res.data.errors,
                        })
                    }
                    else
                    {
                         this.setState({
                            errors:{},
                             question:"",

                        })
                        swal({
                            title: "Good job!",
                              text: "Sondage publier avec succés",
                              icon: "success",
                     });
                         this.props.close('none');
                    }

                }).catch(err=>{
                     this.setState({
                              disable:false,
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
    setAnswer=(pos,answer)=>{
        let arr=this.state.answers;
        arr[pos]={"answer":answer}
        this.setState({
            answers:arr
        })

    }
    handleInputs=(e)=>{
         this.setState({
            [e.target.name]:e.target.value,
            errors:{}
        })
    }
    render() {
        let options="";
            options=this.state.options.map((item,index)=>{
                return <PollOption optionNumber={index+1} noDelete={(index===0 || index===1)} onDelete={this.remove} errors={this.state.errors} setAnswer={this.setAnswer}/>
            })


        return (
            <>
                <div className="row  p-2">
                    <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                        <ProfilePicture width={45} height={45} display={"block"} FirstLater={this.props.data.last_name.charAt(0).toUpperCase()}  picture={this.props.data.profile_image_path} fontSize={15}/>
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
                            <textarea  id="post_text" name={"question"} value={this.state.question}
                                       onChange={this.handleInputs}
                                       role="textbox" placeholder="Poser votre question..."  contentEditable autoFocus/>
                        </div>
                        <span className={"text-danger"} style={{fontSize:12}}>{this.state.errors.question}</span>
                    </div>

                    {options}

                    <div className="row">
                        <div className="col-lg-12 mt-2">
                            <MyButton

                                label={"Ajouter un choix"}
                                icon={<AddCircleRounded/>}
                                disabled={false}
                                background={"lightgray"}
                                color={"white"}
                                radius={"9px"}
                                border={"0"}
                                hoverback={"gray"}
                                hovercolor={"white"}
                                onClick={this.addOption}

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
                                iconDisplay={this.state.disable?"inline":"none"}

                            />
                        </div>
                    </div>
                </form>


            </>
        );
    }
}

export default PollPost;
