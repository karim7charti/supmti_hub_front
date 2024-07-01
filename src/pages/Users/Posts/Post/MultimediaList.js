import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import './../../../../css/PostsStyles.css'



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: "100%",
        maxHeight: 330,

        padding:0,
        marginTop:0,
        // Promote the list into its own layer in Chrome. This cost memory, but helps keep FPS high.
        transform: 'translateZ(0)',
        overflow:"-moz-hidden-unscrollable"
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
}));



const MultimediaList=(props)=> {
    const classes = useStyles();
    const {itemData,remove}=props;


    const removeThis = (id) =>{
        remove(id)
    }


    return (
        <>

            <div className={classes.root} id="MultimediaList">
                <ImageList rowHeight={"auto"} gap={1} className={classes.imageList}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img} style={{maxHeight: 330,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"rgba(0,0,0,0.1)",backdropFilter:"blur(15px)"}} cols={item.featured ? 2 : 1} rows={item.featured ? 2 : 1}>
                            {item.typeVideo?<video controls autoPlay={false} width={"100%"} height={"100%"} style={{backgroundColor:"black", borderRadius:9}}><source src={item.img}/></video>
                                :
                                <img src={item.img} alt={item.title}  className="image_preview"  style={{maxHeight:"100%",borderRadius:"0px",width:"revert",maxWidth:"100%",marginInline:"auto"}}/>
                            }
                            <ImageListItemBar
                                title={item.title}
                                position="top"
                                actionIcon={
                                    <IconButton aria-label={`star ${item.title}`} className={classes.icon}>
                                        <DeleteForeverTwoToneIcon onClick={
                                            ()=>{removeThis(item.id)}
                                        }/>
                                    </IconButton>
                                }
                                actionPosition="left"
                                className={classes.titleBar}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>

            </div>
        </>

    );
}

MultimediaList.defaultProps = {
    itemData:[],
}

export default MultimediaList;
