import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import '../../../../css/GeneralStyle.css'
import GeneralProfilePoll from "./GeneralProfilePoll";
import GeneralProfilePost from "./GeneralProfilePost";
import GeneralProfileCourses from "./GeneralProfileCourses";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: "white",
        borderRadius:"9px",
        paddingBottom:0


    }
}));

const GeneralProfileNavigator=(props)=> {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const {isTeacher,email,id} = props;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root + " my-4 mx-auto"} id="GeneralNavigator">
            <AppBar position="static" color="transparent" style={{
                boxShadow: "none",
                borderBottom:"1px solid lightgray"
            }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="inherit"
                    aria-label="scrollable force tabs example"

                >
                    <Tab label="Sondages"  {...a11yProps(0)} />
                    <Tab label="Publications"  {...a11yProps(1)} />
                    {isTeacher ? <Tab label="Cours"  {...a11yProps(2)} /> : ""}

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <GeneralProfilePoll email={email} id={id}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <GeneralProfilePost email={email} id={id} />
            </TabPanel>

            {
                isTeacher ?
                <TabPanel value={value} index={2}>
                <GeneralProfileCourses email={email} id={id}/>
                </TabPanel>
                :
                ""
            }

        </div>
    );
}

GeneralProfileNavigator.defaultProps={
    isTeacher:false,
}
export default GeneralProfileNavigator;
