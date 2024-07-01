import React, {Component} from 'react';
import PropTypes from 'prop-types';
import search from "../../../imgs/search_gray.png";
import OneSearchResult from "./OneSearchResult";
import PostChoice from "../Posts/PostChoice";
import ChatRoom from "./ChatRoom";
import axios from "axios";

class MessageModal extends Component {
    constructor(props) {
        super(props);
        this.myId=null
        this.state={
            isLoading:true,
            searchedUsers:[],
            searchLoading:true,
            users:[]
        }
    }
    componentDidMount() {
        axios.get("/api/user/chat/suggested?maxResult=3&pattern=").then(res=>{
            this.myId=res.data.myId
            this.setState({
                isLoading:false,
                 users:res.data.users
            })
        })
    }

    search=(e)=>{
        let text=e.target.value.toString().trim()
        if(text!=="")
            axios.get("/api/user/chat/suggested?maxResult=3&pattern="+text).then(res=>{
                 this.myId=res.data.myId
                this.setState({
                    searchLoading:false,
                     searchedUsers:res.data.users
                })
            })
        else
            this.setState({
                searchedUsers:[]
            })

    }


    render() {
        let users='',searchedUsers=""
        if(this.state.isLoading)
        {

        }
        else {
            users=this.state.users.map(item=>{
                const role=item.roles.split("_")[1].split('"')[0].toLowerCase()
                return <OneSearchResult id={item.id} sender_fname={item.first_name} sender_lname={item.last_name}
                                        first_letter={item.last_name.charAt(0).toUpperCase()}
                                 picture={item.profile_image_path}
                                        openNewMessage={this.props.openNewMessage}
                                 setContent={this.props.setContent}
                                        myId={this.myId}
                                 role={role}
                />

            })
        }
        if(this.state.searchLoading)
        {

        }
        else {
            searchedUsers=this.state.searchedUsers.map(item=>{
                const role=item.roles.split("_")[1].split('"')[0].toLowerCase()
                return <OneSearchResult id={item.id} sender_fname={item.first_name} sender_lname={item.last_name}
                                        first_letter={item.last_name.charAt(0).toUpperCase()}
                                 picture={item.profile_image_path}
                                        openNewMessage={this.props.openNewMessage}
                                 setContent={this.props.setContent}
                                         myId={this.myId}
                                 role={role}
                />
            })
        }
        return (
            <>
                <div></div>
                <div className="new-message">
                    <div className="modal-head">
                        <b className="modal_title">Nouveau message</b>
                        <button type="button" className="btn-close" aria-label="Close"  onClick={this.props.openNewMessage} style={{color:"white"}}>
                        </button>
                    </div>
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping"><img src={search} alt="search" style={{height:"1.3em",width:"1.3em"}}/></span>
                        <input type="text" placeholder="Chercher par nom ou prénom..." className="search_input"
                               onChange={this.search}

                        />
                    </div>
                    <div className="all-results  custom-scroll mt-2">
                        <div className="search-result">

                            {searchedUsers}

                        </div>
                        <div className="suggestion-list">

                            <h4 className="title">Utilisateurs suggérés</h4>
                            {users}

                        </div>
                    </div>

                </div>
                <div></div>
            </>
        );
    }
}

MessageModal.propTypes = {};

export default MessageModal;
