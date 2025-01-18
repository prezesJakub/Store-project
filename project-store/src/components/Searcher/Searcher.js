import React from "react";

const Searcher = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="searcher">
            <input 
                type="text"
                placeholder="Szukaj..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default Searcher;