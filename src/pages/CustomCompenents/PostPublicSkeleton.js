import React, {Component} from 'react';

import Skeleton from "@material-ui/lab/Skeleton";
import ReactionButtonsSkeleton from "./ReactionButtonsSkeleton";
import CommentSkeleton from "./CommentSkeleton";

class PostPublicSkeleton extends Component {
    render() {
        return (
            <>

                <div className="p-3 my-2"  style={{
                    backgroundColor:"white",
                    borderRadius:"9px"
                }}>
                    <div className="row  p-2">
                        <div className="col-lg-1 col-md-2 col-sm-2 col-2 my-auto">
                            <Skeleton animation="wave"  className="my-auto" variant="circle"
                                      style={{
                                          height:45,width:45,borderRadius:"100"
                                      }}
                            />
                        </div>
                        <div className="col-lg-11  col-md-10 col-sm-10 col-10">
                            <div className="row px-0">
                                <div className="col-lg-12" id="name_user">
                                    <Skeleton animation="wave" className="mx-0"  style={{width:"15%",borderRadius:"9px"}} />
                                </div>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-1">
                                            <Skeleton animation="wave" className=""  style={{width:"99%",borderRadius:"9px"}} />
                                        </div>
                                        <div className="col-lg-1">
                                            <Skeleton animation="wave" className=""  style={{width:"99%",borderRadius:"9px"}} />
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="row">

                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 mt-2 mb-3 mx-auto px-4">
                            <Skeleton animation="wave" className=""  style={{width:"100%",borderRadius:"9px"}} />
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12 col-12  mx-auto my-0 py-0" style={{height:450}}>
                            <Skeleton animation="wave" variant="rect" height={400}  style={{borderRadius:"9px"}} />


                        </div>


                    </div>

                    {/*Reaction buttons*/}
                    <div className="row mx-2 mb-4">
                        <ReactionButtonsSkeleton/>
                    </div>


                    {/*See all comment btn buttons*/}


                    <div className="row mt-2 " id="show_all_comments" style={{
                        display:this.props.showComments?"none":"block",

                    }}>
                        <div className="col-lg-12 px-4">

                            <Skeleton animation="wave" className=""  style={{width:"30%",borderRadius:"9px"}} />
                        </div>
                    </div>


                    {/*All comment btn*/}


                    <div className="row mt-3 " id="all_comments" style={{
                        display:this.props.showComments?"block":"none",

                    }}>
                        <div className="col-lg-12 px-4">
                            <CommentSkeleton/>

                        </div>
                    </div>



                </div>


            </>
        );
    }
}

PostPublicSkeleton.propTypes = {};
PostPublicSkeleton.defaultProps = {
    showComments:false,
    background:"white",
};

export default PostPublicSkeleton;