import React, {Component} from 'react';

import '../../../css/ProfileStyle.css'

import ProfilePicture from "./ProfilePicture";
import UserDrawer from "./UserDrawer";
import {Chip} from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import Avatar from "@material-ui/core/Avatar";
import ProfilePicturePreview from "./ProfilePicturePreview";

class ProfilePreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile:this.props.profile,
            isLoading:true,
            FirstLater:this.props.FirstLater,
            imgDisplay:"block",
            modalDisplay:"none"
        };
    }

    setModalDisplay = (display) => {
        this.setState({
            modalDisplay:display,
        });
    }

    handleModalImg=()=>{
        this.setState({
            modalDisplay:"block"
        })
    }



    render() {


        return <>
            <span style={{
                display:this.state.modalDisplay,
            }}>
              <ProfilePicturePreview
                  img={this.state.profile.profile_image_path}
                  firstLetter={this.state.FirstLater}
                  imgDisplay={this.state.imgDisplay}
                  isFound={this.state.profile.profile_image_path!==null}
                  setModalDisplay={this.setModalDisplay}
              />
            </span>

            <div className="row my-4 mx-auto py-3 px-1" id="profileDiv" style={styles.bigDiv}>
                <div className="col-lg-12 mx-auto mt-0 mb-2">
                    <Chip
                        avatar={<Avatar>{this.state.FirstLater}</Avatar>}
                        label={this.state.profile.roles.toString().split('_')[1].toLowerCase()}
                        deleteIcon={<DoneIcon/>}
                        clickable={false}
                        onDelete={true}
                    />
                </div>
                <div className="col-lg-12 mx-auto mt-4 mb-2 text-center"  id="imgEdit" onClick={this.handleModalImg}>
                    <ProfilePicture width={120} height={120} display={this.state.imgDisplay} FirstLater={this.state.FirstLater}  picture={this.state.profile.profile_image_path}/>

                    <span className="change">
                                Modifier
                    </span>
                </div>

                <div className="col-lg-12 mx-auto my-auto">
                    <div className="row">
                        <div className="col-lg-12 text-center mx-auto my-2">
                            <span style={{fontSize:"1.2em",fontWeight:600}}>{this.state.profile.last_name +" "+this.state.profile.first_name}</span>
                        </div>
                        <div className="col-lg-12 text-center mx-auto my-1">
                            <span style={{ wordWrap:"break-word" }}>{this.state.profile.email}</span>

                        </div>


                    </div>

                </div>
                <div className="col-lg-12 mx-auto my-3 text-center">
                    <UserDrawer name={this.state.profile.last_name +" "+this.state.profile.first_name} email={this.state.profile.email} image={this.state.profile.profile_image_path}/>
                </div>

            </div>



        </>;
    }
}

export default ProfilePreview;

const styles = {
    image:{
        height:120,
        width:120,
        borderRadius:"100%",

    },
    input:{

        backgroundColor:"transparent",


    },
    bigDiv:{
        backgroundColor: "white",
        border: "1px solid lightgray",
        borderRadius: "9px",
    }

}
