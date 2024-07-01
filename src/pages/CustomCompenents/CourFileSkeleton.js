import React, {Component} from 'react';
import './../../css/PostsStyles.css'
import Skeleton from "@material-ui/lab/Skeleton";

class CourFileSkeleton extends Component {
    render() {
        return (
            <>
                <div className="row p-2 m-2" id="cour_file" style={{
                    display:"flex",

                }}>
                    <div className="col-lg-1 col-md-2 col-sm-2 col-2  my-auto text-center">
                        <Skeleton animation="wave" className="mx-auto"  style={{width:"55%",height:"4em",borderRadius:"9px"}} />
                    </div>
                    <div className="col-lg-10 col-md-9 col-sm-8 col-8 my-auto">
                        <div className="row my-auto">
                            <div className="col-lg-12 my-auto title">
                                <Skeleton animation="wave" className=""  style={{width:"80%",borderRadius:"9px"}} />
                            </div>
                            <div className="col-lg-12 my-auto name">
                                <Skeleton animation="wave" className=""  style={{width:"20%",borderRadius:"9px"}} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-2 col-2  delete  my-auto text-center">
                        <Skeleton animation="wave" className=""  style={{width:"50%",height:"2em",borderRadius:"9px"}} />

                    </div>
                </div>

            </>
        );
    }
}

CourFileSkeleton.propTypes = {};
CourFileSkeleton.defaultProps = {
};

export default CourFileSkeleton;
