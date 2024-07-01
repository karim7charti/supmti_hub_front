/*import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import edit from "../../imgs/edit.png";
import {TextField} from "@material-ui/core";
import ButtonDev from "./Button";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function SimplePopover() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="col-lg-2 mx-auto" style={{

            alignItems:"center",
            justifyContent:"center"
        }}>


            <img src={edit}  onClick={handleClick} style={{
                height:20,
                width:20,
                cursor:"pointer",

                border:"1px solid gray",
                borderRadius:"5px"

            }}/>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>
                    <form noValidate autoComplete="off">


                        <div className="row">
                            <div className="col-lg-12 mx-auto my-1">
                                <TextField id="standard-basic" label="Nouveau email"/>
                            </div>

                        </div>

                        <div className="row">

                            <div className="col-lg-12 mx-auto my-1">
                                <TextField id="standard-basic" label="Mot de passe"/>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-lg-9 mx-auto align-self-end my-1">
                                <ButtonDev
                                    width="100%"
                                    backgroundColor="#106765"
                                    color="white" borderRadius="9px"
                                    padding={"0.5em 0.5em"}
                                    border={"1px solid #106765"}
                                    text={"Changer l'email"}

                                />
                            </div>
                        </div>


                    </form>
                </Typography>
            </Popover>

        </div>
    );
}*/
