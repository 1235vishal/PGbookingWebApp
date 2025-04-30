import React from 'react';
import { useLocation } from 'react-router-dom';

const WhatsAppButton = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  // Don't render the button on admin pages
  if (isAdminPage) return null;

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+917827970547', '_blank');
  };

  return (
    <div 
      onClick={handleWhatsAppClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#25D366',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '2px 2px 6px rgba(0,0,0,0.4)',
        zIndex: 1000,
      }}
    >
      <i 
        className="bi bi-whatsapp" 
        style={{
          color: 'white',
          fontSize: '35px'
        }}
      />
    </div>
  );
};

export default WhatsAppButton;