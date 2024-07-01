import React, {Component} from 'react';
import ProfilePicture from "../../Users/Profile/ProfilePicture";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import CenterFocusWeakTwoToneIcon from '@material-ui/icons/CenterFocusWeakTwoTone';
import {Tooltip} from "@material-ui/core";

class OneReport extends Component {
    state = {
        caseLabel:"",
    }

    handelCase = () =>{
        let tempCase = "";
        switch (this.props.case){
            case "POST" : tempCase = " a signaler le post de "
                break;
            default : tempCase = " a signaler le post de ";
        }
        this.setState({
            caseLabel : tempCase,
        })
    }

    componentDidMount() {
        this.handelCase();
    }

    render() {
        return (
            <>

                <div className="row px-2 mt-2" id="users" style={{
                    backgroundColor:this.props.back? "rgba(0, 0, 0, 0.02)":"transparent",
                    borderRadius:9,

                }}>

                    <div className="col-lg-1 col-md-1 col-sm-1 col-2 my-auto p-1" id={this.props.img===null?" ":"the_image"}>
                        <ProfilePicture width={55} height={55} display={this.props.img===null?"block":"none"} FirstLater={this.props.reporterName.charAt(0).toUpperCase()} fontSize={25}  picture={this.props.img}/>

                    </div>

                    <div className="col-lg-10 col-md-10 col-sm-10 col-9 info my-auto">
                       <span style={{fontWeight:600}}>
                           {this.props.reporterName}
                       </span>
                        <span>
                            {this.state.caseLabel}
                        </span>
                        <span style={{fontWeight:600}}>
                            {this.props.targetName}
                        </span>
                    </div>

                    <div className="col-lg-1 col-md-1 col-sm-1 col-1 my-auto">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12 my-auto align-items-center">
                                <Tooltip title={"Découvrir"}>
                                    <CenterFocusWeakTwoToneIcon style={{ color: "rgba(0, 87, 146, 0.8)", fontSize:30,cursor:"pointer"  }}/>
                                </Tooltip>

                            </div>

                            <div className="col-lg-6  col-md-6 col-sm-12 col-12 text-end">

                                <DeleteForeverTwoToneIcon style={{ color: "rgba(0, 87, 146, 0.8)", fontSize:30,cursor:"pointer"  }}/>

                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

OneReport.defaultProps = {
    img: null,
    reporterName:"Karim EL MRISSANI",
    targetName:"JOHN DOE",
    back:false,
    case: "POST",


}

export default OneReport;
