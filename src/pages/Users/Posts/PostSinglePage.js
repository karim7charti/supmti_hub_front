import React, {Component} from 'react';
import CoursPublicPreview from "./Cours/CoursPublicPreview";
import NavBar from "../../General/NavBar";

import axios from "axios";
import LoadingPage from "../../CustomCompenents/LoadingPage";
import {withRouter} from "react-router-dom";
import PostPublicSkeleton from "../../CustomCompenents/PostPublicSkeleton";
import PollPostSkeleton from "../../CustomCompenents/PollPostSkeleton";
import PostPublicPreview from "./Post/PostPublicPreview";
import PollPublicPreview from "./Poll/PollPublicPreview";
import CourPostSkeleton from "../../CustomCompenents/CourPostSkeleton";
import AllComment from "./AllComment";

class PostSinglePage extends Component {
        constructor(props) {
        super(props);
        this.state={
            profile:[],
            FirstLater:'',
            activity:[],
            activityLoading:true,
            isLoading:true
        }
    }
    componentDidMount() {
            console.log(this.props.match.params)
        axios.get('/api/user-profile-data').then(res=>{
            this.setState({
                profile:res.data,
                FirstLater:res.data.last_name.toString().trim().charAt(0).toUpperCase(),
                isLoading:false
            })
            this.getPostAndComments()
        })
    }
    getPostAndComments=()=>{
            let uri;

            if(this.props.match.params.type==='course')
                uri="/courses/course/"
            else if(this.props.match.params.type==="poll")
                uri="/polls/poll/"
            else
                uri="/post/"
            axios.get("/api"+uri+this.props.match.params.id).then(res=>{

                this.setState({
                    activityLoading:false,
                    activity:res.data
                })
            }).catch(err=>{

            })
    }
    render() {
            if(this.state.isLoading)
                 return <LoadingPage/>
            let activity=""
            if(this.state.activityLoading)
            {
                    if(this.props.match.params.type==="post")
                        activity=<PostPublicSkeleton showComments={true}/>
                    else if(this.props.match.params.type==="poll")
                        activity=<PollPostSkeleton showComments={true}/>
                    else
                        activity=<CourPostSkeleton/>
            }
            else{
                if(this.state.activity.length===0)
                {

                }
                else {
                    let item=this.state.activity[0]
                    if(this.props.match.params.type==="post")
                        activity= <PostPublicPreview
                                postId={item.activity.id}
                                liked={item.activity.liked}
                                user_id={item.activity.user_id}
                                likeNumber={item.activity.count_likes}
                                commentNumber={0}
                                activity={item.activity.activity_id}
                                details={item.activity.details}
                                userImg={item.activity.profile_image_path}
                                publisher={item.activity.last_name + " " + item.activity.first_name}
                                date={item.activity.created_at}
                                role={item.activity.roles.toString().split('"')[1].toLowerCase().split('_')[1]}
                                multimedia={item.files}
                                background={"white"}
                                showCommentNumber={false}
                            />
                    else if(this.props.match.params.type==="poll")
                        activity=  <PollPublicPreview
                                    pollId={item.activity.id}
                                    liked={item.activity.liked}
                                    likeNumber={item.activity.count_likes}
                                    commentNumber={0}
                                    activity={item.activity.activity_id}
                                    question={item.activity.question}
                                    user_id={item.activity.user_id}
                                    userImg={item.activity.profile_image_path}
                                    publisher={item.activity.last_name +" " +item.activity.first_name}
                                    date={item.activity.created_at}
                                    role={item.activity.roles.toString().split('"')[1].toLowerCase().split('_')[1]}
                                    answers={item.answers}
                                    showCommentNumber={false}
                                    background={"white"}
                                />
                    else
                        activity=<CoursPublicPreview
                                coursId={item.activity.id}
                                liked={item.activity.liked}
                                user_id={item.activity.user_id}
                                likeNumber={item.activity.count_likes}
                                commentNumber={0}
                                showCommentNumber={false}
                                activity={item.activity.activity_id}
                                title={item.activity.title}
                                description={item.activity.description}
                                userImg={item.activity.profile_image_path}
                                publisher={item.activity.last_name + " " + item.activity.first_name}
                                date={item.activity.created_at}
                                role={item.activity.roles.toString().split('"')[1].toLowerCase().split('_')[1]}
                                files={item.files}
                                background={"white"}
                            />
                }
            }
        return (
            <>
                <NavBar tab={"home_tab"}
                        profile={this.state.profile}
                        FirstLater={this.state.FirstLater}
                        countMessages={this.state.profile.countMessages}
                        countNotifs={this.state.profile.countNotifs}
                        openModal={"none"} closeModal={()=>""}/>
                <div className="row my-4 container mx-auto">
                    <div className=" mb-1 mx-auto col-lg-7 col-md-10 col-sm-12 col-12">

                        {activity}
                         <AllComment
                             on={this.props.match.params.type}
                             activity={this.props.match.params.id}
                             user={this.state.profile.id}/>


                    </div>



                </div>



            </>
        );
    }
}



export default withRouter(PostSinglePage);
