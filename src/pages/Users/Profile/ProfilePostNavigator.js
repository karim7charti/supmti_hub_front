import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ProfilePolls from "./ProfilePolls";

import './../../../css/CustomCompenentsStyle.css'
import '../../../css/GeneralStyle.css'
import ProfileCourse from "./ProfileCourse";
import ProfilePosts from "./ProfilePosts";
import ProfileSaved from "./ProfileSaved";


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
        minHeight:"83vh",
        borderRadius:"9px",
        paddingBottom:0


    }
}));

export default function ProfilePostNavigator({role}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [index, setIndex] = React.useState(2);
    const role_props=role

    useEffect(()=>{
        if(role_props==="ROLE_ENSEIGNANT"){
            setIndex(3)
        }
    })
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    let course="",course_panel=""
    if(role_props==="ROLE_ENSEIGNANT")
    {

        course=<Tab label="Cours"  {...a11yProps(2)} />
        course_panel=  <TabPanel value={value} index={2}>
                <ProfileCourse/>
            </TabPanel>

    }

    return (
        <div className={classes.root + " my-4 mx-auto"}  id="GeneralNavigator">
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
                    {course}
                    <Tab label="Enregistrés"  {...a11yProps(index)} />


                </Tabs>
            </AppBar>
            <TabPanel style={{
                paddingBottom:"0 !important"
            }} value={value} index={0}>
                <ProfilePolls/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProfilePosts/>
            </TabPanel>
            {course_panel}
            <TabPanel value={value} index={index}>
                <ProfileSaved/>
            </TabPanel>

        </div>
    );
}
