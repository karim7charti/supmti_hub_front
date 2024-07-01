import React, {Component} from 'react';
import {Tooltip} from "@material-ui/core";
import './../../../css/NotificationStyle.css'
import NotificationLabel from "./NotificationLabel";
import {withRouter} from "react-router-dom";
import axios from "axios";
import realtime_server_link from "../../../mercure";
import MessageLabelSkeleton from "../../CustomCompenents/MessageLabelSkeleton";
class NotificationList extends Component {

    constructor(props) {
        super(props);
        this.maxResults=10
        this.pageNum=1
        this.filter="all"
         this.my_event=null;
        this.state={
            isAllResults:true,
            notifications:[],
            notificationFilter:[],
            isLoading:true
         }
    }
    getMyNotifs=()=>{
        axios.get("/api/Notification?maxResults="+this.maxResults+"&pageNum="+this.pageNum+'&filter='+this.filter).then(res=>{

            this.setState({
                notifications:res.data,
                notificationFilter:res.data,
                isLoading:false

            })
            const url=new URL(realtime_server_link)
            url.searchParams.append('topic','notification/'+this.props.myId);
            this.my_event=new EventSource(url)

            this.my_event.onmessage=e=> {

                let notif=JSON.parse(e.data).notif
                let arr=this.state.notifications.filter(item=>{
                    if(item.id!==notif.id)
                        return item
                })

                this.setState({
                    notifications:[notif,...arr]
                })


            }

        })
    }
    componentDidMount() {
        this.getMyNotifs()
    }
    componentWillUnmount() {
        this.my_event.close()
    }


    HandleFilter = () =>{
        this.setState({
            isAllResults:!this.state.isAllResults,
            isLoading:true
        },()=>{
            if(this.state.isAllResults)
            {
                this.filter="all"
                this.getMyNotifs()
            }
            else
            {
                this.filter="nonRead"
                this.getMyNotifs()
            }
        })
    }
    markALlAsSeen=()=>{

        this.props.markAllAsRead()
        this.setState(prev=>({
            notifications:prev.notifications.map(item=>{
                item.is_seen="1"
                return item
            })
        }))
        axios.put("/api/Notification")
    }
    markOneAsSeen=(id,path,activtyId)=>{
        /*this.setState(prev=>({
            notifications:prev.notifications.map(item=>{
                if(item.id===id)
                    item.is_seen="1"
                return item
            })
        }))*/
        this.props.history.push("/activity/"+path+"/"+activtyId)
    }

    render() {


        let notifications=""
        if(this.state.isLoading)
        {
            notifications=<><MessageLabelSkeleton isNotification={true}/>
                <MessageLabelSkeleton isNotification={true}/>
                <MessageLabelSkeleton isNotification={true}/>
                <MessageLabelSkeleton isNotification={true}/>
            </>
        }
        else {

            notifications=this.state.notifications.map(item=>{

                return <NotificationLabel
                    type={item.label}

                    notifId={item.id}
                    decrementNotifCount={this.props.decrementNotifCount}
                    isRead={item.is_seen==='1'}
                    noti_date={item.created_at}
                    picture={item.profile_image_path}
                    first_letter={item.first_name.charAt(0).toUpperCase()}
                    trigger_number={item.notif_count}
                    notiGroupe={item.notif_count>0}
                    markOneAsSeen={this.markOneAsSeen}
                    activityId={item.activity_id}
                    path={item.path}
                    trigger_name={item.first_name +" "+item.last_name}
                />
            })
        }
        return (
            <>


                    <div className="col-lg-8  mx-auto px-4 py-3 mt-4 noti-list">
                        <div className="noti-bar">
                            <span className="label">Notifications</span>
                            <span className="text-end">
                            <Tooltip disableFocusListener title="Tout marquer comme lu" arrow>
                            <i onClick={this.markALlAsSeen} className="bx bx-scaled bx-check-double" style={{
                                fontSize:25,
                                color:"gray",
                                cursor:"pointer"
                            }}> </i>
                            </Tooltip>
                        </span>
                        </div>
                        <div className="noti-filter mt-2">
                            <span className={this.state.isAllResults?"filter-btn active" : "filter-btn" }   onClick={this.HandleFilter}>Tout</span>
                            <span className={this.state.isAllResults?"filter-btn" : "filter-btn active" }   onClick={this.HandleFilter}>Non lu</span>
                        </div>
                        <div className="noti-elements mt-4 custom-scroll"  style={{overflowX:"hidden"}}>
                            {notifications}
                        </div>

                    </div>





            </>
        );
    }
}

NotificationList.propTypes = {};

export default withRouter(NotificationList);
