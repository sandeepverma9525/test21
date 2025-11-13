// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./EventIntro.css";

// const EventIntro = () => {
//   const [events, setEvents] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [editingItem, setEditingItem] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [messageType, setMessageType] = useState("success");
//   const [formDisabled, setFormDisabled] = useState(false);

//   const API_BASE = "https://testtapi1.ap-1.evennode.com/api/eventIntro";
//   const token = localStorage.getItem("userToken");
//   const adminId = localStorage.getItem("adminId");

//   const axiosAuth = axios.create({
//     baseURL: API_BASE,
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   });

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const res = await axiosAuth.get("/getAll");
//       if (res.data.success) setEvents(res.data.data);
//     } catch (err) {
//       showMessage("Failed to fetch events", "error");
//       console.error(err);
//     }
//   };

//   const handleImageChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       const reader = new FileReader();
//       reader.onloadend = () => setImagePreview(reader.result);
//       reader.readAsDataURL(selectedFile);
//     } else {
//       setFile(null);
//       setImagePreview(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title.trim() || !description.trim() || (!file && !editingItem)) {
//       showMessage("Please provide all fields", "error");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title.trim());
//     formData.append("description", description.trim());
//     formData.append("adminId", adminId); // ✅ Admin ID
//     if (file) formData.append("file", file);

//     try {
//       let res;
//       if (editingItem) {
//         res = await axiosAuth.put(`/update/${editingItem._id}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         if (res.data.success) {
//           showMessage("Event updated successfully", "success");
//           fetchEvents();
//           resetForm();
//         }
//       } else {
//         res = await axiosAuth.post("/create", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         if (res.data.success) {
//           showMessage("Event created successfully", "success");
//           fetchEvents();
//           setFormDisabled(true); // ✅ Disable form after submit
//           resetForm();
//         }
//       }
//     } catch (err) {
//       showMessage("Failed to save event", "error");
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await axiosAuth.delete(`/delete/${id}`, {
//         data: { adminId }, // ✅ Send adminId in body
//       });
//       if (res.data.success) {
//         showMessage("Event deleted successfully", "success");
//         fetchEvents();
//         setFormDisabled(false); // ✅ Enable form after delete
//       }
//     } catch (err) {
//       showMessage("Failed to delete event", "error");
//       console.error(err);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setTitle(item.title);
//     setDescription(item.description);
//     setImagePreview(item.img);
//     setFormDisabled(false);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const resetForm = () => {
//     setTitle("");
//     setDescription("");
//     setFile(null);
//     setImagePreview(null);
//     setEditingItem(null);
//   };

//   const showMessage = (text, type = "success") => {
//     setMessage(text);
//     setMessageType(type);
//     setTimeout(() => setMessage(null), 3000);
//   };

//   return (
//     <div className="event-admin-container">
//       <h2>Event Management</h2>
//       <p>Upload and manage temple events</p>

//       {message && <div className={`toast-message ${messageType}`}>{message}</div>}

//       <div className="event-form-card">
//         <h3>{editingItem ? "Edit Event" : "Add New Event"}</h3>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             disabled={formDisabled}
//             required
//           />
//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             disabled={formDisabled}
//             required
//           />
//           <label className="file-label">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               disabled={formDisabled}
//               required={!editingItem}
//             />
//             <span>Choose Image</span>
//             {imagePreview ? "Image selected" : "No image chosen"}
//           </label>
//           {imagePreview && <img src={imagePreview} alt="Preview" className="preview-img" />}
//           <div className="form-buttons">
//             <button type="submit" disabled={formDisabled}>
//               {editingItem ? "Update Event" : "Add Event"}
//             </button>
//             {editingItem && (
//               <button type="button" onClick={resetForm}>
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       <div className="event-list-card">
//         <h3>Current Events</h3>
//         {events.length === 0 ? (
//           <p className="empty-message">No events found</p>
//         ) : (
//           <div className="event-grid">
//             {events.map((item, idx) => (
//               <div key={item._id} className="event-item">
//                 <span className="event-num">Event {idx + 1}</span>
//                 <h4 className="event-title">{item.title}</h4>
//                 <p className="event-desc">{item.description}</p>
//                 <img src={item.img} alt={item.title} />
//                 <div className="event-actions">
//                   <button onClick={() => handleEdit(item)}>Edit</button>
//                   <button onClick={() => handleDelete(item._id)}>Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventIntro;

// !EventForm.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./EventIntro.css";

// const EventForm = ({ apiType }) => {
//   const [items, setItems] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [editingItem, setEditingItem] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [messageType, setMessageType] = useState("success");
//   const [formDisabled, setFormDisabled] = useState(false);

//   const token = localStorage.getItem("userToken");
//   const adminId = localStorage.getItem("adminId");
//   const API_BASE = `https://testtapi1.ap-1.evennode.com/api/${apiType}`;

//   const axiosAuth = axios.create({
//     baseURL: API_BASE,
//     headers: { Authorization: token ? `Bearer ${token}` : "" },
//   });

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const res = await axiosAuth.get("/getAll");
//       if (res.data.success) setItems(res.data.data);
//     } catch (err) {
//       showMessage("Failed to fetch data", "error");
//       console.error(err);
//     }
//   };

//   const handleImageChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       const reader = new FileReader();
//       reader.onloadend = () => setImagePreview(reader.result);
//       reader.readAsDataURL(selectedFile);
//     } else {
//       setFile(null);
//       setImagePreview(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title.trim() || !description.trim() || (!file && !editingItem)) {
//       showMessage("Please provide all fields", "error");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title.trim());
//     formData.append("description", description.trim());
//     formData.append("adminId", adminId);
//     if (file) formData.append("file", file);

//     try {
//       let res;
//       if (editingItem) {
//         res = await axiosAuth.put(`/update/${editingItem._id}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         if (res.data.success) {
//           showMessage("Updated successfully", "success");
//           fetchItems();
//           resetForm();
//         }
//       } else {
//         res = await axiosAuth.post("/create", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         if (res.data.success) {
//           showMessage("Created successfully", "success");
//           fetchItems();
//           setFormDisabled(true);
//           resetForm();
//         }
//       }
//     } catch (err) {
//       showMessage("Failed to save", "error");
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await axiosAuth.delete(`/delete/${id}`, { data: { adminId } });
//       if (res.data.success) {
//         showMessage("Deleted successfully", "success");
//         fetchItems();
//         setFormDisabled(false);
//       }
//     } catch (err) {
//       showMessage("Failed to delete", "error");
//       console.error(err);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setTitle(item.title);
//     setDescription(item.description);
//     setImagePreview(item.img);
//     setFormDisabled(false);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const resetForm = () => {
//     setTitle("");
//     setDescription("");
//     setFile(null);
//     setImagePreview(null);
//     setEditingItem(null);
//   };

//   const showMessage = (text, type = "success") => {
//     setMessage(text);
//     setMessageType(type);
//     setTimeout(() => setMessage(null), 3000);
//   };

//   return (
//     <div className="event-admin-container">
//       {/* <h2>{apiType.replace("Intro", " Management")}</h2> */}
//       <h2>{apiType.charAt(0).toUpperCase() + apiType.slice(1).replace("Intro", " Management")}</h2>

//       <p>Upload and manage {apiType.replace("Intro", "").toLowerCase()}</p>

//       {message && <div className={`toast-message ${messageType}`}>{message}</div>}

//       <div className="event-form-card">
//         <h3>{editingItem ? "Edit Item" : "Add New Item"}</h3>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             disabled={formDisabled}
//             required
//           />
//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             disabled={formDisabled}
//             required
//           />
//           <label className="file-label">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               disabled={formDisabled}
//               required={!editingItem}
//             />
//             <span>Choose Image</span>
//             {imagePreview ? "Image selected" : "No image chosen"}
//           </label>
//           {imagePreview && <img src={imagePreview} alt="Preview" className="preview-img" />}
//           <div className="form-buttons">
//             <button type="submit" disabled={formDisabled}>
//               {editingItem ? "Update" : "Add"}
//             </button>
//             {editingItem && (
//               <button type="button" onClick={resetForm}>
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       <div className="event-list-card">
//         <h3>Current Items</h3>
//         {items.length === 0 ? (
//           <p className="empty-message">No items found</p>
//         ) : (
//           <div className="event-grid">
//             {items.map((item, idx) => (
//               <div key={item._id} className="event-item">
//                 <span className="event-num">Item {idx + 1}</span>
//                 <h4 className="event-title">{item.title}</h4>
//                 <p className="event-desc">{item.description}</p>
//                 <img src={item.img} alt={item.title} />
//                 <div className="event-actions">
//                   <button onClick={() => handleEdit(item)}>Edit</button>
//                   <button onClick={() => handleDelete(item._id)}>Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventForm;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./EventIntro.css";

// const EventForm = ({ apiType }) => {
//   const [items, setItems] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [editingItem, setEditingItem] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [messageType, setMessageType] = useState("success");
//   const [formDisabled, setFormDisabled] = useState(false);
//   const [loading, setLoading] = useState(false); // ✅ Loading state

//   const token = localStorage.getItem("userToken");
//   const adminId = localStorage.getItem("adminId");
//   const API_BASE = `https://testtapi1.ap-1.evennode.com/api/${apiType}`;

//   const axiosAuth = axios.create({
//     baseURL: API_BASE,
//     headers: { Authorization: token ? `Bearer ${token}` : "" },
//   });

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosAuth.get("/getAll");
//       if (res.data.success) setItems(res.data.data);
//     } catch (err) {
//       showMessage("Failed to fetch data", "error");
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   const handleImageChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       const reader = new FileReader();
//       reader.onloadend = () => setImagePreview(reader.result);
//       reader.readAsDataURL(selectedFile);
//     } else {
//       setFile(null);
//       setImagePreview(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title.trim() || !description.trim() || (!file && !editingItem)) {
//       showMessage("Please provide all fields", "error");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title.trim());
//     formData.append("description", description.trim());
//     formData.append("adminId", adminId);
//     if (file) formData.append("file", file);

//     setLoading(true);
//     try {
//       let res;
//       if (editingItem) {
//         res = await axiosAuth.put(`/update/${editingItem._id}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         if (res.data.success) {
//           showMessage("Updated successfully", "success");
//           fetchItems();
//           resetForm();
//           setFormDisabled(false); // ✅ Edit ke baad form enable rahe
//         }
//       } else {
//         res = await axiosAuth.post("/create", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         if (res.data.success) {
//           showMessage("Created successfully", "success");
//           fetchItems();
//           setFormDisabled(true); // ✅ Add ke baad form disable
//           resetForm();
//         }
//       }
//     } catch (err) {
//       showMessage("Failed to save", "error");
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   const handleDelete = async (id) => {
//     setLoading(true);
//     try {
//       const res = await axiosAuth.delete(`/delete/${id}`, { data: { adminId } });
//       if (res.data.success) {
//         showMessage("Deleted successfully", "success");
//         fetchItems();
//         setFormDisabled(false); // ✅ Delete ke baad form enable
//       }
//     } catch (err) {
//       showMessage("Failed to delete", "error");
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   const handleEdit = (item) => {
//     setEditingItem(item);
//     setTitle(item.title);
//     setDescription(item.description);
//     setImagePreview(item.img);
//     setFormDisabled(false); // ✅ Edit ke time form hamesha enabled
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const resetForm = () => {
//     setTitle("");
//     setDescription("");
//     setFile(null);
//     setImagePreview(null);
//     setEditingItem(null);
//   };

//   const showMessage = (text, type = "success") => {
//     setMessage(text);
//     setMessageType(type);
//     setTimeout(() => setMessage(null), 3000);
//   };

//   return (
//     <div className="event-admin-container">
//       <h2>
//         {apiType.charAt(0).toUpperCase() + apiType.slice(1).replace("Intro", " Management")}
//       </h2>

//       <p>Upload and manage {apiType.replace("Intro", "").toLowerCase()}</p>

//       {message && <div className={`toast-message ${messageType}`}>{message}</div>}

// <div className="mane-cont">
//       <div className="event-form-card">
//         <h3>{editingItem ? "Edit Item" : "Add New Item"}</h3>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             disabled={formDisabled}
//             required

//           />
//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             disabled={formDisabled}
//             required
//           />
//           <label className="file-label">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               disabled={formDisabled}
//               required={!editingItem}
//             />
//             <span>Choose Image</span>
//             {imagePreview ? "Image selected" : "No image chosen"}
//           </label>
//           {imagePreview && <img src={imagePreview} alt="Preview" className="preview-img" />}
//           <div className="form-buttons">
//             <button type="submit" disabled={formDisabled || loading}>
//               {loading ? "Processing..." : editingItem ? "Update" : "Add"}
//             </button>
//             {editingItem && (
//               <button type="button" onClick={resetForm} disabled={loading}>
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       <div className="event-list-card">
//         <h3>Current Items</h3>
//         {loading && items.length === 0 ? (
//           <p>Loading...</p>
//         ) : items.length === 0 ? (
//           <p className="empty-message">No items found</p>
//         ) : (
//           <div className="event-grid">
//             {items.map((item, idx) => (
//               <div key={item._id} className="event-item">
//                 <div>
//                 <span className="event-num">Item {idx + 1}</span>
//                 <h4 className="event-title">{item.title}</h4>
//                 <p className="event-desc">{item.description}</p>
//                 </div>
//                 <div>
//                 <img src={item.img} alt={item.title} />
//                 <div className="event-actions">
//                   <button onClick={() => handleEdit(item)} disabled={loading}>
//                     Edit
//                   </button>
//                   <button onClick={() => handleDelete(item._id)} disabled={loading}>
//                     Delete
//                   </button>
//                 </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       </div>
//     </div>
//   );
// };

// export default EventForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EventIntro.css";

const EventForm = ({ apiType }) => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("userToken");
  const adminId = localStorage.getItem("adminId");
  const API_BASE = `${process.env.REACT_APP_BACKEND_API}api/${apiType}`;

  const axiosAuth = axios.create({
    baseURL: API_BASE,
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axiosAuth.get("/getAll");
      if (res.data.success) setItems(res.data.data);
    } catch (err) {
      showMessage("Failed to fetch data", "error");
      console.error(err);
    }
    setLoading(false);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Add tab disabled if item exists and not editing
    if (!editingItem && items.length > 0) {
      showMessage(
        "Only one item allowed. Delete or edit existing item.",
        "error"
      );
      return;
    }

    if (!title.trim() || !description.trim() || (!file && !editingItem)) {
      showMessage("Please provide all fields", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("adminId", adminId);
    if (file) formData.append("file", file);

    setLoading(true);
    try {
      let res;
      if (editingItem) {
        res = await axiosAuth.put(`/update/${editingItem._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          showMessage("Updated successfully", "success");
          fetchItems();
          resetForm();
        }
      } else {
        res = await axiosAuth.post("/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.success) {
          showMessage("Created successfully", "success");
          fetchItems();
          resetForm();
        }
      }
    } catch (err) {
      showMessage("Failed to save", "error");
      console.error(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await axiosAuth.delete(`/delete/${id}`, {
        data: { adminId },
      });
      if (res.data.success) {
        showMessage("Deleted successfully", "success");
        fetchItems();
      }
    } catch (err) {
      showMessage("Failed to delete", "error");
      console.error(err);
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description);
    setImagePreview(item.img);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setImagePreview(null);
    setEditingItem(null);
  };

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="event-admin-container">
      <h2>
        {apiType.charAt(0).toUpperCase() +
          apiType.slice(1).replace("Intro", " Management")}
      </h2>
      <p>Upload and manage {apiType.replace("Intro", "").toLowerCase()}</p>

      {message && (
        <div className={`toast-message ${messageType}`}>{message}</div>
      )}

      <div className="mane-cont">
        <div className="event-form-card">
          <h3>{editingItem ? "Edit Item" : "Add New Item"}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading || (!editingItem && items.length > 0)}
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading || (!editingItem && items.length > 0)}
              required
            />
            <label className="file-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading || (!editingItem && items.length > 0)}
                required={!editingItem}
              />
              <span>Choose Image</span>
              {imagePreview ? "Image selected" : "No image chosen"}
            </label>
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="preview-img" />
            )}
            <div className="form-buttons">
              <button
                type="submit"
                disabled={loading || (!editingItem && items.length > 0)}
              >
                {loading ? "Processing..." : editingItem ? "Update" : "Add"}
              </button>
              {editingItem && (
                <button type="button" onClick={resetForm} disabled={loading}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="event-list-card">
          <h3>Current Items</h3>
          {loading && items.length === 0 ? (
            <p>Loading...</p>
          ) : items.length === 0 ? (
            <p className="empty-message">No items found</p>
          ) : (
            <div className="event-grid">
              {items.map((item, idx) => (
                <div key={item._id} className="event-item">
                  <div>
                    <span className="event-num">Item {idx + 1}</span>
                    <h4 className="event-title">{item.title}</h4>
                    <p className="event-desc">{item.description}</p>
                  </div>
                  <div>
                    <img src={item.img} alt={item.title} />
                    <div className="event-actions">
                      <button
                        onClick={() => handleEdit(item)}
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventForm;
