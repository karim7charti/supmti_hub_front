import React, {Component} from 'react';
import ProfilePicture from "../../Profile/ProfilePicture";
import '../../../../css/ProfileStyle.css'
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import MyButton from "../../../CustomCompenents/MyButton";

class ProfileGeneral extends Component {
    render() {
        return (
            <>
                <div className="row p-4" id="profile_general">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-4 col-5 my-auto text-center">
                                <ProfilePicture width={110} height={110} display={this.props.display} FirstLater={this.props.FirstLater}  picture={this.props.picture} fontSize={45}/>
                            </div>
                            <div className="col-lg-5  col-md-7 col-sm-8 col-7 my-auto">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <span className="name">{this.props.userName}</span>
                                    </div>

                                    <div className="col-lg-12 mt-1">
                                        <span id="role">{this.props.role}</span>
                                    </div>

                                    <div className="col-lg-12 mt-1 pub">
                                        {this.props.userPublication} Publications
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-11 col-11 mx-auto my-lg-auto mt-md-3 mt-sm-3 mt-3">
                                <MyButton

                                    label={"Contacter"}
                                    icon={<SendRoundedIcon fontSize="large"/>}
                                    disabled={false}
                                    background={"#106765"}
                                    color={"#fff"}
                                    radius={"45px"}
                                    border={"0"}
                                    hoverback={"#014d80"}
                                    hovercolor={"white"}
                                    upperCase={false}
                                    shadow={"none"}
                                    fontWeight={600}
                                    fontSize={14}
                                    onClick={this.props.OpenNewMessage}

                                />

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12"></div>
                </div>

            </>
        );
    }
}

ProfileGeneral.propTypes = {};
ProfileGeneral.defaultProps = {
    userPublication:0,
    role:"Administrateur",
    FirstLater:"U",
    picture:null,
    display:"block"
};

export default ProfileGeneral;
