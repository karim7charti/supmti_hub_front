import React, {Component} from 'react';

import '../../css/ProfileStyle.css'
import Skeleton from "@material-ui/lab/Skeleton";

class ProfileGeneralSkeleton extends Component {
    render() {
        return (
            <>
                <div className="row p-4 mx-0" id="profile_general">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-2 col-md-3 col-sm-5 col-6 my-auto">
                                <Skeleton animation="wave"  className="mx-auto" variant="circle"
                                          style={{
                                              height:120,width:120,borderRadius:"100"
                                          }}
                                />
                            </div>
                            <div className="col-lg-5  col-md-7 col-sm-7 col-6 my-auto">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <Skeleton animation="wave" className=""   style={{width:"80%",borderRadius:"9px",height:"2em"}} />                                    </div>

                                    <div className="col-lg-12 mt-1">
                                        <Skeleton animation="wave" className=""   style={{width:"50%",borderRadius:"9px"}} />
                                    </div>

                                    <div className="col-lg-12 mt-1 pub">
                                        <Skeleton animation="wave" className=""   style={{width:"30%",borderRadius:"9px"}} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-11 col-11 mx-auto my-auto">
                                <Skeleton animation="wave" className="mx-auto"   style={{width:"100%",borderRadius:"30px",height:"4em"}} />
                            </div>
                        </div>
                    </div>

                </div>


            </>
        );
    }
}

ProfileGeneralSkeleton.propTypes = {};

export default ProfileGeneralSkeleton;