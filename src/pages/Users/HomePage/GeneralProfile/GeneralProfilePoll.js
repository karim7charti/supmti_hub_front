import React, {Component} from 'react';
import SearchBar from "../Posts/SearchBar";
import MyButton from "../../../CustomCompenents/MyButton";
import axios from "axios";
import ErrorDiv from "../../../CustomCompenents/ErrorDiv";
import error from "../../../../imgs/Error.png";
import PollPostSkeleton from "../../../CustomCompenents/PollPostSkeleton";
import nodata from "../../../../imgs/noData.png";
import PollPublicPreview from "../../Posts/Poll/PollPublicPreview";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

class GeneralProfilePoll extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoading:true,
            polls:[],
            user:{},
            error:false,
            disable:false,
            displayIconLoading:'none',
            maxResult:2,
            pageNum:1
        }
    }
    componentDidMount() {
        this.getHisPolls()
    }
    getHisPolls=()=>{
            this.setState({
        isLoading:true,
        error:false
    },()=>{
                axios.get('/api/polls/get-his-polls/'+this.state.maxResult+'/'+this.state.pageNum+'/'+this.props.email+"/"+this.props.id).then(res=>{
            if(res.data.length>0)
                this.setState({
                    user:res.data[0],
                    polls:res.data[1],
                    isLoading:false,

                })
            else
            {
                  this.setState({
                    isLoading:false,
                })
            }
        }).catch(err=>{
                this.setState({
                    error:true,
                    isLoading:false
                })
            })

         })

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
                axios.get('/api/polls/get-his-polls/'+this.state.maxResult+'/'+this.state.pageNum+'/'+this.props.email+"/"+this.props.id).then(res=>{

                   if(res.data.length>0)
                        this.setState(state=>({
                            polls:[...state.polls,...res.data[1]],
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


        let polls='',showMore=""
        if(this.state.error)
            return <ErrorDiv img={error} refresh={this.getHisPolls} imgW={300} imgH={250} marginImg={40} error="Un erreur est survenue" describtion={"Nous rencontrons des problèmes lors du chargement de cette page"} button={true} />
        if(this.state.isLoading)
            polls=<>
                    <PollPostSkeleton/>
                    <PollPostSkeleton/>
            </>
        else
        {
            if(this.state.polls.length===0)
                polls=<ErrorDiv img={nodata}  imgW={280} imgH={230} marginImg={30} error="Données introuvables" describtion="aucun sondage publié" button={false} />
            else
            {
                                polls=this.state.polls.map(item=>{
                return   <PollPublicPreview
                        pollId={item.activity.id}
                        liked={item.activity.liked}
                        likeNumber={item.activity.count_likes}
                        commentNumber={item.activity.count_comments}
                        activity={item.activity.activity_id}
                        question={item.activity.question}
                        user_id={this.state.user.id}
                        userImg={this.state.user.profile_image_path}
                        publisher={this.state.user.last_name +" " +this.state.user.first_name}
                        date={item.activity.created_at}
                        role={this.state.user.roles.toString().split('_')[1].toLowerCase()}
                        answers={item.answers}

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
                <div className="row mt-2 mx-0 px-0">
                    <div className="col-lg-12 mx-0 px-0">
                        <SearchBar label={"Chercher des sondages..."} />
                    </div>
                    <div className="col-lg-12 px-0">
                        {polls}
                    </div>
                    <div className="col-lg-12 mx-0 p-0">
                        {showMore}
                    </div>

                </div>
            </>
        );
    }
}

GeneralProfilePoll.propTypes = {};

export default GeneralProfilePoll;
