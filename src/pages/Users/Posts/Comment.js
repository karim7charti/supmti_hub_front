import React, {Component} from 'react';
import ProfilePicture from "../Profile/ProfilePicture";
import like from './../../../imgs/light.png'
import {withRouter} from "react-router-dom";
import delet from "../../../imgs/delete.png";
import axios from "axios";
import realtime_server_link from "../../../mercure";
import swal from "sweetalert";
class Comment extends Component {
    constructor(props) {
        super(props);
         this.my_event=null
        this.state={
            isLiked:this.props.isLiked,
            disabled:false,
            likeNumber:this.props.likeNumber

         }
    }
    componentDidMount() {
        const url=new URL(realtime_server_link)
        url.searchParams.append('topic','https://example.com/activiies/likes/'+this.props.activity);
        this.my_event=new EventSource(url)

            this.my_event.onmessage=e=> {

                    let jso=JSON.parse(e.data)
                     this.setState(prev=>({
                        likeNumber:parseInt(jso.count)+parseInt(prev.likeNumber)
                    }))
                }
     }
    componentWillUnmount() {
       this.my_event.close()
    }

    handleLike=()=>{
        this.setState({
            disabled:true
        },()=>{
             if(this.state.isLiked)
                {
                    axios.get('/api/likes/dislike/'+this.props.activity).then(res=>{
                        this.setState(prev=>({
                            isLiked:!this.state.isLiked,
                            disabled:false
                        }))
                    }).catch(err=>{
                        this.setState({
                            disabled:false
                        })
                    })
                }
             else {
                 axios.get('/api/likes/like/'+this.props.activity+"/"
                     +this.props.user_id+"?on="+this.props.on+"&pubId="+this.props.comment_on_id).then(res=>{
                        this.setState(prev=>({
                            isLiked:!this.state.isLiked,
                            disabled:false
                        }))
                    }).catch(err=>{
                        this.setState({
                            disabled:false
                        })
                    })
             }

        })
    }
    removeComment=(e)=> {
        axios.delete("/api/comments/comment/"+this.props.activity).then(res=>{

                    this.props.removeIt(this.props.activity)
        }).catch(err=>{
            swal({
                            title: "oops!",
                            text: "une erreur s'est produite,reéssayer!",
                            icon: "error",
                        });
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
           this.props.history.push("/profileGeneral/"+this.props.user_id+"/"+this.props.user)
       }
    }
    render() {

        return (
            <>
                <div className="row mt-1 mb-3" id="comment_view">
                    <div className="col-lg-1 col-md-1 col-sm-1 col-1 mt-1 text-center" style={{cursor:'pointer'}} onClick={this.openProfile}>
                        <ProfilePicture width={35} height={35} showBadge={false}  display={this.props.displayProfileLatter} FirstLater={this.props.FirstLater}  picture={this.props.picture} fontSize={9}/>
                    </div>
                    <div className={"col-lg-11 col-md-11 col-sm-11 col-11"}>
                        <div className="row">
                            <div className="col-lg-12 px-2 py-0">
                                <p  className="px-2 py-1  mb-0" id="comment_div" style={{display:"inline-block",marginRight:10}}>

                                    <span className="col-lg-12 user"  style={{cursor:'pointer',display:'inline'}} onClick={this.openProfile}>
                                        {this.props.user}
                                    </span><br/>
                                    <span className="col-lg-12 label"  style={{display:"inline"}}>
                                        {this.props.label}
                                    </span>

                                </p>

                            </div>
                            <div className="col-lg-12">
                                <span className="like_btn"  onClick={(this.state.disabled)?()=>"":this.handleLike} style={{color:this.state.isLiked?"#ffb702":"gray",fontWeight:this.state.isLiked?600:500}}>intéressant</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span><img alt="j'aime" src={like} style={{height:15,width:15}}/></span>

                                <span style={{fontSize:"0.8em"}}>({this.state.likeNumber})</span>

                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="" style={{display:this.props.isOwner?"inline":"none"}} onClick={this.removeComment}>
                                <img className="my-auto mx-auto img" alt="supprimer" title="supprimer" src={delet}/>
                               </span>
                            </div>
                        </div>
                    </div>

                </div>

            </>
        );
    }
}

Comment.propTypes = {};

export default withRouter(Comment);
