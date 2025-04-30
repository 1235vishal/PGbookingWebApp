import React, { useEffect, useState } from 'react';
import { API_URL, SERVER_URL } from '../../config';
import './Testimonials.css';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch testimonials from the API
        fetch(`${API_URL}/testimonials`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setTestimonials(data.testimonials);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching testimonials:', err);
                setLoading(false);
            });

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const renderStars = (rating) => {
        return "⭐".repeat(Math.floor(rating));
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    if (loading) {
        return <div className="testimonials-container">
            <h2 className="testimonials-title">What Our Residents Say</h2>
            <div className="testimonial-wrapper">
                <div>Loading testimonials...</div>
            </div>
        </div>;
    }

    if (!testimonials.length) {
        return <div className="testimonials-container">
            <h2 className="testimonials-title">What Our Residents Say</h2>
            <div className="testimonial-wrapper">
                <div>No testimonials available.</div>
            </div>
        </div>;
    }

    return (
        <div className="testimonials-container">
            <h2 className="testimonials-title">What Our Residents Say</h2>
            <div className="testimonial-wrapper">
                <div className="testimonial-card">
                    <div className="testimonial-image">
                        <img 
                            src={`${SERVER_URL}${testimonials[currentIndex]?.image}`} 
                            alt={testimonials[currentIndex]?.name} 
                        />
                    </div>
                    <div className="testimonial-content">
                        <h3>{testimonials[currentIndex]?.name}</h3>
                        <div className="rating">
                            {renderStars(testimonials[currentIndex]?.rating)}
                            <span className="rating-number">
                                ({testimonials[currentIndex]?.rating})
                            </span>
                        </div>
                        <p className="review">{testimonials[currentIndex]?.review}</p>
                    </div>
                </div>
                <div className="dots-container">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;