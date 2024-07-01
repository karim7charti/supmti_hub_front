import React, {Component} from 'react';
import MyButton from "../../../CustomCompenents/MyButton";
import PollPublicPreview from "../../Posts/Poll/PollPublicPreview";
import SearchBar from "./SearchBar";
import axios from "axios";
import ErrorDiv from "../../../CustomCompenents/ErrorDiv";
import error from "../../../../imgs/Error.png";
import PollPostSkeleton from "../../../CustomCompenents/PollPostSkeleton";
import nodata from "../../../../imgs/noData.png";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

class Polls extends Component {

    constructor(props) {
        super(props);
        this.state={
            isLoading:true,
            polls:[],
            error:false,
            disable:false,
            displayIconLoading:'none',
            maxResult:2,
            pageNum:1
        }
    }

    getAllPolls=()=>{
            this.setState({
                    isLoading:true,
                    error:false
                },()=>{
                            axios.get('/api/polls/get-all-polls/'+this.state.maxResult+'/'+this.state.pageNum).then(res=>{
                            this.setState({

                                polls:res.data,
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

    componentDidMount() {
        this.getAllPolls()

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

    getMoreResult=()=>{
        const pageNum=this.state.pageNum+1;
        this.setState({
            disable:true,
            displayIconLoading:'block',
            pageNum:pageNum
        },()=>{
                axios.get('/api/polls/get-all-polls/'+this.state.maxResult+'/'+this.state.pageNum).then(res=>{

                   if(res.data.length>0)
                        this.setState(state=>({
                            polls:[...state.polls,...res.data],
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

        let polls=''
        if(this.state.error)
            return <ErrorDiv img={error} refresh={this.getAllPolls} imgW={300} imgH={250} marginImg={40} error="Un erreur est survenue" describtion={"Nous rencontrons des problèmes lors du chargement de cette page"} button={true} />
        if(this.state.isLoading)
            polls=<>
                    <PollPostSkeleton/>
                    <PollPostSkeleton/>
            </>
        else
        {
            if(this.state.polls.length===0)
                polls=<ErrorDiv img={nodata}  imgW={280} imgH={230} marginImg={30} error="Données introuvables" describtion="Aucun sondage trouvé pour l'instant, essayer plus tard" button={false} />
            else
                polls=this.state.polls.map(item=>{
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
            })
        }
        return (
            <>
                <SearchBar label={"Chercher des sondage..."} />
                <div className="row mx-0 justify-content-between">
                    <div className="col-lg-12 mx-0">
                        <div className="row px-0">
                            {polls}
                        </div>
                    </div>
                    <div className="col-lg-12 mx-0 p-0">
                        <MyButton
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
                    </div>
                </div>


            </>
        );
    }
}

export default Polls;
