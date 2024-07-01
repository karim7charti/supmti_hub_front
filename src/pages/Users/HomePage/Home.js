import React,{Component} from "react";
import NavBar from "../../General/NavBar";
import CreatePostDiv from "./Posts/CreatePostDiv";
import PostHomeNavigator from "./Posts/PostHomeNavigator";
import axios from "axios";
import LoadingPage from "../../CustomCompenents/LoadingPage";



class Home extends Component{

    constructor(props) {
        super(props);
        this.state={
            open:"none",
            profile:[],
            FirstLater:'',
            isLoading:true
        }
    }
    openModal=()=>{
        this.setState({
            open:"block"
        })
    }

   handleCloseModal = (display) => {
        this.setState({
            open:display,
        })
    }
    componentDidMount() {
        axios.get('/api/user-profile-data').then(res=>{
            let first_letter=res.data.last_name.toString().trim().charAt(0).toUpperCase()
            localStorage.setItem("user_id",res.data.id)
            localStorage.setItem("first_letter",first_letter)
            localStorage.setItem("image",res.data.profile_image_path)
            this.setState({
                profile:res.data,
                FirstLater:first_letter,
                isLoading:false
            })
        })


    }

    render() {
        if(this.state.isLoading)
            return <LoadingPage/>
        return (
            <>
            <NavBar
                tab="home_tab" profile={this.state.profile}
                FirstLater={this.state.FirstLater}
                countMessages={this.state.profile.countMessages}
                countNotifs={this.state.profile.countNotifs}
                openModal={this.state.open}
                closeModal={this.handleCloseModal}/>
            <div className="row container mx-auto mt-3">
                <CreatePostDiv open={this.openModal}/>

            </div>
            <div className="row container mx-auto">
                <PostHomeNavigator/>
            </div>



                </>
        )
    }
}
export default Home;
