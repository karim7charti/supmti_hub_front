import React, {Component} from 'react';
import './../../css/PostsStyles.css'

import Skeleton from "@material-ui/lab/Skeleton";

class ReactionButtonsSkeleton extends Component {


    render() {
        return (
            <>
                <div className="col-lg-12 py-2" id="cour_public" style={{borderBottom:"1px solid lightgray",borderTop:"1px solid lightgray"}}>
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-4 mx-auto post_action text-center">
                            <Skeleton animation="wave" className="mx-auto"  style={{width:"40%",borderRadius:"9px"}} />
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-4 mx-auto post_action text-center">

                            <Skeleton animation="wave" className="mx-auto"  style={{width:"40%",borderRadius:"9px"}} />

                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-4 mx-auto post_action text-center">
                            <Skeleton animation="wave" className="mx-auto"  style={{width:"40%",borderRadius:"9px"}} />
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

ReactionButtonsSkeleton.propTypes = {};


export default ReactionButtonsSkeleton;