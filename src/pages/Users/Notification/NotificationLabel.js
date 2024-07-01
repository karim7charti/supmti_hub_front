import React, {Component} from 'react';

import ProfilePicture from "../Profile/ProfilePicture";

//icons
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import SpeakerNotesRoundedIcon from '@material-ui/icons/SpeakerNotesRounded';
import WbIncandescentRoundedIcon from '@material-ui/icons/WbIncandescentRounded';
import {Tooltip} from "@material-ui/core";
import axios from "axios";

class NotificationLabel extends Component {

    state={
        badgeIcon:"",
        withBadgeIcon:true,
        infoText:"",
        isSeen:this.props.isRead


    }

    handelNotificationType = () =>{
        let tempType = "";
        let tempText = "";
        switch (this.props.type) {
            case "LIKE":
                tempType=<FavoriteRoundedIcon style={{ color: "white" , fontSize:25, backgroundColor:"#ff0000", borderRadius:50,padding:4 }}/>
                tempText=" aimé votre publication"
                break;
            case "COMMENT":
                tempType=<SpeakerNotesRoundedIcon style={{ color: "white" , fontSize:25, backgroundColor:"#10706E", borderRadius:50,padding:4 }}/>
                tempText=" commenté votre publication"
                break;
            case "COMMENT_LIKE":
                tempType=<WbIncandescentRoundedIcon style={{ color: "yellow" , fontSize:25, backgroundColor:"#00bbff", borderRadius:50,padding:4,transform: "rotateX(180deg)" }}/>
                tempText=" trouvé votre commentaire intéressant"
                break;


            default:
                this.setState({
                    withBadgeIcon:false,
                })
        }

        this.setState({
            badgeIcon : tempType,
            infoText : tempText,
        })

        if(this.props.trigger_number === 1){
            this.setState({
                notiGroupe:false,
            })
        }
    }

    componentDidMount() {
        this.handelNotificationType();
    }
    markAsSeen=(e)=>{



        if(!this.state.isSeen)
        {
            axios.patch("/api/Notification/"+this.props.notifId)
        }

        this.props.markOneAsSeen(this.props.notifId,this.props.path,this.props.activityId)

    }

    render() {
        return (
            <>
                <div className="noti-label" style={{
                    filter: this.props.isRead?  "brightness(.9)" : "revert",
                }}>
                    <div className="picture"  onClick={this.markAsSeen}>
                        <ProfilePicture
                            badgeIcon={this.state.badgeIcon}
                            withBadgeIcon={this.state.withBadgeIcon}
                            picture={this.props.picture}
                            FirstLater={this.props.first_letter}
                            height={45} width={45} fontSize={15}
                            showBadge={false}
                        />
                    </div>
                    <div className="info"  onClick={this.markAsSeen}>
                        <span className="trigger">
                            {this.props.trigger_name}
                        </span>
                        <span className="info-text">
                          {this.props.notiGroupe? " et "+this.props.trigger_number+" autres ont " : "a"}
                            {this.state.infoText}
                        </span>
                        <span className="date">
                            &nbsp;{this.props.noti_date}
                        </span>
                    </div>
                    <div className="unread-index">
                        <span className="delete">
                            <Tooltip title={"Supprimer"}>
                               <i className='bx bx-x'></i>
                            </Tooltip>
                        </span>
                        <span className="unread" style={{visibility:this.props.isRead?"hidden":"visible"}}> </span>

                    </div>
                </div>

            </>
        );
    }
}

NotificationLabel.defaultProps = {
    type:null,
    picture:null,
    isRead:false,
    notiGroupe:true,
    onClick:()=>"",
};

export default NotificationLabel;
