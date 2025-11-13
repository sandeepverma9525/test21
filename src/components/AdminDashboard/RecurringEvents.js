// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./RecurringEvents.css";

// const RecurringEvents = () => {
//   const [eventName, setEventName] = useState("");
//   const [eventDate, setEventDate] = useState("");
//   const [previewImage, setPreviewImage] = useState(null);
//   const [description, setDescription] = useState("");
//   const [detailImages, setDetailImages] = useState({
//     img1: null,
//     img2: null,
//     img3: null,
//   });
//   const [recurrencePattern, setRecurrencePattern] = useState("yearly");
//   const [savedEvents, setSavedEvents] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   // ✅ Toast message states
//   const [message, setMessage] = useState(null);
//   const [messageType, setMessageType] = useState("success"); // "success" | "error"

//   const API_BASE = process.env.REACT_APP_BACKEND_API;
//   const token = localStorage.getItem("userToken");

//   const axiosAuth = axios.create({
//     baseURL: `${API_BASE}api/recurring`,
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   });

//   // Fetch all recurring events
//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const res = await axiosAuth.get("/getRecurrings");
//       if (res.data.success) {
//         setSavedEvents(res.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       showMessage("Failed to fetch recurring events", "error");
//     }
//   };

//   const handlePreviewImageChange = (e) => {
//     setPreviewImage(e.target.files[0]);
//   };

//   const handleDetailImageChange = (e, imageKey) => {
//     setDetailImages((prev) => ({ ...prev, [imageKey]: e.target.files[0] }));
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const formData = new FormData();
//     formData.append("recurring_event_name", eventName);
  
//     // ✅ Send ISO format (YYYY-MM-DD) directly
//     formData.append("recurring_from_event_date", eventDate);
//     formData.append("recurring_to_event_date", eventDate);
  
//     formData.append("description", description);
//     formData.append("type", recurrencePattern);
  
//     if (previewImage) formData.append("preview_img", previewImage);
//     if (detailImages.img1) formData.append("img1", detailImages.img1);
//     if (detailImages.img2) formData.append("img2", detailImages.img2);
//     if (detailImages.img3) formData.append("img3", detailImages.img3);
  
//     try {
//       let res;
//       if (editingId) {
//         res = await axiosAuth.put(`/updateRecurring/${editingId}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         res = await axiosAuth.post("/createRecurring", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }
  
//       if (res.data.success) {
//         fetchEvents();
//         resetForm();
//         showMessage(
//           editingId
//             ? "Recurring event updated successfully"
//             : "Recurring event added successfully",
//           "success"
//         );
//       }
//     } catch (error) {
//       console.error("Error saving event:", error);
//       showMessage("Failed to save recurring event", "error");
//     }
//   };
  
//   const handleDelete = async (id) => {
    
//     try {
//       const res = await axiosAuth.delete(`/deleteRecurring/${id}`);
//       if (res.data.success) {
//         setSavedEvents(savedEvents.filter((event) => event._id !== id));
//         showMessage("Recurring event deleted successfully", "success");
//       }
//     } catch (error) {
//       console.error("Error deleting event:", error);
//       showMessage("Failed to delete recurring event", "error");
//     }
//   };

//   const handleEdit = (event) => {
//     setEditingId(event._id);
//     setEventName(event.recurring_event_name);
//     setEventDate(event.recurring_from_event_date.split("T")[0]);
//     setDescription(event.description);
//     setRecurrencePattern(event.type);

//     const formElement = document.getElementById("recurring-form");
//   if (formElement) {
//     formElement.scrollIntoView({ behavior: "smooth", block: "start" });
//   }
//   };

//   const resetForm = () => {
//     setEventName("");
//     setEventDate("");
//     setPreviewImage(null);
//     setDescription("");
//     setDetailImages({ img1: null, img2: null, img3: null });
//     setRecurrencePattern("yearly");
//     setEditingId(null);
//   };

//   // ✅ Show toast-like message
//   const showMessage = (text, type = "success") => {
//     setMessage(text);
//     setMessageType(type);
//     setTimeout(() => setMessage(null), 3000);
//   };

//   return (
//     <div id="recurring-form" className="recurring-event-container">
//       <h2>{editingId ? "Edit Recurring Event" : "Add Recurring Event"}</h2>

//       {/* ✅ Toast message banner */}
//       {message && <div className={`toast-message ${messageType}`}>{message}</div>}

//       <form  className="recurring-event-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Event Name</label>
//           <input
//             type="text"
//             value={eventName}
//             onChange={(e) => setEventName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Event Date</label>
//           <input
//             type="date"
//             value={eventDate}
//             onChange={(e) => setEventDate(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Preview Image</label>
//           <input type="file" accept="image/*" onChange={handlePreviewImageChange} />
//         </div>

//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows={4}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Detail Images</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleDetailImageChange(e, "img1")}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleDetailImageChange(e, "img2")}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleDetailImageChange(e, "img3")}
//           />
//         </div>

//         <div className="form-group">
//   <label>Recurrence Pattern</label>
//   <select
//     className="readonly-input"
//     value={recurrencePattern}
//     onChange={(e) => setRecurrencePattern(e.target.value)}
//     required
//   >
//     <option value="yearly">Yearly</option>
//     <option value="monthly">Monthly</option>
//     <option value="weekly">Weekly</option>
//   </select>
// </div>



//         <button type="submit" className="upload-button">
//           {editingId ? "Update Event" : "Upload Event"}
//         </button>
//         {editingId && (
//           <button type="button" className="cancel-button" onClick={resetForm}>
//             Cancel Edit
//           </button>
//         )}
//       </form>

//       <div className="saved-events-list">
//         {savedEvents.length === 0 && <p>No recurring events added yet.</p>}
//         {savedEvents.map((event, index) => (
//           <div key={event._id} className="saved-event-item">
//             <div className="saved-event-header">
//               <span className="item-number">{index + 1}.</span>
//               <span className="item-title">{event.recurring_event_name}</span>
//               <button className="edit-button" onClick={() => handleEdit(event)}>
//                 Edit
//               </button>
//               <button
//                 className="delete-button"
//                 onClick={() => handleDelete(event._id)}
//               >
//                 Delete
//               </button>
//             </div>
//             <div className="saved-event-details">
//               <p>
//                 <strong>Date:</strong>{" "}
//                 {new Date(event.recurring_from_event_date).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>Description:</strong> {event.description}
//               </p>
//               <p>
//                 <strong>Recurrence Pattern:</strong> {event.type}
//               </p>
//               <div className="images-container">
//                 {event.preview_img && (
//                   <img
//                     src={event.preview_img}
//                     alt="Preview"
//                     className="saved-image"
//                   />
//                 )}
//                 {[event.detail_img?.img1, event.detail_img?.img2, event.detail_img?.img3].map(
//                   (img, i) =>
//                     img ? (
//                       <img
//                         key={i}
//                         src={img}
//                         alt={`Detail ${i + 1}`}
//                         className="saved-image"
//                       />
//                     ) : null
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecurringEvents;













import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecurringEvents.css";

const RecurringEvents = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [description, setDescription] = useState("");
  const [detailImages, setDetailImages] = useState({
    img1: null,
    img2: null,
    img3: null,
  });
  const [recurrencePattern, setRecurrencePattern] = useState("yearly");
  const [savedEvents, setSavedEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // ✅ Toast message states
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success"); // "success" | "error"

  const API_BASE = process.env.REACT_APP_BACKEND_API;
  const token = localStorage.getItem("userToken");

  const axiosAuth = axios.create({
    baseURL: `${API_BASE}api/recurring`,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Fetch all recurring events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axiosAuth.get("/getRecurrings");
      if (res.data.success) {
        setSavedEvents(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      showMessage("Failed to fetch recurring events", "error");
    }
  };

  const handlePreviewImageChange = (e) => {
    setPreviewImage(e.target.files[0]);
  };

  const handleDetailImageChange = (e, imageKey) => {
    setDetailImages((prev) => ({ ...prev, [imageKey]: e.target.files[0] }));
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("recurring_event_name", eventName);
  formData.append("description", description);
  formData.append("type", recurrencePattern);

  // ✅ type ke hisab se alag field bhejna
  if (recurrencePattern === "yearly" && eventDate) {
  try {
    const yearlyData = JSON.parse(eventDate);
    if (Array.isArray(yearlyData) && yearlyData.length > 0) {
      formData.append("recuring_yearly_date_month", JSON.stringify(yearlyData));
    } else {
      throw new Error("Invalid yearly date");
    }
  } catch {
    showMessage("Please select at least one month/date pair.", "error");
    return;
  }
}
 else if (recurrencePattern === "monthly") {
    formData.append("recuring_monthly_date", eventDate);
  } else if (recurrencePattern === "weekly") {
    formData.append("recuring_weekly_day_name", eventDate);
  }

  // ✅ images
  if (previewImage) formData.append("preview_img", previewImage);
  if (detailImages.img1) formData.append("img1", detailImages.img1);
  if (detailImages.img2) formData.append("img2", detailImages.img2);
  if (detailImages.img3) formData.append("img3", detailImages.img3);

  try {
    const res = editingId
      ? await axiosAuth.put(`/updateRecurring/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : await axiosAuth.post("/createRecurring", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

    if (res.data.success) {
      fetchEvents();
      resetForm();
      showMessage(
        editingId
          ? "Recurring event updated successfully"
          : "Recurring event added successfully",
        "success"
      );
    } else {
      showMessage(res.data.message || "Failed to save recurring event", "error");
    }
  } catch (error) {
    console.error("Error saving event:", error.response?.data || error);
    showMessage(error.response?.data?.message || "Failed to save recurring event", "error");
  }
};

  
  const handleDelete = async (id) => {
    
    try {
      const res = await axiosAuth.delete(`/deleteRecurring/${id}`);
      if (res.data.success) {
        setSavedEvents(savedEvents.filter((event) => event._id !== id));
        showMessage("Recurring event deleted successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      showMessage("Failed to delete recurring event", "error");
    }
  };

  const handleEdit = (event) => {
    setEditingId(event._id);
    setEventName(event.recurring_event_name);
    setEventDate(event.recurring_from_event_date.split("T")[0]);
    setDescription(event.description);
    setRecurrencePattern(event.type);

    const formElement = document.getElementById("recurring-form");
  if (formElement) {
    formElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  };

  const resetForm = () => {
    setEventName("");
    setEventDate("");
    setPreviewImage(null);
    setDescription("");
    setDetailImages({ img1: null, img2: null, img3: null });
    setRecurrencePattern("yearly");
    setEditingId(null);
  };

  // ✅ Show toast-like message
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div id="recurring-form" className="recurring-event-container">
      <h2>{editingId ? "Edit Recurring Event" : "Add Recurring Event"}</h2>

      {/* ✅ Toast message banner */}
      {message && <div className={`toast-message ${messageType}`}>{message}</div>}

      <form  className="recurring-event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>

                <div className="form-group">
  <label>Recurrence Pattern</label>
  <select
    className="readonly-input"
    value={recurrencePattern}
    onChange={(e) => setRecurrencePattern(e.target.value)}
    required
  >
    <option value="yearly">Yearly</option>
    <option value="monthly">Monthly</option>
    <option value="weekly">Weekly</option>
  </select>
</div>


{/* Recurrence Options */}
{recurrencePattern === "yearly" && (
  <div className="form-group">
    <label>Yearly Month & Date</label>
    <div className="yearly-select">
      <select
        onChange={(e) =>
          setEventDate(JSON.stringify([{ month: e.target.value, date: eventDate || 1 }]))
        }
        required
      >
        <option value="">Select Month</option>
        {[
          "January","February","March","April","May","June",
          "July","August","September","October","November","December"
        ].map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <select
        onChange={(e) =>
          setEventDate(
            JSON.stringify([{ month: JSON.parse(eventDate || '[{"month":""}]')[0].month, date: parseInt(e.target.value) }])
          )
        }
        required
      >
        <option value="">Select Date</option>
        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
    </div>
  </div>
)}

{recurrencePattern === "monthly" && (
  <div className="form-group">
    <label>Monthly Date</label>
    <select
      value={eventDate}
      onChange={(e) => setEventDate(e.target.value)}
      required
    >
      <option value="">Select Date</option>
      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
        <option key={d} value={d}>{d}</option>
      ))}
    </select>
  </div>
)}

{recurrencePattern === "weekly" && (
  <div className="form-group">
    <label>Weekly Day</label>
    <select
      value={eventDate}
      onChange={(e) => setEventDate(e.target.value)}
      required
    >
      <option value="">Select Day</option>
      {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((day) => (
        <option key={day} value={day}>{day}</option>
      ))}
    </select>
  </div>
)}

        

        <div className="form-group">
          <label>Preview Image</label>
          <input type="file" accept="image/*" onChange={handlePreviewImageChange} />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label>Detail Images</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleDetailImageChange(e, "img1")}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleDetailImageChange(e, "img2")}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleDetailImageChange(e, "img3")}
          />
        </div>

        <button type="submit" className="upload-button">
          {editingId ? "Update Event" : "Upload Event"}
        </button>
        {editingId && (
          <button type="button" className="cancel-button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>
      

      <div className="saved-events-list">
        {savedEvents.length === 0 && <p>No recurring events added yet.</p>}
        {savedEvents.map((event, index) => (
          <div key={event._id} className="saved-event-item">
            <div className="saved-event-header">
              <span className="item-number">{index + 1}.</span>
              <span className="item-title">{event.recurring_event_name}</span>
              {/* <button className="edit-button" onClick={() => handleEdit(event)}>
                Edit
              </button> */}
              <button
                className="delete-button"
                onClick={() => handleDelete(event._id)}
              >
                Delete
              </button>
            </div>
            <div className="saved-event-details">
              <p>
  <strong>Date:</strong>{" "}
  {event.type === "yearly" && event.recuring_yearly_date_month?.length > 0
    ? ` Every year on date ${event.recuring_yearly_date_month[0].month} ${event.recuring_yearly_date_month[0].date}`
    : event.type === "monthly" && event.recuring_monthly_date
    ? `Every month on date ${event.recuring_monthly_date}`
    : event.type === "weekly" && event.recuring_weekly_day_name
    ? `Every week on ${event.recuring_weekly_day_name}`
    : "N/A"}
</p>
              <p>
                <strong>Description:</strong> {event.description}
              </p>
              <p>
                <strong>Recurrence Pattern:</strong> {event.type}
              </p>
              <div className="images-container">
                {event.preview_img && (
                  <img
                    src={event.preview_img}
                    alt="Preview"
                    className="saved-image"
                  />
                )}
                {[event.detail_img?.img1, event.detail_img?.img2, event.detail_img?.img3].map(
                  (img, i) =>
                    img ? (
                      <img
                        key={i}
                        src={img}
                        alt={`Detail ${i + 1}`}
                        className="saved-image"
                      />
                    ) : null
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecurringEvents;



























// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./RecurringEvents.css";

// const RecurringEvents = () => {
//   const [eventName, setEventName] = useState("");
//   const [description, setDescription] = useState("");
//   const [previewImage, setPreviewImage] = useState(null);
//   const [detailImages, setDetailImages] = useState({
//     img1: null,
//     img2: null,
//     img3: null,
//   });
//   const [recurrencePattern, setRecurrencePattern] = useState("yearly");
//   const [savedEvents, setSavedEvents] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   // New separate states for yearly month and date
//   const [yearlyMonth, setYearlyMonth] = useState("");
//   const [yearlyDate, setYearlyDate] = useState(1);

//   // Single eventDate state for monthly and weekly type
//   const [eventDate, setEventDate] = useState("");

//   const [message, setMessage] = useState(null);
//   const [messageType, setMessageType] = useState("success");

//   const API_BASE = process.env.REACT_APP_BACKEND_API;
//   const token = localStorage.getItem("userToken");

//   const axiosAuth = axios.create({
//     baseURL: `${API_BASE}api/recurring`,
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   });

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // Update eventDate JSON string for yearly pattern whenever month or date changes
//   useEffect(() => {
//     if (recurrencePattern === "yearly" && yearlyMonth && yearlyDate) {
//       setEventDate(JSON.stringify([{ month: yearlyMonth, date: yearlyDate }]));
//     }
//   }, [yearlyMonth, yearlyDate, recurrencePattern]);

//   const fetchEvents = async () => {
//     try {
//       const res = await axiosAuth.get("/getRecurrings");
//       if (res.data.success) {
//         setSavedEvents(res.data.data);
//       }
//     } catch (error) {
//       showMessage("Failed to fetch recurring events", "error");
//     }
//   };

//   const handlePreviewImageChange = (e) => {
//     setPreviewImage(e.target.files[0]);
//   };

//   const handleDetailImageChange = (e, imageKey) => {
//     setDetailImages((prev) => ({ ...prev, [imageKey]: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("recurring_event_name", eventName);
//     formData.append("description", description);
//     formData.append("type", recurrencePattern);

//     if (recurrencePattern === "yearly") {
//       if (!eventDate) {
//         showMessage("Please select at least one month/date pair.", "error");
//         return;
//       }
//       formData.append("recurring_yearly_date_month", eventDate);
//     } else if (recurrencePattern === "monthly") {
//       if (!eventDate) {
//         showMessage("Please select a monthly date.", "error");
//         return;
//       }
//       formData.append("recurring_monthly_date", eventDate);
//     } else if (recurrencePattern === "weekly") {
//       if (!eventDate) {
//         showMessage("Please select a weekly day.", "error");
//         return;
//       }
//       formData.append("recurring_weekly_day_name", eventDate);
//     }

//     // Add preview and detail images if available
//     if (previewImage) formData.append("preview_img", previewImage);
//     if (detailImages.img1) formData.append("img1", detailImages.img1);
//     if (detailImages.img2) formData.append("img2", detailImages.img2);
//     if (detailImages.img3) formData.append("img3", detailImages.img3);

//     try {
//       const res = editingId
//         ? await axiosAuth.put(`/updateRecurring/${editingId}`, formData, {
//             headers: { "Content-Type": "multipart/form-data" },
//           })
//         : await axiosAuth.post("/createRecurring", formData, {
//             headers: { "Content-Type": "multipart/form-data" },
//           });

//       if (res.data.success) {
//         fetchEvents();
//         resetForm();
//         showMessage(
//           editingId
//             ? "Recurring event updated successfully"
//             : "Recurring event added successfully",
//           "success"
//         );
//       } else {
//         showMessage(res.data.message || "Failed to save recurring event", "error");
//       }
//     } catch (error) {
//       showMessage(
//         error.response?.data?.message || "Failed to save recurring event",
//         "error"
//       );
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await axiosAuth.delete(`/deleteRecurring/${id}`);
//       if (res.data.success) {
//         setSavedEvents(savedEvents.filter((event) => event._id !== id));
//         showMessage("Recurring event deleted successfully", "success");
//       }
//     } catch (error) {
//       showMessage("Failed to delete recurring event", "error");
//     }
//   };

//   const handleEdit = (event) => {
//     setEditingId(event._id);
//     setEventName(event.recurring_event_name);
//     setDescription(event.description);
//     setRecurrencePattern(event.type);

//     // Handle yearly month and date extraction for editing form
//     if (event.type === "yearly" && event.recurring_yearly_date_month) {
//       try {
//         const parsed = JSON.parse(event.recurring_yearly_date_month);
//         setYearlyMonth(parsed[0].month);
//         setYearlyDate(parsed[0].date);
//       } catch {
//         setYearlyMonth("");
//         setYearlyDate(1);
//       }
//     }

//     // Handle monthly and weekly set eventDate for editing
//     if (event.type === "monthly") {
//       setEventDate(event.recurring_monthly_date || "");
//     }
//     if (event.type === "weekly") {
//       setEventDate(event.recurring_weekly_day_name || "");
//     }

//     const formElement = document.getElementById("recurring-form");
//     if (formElement) {
//       formElement.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   const resetForm = () => {
//     setEventName("");
//     setDescription("");
//     setPreviewImage(null);
//     setDetailImages({ img1: null, img2: null, img3: null });
//     setRecurrencePattern("yearly");
//     setYearlyMonth("");
//     setYearlyDate(1);
//     setEventDate("");
//     setEditingId(null);
//   };

//   const showMessage = (text, type = "success") => {
//     setMessage(text);
//     setMessageType(type);
//     setTimeout(() => setMessage(null), 3000);
//   };

//   return (
//     <div id="recurring-form" className="recurring-event-container">
//       <h2>{editingId ? "Edit Recurring Event" : "Add Recurring Event"}</h2>

//       {message && <div className={`toast-message ${messageType}`}>{message}</div>}

//       <form className="recurring-event-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Event Name</label>
//           <input
//             type="text"
//             value={eventName}
//             onChange={(e) => setEventName(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Recurrence Pattern</label>
//           <select
//             className="readonly-input"
//             value={recurrencePattern}
//             onChange={(e) => setRecurrencePattern(e.target.value)}
//             required
//           >
//             <option value="yearly">Yearly</option>
//             <option value="monthly">Monthly</option>
//             <option value="weekly">Weekly</option>
//           </select>
//         </div>

//         {recurrencePattern === "yearly" && (
//           <div className="form-group">
//             <label>Yearly Month & Date</label>
//             <div className="yearly-select">
//               <select
//                 value={yearlyMonth}
//                 onChange={(e) => setYearlyMonth(e.target.value)}
//                 required
//               >
//                 <option value="">Select Month</option>
//                 {[
//                   "January",
//                   "February",
//                   "March",
//                   "April",
//                   "May",
//                   "June",
//                   "July",
//                   "August",
//                   "September",
//                   "October",
//                   "November",
//                   "December",
//                 ].map((m) => (
//                   <option key={m} value={m}>
//                     {m}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 value={yearlyDate}
//                 onChange={(e) => setYearlyDate(parseInt(e.target.value))}
//                 required
//               >
//                 <option value="">Select Date</option>
//                 {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
//                   <option key={d} value={d}>
//                     {d}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         )}

//         {recurrencePattern === "monthly" && (
//           <div className="form-group">
//             <label>Monthly Date</label>
//             <select
//               value={eventDate}
//               onChange={(e) => setEventDate(e.target.value)}
//               required
//             >
//               <option value="">Select Date</option>
//               {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
//                 <option key={d} value={d}>
//                   {d}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {recurrencePattern === "weekly" && (
//           <div className="form-group">
//             <label>Weekly Day</label>
//             <select
//               value={eventDate}
//               onChange={(e) => setEventDate(e.target.value)}
//               required
//             >
//               <option value="">Select Day</option>
//               {[
//                 "Sunday",
//                 "Monday",
//                 "Tuesday",
//                 "Wednesday",
//                 "Thursday",
//                 "Friday",
//                 "Saturday",
//               ].map((day) => (
//                 <option key={day} value={day}>
//                   {day}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         <div className="form-group">
//           <label>Preview Image</label>
//           <input type="file" accept="image/*" onChange={handlePreviewImageChange} />
//         </div>

//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows={4}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Detail Images</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleDetailImageChange(e, "img1")}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleDetailImageChange(e, "img2")}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleDetailImageChange(e, "img3")}
//           />
//         </div>

//         <button type="submit" className="upload-button">
//           {editingId ? "Update Event" : "Upload Event"}
//         </button>
//         {editingId && (
//           <button type="button" className="cancel-button" onClick={resetForm}>
//             Cancel Edit
//           </button>
//         )}
//       </form>

//       <div className="saved-events-list">
//         {savedEvents.length === 0 && <p>No recurring events added yet.</p>}
//         {savedEvents.map((event, index) => (
//           <div key={event._id} className="saved-event-item">
//             <div className="saved-event-header">
//               <span className="item-number">{index + 1}.</span>
//               <span className="item-title">{event.recurring_event_name}</span>
//               <button className="edit-button" onClick={() => handleEdit(event)}>
//                 Edit
//               </button>
//               <button
//                 className="delete-button"
//                 onClick={() => handleDelete(event._id)}
//               >
//                 Delete
//               </button>
//             </div>
//             <div className="saved-event-details">
//               <p>
//                 <strong>Date:</strong>{" "}
//                 {new Date(event.recurring_from_event_date).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>Description:</strong> {event.description}
//               </p>
//               <p>
//                 <strong>Recurrence Pattern:</strong> {event.type}
//               </p>
//               <div className="images-container">
//                 {event.preview_img && (
//                   <img
//                     src={event.preview_img}
//                     alt="Preview"
//                     className="saved-image"
//                   />
//                 )}
//                 {[event.detail_img?.img1, event.detail_img?.img2, event.detail_img?.img3].map(
//                   (img, i) =>
//                     img ? (
//                       <img
//                         key={i}
//                         src={img}
//                         alt={`Detail ${i + 1}`}
//                         className="saved-image"
//                       />
//                     ) : null
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecurringEvents;
