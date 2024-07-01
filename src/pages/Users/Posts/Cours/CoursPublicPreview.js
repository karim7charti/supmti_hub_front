import React, {Component} from 'react';

import ProfilePicture from "../../Profile/ProfilePicture";

import CourFile from "./CourFile";
import img1 from "../../../../imgs/img1.png";
import pdf from "../../../../imgs/pdf.png";
import text from "../../../../imgs/text.png";
import word from "../../../../imgs/word.png";
import power from "../../../../imgs/power.png";
import excel from "../../../../imgs/excel.png";
import script from "../../../../imgs/script.png";

import CommentInput from "../CommentInput";
import ReactionButtons from "../ReactionButtons";

import {Link,withRouter} from "react-router-dom";
import realtime_server_link from "../../../../mercure";
import {Tooltip} from "@material-ui/core";
import OptionsList from "../../../CustomCompenents/OptionsList";

class CoursPublicPreview extends Component {
    constructor(props) {
        super(props);
        this.my_event=null
        this.state={

        isBig:false,
        showCommentInput:false,
        commentNumber:this.props.commentNumber

        }
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
        this.props.history.push("/activity/course/"+this.props.activity)
    }

    componentWillUnmount() {
        this.my_event.close()
    }

    handleText=()=>{
        this.setState({
            isBig: !this.state.isBig
        })
    }
    handleComment=()=>{
        this.setState({
            showCommentInput:!this.state.showCommentInput,
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
    render() {
        let files="",commentCmpt="none"
        if(this.state.commentNumber>0)
            commentCmpt="block"
        files=this.props.files.map((item,index)=>{
            let arr=item.file_name.split('.')
            let extension=arr[arr.length-1];
            let img;
            if(['jpeg','png','jpg'].includes(extension))
                img=img1
            else if(['doc','docx'].includes(extension))
                img=word
            else if(['ppt','pptx'].includes(extension))
                img=power
            else if(extension==="pdf")
                img=pdf
            else if(extension==="txt")
                img=text
            else if(extension==="html")
                img=script
              else if(extension==="xlsx")
                img=excel
            return <CourFile index={index} errors={1} delete={()=>alert("hhh")} img={img} name={extension.toUpperCase()} filename={item.file_name} title={item.original_file_name} public={true}/>
        })
        return (
            <div className="p-3 mt-2 mb-2"  style={{
                backgroundColor:this.props.background,
                borderRadius:"9px"
            }}>
                <div className="row  p-2">
                    <div className="col-lg-1 col-md-2 col-sm-2 col-2" style={{cursor:'pointer'}} onClick={this.openProfile}>
                        <ProfilePicture width={45} height={45} display={"block"} FirstLater={this.props.publisher.toString().trim().charAt(0).toUpperCase()}  picture={this.props.userImg} fontSize={15}/>
                    </div>
                    <div className="col-lg-10  col-md-8 col-sm-8 col-8">
                        <div className="row px-0">
                            <div onClick={this.openProfile} className="col-lg-12" id="name_user" style={{cursor:"pointer"}}>
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

                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 mt-3 mx-auto px-4" onClick={this.handleText} style={{
                        fontSize:18,
                        fontWeight:600,
                        opacity:0.8
                    }}>
                        {this.props.title}
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-3 mt-1 mx-auto px-4" onClick={this.handleText} style={{
                        fontSize:16,
                        overflow:this.state.isBig?"":"hidden",
                        whiteSpace:this.state.isBig?"":"nowrap",
                        textOverflow:this.state.isBig?"":"ellipsis",
                        color:"rgba(0,0,0,0.7)",
                        maxHeight:"auto",
                        cursor:"pointer",
                        wordWrap:"break-word"
                    }}>
                        {this.props.description}
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-12  mx-auto">

                        {files}
                    </div>


                </div>

                {/*Reaction buttons*/}
                <div className="row mx-2 mb-4">
                  <ReactionButtons comment={this.handleComment}
                                   liked={this.props.liked}
                                   on={"course"}
                                   owner={this.props.user_id}
                                   activity={this.props.activity} likeNumber={this.props.likeNumber}/>
                </div>


                {/*comment input*/}


                <div className="row my-2" style={{
                    display:this.state.showCommentInput?"block":"none",
                }}>
                        <CommentInput display={"block"}
                                      on={"course"}
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
                        }} to={"/activity/course/"+this.props.activity}>
                            <span>Voire {this.state.commentNumber} commentaires de ce post</span>
                        </Link>
                    </div>
                </div>




            </div>
        );
    }
}


CoursPublicPreview.propTypes = {};
CoursPublicPreview.defaultProps = {
    background:"white",
    description:"description\n" +
        "Connaissances solides en:\n" +
        "Programmation orientée objet\n" +
        "Maîtrise langage ou framework ( python, php,flask, laravel...)\n" +
        "Méthode de conception et étude ( UML, Merise)\n" +
        "Administration base de données ( sql,  postgres sql)\n" +
        "Maîtrise langage ou framework Web front end( HTML, CSS,  javascript, Angular, Vuejs...)\n" +
        "Framework mobile cross plate-forme en plus( flutter, react native)\n" +
        "Notions de bases sur les systèmes d'information,  ERP Odoo",
    publisher:"User User",
    role:"Admin",
    date:"17:00 02 April 2022",
    title:"Backend Schedule",
    commentNumber:0,
    showCommentNumber:true,
    showComments:false,
    AllComments:"",
};

export default withRouter(CoursPublicPreview);
