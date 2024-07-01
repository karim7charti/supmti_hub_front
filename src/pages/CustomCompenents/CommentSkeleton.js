import React, {Component} from 'react';
import Skeleton from "@material-ui/lab/Skeleton";


class CommentSkeleton extends Component {

    render() {

        return (
            <>
                <div className="row mt-1 mb-3 justify-content-between" id="comment_view">
                    <div className="col-lg-1 col-md-1 col-sm-1 col-1 mt-1 float-end text-end">
                        <Skeleton animation="wave"  className="mx-3" variant="circle"
                                  style={{
                                      height:35,width:35,borderRadius:"100"
                                  }}
                        />
                    </div>
                    <div className={"col-lg-11 col-md-11 col-sm-10 col-10"}>
                        <div className="row">
                            <div className="col-lg-12 px-2 py-0">
                                <p  className="px-2 py-1  mb-0" id="comment_div" style={{display:"inline-block"}}>

                                    <span className="col-lg-12 user"  style={{display:"inline"}}>
                                        <Skeleton animation="wave" className="mb-1"  style={{width:"8em",borderRadius:"9px"}} />
                                    </span>
                                    <span className="col-lg-12 label"  style={{display:"inline"}}>
                                        <Skeleton animation="wave" className=""  style={{width:"12em",borderRadius:"9px"}} />
                                    </span>

                                </p>

                            </div>

                        </div>
                    </div>

                </div>

            </>
        );
    }
}

CommentSkeleton.propTypes = {};

export default CommentSkeleton;