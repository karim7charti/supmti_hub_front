import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import axios from "axios";



const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.background.paper}`,
    },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },

    },
}));

function ProfilePicture({picture,height,width,display,FirstLater,fontSize,showBadge,withBadgeIcon,badgeIcon}) {
    const StyledBadge = withStyles((theme) => ({
        badge: {
            backgroundColor: '#106765',
            color: '#106765',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            display:showBadge?"block":"none",
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }))(Badge);
    const classes = useStyles();
    const history=useHistory()

    return (
        <div className="mx-auto">
            {
                withBadgeIcon?
                    <Badge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}

                        badgeContent={badgeIcon}

                    >
                        <Avatar alt="Remy Sharp"  src={(picture===null || picture?.toString().includes("data:image"))?picture:axios.defaults.baseURL+"api/get_image/"+picture} style={{
                            width:width,
                            height:height
                        }}><span style={{
                            fontSize:fontSize,
                            display:display,
                            fontWeight:"normal"
                        }}>{FirstLater}</span></Avatar>
                    </Badge>
                    :
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant="dot"


                    >
                        <Avatar alt="Remy Sharp"  src={(picture===null || picture?.toString().includes("data:image"))?picture:axios.defaults.baseURL+"api/get_image/"+picture} style={{
                            width:width,
                            height:height
                        }}><span style={{
                            fontSize:fontSize,
                            display:display,
                            fontWeight:"normal"
                        }}>{FirstLater}</span></Avatar>
                    </StyledBadge>
            }


        </div>
    );
}

ProfilePicture.defaultProps={
     fontSize:65,
     showBadge:true,
     withBadgeIcon:false,
     badgeIcon:null
}
export default ProfilePicture;
