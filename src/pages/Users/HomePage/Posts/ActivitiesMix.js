import React, {Component} from 'react';
import SearchBar from "./SearchBar";
import MyButton from "../../../CustomCompenents/MyButton";
import axios from "axios";
import CourPostSkeleton from "../../../CustomCompenents/CourPostSkeleton";
import PostPublicSkeleton from "../../../CustomCompenents/PostPublicSkeleton";
import PollPostSkeleton from "../../../CustomCompenents/PollPostSkeleton";
import nodata from "../../../../imgs/noData.png";
import ErrorDiv from "../../../CustomCompenents/ErrorDiv";
import PostPublicPreview from "../../Posts/Post/PostPublicPreview";
import PollPublicPreview from "../../Posts/Poll/PollPublicPreview";
import CoursPublicPreview from "../../Posts/Cours/CoursPublicPreview";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

class ActivitiesMix extends Component{
        constructor(props) {
        super(props);
        this.activities=[]
        this.state={
            isLoading:true,
            user:{},
            activities:[],
            error:false,
            disable:false,
            displayIconLoading:'none',
            maxResult:2,
            idLoading:true,
            pageNum:1
        }
    }
    componentDidMount() {

        this.getLatestActivities();

    }
    getLatestActivities=async ()=>{
            try {
                let activities=[]
                let resPost=await axios.get("api/post/all-posts/"+ this.state.maxResult+"/"+this.state.pageNum)
                let resPolls=await axios.get("api/polls/get-all-polls/"+ this.state.maxResult+"/"+this.state.pageNum)
                let resCourse=await axios.get("api/courses/courses/"+ this.state.maxResult+"/"+this.state.pageNum)
                activities=[...resPost.data,...resCourse.data,...resPolls.data]
                let arr=activities.sort((a,b)=>b.activity.activity_id>a.activity.activity_id?1:-1)

                this.setState(prev=>({
                    activities:[...prev.activities,...arr],
                    isLoading:false,
                    disable:false,
                    displayIconLoading:'none',

                }))
            }
            catch (e) {

            }

    }

    addScrollEventTo =()=>{
        const body = document.body;
        document.addEventListener("scroll", ()=>{
            if(window.pageYOffset >= (body.scrollHeight - 1000)){
                this.getMoreResult();
                console.log("this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();this.getMoreResult();")

            }

        })
    }
    removeScrollEventTo =()=>{
        document.removeEventListener("scroll",()=>"")
    }



    getMoreResult=()=>{
            const pageNum=this.state.pageNum+1;
        this.setState({
            disable:true,
            displayIconLoading:'block',
            pageNum:pageNum
        },()=>{
            this.getLatestActivities()
        })
    }


    render() {
        let activities="",showMore=""
        if(this.state.isLoading)
        {
            activities=<>
                    <CourPostSkeleton/>
                    <PostPublicSkeleton/>
                    <PollPostSkeleton/>
            </>
        }
        else {
            if(this.state.activities.length===0)
            {
                activities=<ErrorDiv img={nodata}  imgW={280} imgH={230} marginImg={30} error="Données introuvables"
                                     describtion="aucune activity publiée pour l'instant" button={false} />
            }
            else {
                activities=this.state.activities.map(item=>{

                    if(item.activity.type==="post")
                    {
                        return  <PostPublicPreview
                                postId={item.activity.id}
                                liked={item.activity.liked}
                                user_id={item.activity.user_id}
                                likeNumber={item.activity.count_likes}
                                commentNumber={item.activity.count_comments}
                                activity={item.activity.activity_id}
                                details={item.activity.details}
                                userImg={item.activity.profile_image_path}
                                publisher={item.activity.last_name + " " + item.activity.first_name}
                                date={item.activity.created_at}
                                role={item.activity.roles.toString().split('"')[1].toLowerCase().split('_')[1]}
                                multimedia={item.files}
                                background={"white"}
                            />
                    }
                    else if(item.activity.type==="poll")
                    {
                        return   <PollPublicPreview
                                    pollId={item.activity.id}
                                    liked={item.activity.liked}
                                    likeNumber={item.activity.count_likes}
                                    commentNumber={item.activity.count_comments}
                                    activity={item.activity.activity_id}
                                    question={item.activity.question}
                                    user_id={item.activity.user_id}
                                    userImg={item.activity.profile_image_path}
                                    publisher={item.activity.last_name +" " +item.activity.first_name}
                                    date={item.activity.created_at}
                                    role={item.activity.roles.toString().split('"')[1].toLowerCase().split('_')[1]}
                                    answers={item.answers}
                                    background={"white"}
                                />
                    }
                    else {
                        return <CoursPublicPreview
                                coursId={item.activity.id}
                                liked={item.activity.liked}
                                user_id={item.activity.user_id}
                                likeNumber={item.activity.count_likes}
                                commentNumber={item.activity.count_comments}
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


                })
                showMore=<MyButton
                    label={"Charger plus d'activities "}
                    icon={<ArrowDropDownIcon/>}
                    disabled={this.state.disable}
                    background={"white"}
                    color={"gray"}
                    radius={"4px"}
                    border={"0"}
                    hoverback={"white"}
                    hovercolor={"black"}
                    shadow={"none"}
                    onClick={this.getMoreResult}
                    iconDisplay={this.state.displayIconLoading}
                    upperCase={false}

                />

            }
        }
        return (
            <>
                <SearchBar label={"Chercher des activities..."} />
                <div className="row mx-0 justify-content-between">
                    <div className="col-lg-12 mx-0">
                        <div className="row">
                            {activities}
                        </div>
                    </div>
                    <div className="col-lg-12 mx-0 p-0" >
                        {showMore}
                    </div>
                </div>


            </>
        );
    }

}

export default ActivitiesMix;
