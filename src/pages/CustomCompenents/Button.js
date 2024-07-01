import React,{Component} from "react";


import  '../../css/AdminStyle.css'




class ButtonDev extends Component{
    state={
        width:this.props.width,
        backgroundColor:this.props.backgroundColor,
        color:this.props.color,
        padding:this.props.padding,
        border:this.props.border,
        borderRadius:this.props.borderRadius,
        text:this.props.text,
        icon:this.props.icon,
        onClick:this.props.onClick,

    }
    Hover=(e)=>{


    }

    noHover=(e)=>{
             this.setState({
            backgroundColor:this.props.backgroundColor,
            color:this.props.color
        })
    }


    render() {
        return(
            <>
                <span className="text-center my-auto mx-auto mx-0 BTN" onClick={this.state.onClick} onMouseLeave={this.noHover}  onMouseEnter={this.Hover} style={{
                    alignItems:"center",
                    justifyContent:'space-between',
                    width:this.state.width,
                    backgroundColor:this.state.backgroundColor,
                    color:this.state.color,
                    padding:this.state.padding,
                    borderRadius:this.state.borderRadius,
                    border:this.state.border,
                    transition:"1s ease",

                    cursor:"pointer"

                }}>
                    {this.state.icon} {this.state.text}

                </span>

            </>
        );
    }

}

export default ButtonDev;
