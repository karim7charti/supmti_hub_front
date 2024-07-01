import React, {Component} from 'react';
import ProfilePicture from "../../Profile/ProfilePicture";
import '../../../../css/CustomCompenentsStyle.css'
import ReactionButtons from "../ReactionButtons";
import CommentInput from "../CommentInput";
import {Link,withRouter} from "react-router-dom";
import MultimediaListPublic from "./MultimediaListPublic";
import axios from "axios";
import realtime_server_link from "../../../../mercure";
import {Tooltip} from "@material-ui/core";
import OptionsList from "../../../CustomCompenents/OptionsList";

class PostPublicPreview extends Component {
    constructor(props) {
        super(props);
        this.my_event=null
        this.state={
            isDown:false,
            isBig:false,
            showCommentInput:false,
            commentNumber:this.props.commentNumber,
            multimedia:[],

        }
    }

    handleComment=()=>{
        this.setState({
            showCommentInput:!this.state.showCommentInput,
        })
    }

    handleText=()=>{
        this.setState({
            isBig: !this.state.isBig
        })
    }

    goToPost = () =>{
        this.props.history.push("/activity/post/"+this.props.activity)
    }

    componentDidMount() {
        const url=new URL(realtime_server_link)
        url.searchParams.append('topic','comments/count/'+this.props.activity);
        this.my_event=new EventSource(url)

            this.my_event.onmessage=e=> {

                    let jso=JSON.parse(e.data)
                this.setState(prev=>({
                        commentNumber:parseInt(jso.count)+parseInt(prev.commentNumber),

                    }))
                }
    }
    componentWillUnmount() {
        this.my_event.close()
    }

    downloadThis = (id) =>{
        console.log(id)
    }
    openProfile=e=>{
        const user_id=localStorage.getItem("user_id")
       if(this.props.user_id==user_id)
       {

           this.props.history.push('/profile');
       }
       else
       {
           this.props.history.push("/profileGeneral/"+this.props.user_id+"/"+this.props.publisher)
       }
    }

    render() {
        let commentCmpt="none"
        if(this.state.commentNumber>0)
            commentCmpt="block"
        let  multimedia=this.props.multimedia.map((item,index)=>{
            let arr=item.file_name.split('.')
            let extension=arr[arr.length-1]
            return (         {
                    id:index,
                    img: axios.defaults.baseURL+"api/post/get_post_file/"+item.file_name,
                    title: '',
                    author: 'author',
                    featured: true,
                    typeVideo:(extension==="mp4")
                })

        })

        return (
            <div className="p-3 my-2" style={{
                backgroundColor:this.props.background,
                borderRadius:"9px"
            }}>
                <div className="row  p-2">
                    <div className="col-lg-1 col-md-2 col-sm-2 col-2" style={{cursor:'pointer'}} onClick={this.openProfile} >
                        <ProfilePicture width={45} height={45} display={"block"} FirstLater={this.props.publisher.toString().trim().charAt(0).toUpperCase()}  picture={this.props.userImg} fontSize={15}/>
                    </div>
                    <div className="col-lg-10  col-md-8 col-sm-8 col-8">
                        <div className="row px-0">
                            <div className="col-lg-12" id="name_user" style={{cursor:'pointer'}} onClick={this.openProfile}>
                                {this.props.publisher}
                            </div>
                            <div className="col-lg-12">

                                <span id="target">{this.props.role}</span>&nbsp;
                                <span style={{
                                    fontSize:12,
                                    color:'gray',
                                }}>{this.props.date}</span>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-1 col-md-2 col-sm-2 col-2 mt-0 pt-0 position-relative" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <Tooltip disableFocusListener title="Étendu">
                            <i className="bx bx-scaled bx-expand"  onClick={this.goToPost} style={{
                                fontSize:17,
                                color:"gray",
                                cursor:"pointer",
                                marginRight:5
                            }}> </i>
                        </Tooltip>
                        <OptionsList buttonsList={["DELETE","REPORT"]}/>
                    </div>

                </div>
                <div className="row">

                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 mt-2 mb-3 mx-auto px-4" onClick={this.handleText} style={{
                        overflow:this.state.isBig?"":"hidden",
                        whiteSpace:this.state.isBig?"":"nowrap",
                        textOverflow:this.state.isBig?"":"ellipsis",
                        cursor:"pointer",
                        wordWrap:"break-word",
                        opacity:0.9
                    }}>
                        {this.props.details}
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-12  mx-auto">
                        <MultimediaListPublic itemData={multimedia} downloadThis={this.downloadThis}/>


                    </div>


                </div>


                {/*Reaction buttons*/}
                <div className="row mx-2 mb-4">
                    <ReactionButtons comment={this.handleComment}
                                     liked={this.props.liked}
                                     on={"post"}
                                     owner={this.props.user_id}
                                     activity={this.props.activity}
                                     likeNumber={this.props.likeNumber}/>
                </div>


                {/*comment input*/}


                <div className="row my-2" style={{
                    display:this.state.showCommentInput?"block":"none",
                }}>
                    <CommentInput display={"block"}
                                  on={"post"}
                                  owner={this.props.user_id}
                                  activity={this.props.activity}
                                  FirstLater={localStorage.getItem("first_letter")}
                                  picture={localStorage.getItem("image")}/>
                </div>

                {/*See all comment btn buttons*/}


                <div className="row mt-2 " id="show_all_comments" style={{
                    display:this.props.showCommentNumber?"block":"none",

                }}>
                    <div className="col-lg-12 px-4" style={{display:commentCmpt}}>
                        <Link className="show_comments" style={{
                            fontWeight:600,
                            color:"black",
                            opacity:0.5,
                            fontSize:"0.8em",
                            cursor:"pointer"
                        }} to={"/activity/post/"+this.props.activity}>
                            <span>Voire {this.state.commentNumber} commentaires de ce post</span>
                        </Link>
                    </div>
                </div>



            </div>
        );
    }
}
PostPublicPreview.defaultProps={
    commentNumber:0,
    showCommentNumber:true,
    showComments:false,
    AllComments:"",
    date:"02:00 11-04-2022",
    role:"Admin",
    liked:true,
    activity:1,
    background:"white"


}


export default withRouter(PostPublicPreview);
