import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import ProfileGeneral from "./ProfileGeneral";
import GeneralProfileNavigator from "./GeneralProfileNavigator";
import axios from "axios";
import LoadingPage from "../../../CustomCompenents/LoadingPage";
import NavBar from "../../../General/NavBar";
import PushMessageModal from "./PushMessageModal";
class GeneralProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoading:true,
            profile:{},
            FirstLater:'',
            profile1:{},
            FirstLater1:'',
            NewMessageIsOpen:false,
            NewMessageModalClass:"overlay-hidden"
        }

    }
    getHisProfileData=()=>{
        axios.get('api/user/'+this.props.match.params.id).then(res=>{
            if(res.data==='same_user')
            {
                this.props.history.push('/profile')
            }
            else
                this.setState({
                    profile:res.data,
                    FirstLater:res.data.last_name.toString().trim().charAt(0).toUpperCase(),
                    isLoading:false
                })
            console.log(res.data.roles)

        }).catch(err=>{

            if(err.response.status===404)
                this.props.history.push('/home')
        })
    }
    componentDidMount() {
        axios.get('/api/user-profile-data').then(res=>{
            let first_letter=res.data.last_name.toString().trim().charAt(0).toUpperCase()
            localStorage.setItem("user_id",res.data.id)
            localStorage.setItem("first_letter",first_letter)
            localStorage.setItem("image",res.data.profile_image_path)
            this.setState({
                profile1:res.data,
                FirstLater1:first_letter,
            })
            this.getHisProfileData()
        })


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

    render() {
        if(this.state.isLoading)
            return <LoadingPage/>

        return (
            <>
                <NavBar tab={null}
                        profile={this.state.profile1}
                        countNotifs={this.state.profile.countNotifs}
                        countMessages={this.state.profile.countMessages}
                        FirstLater={this.state.FirstLater1}  openModal={"none"} closeModal={()=>""}/>
                <div className={this.state.NewMessageModalClass}>
                    <PushMessageModal
                        picture={this.state.profile.profile_image_path}
                        first_letter={this.state.profile.last_name.toString().trim().charAt(0).toUpperCase()}
                        sender_fname={this.state.profile.first_name}
                        sender_lname={this.state.profile.last_name}
                        openNewMessage={this.openNewMessage}/>
                </div>
                <div className="row container mx-auto my-3">
                    <div className="col-lg-8 mx-auto">
                        <ProfileGeneral
                            userPublication={this.state.profile.cmpt}
                            role={this.state.profile.roles.split("_")[1].split('"')[0].toLowerCase()}
                            userName={this.state.profile.last_name+ " "+this.state.profile.first_name}
                            FirstLater={this.state.profile.last_name.toString().trim().charAt(0).toUpperCase()}
                            picture={this.state.profile.profile_image_path}
                            OpenNewMessage={this.openNewMessage}
                        />
                    </div>
                    <div className="col-lg-8 mx-auto">
                        <div className="row p-0" >
                            <GeneralProfileNavigator email={this.state.profile.email} id={this.state.profile.id}
                            isTeacher={this.state.profile.roles==='["ROLE_ENSEIGNANT"]'}
                            />
                        </div>

                    </div>
                </div>

            </>
        );
    }
}

GeneralProfilePage.propTypes = {};

export default withRouter(GeneralProfilePage);
