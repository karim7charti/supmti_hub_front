import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import UserList from "./UserList";
import ReportList from "../Reports/ReportList";

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
        minHeight:"80vh",
        borderRadius:"9px"

    }
}));

export default function Users() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root} >
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
                    <Tab label="Enseignants"  {...a11yProps(0)} />
                    <Tab label="Étudiants"  {...a11yProps(1)} />
                    <Tab label="Admins"  {...a11yProps(2)} />
                    <Tab label="Réclamation"  {...a11yProps(3)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <UserList isStudent={false} role={"teacher"}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserList isStudent={true} role={"student"}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <UserList isStudent={false} isAdmin={true} role={"admin"}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ReportList/>
            </TabPanel>

        </div>
    );
}
