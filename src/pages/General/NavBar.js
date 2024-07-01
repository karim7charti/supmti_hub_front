import React,{Component} from "react";
import logo from './../../imgs/logo.png'
import key from './../../imgs/up.png'

import  '../../css/NavBarStyle.css'
import {Link} from "react-router-dom";
import ProfilePicture from "../Users/Profile/ProfilePicture";

import FlaotingArea from "../CustomCompenents/FlaotingArea";

import PostModal from "../Users/Posts/PostModal";
import UploadProgress from "../CustomCompenents/UploadProgress";
import uploader from "../../Services/UploaderService";

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DraftsRoundedIcon from '@material-ui/icons/DraftsRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import VerifiedUserSharpIcon from '@material-ui/icons/VerifiedUserSharp';

import msgSound from './../../audio/msg.mp3'
import notiSound from './../../audio/noti.mp3'
import realtime_server_link from "../../mercure";

class NavBar extends Component{
    constructor(props) {
        super(props);
        this.my_event=null
         this.my_event1=null
        this.state={
            display:false,
            firstLett:this.props.FirstLater,
            img:this.props.profile.profile_image_path,
            isLoading:true,
            countMessages:0,
            data: this.props.profile,
            openModal:this.props.openModal,
            countNotification:0,
            showProgress:uploader.isUploading
        }
    }

    playMessageAudio = () => {
        let msgSound = document.querySelector(".msgSound");
        msgSound.play();
    }

    playNotificationAudio = () => {
        let notiSound = document.querySelector(".notiSound");
        notiSound.play();
    }

   FloatButton=(e)=>{
        const button= document.getElementById('adminLink');
        button.style.transform= "scale(1.03)";
    }
    handleScroll=()=>{
        window.scroll(0,0);
    }

    handelNavTab = () =>{
        const bar=document.getElementById('bar');
        const nav=document.getElementById('navbar');
        const close=document.getElementById('close_bar');

        if (bar){
            bar.addEventListener('click', ()=>{
                nav.classList.add('active');
            })
        }

        if (close){
            close.addEventListener('click', ()=>{
                nav.classList.remove('active');
            })
        }

        /*Active tab*/
        const tab = document.getElementById(this.props.tab);
        if(tab == null) return;
        tab.className = this.props.tab + " active"




    }

    componentDidMount() {
            this.handelNavTab();


             if(this.state.data.roles.toString()==="ROLE_ADMIN")
             {
                    this.setState({
                        display:true
                    })


             }

             this.setState({
                 isLoading:false
             })


            this.getRealtimeNotifCount()
            this.getRealtimeMessageCount()




    }
    handleActive=()=>{

    }

    getRealtimeNotifCount=()=>{
         const url=new URL(realtime_server_link)
            url.searchParams.append('topic','notification/count/'+this.props.profile.id);
            this.my_event=new EventSource(url)

            this.my_event.onmessage=e=> {
                document.querySelector("#btnPlaySound").click()
                    this.setState(prev=>({
                        countNotification:prev.countNotification+1
                    }))
            }
    }
    getRealtimeMessageCount=()=>{
            const url=new URL(realtime_server_link)
            url.searchParams.append('topic','message/to/user/count/'+this.props.profile.id);
            this.my_event1=new EventSource(url)

            this.my_event1.onmessage=e=> {
                document.querySelector("#btnPlaySoundMssg").click()
                    this.setState(prev=>({
                        countMessages:prev.countMessages+1
                    }))
            }

    }


    componentWillUnmount() {
        this.my_event.close()
         this.my_event1.close()
    }


    startProgress=()=>{
        this.setState({
            showProgress:true
        })
    }

    hideProgress=()=>{
        this.setState({
            showProgress:false
        })
    }



    render() {
        const StyledBadge = withStyles((theme) => ({
            badge: {
                right: -3,
                top: 13,
                border: `2px solid ${theme.palette.background.paper}`,
                fontSize:11,
                fontWeight:600,
                padding: '0 4px',
            },
        }))(Badge);

        //icon method
        let homeIcon= <HomeOutlinedIcon />,
            messageIcon = <MailOutlineOutlinedIcon/>,
            notificationIcon = <NotificationsOutlinedIcon/>,
            adminIcon = <VerifiedUserOutlinedIcon/>
        switch (this.props.tab) {


            case "home_tab" : homeIcon = <HomeRoundedIcon/>;
                  break;

            case "message_tab" : messageIcon = <DraftsRoundedIcon/>;
                  break;

            case "notification_tab" : notificationIcon = <NotificationsRoundedIcon/>;
                  break;

            case "admin_tab" : adminIcon = <VerifiedUserSharpIcon/>;
                  break;


        }
        //*********

        let floating="",modal="",progress=""
        if(this.state.showProgress)
            progress= <UploadProgress hideProgress={this.hideProgress} time={10} show={this.state.showProgress}/>
        if(!this.state.isLoading)
        {
            floating=<FlaotingArea showProgress={this.startProgress} display={this.state.display} data={this.state.data}/>
            modal=   <span style={{display:this.props.openModal}}>
                        <PostModal showProgress={this.startProgress} ClosePost={this.props.closeModal} data={this.state.data}/>
                    </span>
        }
        return(
            <>
                <button id="btnPlaySound" style={{display:"none"}} onClick={this.playNotificationAudio}> run</button>
                <button id="btnPlaySoundMssg" style={{display:"none"}} onClick={this.playMessageAudio}> run</button>
                <div id="header">

                    <Link  style={{textDecoration: "none"}} to={"/home"}>
                        <img src={logo} id="logo" alt="Home"/>
                    </Link>
                    <ul id="navbar">

                        <li>
                            <Link id="home_tab" className="home" to={"/home"}>
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={0} color="secondary">
                                        {homeIcon}
                                    </StyledBadge>
                                </IconButton>

                            </Link>
                        </li>
                        <li>
                            <Link id="message_tab" className="message" to={"/messages"}>
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={this.props.countMessages+this.state.countMessages} color="secondary">
                                        {messageIcon}
                                    </StyledBadge>
                                </IconButton>
                            </Link>
                        </li>

                        <li>
                            <Link id="notification_tab" className="notification" to={"/notification"}>
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={this.props.countNotifs+this.state.countNotification} color="secondary">
                                        {notificationIcon}
                                    </StyledBadge>
                                </IconButton>
                            </Link>
                        </li>
                        <li style={{display:this.state.display?"block":"none"}}>
                            <Link id="admin_tab" className="admin" to={"/admin-dashboard"}>
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={this.props.adminCount} color="secondary">
                                        {adminIcon}
                                    </StyledBadge>
                                </IconButton>
                            </Link>
                        </li>

                        <li id="profile_li"  style={{cursor:"pointer"}}>
                            <Link id="profile_tab" className="profile" to={"/profile"}>
                                <ProfilePicture fontSize={12} picture={this.state.img} FirstLater={this.state.firstLett} height={30} width={30} />
                            </Link>
                        </li>



                        <box-icon name='chevrons-right' color="#00204A" id="close_bar" size="1.3em"></box-icon>

                    </ul>
                    <div id="res_mob">
                        <box-icon name='right-indent' color="#00204A" id="bar" size="sm"></box-icon>

                    </div>
                </div>
                {floating}



          <ul id="floating_btn" className="align-content-between">
                    <li >

                            <span id="adminLink" onClick={this.handleScroll}>
                                <img src={key} alt="goUp" title="Monter en haut de page"   className="m-2" style={{width:"1.2em",height:"1.2em"}}/>
                            </span>

                    </li>

                </ul>

                {modal}



                {progress}
                <audio className="msgSound"  style={{display:"none"}}>
                    <source src={msgSound} type="audio/mpeg"/>

                </audio>
                <audio className="notiSound" style={{display:"none"}}>
                    <source src={notiSound} type="audio/mpeg"/>
                </audio>


            </>
        );

    }
}
NavBar.defaultProps = {
    tab : "home_tab",
    messageCount:4,
    notificationCount:1,
    adminCount:2,
}

export default NavBar;
