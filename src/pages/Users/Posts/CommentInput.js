import React, {Component} from 'react';
import ProfilePicture from "../Profile/ProfilePicture";
import '../../../css/PostsStyles.css'
import axios from "axios";
import cmnt_d from "./../../../imgs/comment_disable.png"
import cmnt from "./../../../imgs/comment.png"

class CommentInput extends Component {
    constructor(props) {
        super(props);
        this.state={
            comment:"",
            disable:true,
        }
    }

    submitComment=(e)=>{

        this.setState({
            disable:true
        },()=>{
            let frm=new FormData()
            frm.append("type","text")
            frm.append("on",this.props.on)
            frm.append("owner",this.props.owner)
            frm.append("body",this.state.comment)
            let config = {
                headers: {
                    'Content-Type': "multipart/form-data",
                }
            }
            axios.post('/api/comments/comment/'+this.props.activity,frm,config).then(res=>{
                if(res.status===201)


                this.setState({
                    comment:""
                })
            }).catch(err=>{
                this.setState({
                    disable:false
                })
            })
        })

    }
    render() {
        return (
            <>
                <div className="col-lg-12 mx-auto" id="comment">
                    <form>
                        <div className="row mx-auto">

                            <div className="col-lg-1 col-md-1 col-sm-1 col-1 my-auto text-end">
                                <ProfilePicture width={31} height={31} display={this.props.display} FirstLater={this.props.FirstLater}  picture={this.props.picture} fontSize={9}/>
                            </div>

                            <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                                <input placeholder="Taper un commenter..." className="comment_input py-2 px-2"
                                       value={this.state.comment}
                                       onChange={event => {
                                           if(event.target.value.toString().trim()!=="")
                                               this.setState({
                                                   disable:false,
                                                   comment:event.target.value
                                               })
                                           else {
                                               this.setState({
                                                   disable:true,
                                                   comment:event.target.value
                                               })
                                           }
                                       }}

                                />
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1 col-1 ml-0 p-0 text-start my-auto">
                                <button type="button"
                                        disabled={this.state.disable}
                                        className="mx-0"
                                        onClick={this.submitComment}
                                        style={{
                                            opacity:this.state.disable? 0.4 : 1
                                        }}
                                >
                                    <img  alt="Envoyer"  src={this.state.disable?cmnt_d:cmnt}/>
                                </button>
                            </div>



                    </div>
                    </form>
                </div>

            </>
        );
    }
}

export default CommentInput;
