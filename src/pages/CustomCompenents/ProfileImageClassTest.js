import React from "react";
import ProfilePicture from "../Users/Profile/ProfilePicture";
import './../../css/CustomCompenentsStyle.css'
import MyButton from "./MyButton";
import PublishIcon from '@material-ui/icons/Publish';
import CachedIcon from '@material-ui/icons/Cached';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useHistory} from "react-router-dom";

export default function ProfilePicturePreview({img,isFound,firstLetter,imgDisplay}) {
    const [displaySave,setDisplaySave] = React.useState("block");
    const [displayModal,setDisplayModal] = React.useState();
    const history = useHistory();


    function  handleClose(){

    }
    return(
        <>
            <div  style={{
                width:"100%",
                height:"100%",
                position:"fixed",
                backgroundColor:"rgba(0, 0, 0, 0.11)",
                zIndex:5000,
                padding:0,
                marginRight:-30,
                marginLeft:-30,

            }}>
                <div className="col-lg-6 mx-auto mt-5 p-3" id="photo_change">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row justify-content-between">
                                <div className="col-lg-4 my-auto">
                                    <button style={{
                                        display:displaySave
                                    }} className="save_btn px-3">
                                        Sauvegarder
                                    </button>
                                </div>
                                <div className="col-lg-5 text-end">
                                    <button type="button" className="btn-close my-0" aria-label="Close" style={{color:"white"}} onClick={handleClose}> </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 mx-auto text-center my-5">
                            <ProfilePicture width={170} height={170} display={imgDisplay} FirstLater={firstLetter}  picture={img}/>

                        </div>
                        <div className="col-lg-12 mx-auto text-center px-0 ">
                            <hr/>

                        </div>
                        <div className="col-lg-12">
                            <div className="row justify-content-between">
                                <div className="col-lg-4 text-start">
                                    <MyButton

                                        label={isFound?"Changer":"Uploader"}
                                        icon={isFound?<PublishIcon/>:<CachedIcon/>}
                                        disabled={false}
                                        background={"#106765"}

                                    />


                                </div>
                                <div className="col-lg-4 text-end">
                                    <MyButton
                                        label={"Supprimer"}
                                        icon={<DeleteForeverIcon/>}
                                        disabled={isFound? true:false}
                                        background={"gray"}

                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
