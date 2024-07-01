import React, {Component} from 'react';
import {Tooltip} from "@material-ui/core";
import MyButton from "./MyButton";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import ReportOutlinedIcon from "@material-ui/icons/ReportOutlined";

class OptionsList extends Component {
    state = {
        display:false,
        buttonsList: this.props.buttonsList,
        buttonsListContent:[],

    }

    setDisplay = () =>{
        this.setState({
            display: !this.state.display
        })
    }

    setButtons = () =>{
        let tempList = "";
        this.state.buttonsList.forEach((button)=>{
            switch (button) {
                case "DELETE":
                    tempList = this.state.buttonsListContent
                    tempList.push(
                        <MyButton
                            label={"Supprimer"}
                            disabled={false}
                            background={"white"}
                            color={"gray"}
                            radius={"4px"}
                            border={"0"}
                            hoverback={"rgba(0,0,0,0.02)"}
                            hovercolor={"gray"}
                            upperCase={false}
                            type={'submit'}
                            fontSize={12}
                            width={"100%"}
                            marginBottom={"4px"}
                            icon={<DeleteOutlineRoundedIcon/>}
                            onClick={this.props.onDelete}
                            shadow={"none"}
                            justifyContent={"flex-start"}
                        />
                    )
                    this.setState({
                        buttonsListContent :  tempList
                    })
                    break;

                    case "REPORT":
                    tempList = this.state.buttonsListContent
                    tempList.push(
                        <MyButton
                            label={"Signaler"}
                            disabled={false}
                            background={"white"}
                            color={"gray"}
                            radius={"4px"}
                            border={"0"}
                            hoverback={"rgba(0,0,0,0.02)"}
                            hovercolor={"gray"}
                            upperCase={false}
                            type={'submit'}
                            fontSize={12}
                            width={"100%"}
                            marginBottom={"4px"}
                            icon={<ReportOutlinedIcon/>}
                            onClick={this.props.onReport}
                            shadow={"none"}
                            justifyContent={"flex-start"}
                        />
                    )
                    this.setState({
                        buttonsListContent :  tempList
                    })
                    break;

            }
        })
    }

    componentDidMount() {
        this.setButtons();
    }

    render() {
        return (
            <>


                <Tooltip disableFocusListener title="" onClick={this.setDisplay}>
                    <i className= {this.state.display? "bx bx-x" : "bx bx-scaled bx-dots-horizontal-rounded" }   style={{
                        fontSize:25,
                        color:"gray",
                        cursor:"pointer"
                    }}> </i>
                </Tooltip>

                <div className="px-2 py-1" style={{
                    opacity: this.state.display? 1 : 0,
                    visibility: this.state.display? "visible" : "hidden",
                    position:"absolute",
                    height:"auto",
                    minWidth:150,
                    top:40,
                    left:-90,
                    zIndex:9,
                    backgroundColor:"white",
                    borderRadius:9,
                    boxShadow : "0px 0px 7px -5px",
                    pointerEvents:this.state.display? "auto" : "none",
                    transition: "opacity .5s"

                }}>
                    {this.state.buttonsListContent}

                </div>

            </>
        );
    }
}

OptionsList.defaultProps={
    onDelete: ()=>"",
    onReport: ()=>"",
    buttonsList: [],
}

export default OptionsList;