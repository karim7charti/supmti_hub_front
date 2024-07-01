import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import LockOpenIcon from '@material-ui/icons/LockOpen';import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import {useHistory} from "react-router-dom";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PostModal from "../Users/Posts/PostModal";
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';

const useStyles = makeStyles((theme) => ({

    speedDial: {
        position: 'fixed',
        zIndex:19,
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: "0.5em",
            right: "0.5em",
        },



    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function FlaotingArea(props) {

    const classes = useStyles();
    const [direction, setDirection] = React.useState('up');
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState('none');
    const [flashing, setFlashing] = React.useState("bx bx-flashing");
    const history = useHistory();
    const {display,data,showProgress}=props;

    const handleScroll=()=>{
        window.scroll(0,0);
    }


    const actions = display? [


            { icon: <ArrowDropUpIcon />, name: 'Monter en haut de page',link:"goTop",key:"goTop" },
            { icon: <LockOpenIcon />, name: 'Centre D\'administrateur',link:"/admin-dashboard",key:"admin" },
            { icon: <RateReviewOutlinedIcon />, name: 'Messagerie',link:"/messages",key:"messages"  },
            { icon: <NotificationsOutlinedIcon />, name: 'Notifications',link:"/notification",key:"notification"  },
            { icon: <SubscriptionsOutlinedIcon />, name: 'Publier un poste',link:"post",key:"post"   },
            { icon: <AccountCircleOutlinedIcon />, name: 'Profil',link:"/profile",key:"profile"  },
            { icon: <ExitToAppIcon />, name: 'Deconnexion',link:"/",key:"deconnexion" },
        ]
            :
            [
                { icon: <ArrowDropUpIcon />, name: 'Monter en haut de page',link:"goTop",key:"goTop" },
                { icon: <RateReviewOutlinedIcon />, name: 'Messagerie',link:"/messages",key:"Messagerie"  },
                { icon: <NotificationsOutlinedIcon />, name: 'Notifications',link:"/notification",key:"notification"  },
                { icon: <SubscriptionsOutlinedIcon />, name: 'Publier un poste',link:"post",key:"post"},
                { icon: <AccountCircleOutlinedIcon />, name: 'Profil',link:"/profile",key:"profile"  },
                { icon: <ExitToAppIcon />, name: 'Deconnexion',link:"/",key:"deconnexion" },
            ];



    const handleCloseModal = (display) => {
        setOpenModal(display);
    };




    const handleClose  = () => {

        setOpen(false);
        setFlashing("bx bx-flashing");
    };


    function handleClick (link) {
        if (link === "post"){
            setOpenModal("block");
        }
        else if (link === "goTop"){
            handleScroll();
        }
        else {
            history.push(link);
            setOpen(false);
        }

    }

    const handleOpen = () => {
        setOpen(true);
        setFlashing(" ");
    };

    return (
                <>
                    <SpeedDial
                        ariaLabel="SpeedDial example"
                        className={classes.speedDial}
                        icon={<SpeedDialIcon className={flashing}/>}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        open={open}
                        direction={direction}
                    >
                        {actions.map((action) => (

                            <SpeedDialAction
                                key={action.key}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={
                                    ()=>handleClick(action.link)
                                }

                            />






                        ))}
                    </SpeedDial>
                    <span style={{

                        display:openModal,

                    }}>

                        <PostModal showProgress={showProgress} ClosePost={handleCloseModal} data={data}/>

                    </span>

                </>


    );
}
