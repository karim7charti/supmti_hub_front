import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export default function UsersNumberSkeleton({backcolor, borderRadius, label, number, icon, classes,iconBack}){
    return(
        <>

            <div className={classes} style={{

                padding:"0.3em 01em",

            }}>
                <div className="row"  style={{
                    backgroundColor:backcolor,
                    borderRadius:borderRadius,
                    padding:"1.85em 1em",
                    color:"black",

                }}>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                        <div className="row">
                            <div className="col-lg-12 mb-2" style={{
                                fontSize:12,
                                height:30,
                            }}>
                                <Skeleton animation="wave" width={"100%"}/>
                            </div>
                            <div className="col-lg-12" style={{
                                fontSize:12,
                                height:30,
                            }}>
                                <Skeleton animation="wave" width={"100%"}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-4" >
                        <Skeleton variant="rect" className="mx-auto" style={{
                            height:60,
                            width:60,
                            padding:2,
                            backgroundColor:iconBack,
                            borderRadius:borderRadius,

                        }}/>
                    </div>
                </div>
            </div>



        </>
    );
}


