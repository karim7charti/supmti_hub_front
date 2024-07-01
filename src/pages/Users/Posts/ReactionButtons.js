import React, {Component} from 'react';
import './../../../css/PostsStyles.css'

import {Checkbox, FormControlLabel} from "@material-ui/core";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbUpRoundedIcon from "@material-ui/icons/ThumbUpRounded";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import axios from "axios";
import realtime_server_link from "../../../mercure"
class ReactionButtons extends Component {

    constructor(props) {
        super(props);

        this.my_event=null
        this.state={
            like:this.props.liked,
            booked:false,
            likeCount:this.props.likeNumber,
            disabled:false,

        }


    }
    componentDidMount() {

        const url=new URL(realtime_server_link)
        url.searchParams.append('topic','https://example.com/activiies/likes/'+this.props.activity);
        this.my_event=new EventSource(url)

            this.my_event.onmessage=e=> {

                    let jso=JSON.parse(e.data)
                     this.setState(prev=>({
                        likeCount:parseInt(jso.count)+parseInt(prev.likeCount)
                    }))
                }
    }

    componentWillUnmount() {
       this.my_event.close()

    }


    handleLike = (e)=>{
        this.setState({
            disabled:true
        },()=>{
             if(this.state.like)
                {
                    axios.get('/api/likes/dislike/'+this.props.activity).then(res=>{
                        this.setState(prev=>({
                            like:!this.state.like,
                            disabled:false
                        }))
                    }).catch(err=>{
                        this.setState({
                            disabled:false
                        })
                    })
                }
             else {
                 axios.get('/api/likes/like/'+this.props.activity+"/"+this.props.owner+"?on="+this.props.on).then(res=>{
                        this.setState(prev=>({
                            like:!this.state.like,
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
    handleBooked = ()=>{
        this.setState({
            booked:!this.state.booked
        })
    }
    handleComment=()=>{
        this.props.comment()
    }


    render() {
        return (
            <>
                <div className="col-lg-12" id="cour_public">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-4 mx-auto post_action text-center" >
                            <FormControlLabel
                                control={<Checkbox icon={<ThumbUpOutlinedIcon />} checkedIcon={<ThumbUpRoundedIcon/>} />} checked={this.state.like}
                                label={"J'aime(" + this.state.likeCount + ")"} disabled={this.state.disabled}  onClick={this.handleLike}
                                id="like"
                            />
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-4 mx-auto post_action text-center" onClick={this.handleComment}>

                            <FormControlLabel
                                control={<Checkbox icon={<ChatBubbleOutlineOutlinedIcon />} checked={false} checkedIcon={<ChatBubbleOutlineOutlinedIcon />} />}
                                label={"Commenter"}
                            />

                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-4 mx-auto post_action text-center" onClick={this.handleBooked}>
                            <FormControlLabel
                                control={<Checkbox icon={<BookmarkBorderOutlinedIcon />} checkedIcon={<BookmarkOutlinedIcon/>} />}
                                label={"Enregistrer"} checked={this.state.booked}  onClick={this.handleBooked}
                            />
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

ReactionButtons.propTypes = {};

ReactionButtons.defaultProps = {
    likeNumber:0,
};

export default ReactionButtons;
