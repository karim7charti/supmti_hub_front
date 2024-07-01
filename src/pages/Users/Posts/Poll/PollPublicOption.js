import React, {Component, useState} from 'react';
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import '../../../../css/CustomCompenentsStyle.css'
import axios from "axios";

const GreenCheckbox = withStyles({
    root: {
        color: "lightgray",
        margin: 0,
        '&$checked': {
            color: "rgba(0, 87, 146, 0.84)" ,
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const PollPublicOption=(props)=> {
    const {label ,handleCheck, checked ,pollId, onClick,votes,name,id } = props;

        let vote=()=>{
            handleCheck(id)

            axios.get("/api/polls/vote/"+id+"/"+pollId)
        }

        return (
            <>
               <div className="col-lg-11 col-md-11 col-sm-12 col-12 mx-auto">
                   <div className="row" id="poll_choice" onClick={(e)=>{
                      vote()

                   }}>


                               <div className="col-lg-1 col-md-1 col-sm-1 col-1 ">

                                  <FormControlLabel
                                  control={<GreenCheckbox checked={checked}  name={name} />}
                                  label=""
                                  />

                               </div>

                               <div className="col-lg-10 col-md-9 col-sm-9 col-9 my-auto">
                                   <span style={{
                                       wordWrap:"break-word"
                                   }}>{label}</span>
                               </div>

                               <div className="col-lg-1 col-md-2 col-sm-2 col-2 my-auto text-end" style={{
                                   color:"gray"
                               }}>
                                   <span className="vote">
                                       {votes}&nbsp;votes
                                   </span>
                               </div>



                   </div>

               </div>


            </>
        );

}
PollPublicOption.defaultProps={
    label: "Pas de choix",
    checked:false,
    name:"checkbox",
    votes: 0,
}

export default PollPublicOption;
