import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import '../../../../css/GeneralStyle.css'
import '../../../../css/CustomCompenentsStyle.css'
import Polls from "./Polls";
import Courses from "./Courses";
import Posts from "./Posts";
import ActivitiesMix from "./ActivitiesMix";


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


        backgroundColor: "white",
        minHeight:"83vh",
        borderRadius:"9px",
        paddingBottom:0,
        maxWidth:"100% !important"

    }
}));

export default function PostHomeNavigator() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(()=>{


    })

    return (
        <div className={classes.root + " mt-3 mb-4 mx-auto col-lg-7 col-md-10 col-sm-12 col-12"}  id="GeneralNavigator">
            <AppBar position="static" color="transparent" style={{
                boxShadow: "none",
                borderBottom:"1px solid lightgray"
            }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    scrollButtons="auto"
                    indicatorColor="primary"
                    textColor="inherit"
                    aria-label="scrollable force tabs example"



                >
                    <Tab style={{textTransform:"none"}} label="All"  {...a11yProps(0)} />
                    <Tab style={{textTransform:"none"}} label="Publications"  {...a11yProps(1)} />
                    <Tab style={{textTransform:"none"}} label="Cours"  {...a11yProps(2)} />
                    <Tab style={{textTransform:"none"}} label="Sondage"  {...a11yProps(3)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <ActivitiesMix/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Posts/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Courses/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Polls/>
            </TabPanel>

        </div>
    );
}
