import React, {Component} from 'react';
import ReactLoading from 'react-loading';

class LoadingGeneral extends Component {
    render() {
        return (
            <>
                <div style={{
                    backgroundColor:"white",
                    height:"100%",
                    white:"100%",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"
                }}>

                    <ReactLoading type={this.props.type} color={this.props.color} height={this.props.height} width={this.props.width} />
                </div>

            </>
        );
    }
}
LoadingGeneral.defaultProps = {
    type:"spinningBubbles",
    color:"#10706E",
    height:35,
    width:35,
}

export default LoadingGeneral;
