import React from "react";
import poll from './../../../imgs/poll.png'
import cours from './../../../imgs/courses.png'
import post from './../../../imgs/posts.png'
import './../../../css/PostsStyles.css'
import PollPost from "./Poll/PollPost";
import CourPost from "./Cours/CourPost";
import Post from "./Post/Post";


const PostChoice = (props) => {

    const {choice,data,closeModal,showProgress} = props;
    const role=data?.roles.toString().split('_')[1].toLowerCase()
    const setChoice=(choix)=>{
        choice(choix);
    }
    let course=""
    if(role==='enseignant')
        course=<>
            <div className="col-lg-11 post_choice py-2 mx-auto my-1" onClick={
                ()=>{
                    setChoice(<CourPost data={data} close={closeModal}/>);
                }
            }>
                  <img src={cours}  className="my-auto"/> <span className="my-auto">Cours/Leçon</span>
              </div>
        </>

    return(

      <>
          <div className="row justify-content-between" id="choices">
              <div className="col-lg-11 post_choice py-2 mx-auto my-1" onClick={
                  ()=>{
                      setChoice(<PollPost data={data} close={closeModal}/>);
                  }
              }>
                  <img src={poll}  className="my-auto"/> <span className="my-auto">Sondage/Vote</span>
              </div>
              {course}
              <div className="col-lg-11 post_choice py-2 mx-auto my-1" onClick={
                  ()=>{
                      setChoice(<Post showProgress={showProgress} data={data} close={closeModal}/>);
                  }
              }>
                  <img src={post}  className="my-auto"/> <span className="my-auto">Publication/Annonce</span>

              </div>

          </div>



      </>
    );



}
export default PostChoice;
