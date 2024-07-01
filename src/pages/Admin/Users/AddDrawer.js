import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import AddUser from "./AddUserForm";
import ButtonDev from "../../CustomCompenents/Button";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";


const useStyles = makeStyles({
    list: {
        width: 360,

    },
    fullList: {
        width: 'auto',

    },
});

 function AddDrawer({role,isEdit,userDataOnEdit,updatedata}) {
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
            <AddUser role={
                (role==="teacher")?"ROLE_ENSEIGNANT":
                    (role==="admin")?"ROLE_ADMIN":
                        "ROLE_ETUDIANT"
            } isEdit={isEdit} userDataOnEdit={userDataOnEdit} updateData={updatedata} />
        </div>
    );

    return (
        <div>
            {isEdit?

                <>
                    <EditTwoToneIcon style={{ color: "rgba(0, 87, 146, 0.8)",fontSize:30,cursor:"pointer" }} onClick={toggleDrawer('right', true)}/>

                </>

                :

                <>
                    <ButtonDev
                        width="80%"
                        backgroundColor="transparent"
                        color="#106765" borderRadius="9px"
                        padding={"0.5em 0.5em"}
                        border={"1px solid #106765"}
                        text={
                            (role==="teacher")?"Ajouter un enseingant":
                                (role==="admin")?"Ajouter un admin":
                                    "Ajouter un étudiant"
                        }
                        icon={<AddRoundedIcon/>}
                        onClick={toggleDrawer('right', true)}

                    />

                </>}


                    <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                        {list('right')}
                    </Drawer>


        </div>
    );
}


AddDrawer.defaultProps = {
    isAdmin:false
}

export default AddDrawer;
