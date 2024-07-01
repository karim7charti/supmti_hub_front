import React from "react";
import PostChoice from "./PostChoice";
import './../../../css/PostsStyles.css'


const PostModal = (props)=> {

    const {ClosePost,data,showProgress} = props;
    function handleClose(){
        setPost(<PostChoice choice={choice} showProgress={showProgress} data={data}  closeModal={ClosePost}/>)
        ClosePost("none")
    }

    const choice = (post) => {

        setPost(post)
    }
    const [post, setPost]=React.useState(<PostChoice showProgress={showProgress} choice={choice} data={data} closeModal={ClosePost}/>)

    return(

        <>
            <div className="row align-items-center  justify-content-between" id="the_modal" style={{
                position:"fixed",
                width:"100%",
                height:"100%",
                margin:0,
                padding:0,
                display:"block",
                backgroundColor:"rgba(0, 0, 0, 0.11)",
                zIndex:920,
                overflowY:"scroll",
                backdropFilter:"blur(4px)"
            }}>
                <div className="col-lg-5 col-md-6 col-sm-10 col-11 mx-auto mt-3" id="post_modal">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row justify-content-between my-auto">
                                <div className="col-lg-10 col-md-9 col-sm-9 col-9 my-auto ">
                                    <b className="modal_title">Créer une article</b>
                                </div>
                                <div className="col-lg-1  col-md-1 col-sm-1 col-1 text-end">
                                <button type="button" className="btn-close py-3 my-0" aria-label="Close" id="return_to_choice" style={{color:"white"}} onClick={()=>{
                                    choice(<PostChoice choice={choice} showProgress={showProgress} data={data}  closeModal={ClosePost}/>)
                                }}> </button>
                                </div>
                                <div className="col-lg-1  col-md-2 col-sm-2 col-2 text-end">
                                    <button type="button" className="btn-close py-3 my-0" aria-label="Close" style={{color:"white"}} onClick={handleClose}> </button>
                                </div>

                            </div>

                        </div>
                        <div className="col-lg-12 opacity-50 my-0 mx-0 py-0 px-0 h-25">
                            <hr className=" mt-0 mx-0"/>
                        </div>
                        <div className="col-lg-12 my-0 py-0 h-25">
                            {post}
                        </div>

                    </div>


                </div>


            </div>

        </>
    )

}

export default PostModal;
