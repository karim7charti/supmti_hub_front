import React, {Component} from 'react';

import '../../css/ProfileStyle.css'
import Skeleton from "@material-ui/lab/Skeleton";

class EditUserSkeleton extends Component {






    render() {
        return (
            <>
                <div className="row py-5 px-4 container mx-auto my-auto" >


                    <form>
                        <div className="col-lg-12 mb-5 mx-auto text-center" id="imgEdit">

                            <Skeleton animation="wave"  className="mx-auto" variant="circle"
                                      style={{
                                          height:120,width:120,borderRadius:"100"
                                      }}
                            />


                        </div>

                        <div className="col-lg-12 my-2 mx-auto">
                            <Skeleton animation="wave" className="mx-auto"  style={{width:"100%",borderRadius:"9px",height:"3.5em"}} />

                        </div>



                        <div className="col-lg-12 my-2 mx-auto">
                            <Skeleton animation="wave" className="mx-auto"  style={{width:"100%",borderRadius:"9px",height:"3.5em"}} />

                        </div>





                        <div className="col-lg-12 mx-auto my-2">

                            <Skeleton animation="wave" className="mx-auto"  style={{width:"100%",borderRadius:"9px",height:"3.5em"}} />


                        </div>


                        <div className="col-lg-12 mx-auto mt-5 text-end">

                            <Skeleton animation="wave" className="mx-auto"  style={{width:"100%",borderRadius:"9px",height:"3em"}} />


                        </div>



                    </form>



                </div>

            </>
        );
    }
}

export default EditUserSkeleton;