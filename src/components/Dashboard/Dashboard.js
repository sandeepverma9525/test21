// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Dashboard.css";
// const DashboardStats = () => {
//   const [eventStats, setEventStats] = useState({ pending: 0, approved: 0 });
//   const [sevaStats, setSevaStats] = useState({ pending: 0, approved: 0});
//   const [templeCount, setTempleCount] = useState(0);
//   const [loadingEvents, setLoadingEvents] = useState(true);
//   const [loadingSevas, setLoadingSevas] = useState(true);
//   const [eventBookings, setEventBookings] = useState([]);
//   const [sevaBookings, setSevaBookings] = useState([]);
//   const API_BASE = process.env.REACT_APP_BACKEND_API;
//   const token = localStorage.getItem("userToken");
//   const axiosAuthEvent = axios.create({
//     baseURL: `${API_BASE}api/eventbooking`,
//     headers: { Authorization: token ? `Bearer ${token}` : "" },
//   });
//   const axiosAuthSeva = axios.create({
//     baseURL: `${API_BASE}api/savabooking`,
//     headers: { Authorization: token ? `Bearer ${token}` : "" },
//   });
//   useEffect(() => {
//     fetchEventStats();
//     fetchSevaStats();
//     fetchTempleCount();
//   }, []);
//   const fetchEventStats = async () => {
//     try {
//       setLoadingEvents(true);
//       const res = await axiosAuthEvent.get("/getBookings");
//       if (res.data.success) {
//         const data = res.data.data;
//         setEventBookings(data);
//         const pending = data.filter((b) => b.status?.toLowerCase() === "pending").length;
        
//         const approved = data.filter((b) => b.status?.toLowerCase() === "approved").length;
//         setEventStats({ pending, approved});
//       }
//     } catch (err) {
//       console.error("Error fetching event stats:", err);
//     } finally {
//       setLoadingEvents(false);
//     }
//   };

//   const fetchSevaStats = async () => {
//     try {
//       setLoadingSevas(true);
//       const res = await axiosAuthSeva.get("/getAll");
//       if (res.data.success) {
//         const data = res.data.data;
  
//         // ✅ Only Online payments
//         const onlineBookings = data.filter((b) => b.payment_screenshot);
  
//         setSevaBookings(onlineBookings);
  
//         const pending = onlineBookings.filter(
//           (b) => b.status?.toLowerCase() === "pending"
//         ).length;
  
       
  
//         const approved = onlineBookings.filter(
//           (b) => b.status?.toLowerCase() === "approved"
//         ).length;
  
//         setSevaStats({ pending, approved});
//       }
//     } catch (err) {
//       console.error("Error fetching seva stats:", err);
//     } finally {
//       setLoadingSevas(false);
//     }
//   };
//   const fetchTempleCount = async () => {
//     try {
//       const res = await axiosAuthSeva.get("/getAll");
//       if (res.data.success) {
//         const approvedBookings = res.data.data.filter(
//           (b) =>
//             b.status?.toLowerCase() === "approved" &&
//             (b.booking_type?.toLowerCase() === "upi" ||
//              b.booking_type?.toLowerCase() === "offline")
//         );
//         setTempleCount(approvedBookings.length);
//       }
//     } catch (err) {
//       console.error("Error fetching temple bookings:", err);
//     }
//   };
  
//   // CSV download for Events
//   const downloadEventCSV = () => {
//     if (!eventBookings.length) return alert("No event bookings to export!");
//     const headers = [
//       "ID","Karta Name","Mobile","Seva","Seva Date","Gotra","Nakshatra",
//       "Raashi","District","State","Address","Pincode","Booked Date",
//       "Amount","Payment","Status","Event Name"
//     ];
//     const rows = eventBookings.map((b) => [
//       b._id,
//       b.karta_name,
//       b.phone,
//       b.pooja?.name || "",
//       b.pooja?.date?.split("T")[0] || "",
//       b.gotra,
//       b.nakshatra,
//       b.raashi,
//       b.district,
//       b.state,
//       `"${b.address}"`,
//       b.pincode,
//       b.createdAt?.split("T")[0] || "",
//       b.pooja?.price || 0,
//       b.payment_screenshot ? "Online" : "Cash",
//       b.status.charAt(0).toUpperCase() + b.status.slice(1),
//       b.event_id?.event_name || "",
//     ]);
//     const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(r => r.join(",")).join("\n");
//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "event_bookings.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // CSV download for Sevas
//   const downloadSevaCSV = () => {
//     if (!sevaBookings.length) return alert("No seva bookings to export!");
//     const headers = [
//       "ID","Karta Name","Mobile","Seva","Seva Date","Gotra","Nakshatra",
//       "Raashi","District","State","Address","Pincode","Booked Date",
//       "Amount","Payment","Status"
//     ];
//     const rows = sevaBookings.map((b) => [
//       b._id,
//       b.karta_name,
//       b.phone,
//       b.sava_id?.name || "",
//       b.sava_id?.date?.split("T")[0] || b.from_booking_date?.split("T")[0] || "",
//       b.gotra,
//       b.nakshatra,
//       b.raashi,
//       b.district,
//       b.state,
//       `"${b.address}"`,
//       b.pincode,
//       b.createdAt?.split("T")[0] || "",
//       b.sava_id?.price || 0,
//       b.payment_screenshot ? "Online" : "Cash",
//       b.status.charAt(0).toUpperCase() + b.status.slice(1),
//     ]);
//     const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(r => r.join(",")).join("\n");
//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "seva_bookings.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
//   const downloadTempleCSV = async () => {
//     try {
//       const res = await axiosAuthSeva.get("/getAll");
//       if (!res.data.success) return alert("No temple bookings to export!");
  
//       const approvedBookings = res.data.data.filter(
//         (b) =>
//           b.status?.toLowerCase() === "approved" &&
//           (b.booking_type?.toLowerCase() === "upi" ||
//            b.booking_type?.toLowerCase() === "offline")
//       );
  
//       if (!approvedBookings.length) return alert("No temple bookings to export!");
  
//       const headers = [
//         "ID","Karta Name","Mobile","Seva","Seva Date","Gotra","Nakshatra",
//         "Raashi","District","State","Address","Pincode","Booked Date","Amount","Payment","Status"
//       ];
  
//       const rows = approvedBookings.map((b) => [
//         b._id,
//         b.karta_name,
//         b.phone,
//         b.sava_id?.name || "",
//         b.sava_id?.date?.split("T")[0] || b.from_booking_date?.split("T")[0] || "",
//         b.gotra,
//         b.nakshatra,
//         b.raashi,
//         b.district,
//         b.state,
//         `"${b.address}"`,
//         b.pincode,
//         b.createdAt?.split("T")[0] || "",
//         b.sava_id?.price || 0,
//         b.booking_type ? b.booking_type.charAt(0).toUpperCase() + b.booking_type.slice(1) : "",
//         b.status.charAt(0).toUpperCase() + b.status.slice(1),
//       ]);
  
//       const csvContent =
//         "data:text/csv;charset=utf-8," +
//         [headers, ...rows].map((r) => r.join(",")).join("\n");
  
//       const link = document.createElement("a");
//       link.setAttribute("href", encodeURI(csvContent));
//       link.setAttribute("download", "temple_bookings.csv");
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (err) {
//       console.error("Error downloading temple bookings:", err);
//       alert("Something went wrong while exporting temple bookings!");
//     }
//   };
//   return (
//     <>
//       <div className="stats-grid">
//        <div className="stat-card">
//           <h4>EVENTS</h4>
//           {loadingEvents ? (
//             <p>Loading...</p>
//           ) : (
//             <>
//               <p className="pending">{eventStats.pending} Pending</p>
//               <p className="approved">{eventStats.approved} Approved</p>
             
//             </>
//           )}
//           <Link to="/event-bookings" className="action-btn">Review Event Bookings</Link>
//         </div>

//         <div className="stat-card">
//           <h4>SEVAS</h4>
//           {loadingSevas ? (
//             <p>Loading...</p>
//           ) : (
//             <>
//               <p className="pending">{sevaStats.pending} Pending</p>
//               <p className="approved">{sevaStats.approved} Approved</p>
              
//             </>
//           )}
//           <Link to="/seva-bookings" className="action-btn">Review Seva Bookings</Link>
//         </div>

//         <div className="stat-card">
//           <h4>TEMPLE BOOKINGS</h4>
//           <p className="stat-value approved">{templeCount} Approved</p>
//           <Link to="/temple-bookings" className="action-btn">View Booked Sevas</Link>
//         </div>
//       </div>

//       <div className="export-csv-wrapper">
//         <div className="export-csv-card">
//           <p className="export-csv-text">Export your event bookings data</p>
//           <button className="export-csv-btn" onClick={downloadEventCSV}>📥 Download Event CSV</button>
//         </div>
//         <div className="export-csv-card">
//           <p className="export-csv-text">Export your seva bookings data</p>
//           <button className="export-csv-btn" onClick={downloadSevaCSV}>📥 Download Seva CSV</button>
//         </div>
//         <div className="export-csv-card">
//           <p className="export-csv-text">Export your temple bookings data</p>
//           <button className="export-csv-btn" onClick={downloadTempleCSV}>📥 Download Temple CSV</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardStats;




// !Teja 
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Dashboard.css";

// const DashboardStats = () => {
//   const [combinedStats, setCombinedStats] = useState({
//     pending: 0,
//     approved: 0,
   
//   });
//   const [templeCount, setTempleCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [combinedBookings, setCombinedBookings] = useState([]);

//   const API_BASE = process.env.REACT_APP_BACKEND_API;
//   const token = localStorage.getItem("userToken");

//   const axiosAuthEvent = axios.create({
//     baseURL: `${API_BASE}api/eventbooking`,
//     headers: { Authorization: token ? `Bearer ${token}` : "" },
//   });
//   const axiosAuthSeva = axios.create({
//     baseURL: `${API_BASE}api/savabooking`,
//     headers: { Authorization: token ? `Bearer ${token}` : "" },
//   });

//   useEffect(() => {
//     fetchCombinedStats();
//     fetchTempleCount();
//   }, []);

//   // ✅ Fetch & Combine Event + Seva Bookings
//   const fetchCombinedStats = async () => {
//     try {
//       setLoading(true);

//       // Fetch Events
//       const eventRes = await axiosAuthEvent.get("/getBookings");
//       const eventData = eventRes.data.success ? eventRes.data.data : [];

//       // Fetch Sevas
//       const sevaRes = await axiosAuthSeva.get("/getAll");
//       let sevaData = sevaRes.data.success ? sevaRes.data.data : [];

//       // ✅ Only Online payments for sevas
//       sevaData = sevaData.filter((b) => b.payment_screenshot);

//       // Merge both
//       const allBookings = [...eventData, ...sevaData];
//       setCombinedBookings(allBookings);

//       const pending = allBookings.filter(
//         (b) => b.status?.toLowerCase() === "pending"
//       ).length;
//       const approved = allBookings.filter(
//         (b) => b.status?.toLowerCase() === "approved"
//       ).length;
  

//       setCombinedStats({ pending, approved});
//     } catch (err) {
//       console.error("Error fetching combined stats:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchTempleCount = async () => {
//     try {
//       const res = await axiosAuthSeva.get("/getAll");
//       if (res.data.success) {
//         const approvedBookings = res.data.data.filter(
//           (b) =>
//             b.status?.toLowerCase() === "approved" &&
//             (b.booking_type?.toLowerCase() === "upi" ||
//               b.booking_type?.toLowerCase() === "offline")
//         );
//         setTempleCount(approvedBookings.length);
//       }
//     } catch (err) {
//       console.error("Error fetching temple bookings:", err);
//     }
//   };

//   // ✅ Combined CSV Export (Events + Sevas)
//   const downloadCombinedCSV = () => {
//     if (!combinedBookings.length)
//       return alert("No event/seva bookings to export!");

//     const headers = [
//       "ID",
//       "Karta Name",
//       "Mobile",
//       "Seva/Event",
//       "Date",
//       "Gotra",
//       "Nakshatra",
//       "Raashi",
//       "District",
//       "State",
//       "Address",
//       "Pincode",
//       "Booked Date",
//       "Amount",
//       "Payment",
//       "Status",
      
//     ];

//     const rows = combinedBookings.map((b) => [
//       b._id,
//       b.karta_name,
//       b.phone,
//       b.pooja?.name || b.sava_id?.name || "",
//       b.pooja?.date?.split("T")[0] ||
//         b.sava_id?.date?.split("T")[0] ||
//         b.from_booking_date?.split("T")[0] ||
//         "",
//       b.gotra,
//       b.nakshatra,
//       b.raashi,
//       b.district,
//       b.state,
//       `"${b.address}"`,
//       b.pincode,
//       b.createdAt?.split("T")[0] || "",
//       b.pooja?.price || b.sava_id?.price || 0,
//       b.payment_screenshot ? "Online" : b.booking_type || "Cash",
//       b.status.charAt(0).toUpperCase() + b.status.slice(1),
//       b.event_id ? "Event" : "Seva",
//     ]);

//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((r) => r.join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "seva_bookings.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
// // Temple CSV download
// const downloadTempleCSV = async () => {
//   try {
//     const res = await axiosAuthSeva.get("/getAll");
//     if (!res.data.success) return alert("No temple bookings to export!");

//     const approvedBookings = res.data.data.filter(
//       (b) =>
//         b.status?.toLowerCase() === "approved" &&
//         (b.booking_type?.toLowerCase() === "upi" ||
//           b.booking_type?.toLowerCase() === "offline")
//     );

//     if (!approvedBookings.length)
//       return alert("No temple bookings to export!");

//     const headers = [
//       "ID","Karta Name","Mobile","Seva","Seva Date","Gotra","Nakshatra",
//       "Raashi","District","State","Address","Pincode","Booked Date",
//       "Amount","Payment","Status"
//     ];

//     const rows = approvedBookings.map((b) => [
//       b._id,
//       b.karta_name,
//       b.phone,
//       b.sava_id?.name || "",
//       b.sava_id?.date?.split("T")[0] || b.from_booking_date?.split("T")[0] || "",
//       b.gotra,
//       b.nakshatra,
//       b.raashi,
//       b.district,
//       b.state,
//       `"${b.address}"`,
//       b.pincode,
//       b.createdAt?.split("T")[0] || "",
//       b.sava_id?.price || 0,
//       b.booking_type
//         ? b.booking_type.charAt(0).toUpperCase() + b.booking_type.slice(1)
//         : "",
//       b.status.charAt(0).toUpperCase() + b.status.slice(1),
//     ]);

//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((r) => r.join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "temple(seva)_bookings.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   } catch (err) {
//     console.error("Error downloading temple bookings:", err);
//     alert("Something went wrong while exporting temple bookings!");
//   }
// };

//   return (
//     <>
//       <div className="stats-grid">
//         <div className="stat-card">
//           <h4>SEVAS</h4>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <>
//               <p className="pending">{combinedStats.pending} Pending</p>
//               <p className="approved">{combinedStats.approved} Approved</p>
           
//             </>
//           )}
//           <Link to="/seva-bookings" className="action-btn">
//             Review All Bookings
//           </Link>
//         </div>

//         <div className="stat-card">
//           <h4>TEMPLE BOOKINGS</h4>
//           <p className="stat-value approved">{templeCount} Approved</p>
//           <Link to="/temple-bookings" className="action-btn">
//             View Booked Sevas
//           </Link>
//         </div>
//       </div>

// {/* ! Download button   */}
//       <div className="export-csv-wrapper">
//         <div className="export-csv-card">
//           <p className="export-csv-text">
//             Export all seva bookings data
//           </p>
//           <button className="export-csv-btn" onClick={downloadCombinedCSV}>
//             📥 Download Seva CSV
//           </button>
//         </div>
//         <div className="export-csv-card">
//           <p className="export-csv-text">Export your temple(Seva) bookings data</p>
//           <button className="export-csv-btn" onClick={downloadTempleCSV}>
//             📥 Download Temple(Seva) CSV
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardStats;





// ! me CSV download
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Dashboard.css";

// const DashboardStats = () => {
//   const [stats, setStats] = useState({ pending: 0, approved: 0 });
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const API_BASE = process.env.REACT_APP_BACKEND_API;
//   const token = localStorage.getItem("userToken");

//   const axiosAuth = axios.create({
//     baseURL: `${API_BASE}api/savabooking`,
//     headers: { Authorization: token ? `Bearer ${token}` : "" },
//   });

//   useEffect(() => {
//     fetchSevaStats();
//   }, []);

//   const fetchSevaStats = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosAuth.get("/getAll");
//       if (!res.data.success) return;

//       const sevaData = res.data.data.filter((b) => b.payment_screenshot);
//       setBookings(sevaData);

//       const pending = sevaData.filter(
//         (b) => b.status?.toLowerCase() === "pending"
//       ).length;
//       const approved = sevaData.filter(
//         (b) => b.status?.toLowerCase() === "approved"
//       ).length;

//       setStats({ pending, approved });
//     } catch (err) {
//       console.error("Error fetching seva stats:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadCSV = () => {
//     if (!bookings.length) return alert("No seva bookings to export!");

//     const headers = [
//       "ID",
//       "Karta Name",
//       "Mobile",
//       "Seva",
//       "Date",
//       "Gotra",
//       "Nakshatra",
//       "Raashi",
//       "District",
//       "State",
//       "Address",
//       "Pincode",
//       "Booked Date",
//       "Amount",
//       "Payment",
//       "Status",
//     ];

//     const rows = bookings.map((b) => [
//       b._id,
//       b.karta_name,
//       b.phone,
//       b.sava_id?.name || "",
//       b.sava_id?.date?.split("T")[0] || "",
//       b.gotra,
//       b.nakshatra,
//       b.raashi,
//       b.district,
//       b.state,
//       `"${b.address}"`,
//       b.pincode,
//       b.createdAt?.split("T")[0] || "",
//       b.sava_id?.price || 0,
//       "Online",
//       b.status.charAt(0).toUpperCase() + b.status.slice(1),
//     ]);

//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((r) => r.join(",")).join("\n");

//     const link = document.createElement("a");
//     link.href = encodeURI(csvContent);
//     link.download = "seva_bookings.csv";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <>
//       <div className="stats-grid">
//         <div className="stat-card">
//           <h4>SEVAS</h4>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <>
//               <p className="pending">{stats.pending} Pending</p>
//               <p className="approved">{stats.approved} Approved</p>
//             </>
//           )}
//           <Link to="/seva-bookings" className="action-btn">
//             Review All Bookings
//           </Link>
//         </div>
//       </div>

//       <div className="export-csv-wrapper">
//         <div className="export-csv-card">
//           <p className="export-csv-text">Export all seva bookings data</p>
//           <button className="export-csv-btn" onClick={downloadCSV}>
//             📥 Download Seva CSV
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardStats;




// ! only one card 
// import React from "react";
// import { Link } from "react-router-dom";
// import "./Dashboard.css";

// const DashboardStats = () => {
//   return (
//     <div className="stats-grid" style={{marginTop:"100px", marginLeft:"250px", width:"80%"}}>
//       <div className="stat-card" style={{padding:"40px", }}>
//         <h4 style={{marginBottom:"20px"}}>SEVAS</h4>
//         <Link to="/seva-bookings" className="action-btn">
//           Review All Bookings
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default DashboardStats;





// !Dashboard.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
// import "./Dashboard.css";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [eventRes, sevaRes] = await Promise.all([
//           axios.get("https://testtapi1.ap-1.evennode.com/api/eventbooking/getBookings"),
//           axios.get("https://testtapi1.ap-1.evennode.com/api/savabooking/getAll")
//         ]);

//         const mergedData = [
//           ...eventRes.data.data.map(b => ({ ...b, type: "Event" })),
//           ...sevaRes.data.data.map(b => ({ ...b, type: "Seva" }))
//         ];

//         setBookings(mergedData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const getStatusCounts = (data) => {
//     const counts = { approved: 0, pending: 0, rejected: 0 };
//     data.forEach(b => {
//       counts[b.status] = (counts[b.status] || 0) + 1;
//     });
//     return counts;
//   };

//   const getEarliestLatest = (data) => {
//     if (!data.length) return { earliest: "-", latest: "-" };
//     const dates = data.map(b => new Date(b.createdAt));
//     const earliest = new Date(Math.min(...dates));
//     const latest = new Date(Math.max(...dates));
//     return {
//       earliest: earliest.toISOString().split("T")[0],
//       latest: latest.toISOString().split("T")[0]
//     };
//   };

//   const getMonthlyData = (data) => {
//     const monthly = {};
//     data.forEach(b => {
//       const month = new Date(b.createdAt).toLocaleString("default", { month: "short", year: "numeric" });
//       monthly[month] = (monthly[month] || 0) + 1;
//     });
//     return Object.keys(monthly).map(month => ({ month, count: monthly[month] }));
//   };

//   const getTodayYesterdayCounts = (data) => {
//     const today = new Date();
//     const yesterday = new Date();
//     yesterday.setDate(today.getDate() - 1);

//     let todayCount = 0;
//     let yesterdayCount = 0;

//     data.forEach(b => {
//       const created = new Date(b.createdAt);
//       if (
//         created.getDate() === today.getDate() &&
//         created.getMonth() === today.getMonth() &&
//         created.getFullYear() === today.getFullYear()
//       ) todayCount++;
//       if (
//         created.getDate() === yesterday.getDate() &&
//         created.getMonth() === yesterday.getMonth() &&
//         created.getFullYear() === yesterday.getFullYear()
//       ) yesterdayCount++;
//     });

//     return { todayCount, yesterdayCount };
//   };

//   const statusCounts = getStatusCounts(bookings);
//   const dateStats = getEarliestLatest(bookings);
//   const monthlyData = getMonthlyData(bookings);
//   const { todayCount, yesterdayCount } = getTodayYesterdayCounts(bookings);
//   const COLORS = ["#4caf50", "#ff9800", "#f44336"]; // Approved, Pending, Rejected

//   if (loading) return <p style={{textAlign:"center"}}>Loading...</p>;

//   return (
//     <div className="dashboard-container">
//       <h1>Combined Dashboard</h1>

//       {/* Stats Cards */}
//       <div className="stats-grid">

//         <div className="stat-card">
//        <h4 className="dashboard-heading " style={{marginBottom:"30px"}}>SEVAS</h4>
//          <Link to="/seva-bookings" className="action-btn" >
//            Review All Bookings
//          </Link>
//        </div>



//         <div className="stat-card">
//           <h4>Total Bookings</h4>
//           <p className="stat-value">{bookings.length}</p>
//         </div>
//         <div className="stat-card">
//           <h4>Approved Bookings</h4>
//           <p className="stat-value approved">{statusCounts.approved}</p>
//         </div>
//         <div className="stat-card">
//           <h4>Pending Bookings</h4>
//           <p className="stat-value pending">{statusCounts.pending}</p>
//         </div>
//         <div className="stat-card">
//           <h4>Rejected Bookings</h4>
//           <p className="stat-value rejected">{statusCounts.rejected}</p>
//         </div>
//         <div className="stat-card">
//           <h4>Earliest Booking</h4>
//           <p className="stat-value">{dateStats.earliest}</p>
//         </div>
//         <div className="stat-card">
//           <h4>Latest Booking</h4>
//           <p className="stat-value">{dateStats.latest}</p>
//         </div>
//         <div className="stat-card">
//           <h4>Today Bookings</h4>
//           <p className="stat-value">{todayCount}</p>
//         </div>
//         <div className="stat-card">
//           <h4>Yesterday Bookings</h4>
//           <p className="stat-value">{yesterdayCount}</p>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="charts-container">
//         <div>
//           <h3>Booking Status</h3>
//           <PieChart width={300} height={300}>
//             <Pie
//               dataKey="value"
//               data={[
//                 { name: "Approved", value: statusCounts.approved },
//                 { name: "Pending", value: statusCounts.pending },
//                 { name: "Rejected", value: statusCounts.rejected },
//               ]}
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               label
//             >
//               {COLORS.map((color, index) => <Cell key={index} fill={color} />)}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </div>

//         <div>
//           <h3>Bookings per Month</h3>
//           <BarChart width={500} height={300} data={monthlyData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="count" fill="#2196f3" />
//           </BarChart>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




//! ProDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line
} from "recharts";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const ProDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, savaRes] = await Promise.all([
          axios.get("https://testtapi1.ap-1.evennode.com/api/eventbooking/getBookings"),
          axios.get("https://testtapi1.ap-1.evennode.com/api/savabooking/getAll")
        ]);

        const mergedData = [
          ...eventRes.data.data.map(b => ({ ...b, type: "Event" })),
          ...savaRes.data.data.map(b => ({ ...b, type: "Sava" }))
        ];

        setBookings(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Helper Functions ---
  const getStatusCounts = (data) => {
    const counts = { approved: 0, pending: 0, rejected: 0 };
    data.forEach(b => counts[b.status] = (counts[b.status] || 0) + 1);
    return counts;
  };

  const getEarliestLatest = (data) => {
    if (!data.length) return { earliest: "-", latest: "-" };
    const dates = data.map(b => new Date(b.createdAt));
    const earliest = new Date(Math.min(...dates));
    const latest = new Date(Math.max(...dates));
    return { earliest: earliest.toISOString().split("T")[0], latest: latest.toISOString().split("T")[0] };
  };

  const getTodayYesterdayCounts = (data) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let todayCount = 0, yesterdayCount = 0;
    data.forEach(b => {
      const created = new Date(b.createdAt);
      if (created.getDate() === today.getDate() &&
          created.getMonth() === today.getMonth() &&
          created.getFullYear() === today.getFullYear()) todayCount++;
      if (created.getDate() === yesterday.getDate() &&
          created.getMonth() === yesterday.getMonth() &&
          created.getFullYear() === yesterday.getFullYear()) yesterdayCount++;
    });
    return { todayCount, yesterdayCount };
  };

  const getTypeCounts = (data) => {
    const counts = { Event: 0, Sava: 0 };
    data.forEach(b => counts[b.type] = (counts[b.type] || 0) + 1);
    return counts;
  };

  const getOnlineOfflineCounts = (data) => {
    const counts = { online: 0, offline: 0, other: 0 };
    data.forEach(b => {
      const type = b.booking_type?.toLowerCase();
      if (type === "online") counts.online++;
      else if (type === "offline") counts.offline++;
      else counts.other++;
    });
    return counts;
  };

  const getRevenueStats = (data) => {
    let total = 0, count = 0;
    data.forEach(b => {
      const price = b.pooja?.price || b.sava_id?.price || 0;
      total += price;
      if(price) count++;
    });
    const avg = count ? (total / count).toFixed(2) : 0;
    return { total, avg };
  };

  const getMonthlyData = (data) => {
    const monthly = {};
    data.forEach(b => {
      const month = new Date(b.createdAt).toLocaleString("default", { month: "short", year: "numeric" });
      monthly[month] = (monthly[month] || 0) + 1;
    });
    return Object.keys(monthly).map(month => ({ month, count: monthly[month] }));
  };


  const getRevenueByPaymentMode = (data) => {
  const payments = { upi: 0, online: 0, offline: 0, total: 0 };
  data.forEach(b => {
    const amount = b.pooja?.price || b.sava_id?.price || 0;
    const mode = b.booking_type?.toLowerCase(); // <-- changed here
    if (mode === "upi") payments.upi += amount;
    else if (mode === "online") payments.online += amount;
    else if (mode === "offline") payments.offline += amount;
    payments.total += amount;
  });
  return payments;
};


  const getRevenueMonthly = (data) => {
    const monthly = {};
    data.forEach(b => {
      const month = new Date(b.createdAt).toLocaleString("default", { month: "short", year: "numeric" });
      const price = b.pooja?.price || b.sava_id?.price || 0;
      monthly[month] = (monthly[month] || 0) + price;
    });
    return Object.keys(monthly).map(month => ({ month, revenue: monthly[month] }));
  };

  const getPopularPoojaSava = (data) => {
    const counts = {};
    data.forEach(b => {
      const name = b.pooja?.name || b.sava_id?.name || "Unknown";
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.keys(counts).map(name => ({ name, value: counts[name] }));
  };


  if (loading) return <p>Loading...</p>;


  // --- Calculated Stats ---
  const statusCounts = getStatusCounts(bookings);
  const dateStats = getEarliestLatest(bookings);
  const { todayCount, yesterdayCount } = getTodayYesterdayCounts(bookings);
  const revenueByMode = getRevenueByPaymentMode(bookings);
  const typeCounts = getTypeCounts(bookings);
  const onlineOfflineCounts = getOnlineOfflineCounts(bookings);
  const revenueStats = getRevenueStats(bookings);
  const monthlyData = getMonthlyData(bookings);
  const revenueMonthly = getRevenueMonthly(bookings);
  const popularPoojaSava = getPopularPoojaSava(bookings);

  console.log("upi", revenueByMode.upi)
  console.log("cash", revenueByMode.offline)
  console.log("online", revenueByMode.online);

  const COLORS = ["#4caf50", "#ff9800", "#f44336", "#2196f3", "#9c27b0", "#00bcd4"];

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      {/* Cards */}
      <div className="stats-grid">
        <div className="stat-card">
       <h4 className="dashboard-heading " style={{marginBottom:"30px"}}>SEVAS</h4>
         <Link to="/seva-bookings" className="action-btn" >
           Review All Bookings
         </Link>
       </div>

        <div className="stat-card"><h4>Approved</h4><p className="stat-value">{statusCounts.approved}</p></div>
        <div className="stat-card"><h4>Total Bookings</h4><p className="stat-value">{bookings.length}</p></div>
        <div className="stat-card"><h4>Pending</h4><p className="stat-value">{statusCounts.pending}</p></div>
        <div className="stat-card"><h4>Rejected</h4><p className="stat-value">{statusCounts.rejected}</p></div>
        <div className="stat-card"><h4>Today</h4><p className="stat-value">{todayCount}</p></div>
        <div className="stat-card"><h4>Yesterday</h4><p className="stat-value">{yesterdayCount}</p></div>
        <div className="stat-card"><h4>Earliest Booking</h4><p className="stat-value">{dateStats.earliest}</p></div>
        <div className="stat-card"><h4>Latest Booking</h4><p className="stat-value">{dateStats.latest}</p></div>
        <div className="stat-card"><h4>Event Bookings</h4><p className="stat-value">{typeCounts.Event}</p></div>
        <div className="stat-card"><h4>Sava Bookings</h4><p className="stat-value">{typeCounts.Sava}</p></div>
        <div className="stat-card"><h4>Online</h4><p className="stat-value">{onlineOfflineCounts.online}</p ></div>
        <div className="stat-card"><h4>Offline</h4><p className="stat-value">{onlineOfflineCounts.offline}</p></div>
        <div className="stat-card"><h4>Total Revenue</h4><p className="stat-value">₹{revenueStats.total}</p></div>
        <div className="stat-card"><h4>Avg Price</h4><p className="stat-value">₹{revenueStats.avg}</p></div>




        {/* Payment Revenue Cards */}
        {/* <div className="stat-card"><h4>UPI Revenue</h4><p className="stat-value">₹{revenueByMode.upi}</p></div>
        <div className="stat-card"><h4>Online Revenue</h4><p className="stat-value">₹{revenueByMode.online}</p></div>
        <div className="stat-card"><h4>Offline Revenue</h4><p className="stat-value">₹{revenueByMode.offline}</p></div>
        <div className="stat-card total"><h4>Total Revenue</h4><p className="stat-value">₹{revenueByMode.total}</p></div> */}


      </div>

      {/* Charts */}
      <div className="charts-container">
        <div>
          <h3>Booking Status</h3>
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              data={[
                { name: "Approved", value: statusCounts.approved },
                { name: "Pending", value: statusCounts.pending },
                { name: "Rejected", value: statusCounts.rejected }
              ]}
              cx="50%" cy="50%" outerRadius={80} label
            >
              {COLORS.map((c, i) => <Cell key={i} fill={c} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div>
          <h3>Event vs Sava</h3>
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              data={[
                { name: "Event", value: typeCounts.Event },
                { name: "Sava", value: typeCounts.Sava }
              ]}
              cx="50%" cy="50%" outerRadius={80} label
            >
              {COLORS.map((c, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div>
          <h3>Online vs Offline</h3>
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              data={[
                { name: "Online", value: onlineOfflineCounts.online },
                { name: "Offline", value: onlineOfflineCounts.offline }
              ]}
              cx="50%" cy="50%" outerRadius={80} label
            >
              {COLORS.map((c, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div>
          <h3>Bookings per Month</h3>
          <BarChart width={500} height={300} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2196f3" />
          </BarChart>
        </div>

        <div>
          <h3>Revenue per Month</h3>
          <LineChart width={500} height={300} data={revenueMonthly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#ff5722" />
          </LineChart>
        </div>

        <div>
          <h3>Most Popular Pooja/Sava</h3>
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              data={popularPoojaSava}
              cx="50%" cy="50%" outerRadius={80} label
            >
              {COLORS.map((c, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default ProDashboard;





