import React, {Component} from 'react';
import PropTypes, {number, string} from 'prop-types';
import logo from "../../imgs/logo.png";
import Progress from "./Progress";
import './../../css/CustomCompenentsStyle.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import uploader from "../../Services/UploaderService";



class UploadProgress extends Component {
    constructor(props) {
        super(props);
        this.interval=null
        this.interval1=0

           this.state={
                isHide:false,
                isPause:false,
                progress:0,
                pause_Resume:"pause",
                time:0

            }
    }


    handleHide = () =>{
        this.setState({
            isHide:!this.state.isHide
        })
    }
    f_beforeunload(){
        return ""
    }
   componentDidMount() {

        this.interval=setInterval(()=>{
            if(uploader.isUploading)
            {
                window.onbeforeunload=null
                window.onbeforeunload=this.f_beforeunload


                 this.setState({
                    progress:Math.ceil(uploader.progress)
                })
            }

            else
            {
                window.onbeforeunload=null
                 this.props.hideProgress()
            }

            if(uploader.isPaused)
                this.setState({
                    isPause:true
                })
            else
                this.setState({
                    isPause:false
                })

        },100)
        this.interval1=setInterval(()=>{
            this.setState(prev=>({
                time:prev.time
            }))
        },60000)

    }
    componentWillUnmount() {
        clearInterval(this.interval)
        clearInterval(this.interval1)
    }

    pause_Resume=(e)=>{
        if(!this.state.isPause)
        {
            this.setState({
                isPause:true
            },()=>{
                uploader.pause()
            })
        }
        else {
            this.setState({
                isPause:false
            },()=>{
                uploader.resume()

            })
        }
    }

    render() {
        return (
            <>
                <div className="position-fixed bottom-0 start-0 p-2" style={{zIndex:11,display:this.props.show?"block":"none"}}>
                    <div id="liveMyAlert" className={"MyAlert show"} role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="MyAlert-header">
                            <img src={logo} className="rounded me-2" alt="..." style={{height:25,width:50}}/>
                            <strong className="me-auto"></strong>
                            <small className="mx-2">il y a {this.state.time} minutes</small>

                            {this.state.isPause?
                                <PlayArrowIcon style={{cursor:"pointer",fontSize:17}}  onClick={this.pause_Resume} className=""/>
                                :
                                <PauseIcon style={{cursor:"pointer",fontSize:17}}  onClick={this.pause_Resume} className="" />
                            }
                            {this.state.isHide?
                                <ExpandLessIcon style={{cursor:"pointer"}} onClick={this.handleHide} className="mx-1"/>
                                :
                                <ExpandMoreIcon style={{cursor:"pointer"}} onClick={this.handleHide} className="mx-1" />
                            }

                        </div>
                        <div className="MyAlert-body" style={{display:this.state.isHide?"none":"block",}}>
                            <div className="row justify-content-between">
                                <div className="col-lg-10 col-md-9 col-sm-10 col-10 my-auto" style={{fontSize:"0.9em"}}>
                                    {uploader.countFiles}&nbsp;{this.props.label}
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-2 col-2 text-end">
                                    <Progress value={this.state.progress}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

UploadProgress.propTypes = {
    valueIs: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired,
    fileNumber: PropTypes.number.isRequired,
};
UploadProgress.defaultProps = {
    valueIs:90,
    label:"fichier en cours de publication",
    time:1,
    show:true,
    fileNumber:5,


};

export default UploadProgress;
