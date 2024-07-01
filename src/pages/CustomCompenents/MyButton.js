

import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';




 const MyButton=(props) => {
     const {fontSize,fontWeight,onClick, label,icon,disabled,background,color,radius,border,hoverback,hovercolor,hoverborder,iconDisplay,shadow,upperCase,type,width,marginBottom,marginTop,justifyContent} = props;
    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
            backgroundColor:background,
            border:border,
            borderRadius:radius,
            color:color,
            opacity:disabled?0.5:1,
            cursor:disabled?"default":"pointer",
            marginRight:0,
            marginLeft:0,
            justifyContent:justifyContent,
            marginBottom:marginBottom,
            marginTop:marginTop,
            boxShadow: shadow,
            '&:hover': {
                backgroundColor:hoverback,
                opacity:disabled?0.5:1,
                cursor:disabled?"none":"pointer",
                color:hovercolor,
                border:hoverborder,
                boxShadow: shadow,

            },
            '&:active': {
                backgroundColor:hoverback,
                boxShadow: 'none',
                opacity:disabled?0.5:1,
                cursor:disabled?"none":"pointer",
            },
            '&:focus': {

            },

        },
    }));

    const classes = useStyles();

    return (
        <div>

            <Button

                variant="contained"

                size="small"
                className={classes.button}
                startIcon={icon}
                onClick={(!disabled)?onClick:()=>{}}
                style={{
                    width:width,
                    minWidth:0,
                    textTransform:upperCase? "uppercase" : "none",
                    fontWeight:fontWeight,
                    fontSize:fontSize
                }}
                type={type}



            >
                {label}&nbsp;<span className="spinner-border spinner-border-sm" style={{display:iconDisplay}} ></span>
            </Button>

        </div>
    );
}

MyButton.defaultProps = {
    iconDisplay: "none",
    shadow: "",
    upperCase:true,
    type:"button",
    width:"100%",
    fontWeight:"normal",
    fontSize:14,
    marginTop:"8px",
    marginBottom:"8px",
    justifyContent:"center"
}

export default MyButton;
