import React, {Component} from 'react';
import ProfilePreview from "./ProfilePreview";
import NavBar from "../../General/NavBar";
import ProfilePostNavigator from "./ProfilePostNavigator";
import LoadingPage from "../../CustomCompenents/LoadingPage";
import axios from "axios";

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state={
            profile:[],
            FirstLater:'',
            isLoading:true
        }
    }
    componentDidMount() {
        axios.get('/api/user-profile-data').then(res=>{
            this.setState({
                profile:res.data,
                FirstLater:res.data.last_name.toString().trim().charAt(0).toUpperCase(),
                isLoading:false
            })
        })
    }

    render() {
        if(this.state.isLoading)
            return <LoadingPage/>
        return (
            <>
                <NavBar tab="profile_tab"
                        profile={this.state.profile}
                        FirstLater={this.state.FirstLater}
                        countMessages={this.state.profile.countMessages}
                        countNotifs={this.state.profile.countNotifs}
                        openModal={"none"} closeModal={()=>""}/>
                <div className="row container mx-auto">
                    <div className=" col-lg-4 col-md-4 col-sm-11 col-12 mx-auto px-sm-0 px-0 px-lg-2 px-md-2">
                        <ProfilePreview profile={this.state.profile} FirstLater={this.state.FirstLater} />

                    </div>

                    <div className=" col-lg-7 col-md-8 col-sm-11 col-12 px-0  mx-auto">
                        <ProfilePostNavigator role={this.state.profile.roles.toString()}/>

                    </div>
                </div>



            </>
        );
    }
}

export default ProfilePage;
