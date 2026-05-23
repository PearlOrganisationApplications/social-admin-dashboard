import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit3, MapPin, Calendar, X, Plus, Heart, Camera } from "lucide-react";

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    _id: "",
    coupleName: "",
    marriageDate: "",
    yearsTogether: "",
    story: "",
    location: "",
    images: [],
  });

  const API = "https://social-taste-matrimony.onrender.com/api/success-stories";
  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjJlNGE0MTFlYjVlNWM4ODdmZTJlZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NzYwOTYwOCwiZXhwIjoxNzgwMjAxNjA4fQ.810L_RzlkbtjDFn0gVnpVU3UqOLOGIfJjqsa9MxtGrw";

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setStories(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this beautiful story?")) return;
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      fetchStories();
    } catch (err) {
      alert("Delete failed!");
    }
  };

  const openEditModal = (e, story) => {
    e.stopPropagation();
    setIsEditing(true);
    setForm({
      _id: story._id,
      coupleName: story.coupleName,
      marriageDate: story.marriageDate.split("T")[0],
      yearsTogether: story.yearsTogether,
      story: story.story,
      location: story.location,
      images: [], 
    });
    setPreviews(story.images || []);
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removePhoto = (index) => {
    const photoToRemove = previews[index];
    if (photoToRemove.startsWith('blob:')) {
      const blobCountBefore = previews.slice(0, index).filter(p => p.startsWith('blob:')).length;
      const updatedFiles = [...form.images];
      updatedFiles.splice(blobCountBefore, 1);
      setForm({ ...form, images: updatedFiles });
    }
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("coupleName", form.coupleName);
      formData.append("marriageDate", form.marriageDate);
      formData.append("yearsTogether", form.yearsTogether);
      formData.append("story", form.story);
      formData.append("location", form.location);

      const existingImagesToKeep = previews.filter(p => p.startsWith('http'));
      existingImagesToKeep.forEach(img => formData.append("images", img));

      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i]);
      }

      if (isEditing) {
        await axios.put(`${API}/${form._id}`, formData, {
          headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(API, formData, {
          headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "multipart/form-data" },
        });
      }
      setShowModal(false);
      resetForm();
      fetchStories();
    } catch (err) {
      alert("❌ Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ _id: "", coupleName: "", marriageDate: "", yearsTogether: "", story: "", location: "", images: [] });
    setPreviews([]);
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      {/* Dynamic Style Tag for Media Queries & Hover Effects */}
      <style>{`
        @media (max-width: 768px) {
          .header-box { flex-direction: column; text-align: center; gap: 20px; }
          .form-grid { grid-template-columns: 1fr !important; }
          .modal-box { width: 95% !important; padding: 20px !important; }
        }
        .story-card:hover { transform: translateY(-10px); border-color: #FFD700 !important; box-shadow: 0 10px 30px rgba(255, 215, 0, 0.1); }
        .action-btn:hover { transform: scale(1.1); }
        input:focus, textarea:focus { border-color: #FFD700 !important; outline: none; background: #1a1a1a !important; }
      `}</style>

      <div className="header-box" style={styles.header}>
        <div>
          <h1 style={styles.heading}><Heart size={32} style={{marginRight: 10}} fill="#FFD700"/> Success Stories</h1>
          <p style={styles.subHeading}>Celebrating the unions made in heaven and nurtured on earth.</p>
        </div>
        <button style={styles.addBtn} onClick={() => { resetForm(); setShowModal(true); }}>
          <Plus size={20} /> Share Your Story
        </button>
      </div>

      {loading && !showModal && <div style={styles.loader}> <div className="spinner"></div> Creating Magic...</div>}

      {showModal && (
        <div style={styles.modalOverlay}>
          <div className="modal-box" style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={{ margin: 0, color: "#FFD700", fontSize: '1.5rem' }}>
                {isEditing ? "Edit Your Legacy" : "Add New Success Story"}
              </h2>
              <button style={styles.closeBtn} onClick={() => setShowModal(false)}><X size={20}/></button>
            </div>

            <form onSubmit={handleSubmit} className="form-grid" style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Couple Names</label>
                <input required placeholder="e.g. Rahul & Priya" value={form.coupleName} style={styles.input} onChange={(e) => setForm({ ...form, coupleName: e.target.value })} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Marriage Date</label>
                <input required type="date" value={form.marriageDate} style={styles.input} onChange={(e) => setForm({ ...form, marriageDate: e.target.value })} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Years of Happiness</label>
                <input required placeholder="e.g. 5 Years" value={form.yearsTogether} style={styles.input} onChange={(e) => setForm({ ...form, yearsTogether: e.target.value })} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Location</label>
                <input required placeholder="Mumbai, India" value={form.location} style={styles.input} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>

              <div style={{ ...styles.inputGroup, gridColumn: "span 2" }}>
                <label style={styles.label}>Their Beautiful Journey</label>
                <textarea required rows="4" placeholder="How did they meet?" value={form.story} style={styles.textarea} onChange={(e) => setForm({ ...form, story: e.target.value })} />
              </div>

              <div style={{ ...styles.inputGroup, gridColumn: "span 2" }}>
                <label style={styles.label}>Gallery</label>
                <div style={styles.fileInputWrapper}>
                  <input type="file" multiple accept="image/*" style={styles.fileInput} onChange={handleFileChange} />
                  <Camera size={24} color="#FFD700" style={{marginBottom: 8}}/>
                  <span style={{color: '#888', display: 'block'}}>Click to upload photos</span>
                </div>
              </div>

              <div style={styles.previewContainer}>
                {previews.map((src, i) => (
                  <div key={i} style={styles.previewWrapper}>
                    <img src={src} alt="preview" style={styles.previewImg} />
                    <button type="button" style={styles.removeImgBtn} onClick={() => removePhoto(i)}><X size={10} /></button>
                  </div>
                ))}
              </div>

              <button type="submit" disabled={loading} style={styles.submitBtn}>
                {loading ? "Processing..." : isEditing ? "Save Changes" : "Publish Story"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div style={styles.grid}>
        {stories.map((s) => (
          <div key={s._id} className="story-card" style={styles.card}>
            <div style={styles.imageWrapper}>
              <img src={s.images?.[0] || "https://via.placeholder.com/400"} alt="Couple" style={styles.image} />
              <div style={styles.imgOverlay}></div>
              <div style={styles.cardBadge}>{s.yearsTogether} Together</div>
              <div style={styles.actionOverlay}>
                <button className="action-btn" style={styles.miniBtnEdit} onClick={(e) => openEditModal(e, s)}><Edit3 size={14} /></button>
                <button className="action-btn" style={styles.miniBtnDelete} onClick={(e) => handleDelete(e, s._id)}><Trash2 size={14} /></button>
              </div>
            </div>
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>{s.coupleName}</h3>
              <div style={styles.cardMeta}>
                <span style={styles.metaItem}><MapPin size={12} color="#FFD700"/> {s.location}</span>
                <span style={styles.metaItem}><Calendar size={12} color="#FFD700"/> {new Date(s.marriageDate).getFullYear()}</span>
              </div>
              <p style={styles.cardStory}>{s.story.substring(0, 95)}...</p>
              <button style={styles.readMore}>View Full Journey →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { 
    background: "radial-gradient(circle at top right, #1a1a1a, #050505)", 
    minHeight: "100vh", padding: "60px 5%", fontFamily: "'Poppins', sans-serif", color: "#fff" 
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "60px" },
  heading: { fontSize: "2.8rem", margin: 0, color: "#FFD700", fontWeight: "800", display: 'flex', alignItems: 'center' },
  subHeading: { color: "#aaa", fontSize: "1.1rem", marginTop: "10px" },
  addBtn: { 
    background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)", 
    border: "none", padding: "14px 30px", borderRadius: "12px", fontWeight: "700", 
    cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", color: "#000",
    transition: "all 0.3s ease", boxShadow: "0 4px 15px rgba(184, 134, 11, 0.3)"
  },
  grid: { 
    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "35px" 
  },
  card: { 
    background: "rgba(255, 255, 255, 0.03)", borderRadius: "24px", overflow: "hidden", 
    border: "1px solid rgba(255, 255, 255, 0.08)", transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" 
  },
  imageWrapper: { position: "relative", height: "280px" },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  imgOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' },
  cardBadge: { 
    position: "absolute", bottom: "15px", left: "15px", background: "rgba(184, 134, 11, 0.9)", 
    padding: "6px 14px", borderRadius: "8px", color: "#fff", fontSize: "0.75rem", fontWeight: "600",
    backdropFilter: "blur(4px)"
  },
  actionOverlay: { position: "absolute", top: "15px", right: "15px", display: "flex", gap: "10px" },
  miniBtnEdit: { background: "#fff", color: "#000", border: "none", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  miniBtnDelete: { background: "#ff4d4d", color: "#fff", border: "none", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  cardContent: { padding: "25px" },
  cardTitle: { margin: "0 0 12px 0", color: "#fff", fontSize: "1.4rem", fontWeight: "700" },
  cardMeta: { display: "flex", gap: "20px", fontSize: "0.85rem", color: "#888", marginBottom: "15px" },
  metaItem: { display: 'flex', alignItems: 'center', gap: '5px' },
  cardStory: { fontSize: "0.95rem", color: "#bbb", lineHeight: "1.6", marginBottom: "20px" },
  readMore: { background: "none", border: "none", color: "#FFD700", fontWeight: "600", cursor: "pointer", padding: 0, fontSize: "0.9rem" },
  
  // Modal Styles
  modalOverlay: { 
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(8px)", 
    display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" 
  },
  modal: { 
    background: "#111", padding: "40px", borderRadius: "28px", width: "100%", 
    maxWidth: "700px", maxHeight: "90vh", overflowY: "auto", border: "1px solid #333",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
  },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "10px" },
  label: { fontSize: "0.9rem", color: "#FFD700", fontWeight: "500" },
  input: { 
    background: "#0a0a0a", border: "1px solid #222", padding: "14px", 
    borderRadius: "12px", color: "#fff", transition: "all 0.3s" 
  },
  textarea: { 
    background: "#0a0a0a", border: "1px solid #222", padding: "14px", 
    borderRadius: "12px", color: "#fff", resize: "none", transition: "all 0.3s" 
  },
  fileInputWrapper: { 
    border: "2px dashed #333", padding: "25px", borderRadius: "15px", 
    textAlign: "center", position: "relative", background: "#080808", cursor: "pointer"
  },
  fileInput: { position: "absolute", inset: 0, opacity: 0, cursor: "pointer" },
  previewContainer: { display: "flex", gap: "15px", marginTop: "10px", flexWrap: "wrap", gridColumn: "span 2" },
  previewWrapper: { position: "relative", width: "70px", height: "70px" },
  previewImg: { width: "100%", height: "100%", borderRadius: "10px", objectFit: "cover", border: "2px solid #333" },
  removeImgBtn: { 
    position: "absolute", top: "-8px", right: "-8px", background: "#ff4444", color: "#fff", 
    border: "none", borderRadius: "50%", width: "22px", height: "22px", cursor: "pointer", 
    display: "flex", alignItems: "center", justifyContent: "center" 
  },
  submitBtn: { 
    gridColumn: "span 2", background: "linear-gradient(45deg, #FFD700, #FFA500)", 
    border: "none", padding: "16px", borderRadius: "12px", fontWeight: "bold", 
    cursor: "pointer", color: "#000", fontSize: "1rem", marginTop: "10px" 
  },
  closeBtn: { background: "#222", border: "none", color: "#fff", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  loader: { 
    textAlign: "center", padding: "100px", color: "#FFD700", fontSize: "1.2rem", 
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' 
  }
};