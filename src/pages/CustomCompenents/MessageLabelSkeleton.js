import React, {Component} from 'react';

import Skeleton from "@material-ui/lab/Skeleton";

class MessageLabelSkeleton extends Component {
    render() {
        return (
            <>
                <div className="row px-3 message_label my-3 py-1" style={{
                    borderRadius:9,
                    overflow:"hidden"
                }}>
                    <div className="col-lg-1 col-md-1 col-sm-2 col-2 my-auto p-0">
                        <Skeleton animation="wave"  className="mx-3" variant="circle"
                                  style={{
                                      height:45,width:45,borderRadius:"100"
                                  }}
                        />                    </div>
                    <div className="col-lg-11  col-md-11 col-sm-10 col-9 my-auto">
                        <div className="row">

                            {
                                this.props.isNotification?
                                    <>

                                        <div className="col-lg-12 " >


                                            <Skeleton animation="wave" className=""  style={{width:"100%",borderRadius:"9px"}} />

                                        </div>
                                        <div className="col-lg-12 name">
                                            <Skeleton animation="wave" className=""  style={{width:"40%",borderRadius:"9px"}} />
                                        </div>

                                    </>

                                      :

                                    <>
                                    <div className="col-lg-12 name">
                                    <Skeleton animation="wave" className=""  style={{width:"40%",borderRadius:"9px"}} />
                                    </div>
                                    <div className="col-lg-12 " >


                                    <Skeleton animation="wave" className=""  style={{width:"100%",borderRadius:"9px"}} />

                                    </div>

                                    </>
                            }


                        </div>
                    </div>

                </div>

            </>
        );
    }
}

MessageLabelSkeleton.defaultProps ={
    isNotification: false,
}


export default MessageLabelSkeleton;