import React, {Component} from 'react';
import Comment from "./Comment";
import axios from "axios";
import ErrorDiv from "../../CustomCompenents/ErrorDiv";
import error from "../../../imgs/Error.png";
import CommentSkeleton from "../../CustomCompenents/CommentSkeleton";
import nodata from "../../../imgs/noData.png";
import realtime_server_link from "../../../mercure";

class AllComment extends Component {

    constructor(props) {
        super(props);
        this.my_event=null
        this.state={
            isLoading:true,
            error:false,
            maxResult:20,
            pageNum:1,
            comments:[]
        }
    }
    componentDidMount() {
        this.listenOnNewComment()
        this.getComments()
    }
    listenOnNewComment=()=>{
            const url=new URL(realtime_server_link)
        url.searchParams.append('topic','comments/comment/'+this.props.activity);
        this.my_event=new EventSource(url)

            this.my_event.onmessage=e=> {

                    let jso=JSON.parse(e.data)
                     this.setState(prev=>({
                        comments:[jso.comment,...prev.comments]
                    }))
                }
    }
    componentWillUnmount() {
        this.my_event.close()
    }

    getComments=()=>{
        this.setState({
                    isLoading:true,
                    error:false
                },()=>{
                            axios.get('/api/comments/'+this.props.activity+'/'+this.state.maxResult+'/'+this.state.pageNum).then(res=>{
                            this.setState({

                                comments:res.data,
                                isLoading:false,

                            })

                            }).catch(err=>{
                                this.setState({
                                    error:true,
                                    isLoading:false
                                })
                            })
                     })
    }

    removeComment=(id)=>{

        let arr=this.state.comments.filter(item=>{
            if(item.activity_id!==id)
                return item
        })

        this.setState({
            comments:arr
        })

    }

    render() {
        let comments=''
        if(this.state.error)
            return <ErrorDiv img={error} refresh={this.getComments} imgW={300} imgH={250} marginImg={40}
                             error="Un erreur est survenue"
                             describtion={"Nous rencontrons des problèmes lors du chargement de cette page"} button={true} />
        if(this.state.isLoading)
            comments=<>
                    <CommentSkeleton/>
                    <CommentSkeleton/>
                    <CommentSkeleton/>
                    <CommentSkeleton/>
                    <CommentSkeleton/>
                    <CommentSkeleton/>

            </>
        else {
            if(this.state.comments.length===0)
            {
                comments=<ErrorDiv img={nodata}  imgW={280} imgH={230} marginImg={30} error="Soyez le premier à commenter"
                                   describtion="Aucun commentaire pour l'instant, essayer d'ajoute un" button={false} />
            }
            else {
                comments=this.state.comments.map(item=>{

                    return <Comment
                        displayProfileLatter={"block"}
                            FirstLater={item.last_name.toString().trim().charAt(0).toUpperCase()}
                            picture={item.profile_image_path}
                            user={item.last_name +" "+item.first_name}
                            label={item.body}
                            activity={item.activity_id}
                            isLiked={(item.liked>0)}
                            user_id={item.user_id}
                            comment_on_id={item.comment_on_id}
                            on={this.props.on}
                            likeNumber={item.count_likes}
                            isOwner={(item.user_id==this.props.user)}
                            removeIt={this.removeComment}

                    />
                })
            }
        }
        return (
            <>
                <div className="p-3 mt-0 mb-2" style={{
                    backgroundColor: "white",
                    borderRadius:"9px"
                }}>
                    <div className="row p-2 all_comments">
                        <div className="col-lg-12 px-4">
                            {comments}
                        </div>
                    </div>
                </div>


            </>
        );
    }
}

AllComment.propTypes = {};

export default AllComment;
