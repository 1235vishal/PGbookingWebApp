import React, { useState } from 'react';
import './Styles/FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Shivshakti and how it helps in managing PGs and Hostels?",
      answer: "Shivshakti is a handy paying guest (PG) and property management software. It offers real-time data to property owners, including payment details, receipts, visitor information, and occupancy status of the property. It's an invaluable tool for efficient property management."
    },
    {
      question: "How does Shivshakti ensure real-time visibility and transparency?",
      answer: "Shivshakti provides real-time updates on occupancy, payments, and visitor information. The platform ensures transparency by maintaining detailed records accessible to property owners at any time. This allows for quick decision-making and effective management."
    },
    {
      question: "Can Shivshakti be adjusted to meet unique customer needs?",
      answer: "Yes, Shivshakti offers customizable features to accommodate various property management needs. Property owners can adjust settings based on their specific requirements, making it versatile for different types of PGs and hostels."
    },
    {
      question: "How is Shivshakti different from other hostel and PG management systems?",
      answer: "Shivshakti stands out with its user-friendly interface, comprehensive features, and dedicated customer support. Unlike other systems, it integrates payment tracking, visitor management, and occupancy monitoring in one platform, making it a complete solution for PG and hostel management."
    },
    {
      question: "How does Shivshakti simplify the overall experience for hostel and PG management?",
      answer: "Shivshakti streamlines day-to-day operations by automating routine tasks like rent collection, maintenance requests, and occupancy tracking. This reduces administrative burden, minimizes errors, and allows property owners to focus on providing better services to their tenants."
    }
  ];

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            key={index}
          >
            <button 
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
            >
              <span className="question-text">{item.question}</span>
              <span className={`faq-icon ${activeIndex === index ? 'active' : ''}`}>
                <svg 
                  viewBox="0 0 24 24" 
                  width="24" 
                  height="24"
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line 
                    x1="5" 
                    y1="12" 
                    x2="19" 
                    y2="12" 
                    className={activeIndex === index ? 'hidden' : ''} 
                  />
                </svg>
              </span>
            </button>
            <div 
              className={`faq-answer ${activeIndex === index ? 'active' : ''}`}
              role="region"
              aria-hidden={activeIndex !== index}
            >
              <div className="answer-content">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;