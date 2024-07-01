import React from "react";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import './../../css/CustomCompenentsStyle.css'


// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #16a8a5;
`;

class LoadingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    render() {
        return (
            <div className="sweet-loading" id="spinning_page">
                <HashLoader css={override} size={50} color={"#16a8a5"} loading={this.state.loading} speedMultiplier={2.5} />
            </div>
        );
    }
}

export default LoadingPage;
