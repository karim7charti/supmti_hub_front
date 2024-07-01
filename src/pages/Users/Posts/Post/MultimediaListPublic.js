import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import './../../../../css/PostsStyles.css'
import CloseIcon from '@material-ui/icons/Close';

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
        maxHeight:441,

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


/* const Data = [


   {
     img: img1,
     title: 'egre',
     author: 'author',
     featured: true,
       typeVideo:false
   },

     {
         img: vd1,
         title: 'gereggergeg',
         author: 'author',
         featured: true,
         typeVideo:true
     },

   {
     img: img2,
     title: 'Imargge',
     author: 'author',
     featured: false,
       typeVideo:false
   },

   {
     img: img3,
     title: 'rgeeg',
     author: 'author',
     featured: false,
       typeVideo:false
   },

   {
     img: img4,
     title: 'greeg',
     author: 'author',
     featured: true,
       typeVideo:false
   },


];*/

const MultimediaListPublic=(props)=> {
    const classes = useStyles();
    const {itemData,remove}=props;
    const [file,setFile] = React.useState(null);
    const [preview,setPreview] = React.useState(false);

    const theFile = (file)=> {
        setFile(file);
    }

    const Preview = ()=> {
        setPreview(!preview)
    }
    const downloadThis = (id) =>{
        downloadThis(id)
    }


    return (
        <>


            <div style={{
                position:"fixed",
                width:"100%",
                height:"100vh",
                margin:0,
                backgroundColor:"rgba(0,0,0,0.4)",
                bottom:0,
                zIndex:20   ,
                left:0,
                top:0,
                display:preview?"block" : "none",
                backdropFilter:"blur(5px)",





            }}>
                <div className="row h-100 mt-0 mx-auto">
                    <div className="col-lg-12 mx-auto text-end mb-0 " id="control_bar">
                        <CloseIcon id="close-btn" className="mt-5" style={{color:"white",cursor:"pointer",fontSize:35}} onClick={Preview}/>
                    </div>
                    <div className="col-lg-12 mx-auto mt-0 text-center">
                        <img src={file} alt="Image" className="mx-auto my-auto" id="big_image"/>
                    </div>
                </div>
            </div>



            <div className={classes.root} id="MultimediaListPublic">
                <ImageList rowHeight={"auto"} gap={1} className={classes.imageList}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img} cols={item.featured ? 2 : 1} style={{maxHeight:441,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"rgba(0,0,0,0.1)",backdropFilter:"blur(15px)"}} rows={item.featured ? 2 : 1}>
                            {item.typeVideo?<video controls autoPlay={false} width={"100%"} height={"100%"} style={{backgroundColor:"black",borderRadius:"9px"}} ><source src={item.img}/></video>
                                :
                                <img src={item.img} alt={item.title}  className="image_preview" style={{maxHeight:"100%",borderRadius:"0px",width:"revert",maxWidth:"100%",marginInline:"auto"}} onClick={
                                    ()=>{
                                        theFile(item.img);
                                        Preview();
                                    }
                                }/>
                            }
                            <ImageListItemBar
                                title={item.title}
                                position="top"
                                actionIcon={
                                    <IconButton aria-label={`star ${item.title}`} className={classes.icon} onClick={
                                        ()=>{downloadThis(item.id)}
                                    }>
                                        <SystemUpdateAltIcon/>
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

MultimediaListPublic.defaultProps = {
    itemData:[],
}

export default MultimediaListPublic;
