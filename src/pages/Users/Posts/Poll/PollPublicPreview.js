import React, {Component} from 'react';
import ProfilePicture from "../../Profile/ProfilePicture";
import '../../../../css/CustomCompenentsStyle.css'
import PollPublicOption from "./PollPublicOption";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MyButton from "../../../CustomCompenents/MyButton";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ReactionButtons from "../ReactionButtons";
import CommentInput from "../CommentInput";
import {Link,withRouter} from "react-router-dom";
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';
import realtime_server_link from "../../../../mercure";
import {Tooltip} from "@material-ui/core";
import OptionsList from "../../../CustomCompenents/OptionsList";




class PollPublicPreview extends Component {
    constructor(props) {
        super(props);
        this.my_event=null
           this.state={
               isDown:false,
               isBig:false,
               visibleAnswers:[this.props.answers[0],this.props.answers[1]],
               answers:this.props.answers,
               seeComments:"hidden",
               showCommentInput:false,
               commentNumber:this.props.commentNumber

           }
    }

    handleComment=()=>{
        this.setState({
            showCommentInput:!this.state.showCommentInput,
        })
    }

   handleDown=()=>{
       this.setState({
           isDown: !this.state.isDown
       },()=>{
               this.setState({
                   visibleAnswers:(this.state.isDown)?this.state.answers:[this.state.answers[0],this.state.answers[1]]
               })

       })

   }
    handleText=()=>{
       this.setState({
           isBig: !this.state.isBig
       })
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
   handleCheck=(id)=>{
       let arr=this.state.answers.filter(item=>{
           if(item.id===id)
           {
               if(item.voted)
               {
                   item.voted=false;
                    item.votes--;
               }
               else
               {
                   item.voted=true;
                    item.votes++;
               }

           }

           else if(item.voted)
           {
               item.voted=false;
               item.votes--;
           }
           return item;
       })

        this.setState({
            visibleAnswers:arr,
            answers:arr,
            isDown:true
        })

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

    goToPost = () =>{
        this.props.history.push("/activity/poll/"+this.props.activity)
    }

   componentWillUnmount() {
        this.my_event.close()
   }

    render() {
       let seeMore="",commentCmpt='none';
       if(this.state.commentNumber>0)
           commentCmpt='block'

       if(this.state.answers.length>2)
           seeMore=
                            <MyButton
                            label={this.state.isDown?"Voire moin" : "Voire plus"}
                            icon={this.state.isDown?<ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                            disabled={false}
                            background={"rgba(0,0,0,0.04)"}
                            color={"gray"}
                            radius={"4px"}
                            border={"0"}
                            hoverback={"rgba(0,0,0,0.06)"}
                            hovercolor={"gray"}
                            shadow={"none"}
                            onClick={this.handleDown}
                            upperCase={false}
                        />

       let answers=this.state.visibleAnswers.map(item=>{
           return <PollPublicOption id={item.id} pollId={this.props.pollId} handleCheck={this.handleCheck} label={item.answer} checked={item.voted} name={"choix1"} votes={item.votes}/>
       })
        return (

            <div className="p-3 my-2"  style={{
                backgroundColor:this.props.background,
                borderRadius:"9px"
            }}>
                <div className="row  p-2">
                    <div className="col-lg-1 col-md-2 col-sm-2 col-2" style={{cursor:'pointer'}} onClick={this.openProfile} >
                        <ProfilePicture width={45} height={45} display={"block"} FirstLater={this.props.publisher.toString().trim().charAt(0).toUpperCase()}  picture={this.props.userImg} fontSize={15}/>
                    </div>
                    <div className="col-lg-10  col-md-8 col-sm-8 col-8">
                        <div className="row px-0">
                            <div onClick={this.openProfile} className="col-lg-12" id="name_user" style={{cursor:'pointer'}}>
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

                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 my-4 mx-auto px-4" onClick={this.handleText} style={{
                        overflow:this.state.isBig?"":"hidden",
                        whiteSpace:this.state.isBig?"":"nowrap",
                        textOverflow:this.state.isBig?"":"ellipsis",
                        maxHeight:"3em",
                        cursor:"pointer",
                        wordWrap:"break-word",
                        opacity:0.9
                    }}>
                        {this.props.question}
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-12  mx-auto">
                        <div className="row">
                            {answers}
                        </div>


                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-12  mx-auto">
                        {seeMore}
                    </div>

                </div>


                {/*Reaction buttons*/}
                <div className="row mx-2 mb-4">
                    <ReactionButtons comment={this.handleComment} liked={this.props.liked}
                                     on={"poll"}
                                    owner={this.props.user_id}
                                     activity={this.props.activity}
                                     likeNumber={this.props.likeNumber}/>
                </div>


                {/*comment input*/}


                <div className="row my-2" style={{
                    display:this.state.showCommentInput?"block":"none",
                }}>
                    <CommentInput display={"block"}
                                  on={"poll"}
                                  owner={this.props.user_id}
                                  FirstLater={localStorage.getItem("first_letter")}
                                 activity={this.props.activity}
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
                        }} to={"/activity/poll/"+this.props.activity}>
                            <span>Voir {this.state.commentNumber} commentaires de ce post</span>
                        </Link>
                    </div>
                </div>



            </div>
        );
    }
}
PollPublicPreview.defaultProps={
    DeletePoll:true,
    commentNumber:0,
    showCommentNumber:true,
    showComments:false,
    AllComments:"",
}


export default withRouter(PollPublicPreview);
