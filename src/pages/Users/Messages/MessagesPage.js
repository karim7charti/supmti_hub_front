import React, {Component} from 'react';
import UpOptionsBar from "./UpOptionsBar";
import NavBar from "../../General/NavBar";
import axios from "axios";
import MessageList from "./MessageList";
import LoadingPage from "../../CustomCompenents/LoadingPage";
import MessageModal from "./MessageModal";

class MessagesPage extends Component {

    constructor(props) {
        super(props);
        this.state={
            open:"none",
            profile:[],
            FirstLater:'',
            countMessages:0,
            isLoading:true,
            content:"",
            contentList:true,
            NewMessageIsOpen:false,
            NewMessageModalClass:"overlay-hidden"
        }
    }
    openModal=()=>{
        this.setState({
            open:"block"
        })
    }

    openNewMessage = () =>{
        if (!this.state.NewMessageIsOpen){
            this.setState({
                NewMessageModalClass:"overlay",
                NewMessageIsOpen:true,
            })
        }
        else {
            this.setState({
                NewMessageModalClass:"overlay-hidden",
                NewMessageIsOpen:false,
            })
        }
    }

    handleCloseModal = (display) => {
        this.setState({
            open:display,
        })
    }

    setContent = (content) =>{
        if(this.state.contentList){
            this.setState({
                content:content,
                contentList:false
            })
        }
        else {
            this.setState({
                content:<> <UpOptionsBar openNewMessage={this.openNewMessage}/>
                    <MessageList openNewMsg={this.openNewMessage}
                                   decrementMessageCount={this.decrementMessageCount}
                                 setContent={this.setContent}/> </>,
                contentList:true
            })
        }

    }
    componentDidMount() {
        if(this.state.contentList){
            this.setState({
                content:<> <UpOptionsBar openNewMessage={this.openNewMessage}/>
                    <MessageList
                        decrementMessageCount={this.decrementMessageCount}
                    openNewMsg={this.openNewMessage}
                    setContent={this.setContent}/> </>,
            })
        }

        axios.get('/api/user-profile-data').then(res=>{
            let first_letter=res.data.last_name.toString().trim().charAt(0).toUpperCase()
            localStorage.setItem("user_id",res.data.id)
            localStorage.setItem("first_letter",first_letter)
            localStorage.setItem("image",res.data.profile_image_path)
            this.setState({
                profile:res.data,
                FirstLater:first_letter,
                countMessages:res.data.countMessages,
                isLoading:false
            })
        })
    }
      decrementMessageCount=()=>{
        if(this.state.countMessages>0)
        {
            this.setState(prev=>({
                countMessages:prev.countMessages-1
            }))
        }
    }


    render() {
        if(this.state.isLoading)
            return <LoadingPage/>
        return (
            <>
                <NavBar tab="message_tab"
                        countNotifs={this.state.profile.countNotifs}
                        countMessages={this.state.countMessages}
                        profile={this.state.profile} FirstLater={this.state.FirstLater} openModal={this.state.open} closeModal={this.handleCloseModal}/>
                <div className={this.state.NewMessageModalClass}>
                    <MessageModal  openNewMessage={this.openNewMessage}

                                   setContent={this.setContent}/>
                </div>
                <div className="row mt-4 container px-2 mb-3 mx-auto">
                    <div className="col-lg-9 col-11 p-2 mx-auto" style={{
                        backgroundColor:"white",
                        borderRadius:9,

                    }}>
                        {this.state.content}
                    </div>
                </div>

            </>
        );
    }
}

MessagesPage.propTypes = {};

export default MessagesPage;
