import React from 'react';

const Searchbar = props => {
    return (
        <div className="searchbar">
            <form className="form-inline my-2 my-lg-0">
                <input
                    className="form-control mr-sm-2"
                    placeholder="Search"
                    type="search"
                    name="filteredText"
                    value={props.filteredText}
                    onChange={props.handleChange}
                />
                <button className="btn btn-outline-popmint my-2 my-sm-0 btn-search" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default Searchbar;
