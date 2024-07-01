import React, {Component} from 'react';
import SearchBar from "../Posts/SearchBar";
import CourPostSkeleton from "../../../CustomCompenents/CourPostSkeleton";
import MyButton from "../../../CustomCompenents/MyButton";
import axios from "axios";
import ErrorDiv from "../../../CustomCompenents/ErrorDiv";
import error from "../../../../imgs/Error.png";
import nodata from "../../../../imgs/noData.png";
import CoursPublicPreview from "../../Posts/Cours/CoursPublicPreview";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

class GeneralProfileCourses extends Component {
        constructor(props) {
        super(props);
        this.state={
            isLoading:true,
            courses:[],
            user:{},
            error:false,
            disable:false,
            displayIconLoading:'none',
            maxResult:2,
            pageNum:1
        }
    }
    componentDidMount() {
        this.getHisCourse()
    }
    getHisCourse=()=>{
            this.setState({
        isLoading:true,
        error:false
    },()=>{
                axios.get('/api/courses/get-his-courses/'+this.state.maxResult+'/'+this.state.pageNum+'/'+this.props.email+"/"+this.props.id).then(res=>{
            if(res.data.length>0)
                this.setState({
                    user:res.data[0],
                    courses:res.data[1],
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
                axios.get('/api/courses/get-his-courses/'+this.state.maxResult+'/'+this.state.pageNum+'/'+this.props.email+"/"+this.props.id).then(res=>{

                   if(res.data.length>0)
                        this.setState(state=>({
                            courses:[...state.courses,...res.data[1]],
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
            let courses='',showMore=""
        if(this.state.error)
            return <ErrorDiv img={error} refresh={this.getHisCourse} imgW={300} imgH={250} marginImg={40} error="Un erreur est survenue" describtion={"Nous rencontrons des problèmes lors du chargement de cette page"} button={true} />
        if(this.state.isLoading)
            courses=<>
                    <CourPostSkeleton/>
                    <CourPostSkeleton/>
            </>
        else
        {
            if(this.state.courses.length===0)
                courses=<ErrorDiv img={nodata}  imgW={280} imgH={230} marginImg={30} error="Données introuvables" describtion="aucun cours publié" button={false} />
            else {
                courses = this.state.courses.map(item => {
                    return <CoursPublicPreview
                        coursId={item.activity.id}
                        liked={item.activity.liked}
                        likeNumber={item.activity.count_likes}
                        commentNumber={item.activity.count_comments}
                        activity={item.activity.activity_id}
                        title={item.activity.title}
                        description={item.activity.description}
                        user_id={this.state.user.id}
                        userImg={this.state.user.profile_image_path}
                        publisher={this.state.user.last_name + " " + this.state.user.first_name}
                        date={item.activity.created_at}
                        role={this.state.user.roles.toString().split('_')[1].toLowerCase()}
                        files={item.files}
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
                        <SearchBar label={"Chercher des cours..."} />
                    </div>
                    <div className="col-lg-12 px-0">
                        {courses}
                    </div>
                    <div className="col-lg-12 mx-0 p-0">
                        {showMore}
                    </div>

                </div>

            </>
        );
    }
}

GeneralProfileCourses.propTypes = {};

export default GeneralProfileCourses;
