import React, {Component} from 'react';
import ProfilePicture from "../Profile/ProfilePicture";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import axios from "axios";
import realtime_server_link from "../../../mercure";
import LoadingGeneral from "../../CustomCompenents/LoadingGeneral";

class ChatRoom extends Component {
    constructor(props) {
        super(props);

        this.maxResult=10;
        this.my_event=null
        this.pageNum=1;
        this.state={
            messages:[],
            isLoading:true
        }
    }

    componentDidMount() {
        const url=new URL(realtime_server_link)
        url.searchParams.append('topic','message/to/user/'+this.props.myId);
        this.my_event=new EventSource(url,{withCredentials:true})
        this.my_event.onmessage=e=> {
                        let message = JSON.parse(e.data).message
                    console.log(message)
                        if(message.idS==this.props.reciever)
                        {
                            const m={created_at:message.created_at,
                                body:message.body,
                                sender_id:message.sender_id
                            }

                            this.setState(prev=>({
                                messages:[...prev.messages,m]
                            }))
                        }
                    }

        this.getMessages()

    }

    ChatDivOnScroll = () =>{
        const messages_aria = document.querySelector(".messages-aria");
        messages_aria.scroll({
            top: messages_aria.scrollHeight + 1000,
            behavior: 'auto'
        });
    }

    getMessages=()=>{
        axios.get("/api/ChatRoom/"+this.props.chat_room_id+"/?maxResults="+this.maxResult+"&pageNum="+this.pageNum).then(res=>{
            this.setState({
                messages:res.data.reverse(),
                isLoading:false
            })
        });

    }
    appendMessage=(message)=> {
        this.setState(prev=>({
            messages:[...prev.messages,message]

        }),()=>{
            this.ChatDivOnScroll();
        });

    }
    componentWillUnmount() {
        this.my_event.close()
    }

    render() {
        console.log(this.props.reciever)
        let messages=""
        if(this.state.isLoading)
        {
            messages=<LoadingGeneral/>
        }
        else
        {

            messages=this.state.messages.map(item=>{
                return <ChatMessage
                    time={item.created_at}
                    message={item.body}
                    first_letter={this.props.first_letter}
                    picture={this.props.picture}
                    isOwner={item.sender_id==this.props.myId}

                />
            });




        }
        return (
            <>
                <div className="row px-1">
                    <div className="col-lg-12 mx-0 sender-bar">
                        <div className="row justify-content-between">
                            <div className="col-lg-8 col-md-8 col-sm-10 col-10 my-auto sender-info">
                                <span><ProfilePicture picture={this.props.picture} FirstLater={this.props.first_letter} height={45} width={45} fontSize={15} /></span>
                                <span>{this.props.sender_lname + " " + this.props.sender_fname}</span>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-2 col-2 my-auto text-end return-btn">
                                <i className='bx bx-left-arrow-alt' onClick={ ()=>{
                                    this.props.setContent()
                                }}> </i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 messages-aria custom-scroll p-3" onChange={this.ChatDivOnScroll}>
                        <div className="row">
                            <div className="col-lg-12 text-center mb-5 mt-3">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <ProfilePicture picture={this.props.picture} FirstLater={this.props.first_letter} height={65} width={65} fontSize={15}/>
                                    </div>
                                    <div className="col-lg-12 mt-2" style={{fontSize:".8rem",color:"gray"}}>
                                        {this.props.sender_role} à l'École Supérieure de Management, d'informatique et de Télécommunication privée - Oujda - SupMTI
                                    </div>
                                    <div className="col-lg-12"></div>
                                </div>
                            </div>
                            <div className="col-lg-12" style={{minHeight:"150px"}}>
                                <>
                                    {messages}
                                </>


                            </div>
                        </div>


                    </div>
                    <div className="col-lg-12 send-aria">
                        <ChatInput receiver={this.props.reciever} myId={this.props.myId} appendMessage={this.appendMessage}/>
                    </div>
                </div>

            </>
        );
    }
}

ChatRoom.propTypes = {};
ChatRoom.defaultProps = {
    picture:null,
    first_letter:"A",
    onClick:()=>"",
};

export default ChatRoom;
