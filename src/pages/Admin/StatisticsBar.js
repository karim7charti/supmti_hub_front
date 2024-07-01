import React,{Component} from "react";


import student from './../../imgs/student.png'
import teacher from './../../imgs/teacher.png'
import request from './../../imgs/request.png'

import UsersNumberPreview from "../CustomCompenents/UsersNumberPreview";

import UsersNumberSkeleton from "../CustomCompenents/UsersNumberSkeleton";


class StatisticsBar extends Component{
    constructor(props) {
        super(props);
        this.state={
            isLoading:true
        }
    }


    render() {
        let bars=""
        if (this.props.isLoading)
        {
            bars=<>

                <UsersNumberSkeleton
                    classes={"col-lg-12 col-md-6 col-sm-6 col-6 staticbar"}
                    label={"Nombre d'étudiants"}
                    backcolor={"white"}
                    borderRadius={"9px"}
                    icon={student}
                    number={(this.props.nbrStudent!==undefined)?this.props.nbrStudent:0}
                />

                <UsersNumberSkeleton
                    classes={"col-lg-12 col-md-6 col-sm-6 col-6 staticbar"}
                    label={"Nombre d'enseignants"}
                    backcolor={"white"}
                    borderRadius={"9px"}
                    icon={teacher}
                    number={(this.props.nbrTeacher!==undefined)?this.props.nbrTeacher:0}
                />

                <UsersNumberSkeleton
                    classes={"col-lg-12 col-md-6 col-sm-6 col-6 staticbar"}
                    label={"Réclamations"}
                    backcolor={"white"}
                    borderRadius={"9px"}
                    icon={request}
                    number={0}
                />
                <UsersNumberSkeleton
                    classes={"col-lg-12 col-md-6 col-sm-6 col-6 staticbar"}
                    label={"Réclamations"}
                    backcolor={"white"}
                    borderRadius={"9px"}
                    icon={request}
                    number={0}
                />


            </>
        }
        else
        {
            bars=<>

                <UsersNumberPreview
                    classes={"col-lg-12 col-md-6 col-sm-6 col-6 staticbar"}
                    label={"Nombre d'étudiants"}
                    backcolor={"white"}
                    borderRadius={"9px"}
                    icon={student}
                    number={(this.props.nbrStudent!==undefined)?this.props.nbrStudent:0}
                />

                <UsersNumberPreview
                    classes={"col-lg-12 col-md-6 col-sm-6 col-6 staticbar"}
                    label={"Nombre d'enseignants"}
                    backcolor={"white"}
                    borderRadius={"9px"}
                    icon={teacher}
                    number={(this.props.nbrTeacher!==undefined)?this.props.nbrTeacher:0}
                />
                <UsersNumberPreview
                classes={"col-lg-12 col-md-6 col-sm-6 col-6 staticbar"}
                label={"Admins"}
                backcolor={"white"}
                borderRadius={"9px"}
                icon={request}
                number={(this.props.nbrPosts!==undefined)?this.props.nbrPosts:0}
                />
                <UsersNumberPreview
                    classes={"col-lg-12 col-md-6 col-sm-6 col-6 staticbar"}
                    label={"Réclamations"}
                    backcolor={"white"}
                    borderRadius={"9px"}
                    icon={request}
                    number={0}
                />



            </>
        }
        return(
            <>

                <div className="row mx-auto my-2">
                    {bars}

                </div>

            </>
        );
    }

}

export default StatisticsBar;
