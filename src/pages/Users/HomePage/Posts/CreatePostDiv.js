import React, {Component} from 'react';

import '../../../../css/HomeStyle.css'
import add from '../../../../imgs/add.png';


class CreatePostDiv extends Component {

    render() {
        return (
            <>
                <div className="col-lg-7 col-md-10 col-sm-12 col-12 mx-auto px-3 py-2" id="create_post_div">
                    <div className="row px-1 py-2 create_post_row" onClick={this.props.open}  >
                        <div className="col-lg-1 col-md-1 col-sm-2 col-2 my-auto text-lg-center text-md-end text-sm-center text-center p-0">
                            <span id="create_icon">
                              <img src={add} alt="Créer un poste" className="m-0 p-0" style={{
                                  height:25,
                                  width:25
                              }}/>
                            </span>

                        </div>
                        <div className="col-lg-11 col-md-11 col-sm-10 col-10">
                            <div className="row">
                                <div className="col-lg-12 title">
                                    Créer une publication
                                </div>
                                <div className="col-lg-12 note">
                                    Partager un information, cours ou fait un sondage.
                                </div>
                            </div>

                        </div>
                    </div>


                </div>


            </>
        );
    }
}

export default CreatePostDiv;
