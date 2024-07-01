import React, {Component} from 'react';
import ProfilePicture from "../Profile/ProfilePicture";


class MessageLabel extends Component {
    render() {
        return (
            <>
                <div className="row px-3 message_label my-1 py-1" onClick={this.props.onClick} style={{
                    color:this.props.isRead?"rgba(0,0,0,0.6)":"black",
                    //backgroundColor:this.props.focused?"rgba(0,0,0,0.02)":"white",
                    borderRadius:9,
                }}>
                    <div className="col-lg-1 col-md-1 col-sm-2 col-2 my-auto p-0">
                        <ProfilePicture

                            picture={this.props.picture}
                            FirstLater={this.props.first_letter}
                            height={45}
                            width={45}
                            fontSize={15}
                            showBadge={false}
                        />
                    </div>
                    <div className="col-lg-10  col-md-10 col-sm-9 col-8 my-auto">
                        <div className="row">
                            <div className="col-lg-12 name">
                                {this.props.sender_lname}&nbsp;{this.props.sender_fname}
                            </div>
                            <div className="col-lg-12 " >

                               <span className="msg">
                                   <span className="sender"> {this.props.senderIsMe? "Vous" : this.props.sender_lname}</span>
                                   &nbsp;:&nbsp; {this.props.last_msg}
                               </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-1  col-md-1 col-sm-1 col-2 my-auto text-end date">
                        <span> {this.props.last_date} </span>
                    </div>
                </div>

            </>
        );
    }
}

MessageLabel.propTypes = {};
MessageLabel.defaultProps = {
    picture:null,
    first_letter:"A",
    senderIsMe:false,
    isRead:false,
    focused:false,
    onClick:()=>"",

};

export default MessageLabel;
