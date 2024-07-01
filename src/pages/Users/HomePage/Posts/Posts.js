import React, {Component} from 'react';

import SearchBar from "./SearchBar";
import MyButton from "../../../CustomCompenents/MyButton";

import PostPublicPreview from "../../Posts/Post/PostPublicPreview";
import axios from "axios";
import ErrorDiv from "../../../CustomCompenents/ErrorDiv";
import error from "../../../../imgs/Error.png";

import nodata from "../../../../imgs/noData.png";

import PostPublicSkeleton from "../../../CustomCompenents/PostPublicSkeleton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoading:true,
            user:{},
            posts:[],
            error:false,
            disable:false,
            displayIconLoading:'none',
            maxResult:2,
            pageNum:1
        }
    }
    componentDidMount() {
            this.getAllPosts()
    }

    addScrollEventTo =()=>{
        const body = document.body;
        document.addEventListener("scroll", ()=>{
            if(window.pageYOffset >= (body.scrollHeight - 1000)){
                this.getMoreResult();

            }

        })
    }
    removeScrollEventTo =()=>{
        document.removeEventListener("scroll",()=>"")
    }

    componentWillUnmount() {
    }

    getAllPosts=()=>{
        this.setState({
                    isLoading:true,
                    error:false
                },()=>{
                            axios.get('/api/post/all-posts/'+this.state.maxResult+'/'+this.state.pageNum).then(res=>{
                            this.setState({

                                posts:res.data,
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
        getMoreResult=()=>{
                    const pageNum=this.state.pageNum+1;
        this.setState({
            disable:true,
            displayIconLoading:'block',
            pageNum:pageNum
        },()=>{
                axios.get('/api/post/all-posts/'+this.state.maxResult+'/'+this.state.pageNum).then(res=>{

                   if(res.data.length>0)
                        this.setState(state=>({
                            posts:[...state.posts,...res.data],
                            disable:false,
                            displayIconLoading:'none',


                        }))
                    else
                         this.setState({
                        disable:false,
                        displayIconLoading:'none',
                    })



                }).catch(err=>{
                    this.setState({
                        disable:false,
                        displayIconLoading:'none',
                    })
                })

        })
    }


    render() {
        let posts='',showMore=""
        if(this.state.error)
            return <ErrorDiv img={error} refresh={this.getAllPosts}
                             imgW={300} imgH={250} marginImg={40}
                             error="Un erreur est survenue" describtion={"Nous rencontrons des problèmes lors du chargement de cette page"} button={true} />
        if(this.state.isLoading)
            posts=<>
                    <PostPublicSkeleton showComments={false}/>
                    <PostPublicSkeleton showComments={false}/>
            </>
        else
        {
            if(this.state.posts.length===0)
                posts=<ErrorDiv img={nodata}  imgW={280} imgH={230}
                                marginImg={30} error="Données introuvables"
                                describtion="Aucun post trouvé pour l'instant, essayer plus tard" button={false} />
            else {
                posts = this.state.posts.map(item => {
                    return <PostPublicPreview
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
                <SearchBar label={"Chercher des cours..."} />
                <div className="row mx-0 justify-content-between">
                    <div className="col-lg-12 mx-0">
                        <div className="row px-0">
                            {posts}
                        </div>
                    </div>
                    <div className="col-lg-12 mx-0 p-0">
                        {showMore}
                    </div>
                </div>


            </>
        );
    }
}

Posts.propTypes = {};

export default Posts;
