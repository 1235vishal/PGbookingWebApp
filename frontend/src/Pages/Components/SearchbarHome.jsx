import React, { useState } from 'react';

const Searchbar = ({ pgData, onSearchResult }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle search input change
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Function to filter PGs based on the search term
    const filterPGs = () => {
        if (!searchTerm) {
            return pgData; // Return all PGs if no search term
        }
        return pgData.filter((pg) => {
            return (
                pg.pg_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pg.pg_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pg.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pg.rent_start_from.toString().includes(searchTerm)
            );
        });
    };

    // Pass filtered PGs to parent component
    const filteredPGs = filterPGs();

    // Notify the parent with filtered results
    React.useEffect(() => {
        onSearchResult(filteredPGs);
    }, [searchTerm, filteredPGs, onSearchResult]);

    <style>
        {
            `
            .search-bar {
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    padding: 5px;
}

.search-bar input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
}

            `
    }
</style>

    return (
        <div className="search-bar">
            <input
                type="text"
                className="form-control"
                placeholder="Search PGs (Name, Type, Zone, Rent)"
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
    );
};

export default Searchbar;
