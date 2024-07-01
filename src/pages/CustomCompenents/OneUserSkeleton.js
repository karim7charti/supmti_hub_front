import React, {Component} from 'react';

import  '../../css/AdminStyle.css'
import Skeleton from '@material-ui/lab/Skeleton';

class OneUserSkeleton extends Component {
    render() {
        return (
            <>
                <>
                    <div className="row px-2 mt-2" id="users" style={{

                        borderRadius:9,

                    }}>

                        <div className="col-lg-2 col-md-2 col-sm-2 col-3 my-auto">
                            <Skeleton animation="wave" variant="circle"
                                      style={{
                                          height:65,width:65,borderRadius:45
                                      }}
                            />

                        </div>

                        <div className="col-lg-9 col-md-9 col-sm-9 col-8 info my-auto">
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-sm-12 col-12 my-auto  ">
                                    <Skeleton animation="wave"  style={{width:"100%"}} />
                                </div>



                                <div className="col-lg-6 col-md-6 col-sm-12  info col-12 my-auto">
                                    <Skeleton animation="wave" style={{width:"100%"}} />
                                </div>

                                <div className="col-lg-3  col-md-3 col-sm-12 col-12 info my-auto">
                                    <Skeleton animation="wave" style={{width:"100%"}} />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-1 col-md-1 col-sm-1 col-1 my-auto">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12 my-auto align-items-center">
                                    <Skeleton variant="circle" width={20} height={20} />

                                </div>

                                <div className="col-lg-6  col-md-6 col-sm-12 col-12 text-end">

                                    <Skeleton variant="circle" width={20} height={20} />

                                </div>
                            </div>
                        </div>






                    </div>


                </>

            </>
        );
    }
}

export default OneUserSkeleton;