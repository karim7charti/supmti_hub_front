import React, {Component} from 'react';
import PropTypes, {string} from 'prop-types';
import ProfilePicture from "../Profile/ProfilePicture";
import ChatRoom from "./ChatRoom";

class OneSearchResult extends Component {
    constructor(props) {
        super(props);
    }
    handleResultClick = () =>{
        this.props.openNewMessage();
        this.props.setContent(<><ChatRoom
            picture={this.props.picture}
            first_letter={this.props.first_letter}
            sender_lname={this.props.sender_lname}
            sender_fname={this.props.sender_fname}
            reciever={this.props.id}
            chat_room_id={-1}
            myId={this.props.myId}
            sender_role={this.props.role}
            setContent={this.props.setContent}/></>);
    }
    render() {
        return (
            <>
                <div className="one-result" onClick={this.handleResultClick}>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <ProfilePicture picture={this.props.picture} FirstLater={this.props.first_letter} height={40} width={40} fontSize={12} showBadge={false}/>
                    </div>
                    <div className="account-info">
                        <span className="sender-name">{this.props.sender_fname} {this.props.sender_lname}</span>
                        <div><span className="sender-role">{this.props.role}</span></div>
                    </div>
                </div>
            </>
        );
    }
}

OneSearchResult.propTypes = {

    first_letter: PropTypes.string,
    sender_lname: PropTypes.string,
    sender_fname: PropTypes.string,
    role: PropTypes.string,
};
OneSearchResult.defaultProps = {
    picture:null,
    first_letter:"A",
    onClick:()=>"",
    role:"Administrateur"
};

export default OneSearchResult;
