import React, {Component} from 'react';
import '../../css/ProfileStyle.css'

import Skeleton from "@material-ui/lab/Skeleton";

class ProfilePreviewSkeleton extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }




    render() {
        return <>

            <div className="row my-4 mx-auto py-3 px-1" id="profileDiv" style={styles.bigDiv}>

                <div className="col-lg-12 mx-auto mt-0 mb-2 text-center">
                    <Skeleton animation="wave"  className="mx-auto" variant="circle"
                              style={{
                                  height:120,width:120,borderRadius:"100"
                              }}
                    />
                </div>
                <div className="col-lg-12 mx-auto my-auto">
                    <div className="row">
                        <div className="col-lg-12 text-center mx-auto my-2">
                            <Skeleton animation="wave" className="mx-auto"  style={{width:"80%",borderRadius:"9px"}} />
                        </div>
                        <div className="col-lg-12 text-center mx-auto my-1">
                            <Skeleton animation="wave" className="mx-auto"   style={{width:"100%",borderRadius:"9px"}} />

                        </div>
                        <div className="col-lg-12 text-center mx-auto my-1">
                            <Skeleton animation="wave" className="mx-auto"   style={{width:"50%",borderRadius:"9px"}} />

                        </div>

                    </div>

                </div>
                <div className="col-lg-12 mx-auto mb-2 text-center">
                    <Skeleton animation="wave"  className="mx-auto"  style={{width:"60%",height:"4.5em",borderRadius:"30px"}} />
                </div>

            </div>



        </>;
    }
}

export default ProfilePreviewSkeleton;

const styles = {
    image:{
        height:120,
        width:120,
        borderRadius:"100%",

    },
    input:{

        backgroundColor:"transparent",


    },
    bigDiv:{
        backgroundColor: "white",
        border: "1px solid lightgray",
        borderRadius: "9px",
    }

}