import React, {Component} from 'react';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import AddDrawer from "../Users/AddDrawer";
import TablePaginationDemo from "../Pagination";
import OneReport from "./OneReport";

class ReportList extends Component {
    render() {
        return (
            <>

                <div className="row px-0 justify-content-between">

                    <div className="col-lg-5 col-md-6 col-sm-7 col-7 mb-3 mr-2 text-end">

                        <FormControl  fullWidth={true}>

                            <Input


                                placeholder={"Chercher..."}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                    </div>


                    <div className="col-lg-4 col-md-4 col-sm-5 col-5 px-0 align-items-sm-end text-end">

                    </div>


                </div>
                <div className="row justify-content-between" style={{height:"100%"}}>

                    <div className="col-lg-12 mt-3">
                        <OneReport/>
                        <OneReport/>
                        <OneReport/><OneReport/>
                        <OneReport/>
                        <OneReport/>

                    </div>

                    <div className="col-lg-12 text-end" style={{visibility:'visible'}}>
                        <TablePaginationDemo count={50} getUsers={()=>""}
                                             role={"ADMIN"}
                        />
                    </div>

                </div>

            </>
        );
    }
}

export default ReportList;