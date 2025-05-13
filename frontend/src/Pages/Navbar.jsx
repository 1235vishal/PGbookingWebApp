

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { API_URL } from '../config';

// import './Navbar.css';

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
  
//   // Function to close sidebar
//   const closeSidebar = () => {
//     const shivsidebar = document.getElementById("shivsidebar");
//     const shivoverlay = document.getElementById("shivoverlay");
//     const shivtoggleBtn = document.getElementById("shivtoggle-btn");
    
//     if (shivsidebar && shivoverlay && shivtoggleBtn) {
//       shivsidebar.classList.remove("active");
//       shivoverlay.classList.remove("active");
//       shivtoggleBtn.innerHTML = "☰";
//       document.body.style.overflow = "auto";
//     }
//   };

//   // Load user on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         // Try to parse the user data
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser);
//       } catch (error) {
//         console.error("Error parsing user data from localStorage:", error);
//         setUser(null); // Clear user data if parsing fails
//       }
//     }

//     const shivtoggleBtn = document.getElementById("shivtoggle-btn");
//     const shivsidebar = document.getElementById("shivsidebar");
//     const shivoverlay = document.getElementById("shivoverlay");

//     // Toggle sidebar
//     const toggleSidebar = () => {
//       if (shivsidebar.classList.contains("active")) {
//         shivsidebar.classList.remove("active");
//         shivoverlay.classList.remove("active");
//         shivtoggleBtn.innerHTML = "☰";
//         document.body.style.overflow = "auto";
//       } else {
//         shivsidebar.classList.add("active");
//         shivoverlay.classList.add("active");
//         shivtoggleBtn.innerHTML = "✕";
//         document.body.style.overflow = "hidden";
//       }
//     };

//     shivtoggleBtn.addEventListener("click", toggleSidebar);

//     shivoverlay.addEventListener("click", () => {
//       shivsidebar.classList.remove("active");
//       shivoverlay.classList.remove("active");
//       shivtoggleBtn.innerHTML = "☰";
//       document.body.style.overflow = "auto";
//     });

//     window.addEventListener("resize", () => {
//       if (window.innerWidth > 768) {
//         shivsidebar.classList.remove("active");
//         shivoverlay.classList.remove("active");
//         document.body.style.overflow = "auto";
//         shivtoggleBtn.innerHTML = "☰";
//       }
//     });

//     // Cleanup event listeners on component unmount
//     return () => {
//       shivtoggleBtn.removeEventListener("click", toggleSidebar);
//     };
//   }, []);

//   // Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/user/login");
//     window.location.reload(); // Optional: forces navbar refresh
//   };

//   return (
//     <>
//       {/* Top Header with Marquee */}
//       <div className="shivtop-header">
//         <div className="shivmarquee-container">
//           <div className="shivmarquee">
//             Welcome to Your SHIVSHAKTI PG - Best PG Accommodation in Town - Affordable
//             Rates - Clean Rooms - 24/7 Security - WiFi - Contact: +91 7827 970547
//           </div>
//         </div>
//       </div>

//       {/* Navigation Bar */}
//       <nav className="shivnavbar">
//         <div className="shivlogo">
//           <Link to="/">
//             <img src="/assets/0-Photoroom.png" alt="Logo" />
//           </Link>
//         </div>
//         <div className="shivnav-container">
//           <div className="shivnav-links">
//             <Link to="/">Home</Link>
//             <Link to="/about">About</Link>
//             <Link to="/pg-listings">Find My PG</Link>
//             <Link to="/contact">Contact</Link>
//           </div>
//         </div>
//         <div className="shivcta-buttons">
//           {user ? (
//             <>
//               {/* User Profile Image with Hoverable Dropdown */}
//               <div className="nav-item dropdown" style={{ position: "relative" }}>
//                 <img
//                   src={user.profileImage ? `${API_URL}/${user.profileImage}` : 'default-image-url.jpg'}
//                   alt="User Profile"
//                   className="nav-link dropdown-toggle"
//                   data-bs-toggle="dropdown"
//                   style={{
//                     width: "40px",
//                     height: "40px",
//                     borderRadius: "50%",
//                     objectFit: "cover",
//                     cursor: "pointer"
//                   }}
//                 />
//                 {/* Dropdown menu */}
//                 <ul className="dropdown-menu" style={{ position: "absolute", top: "100%", left: "-158px", minWidth: "200px" }}>
//                   <li>
//                     <span className="dropdown-item">Hello, {user.name}</span> {/* Display User Name */}
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/user/profile">User Profile</Link>
//                                   </li>
//                                    <li>
//                     <Link className="dropdown-item" to="/user/Tenant">Tenant</Link>
//                                   </li>
//                                    <li>
//                     <Link className="dropdown-item" to="/user/Rents">Rents</Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/user/booking-history">Booking History</Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/user/rent-history">ChatBox</Link>
//                   </li>
//                   <li>
//                     <button className="dropdown-item" onClick={handleLogout}>Logout</button>
//                   </li>
//                 </ul>
//               </div>
//             </>
//           ) : (
//             <>
//               <Link className="shivbtn shivbtn-outline" to="/user/login">Login</Link>
//               <Link className="shivbtn shivbtn-outline" to="/user/register">Register</Link>
//             </>
//           )}
//         </div>
//         <button className="shivtoggle-btn" id="shivtoggle-btn">☰</button>
//       </nav>

//       {/* Sidebar */}
//       <div className="shivsidebar" id="shivsidebar">
//         <div className="shivsidebar-links">
//           <Link to="/" onClick={() => closeSidebar()}>Home</Link>
//           <Link to="/about" onClick={() => closeSidebar()}>About</Link>
//           <Link to="/pg-listings" onClick={() => closeSidebar()}>Find My PG</Link>
//           <Link to="/contact" onClick={() => closeSidebar()}>Contact</Link>
//         </div>
//         {user && (
//           <div className="shivsidebar-user">
//             {/* User profile card with improved design */}
//             <div className="shivsidebar-user-card">
//               <div className="shivsidebar-user-header">
//                 <img
//                   src={user.profileImage ? `${API_URL}/${user.profileImage}` : 'default-image-url.jpg'}
//                   alt="User Profile"
//                   className="shivsidebar-user-img"
//                 />
//                 <div className="shivsidebar-user-info">
//                   <h3 className="shivsidebar-user-name">{user.name}</h3>
//                   <span className="shivsidebar-user-role">Resident</span>
//                 </div>
//               </div>
//               <div className="shivsidebar-user-links">
//                 <Link to="/user/profile" className="shivsidebar-user-link" onClick={() => closeSidebar()}>
//                   <i className="fas fa-user-circle"></i> Profile
//                 </Link>
//                 <Link to="/user/Tenant" className="shivsidebar-user-link" onClick={() => closeSidebar()}>
//                   <i className="fas fa-home"></i> Tenant
//                 </Link>
//                 <Link to="/user/Rents" className="shivsidebar-user-link" onClick={() => closeSidebar()}>
//                   <i className="fas fa-money-bill"></i> Rents
//                 </Link>
//                 <Link to="/user/booking-history" className="shivsidebar-user-link" onClick={() => closeSidebar()}>
//                   <i className="fas fa-history"></i> Booking History
//                 </Link>
//                 <Link to="/user/rent-history" className="shivsidebar-user-link" onClick={() => closeSidebar()}>
//                   <i className="fas fa-comments"></i> ChatBox
//                 </Link>
//                 <button className="shivsidebar-logout-btn" onClick={() => {handleLogout(); closeSidebar();}}>
//                   <i className="fas fa-sign-out-alt"></i> Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         {!user && (
//           <div className="shivsidebar-buttons">
//             <Link className="shivbtn shivbtn-outline" to="/user/login" onClick={() => closeSidebar()}>Login</Link>
//             <Link className="shivbtn shivbtn-outline" to="/user/register" onClick={() => closeSidebar()}>Register</Link>
//           </div>
//         )}
//       </div>

//       {/* Overlay */}
//       <div className="shivoverlay" id="shivoverlay"></div>
//     </>
//   );
// };

// export default Navbar;
// src/components/Navbar.js
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from '../config';
import { useUser } from '../Pages/context/UserContext';
import './Navbar.css';

const Navbar = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  
  const closeSidebar = () => {
    const shivsidebar = document.getElementById("shivsidebar");
    const shivoverlay = document.getElementById("shivoverlay");
    const shivtoggleBtn = document.getElementById("shivtoggle-btn");
    
    if (shivsidebar && shivoverlay && shivtoggleBtn) {
      shivsidebar.classList.remove("active");
      shivoverlay.classList.remove("active");
      shivtoggleBtn.innerHTML = "☰";
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    const shivtoggleBtn = document.getElementById("shivtoggle-btn");
    const shivsidebar = document.getElementById("shivsidebar");
    const shivoverlay = document.getElementById("shivoverlay");

    const toggleSidebar = () => {
      if (shivsidebar.classList.contains("active")) {
        shivsidebar.classList.remove("active");
        shivoverlay.classList.remove("active");
        shivtoggleBtn.innerHTML = "✕";
        document.body.style.overflow = "auto";
      } else {
        shivsidebar.classList.add("active");
        shivoverlay.classList.add("active");
        shivtoggleBtn.innerHTML = "☰";
        document.body.style.overflow = "hidden";
      }
    };

    shivtoggleBtn.addEventListener("click", toggleSidebar);
    shivoverlay.addEventListener("click", closeSidebar);

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeSidebar();
      }
    });

    return () => {
      shivtoggleBtn.removeEventListener("click", toggleSidebar);
      shivoverlay.removeEventListener("click", closeSidebar);
    };
  }, []);

  const handleLogout = () => {
    updateUser(null);
    navigate("/user/login");
  };

  return (
    <>
      {/* Top Header with Marquee */}
      <div className="shivtop-header">
        <div className="shivmarquee-container">
          <div className="shivmarquee">
            Welcome to Your SHIVSHAKTI PG - Best PG Accommodation in Town - Affordable
            Rates - Clean Rooms - 24/7 Security - WiFi - Contact: +91 7827 970547
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="shivnavbar">
        <div className="shivlogo">
          <Link to="/">
            <img src="/assets/0-Photoroom.png" alt="Logo" />
          </Link>
        </div>
        <div className="shivnav-container">
          <div className="shivnav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/pg-listings">Find My PG</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div className="shivcta-buttons">
          {user ? (
            <>
              <div className="nav-item dropdown" style={{ position: "relative" }}>
                <img
                  src={user.profileImage ? `${API_URL}/${user.profileImage}` : 'default-image-url.jpg'}
                  alt="User Profile"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    cursor: "pointer"
                  }}
                />
                <ul className="dropdown-menu" style={{ position: "absolute", top: "100%", left: "-158px", minWidth: "200px" }}>
                  <li><span className="dropdown-item">Hello, {user.name}</span></li>
                  <li><Link className="dropdown-item" to="/user/profile">User Profile</Link></li>
                  <li><Link className="dropdown-item" to="/user/Tenant">Tenant</Link></li>
                  <li><Link className="dropdown-item" to="/user/Rents">Rents</Link></li>
                  <li><Link className="dropdown-item" to="/user/booking-history">Booking History</Link></li>
                  <li><Link className="dropdown-item" to="/user/rent-history">ChatBox</Link></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link className="shivbtn shivbtn-outline" to="/user/login">Login</Link>
              <Link className="shivbtn shivbtn-outline" to="/user/register">Register</Link>
            </>
          )}
        </div>
        <button className="shivtoggle-btn" id="shivtoggle-btn">☰</button>
      </nav>

      {/* Sidebar */}
      <div className="shivsidebar" id="shivsidebar">
        <div className="shivsidebar-links">
          <Link to="/" onClick={closeSidebar}>Home</Link>
          <Link to="/about" onClick={closeSidebar}>About</Link>
          <Link to="/pg-listings" onClick={closeSidebar}>Find My PG</Link>
          <Link to="/contact" onClick={closeSidebar}>Contact</Link>
        </div>
        {user ? (
          <div className="shivsidebar-user">
            <div className="shivsidebar-user-card">
              <div className="shivsidebar-user-header">
                <img
                  src={user.profileImage ? `${API_URL}/${user.profileImage}` : 'default-image-url.jpg'}
                  alt="User Profile"
                  className="shivsidebar-user-img"
                />
                <div className="shivsidebar-user-info">
                  <h3 className="shivsidebar-user-name">{user.name}</h3>
                  <span className="shivsidebar-user-role">Resident</span>
                </div>
              </div>
              <div className="shivsidebar-user-links">
                <Link to="/user/profile" className="shivsidebar-user-link" onClick={closeSidebar}>
                  <i className="fas fa-user-circle"></i> Profile
                </Link>
                <Link to="/user/Tenant" className="shivsidebar-user-link" onClick={closeSidebar}>
                  <i className="fas fa-home"></i> Tenant
                </Link>
                <Link to="/user/Rents" className="shivsidebar-user-link" onClick={closeSidebar}>
                  <i className="fas fa-money-bill"></i> Rents
                </Link>
                <Link to="/user/booking-history" className="shivsidebar-user-link" onClick={closeSidebar}>
                  <i className="fas fa-history"></i> Booking History
                </Link>
                <Link to="/user/rent-history" className="shivsidebar-user-link" onClick={closeSidebar}>
                  <i className="fas fa-comments"></i> ChatBox
                </Link>
                <button className="shivsidebar-logout-btn" onClick={() => { handleLogout(); closeSidebar(); }}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="shivsidebar-buttons">
            <Link className="shivbtn shivbtn-outline" to="/user/login" onClick={closeSidebar}>Login</Link>
            <Link className="shivbtn shivbtn-outline" to="/user/register" onClick={closeSidebar}>Register</Link>
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="shivoverlay" id="shivoverlay"></div>
    </>
  );
};

export default Navbar;