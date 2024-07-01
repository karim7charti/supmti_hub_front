import React, {Component} from 'react';
import ErrorDiv from "../../CustomCompenents/ErrorDiv";
import MyButton from "../../CustomCompenents/MyButton";
import nodata from "../../../imgs/noData.png";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

class ProfileSaved extends Component {

    constructor(props) {
        super(props);
        this.state={
            isLoading:false,
            disable:false,
            displayIconLoading:'none',

        }
    }

    render() {
        let posts="",showMore="";
        posts=<ErrorDiv
                img={nodata}
                imgW={280}
                imgH={230}
                marginImg={30}
                error="Données introuvables"
                describtion="Vous avez aucun publication enregistré pour le moment, essayez d'en ajouter un"
                button={false}
               />;

        showMore=<MyButton
            label={"Charger plus d'activities "}
            icon={<ArrowDropDownIcon/>}
            disabled={this.state.disable}
            background={"white"}
            color={"gray"}
            radius={"4px"}
            border={"0"}
            hoverback={"white"}
            hovercolor={"black"}
            shadow={"none"}
            onClick={this.getMoreResult}
            iconDisplay={this.state.displayIconLoading}
            upperCase={false}

        />
        return (
            <>
                <div className="row mx-0 justify-content-between">
                    <div className="col-lg-12 mx-0">
                        <div className="row">
                            {posts}
                        </div>
                    </div>
                    <div className="col-lg-12 mx-0 p-0">
                            {showMore}
                    </div>
                </div>
            </>
        );
    }
}

ProfileSaved.propTypes = {};

export default ProfileSaved;