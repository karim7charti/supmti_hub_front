import React, {Component} from 'react';
import CoursPublicPreview from "../../Posts/Cours/CoursPublicPreview";
import SearchBar from "./SearchBar";
import MyButton from "../../../CustomCompenents/MyButton";
import axios from "axios";
import ErrorDiv from "../../../CustomCompenents/ErrorDiv";
import error from "../../../../imgs/Error.png";
import CourPostSkeleton from "../../../CustomCompenents/CourPostSkeleton";
import nodata from "../../../../imgs/noData.png";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

class Courses extends Component {
        constructor(props) {
        super(props);
        this.state={
            isLoading:true,
            user:{},
            courses:[],
            error:false,
            disable:false,
            displayIconLoading:'none',
            maxResult:2,
            pageNum:1
        }
    }
    componentDidMount() {
            this.getAllCourses()

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

    getAllCourses=()=>{
                        this.setState({
                    isLoading:true,
                    error:false
                },()=>{
                            axios.get('/api/courses/courses/'+this.state.maxResult+'/'+this.state.pageNum).then(res=>{
                            this.setState({

                                courses:res.data,
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
                axios.get('/api/courses/courses/'+this.state.maxResult+'/'+this.state.pageNum).then(res=>{

                   if(res.data.length>0)
                        this.setState(state=>({
                            courses:[...state.courses,...res.data],
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
            return <ErrorDiv img={error} refresh={this.getAllCourses} imgW={300} imgH={250} marginImg={40} error="Un erreur est survenue" describtion={"Nous rencontrons des problèmes lors du chargement de cette page"} button={true} />
        if(this.state.isLoading)
            courses=<>
                    <CourPostSkeleton/>
                    <CourPostSkeleton/>
            </>
        else
        {
            if(this.state.courses.length===0)
                courses=<ErrorDiv img={nodata}  imgW={280} imgH={230} marginImg={30} error="Données introuvables" describtion="Aucun cour trouvé pour l'instant, essayer plus tard" button={false} />
            else {
                courses = this.state.courses.map(item => {
                    return <CoursPublicPreview
                        coursId={item.activity.id}
                        liked={item.activity.liked}
                        user_id={item.activity.user_id}
                        likeNumber={item.activity.count_likes}
                        commentNumber={item.activity.count_comments}
                        activity={item.activity.activity_id}
                        title={item.activity.title}
                        description={item.activity.description}
                        userImg={item.activity.profile_image_path}
                        publisher={item.activity.last_name + " " + item.activity.first_name}
                        date={item.activity.created_at}
                        role={item.activity.roles.toString().split('"')[1].toLowerCase().split('_')[1]}
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
                <div className="row">
                    <SearchBar label={"Chercher des cours..."} />
                </div>

                <div className="row mx-0 justify-content-between">
                    <div className="col-lg-12 mx-auto">
                        <div className="row px-0">
                            {courses}

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

Courses.propTypes = {};

export default Courses;
