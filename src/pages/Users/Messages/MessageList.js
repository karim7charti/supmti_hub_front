import React, {Component} from 'react';
import MessageLabel from "./MessageLabel";
import './../../../css/MessagesStyle.css'
import ChatRoom from "./ChatRoom";
import axios from "axios";
import realtime_server_link from "../../../mercure";
import MessageLabelSkeleton from "../../CustomCompenents/MessageLabelSkeleton";
import ErrorGeneral from "../../CustomCompenents/ErrorGeneral";
import noMsg from './../../../imgs/noMsg.png'


class MessageList extends Component {

    constructor(props) {
        super(props);
        this.myId=null;
         this.my_event=null;
        this.maxResult=10;
            this.pageNum=1;
        this.state={
            isLoading:true,
            chatRooms:[]
        }
    }

    markMessageAsSeen=(id)=>{
        axios.patch("/api/Message/"+id).then(res=>{
            if(res.status===200)
                this.props.decrementMessageCount()
        })
    }
    geMyChatRooms=()=>{
       /* if(Object.keys(ChatRoomsCache.data).length===0)
        {*/
            axios.get("/api/ChatRoom?maxResults="+this.maxResult+"&pageNum="+this.pageNum).then(res=>{
                    this.myId=res.data.myId
                    //ChatRoomsCache.data=res.data
                    this.setState({
                        isLoading:false,
                        chatRooms:res.data.chatRooms
                    })
                const url=new URL(realtime_server_link)
                    url.searchParams.append('topic','message/to/user/'+res.data.myId);
                    this.my_event=new EventSource(url,{withCredentials:true})

                        this.my_event.onmessage=e=> {

                        let message=JSON.parse(e.data).message
                        let data=this.deleteChatRoomIfExists(message.chat_room_id)
                            this.setState(prev=>({
                                    chatRooms:[message,...data]
                                }))
                            }
            })
       /* }
        else
        {
             this.myId=ChatRoomsCache.data.myId

                this.setState({
                        isLoading:false,
                        chatRooms:ChatRoomsCache.data.chatRooms
                })
        }¨*/


    }
    componentDidMount() {

        this.geMyChatRooms()
    }

    deleteChatRoomIfExists=(chat_room_id)=>{
        let found=false ,index=-1;
        let arr=[...this.state.chatRooms]
        for(let i=0;i<arr.length;i++)
        {
            if(arr[i].chat_room_id==chat_room_id)
            {
                index=i
                found=true
                break
            }
        }
        if(found)
            arr.splice(index,1)

        return arr

    }
    componentWillUnmount() {
         this.my_event.close()
    }

    render() {
        let chatRooms=""
        if(this.state.isLoading)
        {
            chatRooms=<>
                <MessageLabelSkeleton/>
                <MessageLabelSkeleton/>
                <MessageLabelSkeleton/>
                <MessageLabelSkeleton/>
            </>
        }
        else {
            if(this.state.chatRooms.length === 0){
                chatRooms = <ErrorGeneral img={noMsg} onClick={this.props.openNewMsg} buttonText="Nouveau message"/>
            }

            else{
                chatRooms=
                    this.state.chatRooms.map(item=>{
                        console.log(item)
                        let firtstName,lastName,profileImage,userId,role
                        if(item.idS==this.myId)
                        {
                            userId=item.idR
                            firtstName=item.first_nameR
                            lastName=item.last_nameR
                            profileImage=item.profile_image_pathR
                            role=item.roleR
                        }
                        else
                        {
                            userId=item.idS
                            firtstName=item.first_nameS
                            lastName=item.last_nameS
                            profileImage=item.profile_image_pathS
                            role=item.roleS
                        }
                        return <MessageLabel
                            sender_lname={lastName}
                            sender_fname={firtstName}
                            picture={profileImage}
                            last_msg={item.body}
                            last_date={item.created_at}
                            isRead={(item.idS==this.myId)?true:(item.seen==="1")}
                            senderIsMe={(item.idS==this.myId)}
                            onClick={
                                ()=>{
                                    this.props.setContent(<ChatRoom
                                        picture={profileImage}
                                        first_letter={lastName.toString().charAt(0).toUpperCase()}
                                        sender_lname={lastName}
                                        sender_fname={firtstName}
                                        reciever={userId}
                                        chat_room_id={item.chat_room_id}
                                        myId={this.myId}
                                        sender_role={role.toString().split("_")[1].split('"')[0].toLowerCase()}
                                        setContent={this.props.setContent}/>)
                                    if(item.seen==="0")this.markMessageAsSeen(item.message_id)
                                }
                            }
                        />
                    })
            }


        }
        return (
            <div className="row px-1">
                <div className="col-lg-12 px-4 mt-3" id="message_list"  style={{minHeight:"67vh",}}>
                    <>
                        {chatRooms}
                    </>


                </div>

            </div>
        );
    }
}

MessageList.propTypes = {};

export default MessageList;
