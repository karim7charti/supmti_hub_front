import React,{Component} from "react";

import  '../../css/AdminStyle.css'

import NavBar from "../General/NavBar";

import StatisticsBar from "./StatisticsBar";

import Users from "./Users/UsersNavigation";
import axios from "axios";
import LoadingPage from "../CustomCompenents/LoadingPage";
class AdminPage extends Component{
     constructor(props) {
        super(props);
        this.state={

            students:0,
            teachers:0,
            profile:[],
            FirstLater:'',
            isLoading:true,
            isLoading1:true
        }
    }


     componentDidMount() {
         axios.get('/api/user-profile-data').then(res=>{
                this.setState({
                    profile:res.data,
                    FirstLater:res.data.last_name.toString().trim().charAt(0).toUpperCase(),
                    isLoading1:false
                })
                     axios.get("/api/admin/dashboard-data").then(res=>{
                            this.setState({
                                students:res.data.students.cmpt,
                                teachers:res.data.teachers.cmpt,
                                isLoading:false

                                })

                        }).catch(err=>{
                            this.setState({
                                isLoading:false
                            })
                        })
        })

    }

    render() {
         if(this.state.isLoading1)
            return <LoadingPage/>
        return(
            <>
                <NavBar tab="admin_tab"
                        countNotifs={this.state.profile.countNotifs}
                        openModal={"none"} profile={this.state.profile}
                        countMessages={this.state.profile.countMessages}
                        FirstLater={this.state.FirstLater} closeModal={()=>""}/>
                <div className="row mx-0 mt-3">
                    <div className="col-lg-9 col-md-12 order-lg-0 order-md-1 order-sm-1 order-1  mb-2 px-3">
                        <Users/>
                    </div>
                    <div className="col-lg-3 col-md-12 order-lg-1 order-md-0 order-sm-0 order-0 " id="statistics">
                        <StatisticsBar isLoading={this.state.isLoading} nbrStudent={this.state.students} nbrTeacher={this.state.teachers}


                        />
                    </div>
                </div>


            </>
        );
    }

}

export default AdminPage;
