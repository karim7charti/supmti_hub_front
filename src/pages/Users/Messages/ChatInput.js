import React, {Component} from 'react';
import cmnt_d from "../../../imgs/comment_disable.png";
import cmnt from "../../../imgs/comment.png";
import axios from "axios";

class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state={
             disable:true,
            message:""
        }
    }

    submitMessage=(e)=>{
        e.preventDefault()
        this.setState({
            disable:true
        },()=>{
            const payload=new FormData()
            payload.append("type","text")
            payload.append("body",this.state.message)
            payload.append("receiver_id",this.props.receiver)
            let config = {
                headers: {
                    'Content-Type': "multipart/form-data",
                }
            }
            axios.post('/api/Message',payload,config).then(res=>{

                let message={
                    created_at:res.data,
                    body:this.state.message,
                    sender_id:this.props.myId
                }
                this.props.appendMessage(message)
                this.setState({
                    message:"",
                })
            })
        })
    }

    render() {

        return (
            <>
                <div className="col-lg-12 mx-auto ">
                    <form onSubmit={this.submitMessage}>
                        <div className="row mx-auto send-message ">


                                <input placeholder="Aa" className="message-input py-2 px-2"
                                       required
                                       value={this.state.message}
                                       onChange={(event => {
                                           if(event.target.value.trim()==="")
                                               this.setState({
                                                   disable:true
                                               })
                                           else
                                               this.setState({
                                                   disable:false
                                               })

                                           this.setState({
                                               message:event.target.value
                                           })


                                       })}
                                />


                                <button type="submit"
                                        disabled={this.state.disable}
                                        className="mx-0"
                                        style={{
                                            opacity:this.state.disable? 0.4 : 1
                                        }}
                                >
                                    <img alt="Envoyer" src={this.state.disable?cmnt_d:cmnt}/>
                                </button>




                        </div>
                    </form>
                </div>
            </>
        );
    }
}

ChatInput.propTypes = {};

export default ChatInput;
