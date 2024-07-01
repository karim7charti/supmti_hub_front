import React, {Component} from 'react';
import ProfilePicture from "../Profile/ProfilePicture";

class ChatMessage extends Component {

    render() {
        return (
            <>
                <div className="row text-center mt-3">
                    <div className="col-lg-12 message-time">
                        {this.props.time}
                    </div>
                </div>
                <div className="row mt-1 mb-3 one-message" style={{
                    gridTemplateColumns:this.props.isOwner?"1fr":"40px 1fr",
                    justifyItems:this.props.isOwner?"flex-end":"",

                }}>

                    <span className="picture" style={{
                        display:this.props.isOwner?"none":"inline-block",

                    }}>
                        <ProfilePicture width={35} height={35} showBadge={false}  FirstLater={this.props.first_letter}  picture={this.props.picture} fontSize={9}/>
                    </span>
                    <span className="message" style={{
                        backgroundColor:this.props.isOwner?"#10706E":"rgba(232, 232, 232, 0.27)",
                        color:this.props.isOwner?"white":"revert"
                    }}>
                        {this.props.message}
                    </span>

                </div>

            </>
        );
    }
}

ChatMessage.propTypes = {};
ChatMessage.defaultProps = {
    isOwner:true,
    message:"The messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe messageThe message",
    picture:null,
    first_letter:"M",
    time:"00:00 01 Mai 2022"

};

export default ChatMessage;
