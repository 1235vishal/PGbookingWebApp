import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import Compare from './Components/Compare';
import Footer from './Components/Footer';
import HeroSection from './Components/Hero';
import LuxuryScroll from './Components/LuxuryScroll';
import Options from './Components/Options';
import PgMap from './Components/PgMap';
import PgRooms from './Components/PgRooms';
import Testimonials from './Components/Testimonials';
import Whatdo from './Components/Whatdo';

const Home = () => {
    const [pgData, setPgData] = useState([]); // All PG data
    const [filteredPGs, setFilteredPGs] = useState([]); // Filtered PG data
    const [loading, setLoading] = useState(true);

    // Fetch PG data from backend
    useEffect(() => {
        axios.get(`${API_URL}/pg/get-all-pgs`)
            .then(response => {
                console.log('PG Data from backend:', response.data);

                if (Array.isArray(response.data)) {
                    setPgData(response.data);
                    setFilteredPGs(response.data); // Initially, show all PGs
                } else {
                    console.error('Expected array but got:', response.data);
                    setPgData([]);
                    setFilteredPGs([]);
                }

                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching PG data:', error);
                setPgData([]);
                setFilteredPGs([]);
                setLoading(false);
            });
    }, []);

    // Handle search result from Searchbar
    const handleSearchResult = (filteredData) => {
        setFilteredPGs(filteredData); // Update filtered PGs
    };

    return (
        <div>
            <HeroSection />
            <LuxuryScroll />
            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>Loading map...</div>
            ) : (
                <PgMap pgData={pgData} />
            )}
            <PgRooms />
            <Options />
            <Compare />
            <Whatdo />
            <Testimonials />
            <Footer />
        </div>
    );
};

export default Home;
