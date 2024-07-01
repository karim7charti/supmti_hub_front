import React, {Component} from 'react';
import PollPublicPreview from "../Posts/Poll/PollPublicPreview";
import axios from "axios";
import ErrorDiv from "../../CustomCompenents/ErrorDiv";
import nodata from "../../../imgs/noData.png";
import error from "../../../imgs/Error.png";
import PollPostSkeleton from "../../CustomCompenents/PollPostSkeleton";
import MyButton from "../../CustomCompenents/MyButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
class ProfilePolls extends Component {

    constructor(props) {
        super(props);
        this.state={
            isLoading:true,
            user:{},
            polls:[],
            error:false,
            disable:false,
            displayIconLoading:'none',
            maxResult:2,
            pageNum:1
        }
    }

    getMyPolls=()=>{
    this.setState({
        isLoading:true,
        error:false
    },()=>{
                axios.get('/api/polls/get-my-polls/'+this.state.maxResult+'/'+this.state.pageNum).then(res=>{
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

    getMoreResult=()=>{
        const pageNum=this.state.pageNum+1;
        this.setState({
            disable:true,
            displayIconLoading:'block',
            pageNum:pageNum
        },()=>{
                axios.get('/api/polls/get-my-polls/'+this.state.maxResult+'/'+this.state.pageNum).then(res=>{

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
    componentDidMount() {

            this.getMyPolls()
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

    render() {


        let polls='',showMore=""
        if(this.state.error)
            return <ErrorDiv img={error} refresh={this.getMyPolls} imgW={300} imgH={250} marginImg={40} error="Un erreur est survenue" describtion={"Nous rencontrons des problèmes lors du chargement de cette page"} button={true} />
        if(this.state.isLoading)
            polls=<>
                    <PollPostSkeleton/>
                    <PollPostSkeleton/>
            </>
        else
        {
            if(this.state.polls.length===0)
                polls=<ErrorDiv img={nodata}  imgW={280} imgH={230} marginImg={30} error="Données introuvables" describtion="Vous avez aucun sondage publié, essayez d'en ajouter un" button={false} />
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
                        userImg={this.state.user.profileImagePath}
                        publisher={this.state.user.firstName +" " +this.state.user.lastName}
                        date={item.activity.created_at}
                        role={this.state.user.roles[0].toString().split('_')[1].toLowerCase()}
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
                <div className="row justify-content-between">
                    <div className="col-lg-12 mx-0">
                        <div className="row mx-0">
                            {polls}
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

export default ProfilePolls;
