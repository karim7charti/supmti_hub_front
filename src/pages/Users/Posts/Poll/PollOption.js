import React from 'react';
import {TextField} from "@material-ui/core";
import close from '../../../../imgs/close.png'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    close: {

        height:23,
        width:23,
        backgroundColor:"#e8e8e8",
        borderRadius:45,
        padding:2,
        cursor:"pointer",


        '&:hover': {
            backgroundColor:"lightgray",
        },


    },
}));

const PollOption = (props) => {
    const classes = useStyles();
    const [show,setShow]= React.useState('flex')
    const {optionNumber,noDelete,onDelete,errors,setAnswer} = props;

    const handleClose=()=>{
        onDelete(optionNumber)

    }


    return (

        <>
            <div className="row p-2" style={{
                display:show,
            }}>
                <div className={noDelete?"col-lg-12 col-md-12 col-sm-12 col-12":"col-lg-11  col-md-11 col-sm-11 col-11"}>
                    <TextField
                        id="outlined-textarea"
                        placeholder={"Choix "+optionNumber}
                        size="small"
                        fullWidth={true}
                        variant="outlined"
                        name={"answer"+optionNumber}

                        error={Object.keys(errors).includes("answer"+optionNumber)}

                        helperText={Object.keys(errors).includes("answer"+optionNumber)?errors["answer"+optionNumber].answer:""}



                        onChange={
                            (event)=>{
                                setAnswer(optionNumber-1,event.target.value)
                            }
                        }
                    />
                </div>
                <div className="col-lg-1  col-md-1 col-sm-1 col-1 mt-1"  style={{
                    display:noDelete?"none":"block",
                }}>
                    <img  alt="Supprimer"  className={classes.close}  src={close} onClick={handleClose}/>
                </div>
            </div>

        </>
    );
};


export default PollOption;
