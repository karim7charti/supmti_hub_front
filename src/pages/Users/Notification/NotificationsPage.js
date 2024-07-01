import React, {Component} from 'react';
import NavBar from "../../General/NavBar";
import axios from "axios";
import NotificationList from "./NotificationList";
import LoadingPage from "../../CustomCompenents/LoadingPage";


class NotificationsPage extends Component {


    constructor(props) {
        super(props);
        this.state={
            open:"none",
            profile:[],
            FirstLater:'',
            countNotifs:0,
            isLoading:true
        }
    }
    openModal=()=>{
        this.setState({
            open:"block"
        })
    }

    handleCloseModal = (display) => {
        this.setState({
            open:display,
        })
    }
    componentDidMount() {
        axios.get('/api/user-profile-data').then(res=>{
            let first_letter=res.data.last_name.toString().trim().charAt(0).toUpperCase()
            localStorage.setItem("user_id",res.data.id)
            localStorage.setItem("first_letter",first_letter)
            localStorage.setItem("image",res.data.profile_image_path)
            this.setState({
                profile:res.data,
                FirstLater:first_letter,
                countNotifs:res.data.countNotifs,
                isLoading:false
            })
        })


    }

    decrementNotifCount=()=>{
        if(this.state.countNotifs>0)
        {
            this.setState(prev=>({
                countNotifs:prev.countNotifs-1
            }))
        }
    }
    markAllAsRead=()=>{
        this.setState({
            countNotifs:0
        })
    }

    render() {
        {
            if(this.state.isLoading)
                return <LoadingPage/>
            return (
                <>
                    <NavBar tab="notification_tab"
                            profile={this.state.profile}
                            countNotifs={this.state.countNotifs}
                            countMessages={this.state.profile.countMessages}
                            FirstLater={this.state.FirstLater}
                            openModal={this.state.open}
                            closeModal={this.handleCloseModal}/>
                    <div className="row  container px-2 mb-3 mx-auto">
                        <NotificationList
                            myId={this.state.profile.id}
                            markAllAsRead={this.markAllAsRead}
                            decrementNotifCount={this.decrementNotifCount}/>
                    </div>

                </>
            );
        }

    }
}

NotificationsPage.propTypes = {};

export default NotificationsPage;
