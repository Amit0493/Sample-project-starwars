import React from 'react';
import TextField from 'material-ui/TextField';

const SearchBar = (props)=>{
    return (
        <div className="col-xs-12">
            <TextField
            name="searchbar"
            type="text"
            hintText="Search by name"
            onChange={(e)=>(props.searchChanged(e))}
            fullWidth={true}
            />
        </div>
    )

}

export default SearchBar;