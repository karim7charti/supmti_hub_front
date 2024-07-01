import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import '../../../css/ProfileStyle.css'

import EditUser from "./EditUser";


const useStyles = makeStyles({
    list: {
        width: 360,

    },
    fullList: {
        width: 'auto',

    },
});

export default function UserDrawer({name,email,image}) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"


        >
            <button type="button" className="btn-close p-3" aria-label="Close"  onClick={toggleDrawer(anchor, false)}> </button>
            <EditUser name={name} email={email} image={image}/>
        </div>
    );

    return (
        <div>

                <>
                    <button onClick={toggleDrawer('right', true)} className="edit_btn px-3 mx-auto">
                        Modifier le profil
                    </button>


                </>


            <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                {list('right')}
            </Drawer>


        </div>
    );
}
