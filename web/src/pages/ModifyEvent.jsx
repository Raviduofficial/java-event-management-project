import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, UploadCloud, X, 
  Info, Send, Loader2, Clock, MapPin, 
  Eye, Layout, DollarSign, Megaphone, Users as UsersIcon,
  CheckCircle2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/axiosConfig';
import DynamicJsonForm from '../components/DynamicJsonForm';

const BASE_URL = 'http://localhost:8080';

const ModifyEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [venues, setVenues] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    about: '',
    eventUrl: '',
    agendaUrl: '',
    venueId: '',
    startTime: '',
    endTime: '',
    budgetReport: {},
    sponsorships: {},
    committee: {}
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  
  const [agendaFile, setAgendaFile] = useState(null);
  const [agendaUploading, setAgendaUploading] = useState(false);
  const agendaInputRef = useRef(null);
  
  // Calculate minimum datetime (now) for inputs
  const getMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  const minDateTime = getMinDateTime();

  useEffect(() => {
    fetchInitialData();
  }, [id]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [eventRes, venuesRes] = await Promise.all([
        api.get(`/api/events/${id}`, { withCredentials: true }),
        api.get('/api/venues', { withCredentials: true })
      ]);
      
      const event = eventRes.data.data;
      if (event.status !== 'APPROVED') {
        alert("Only approved events can be modified.");
        navigate('/coordinator/dashboard');
        return;
      }
      
      setVenues(venuesRes.data.data || []);
      setFormData({
        title: event.title || '',
        about: event.about || '',
        eventUrl: event.eventUrl || '',
        agendaUrl: event.agendaUrl || '',
        venueId: event.venue?.venueId || '',
        startTime: event.startTime ? event.startTime.replace(' ', 'T').slice(0, 16) : '',
        endTime: event.endTime ? event.endTime.replace(' ', 'T').slice(0, 16) : '',
        budgetReport: event.budgetReport || {},
        sponsorships: event.sponsorships || {},
        committee: event.committee || {}
      });
      if (event.eventUrl) setImagePreview(event.eventUrl);
    } catch (error) {
      console.error("Error fetching event data:", error);
      alert("Failed to load event data.");
      navigate('/coordinator/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleJsonUpdate = (name, json) => {
    setFormData(prev => ({ ...prev, [name]: json }));
  };

  const handleImageSelect = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFileInputChange = (e) => {
    handleImageSelect(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleImageSelect(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData(prev => ({ ...prev, eventUrl: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.eventUrl;
    setImageUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', imageFile);
      const res = await api.post('/api/files/upload', fd, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return `${BASE_URL}/api/files/cdn/${res.data.data}`;
    } catch (err) {
      console.error("Image upload failed", err);
      return formData.eventUrl;
    } finally {
      setImageUploading(false);
    }
  };

  const clearAgenda = () => {
    setAgendaFile(null);
    setFormData(prev => ({ ...prev, agendaUrl: '' }));
    if (agendaInputRef.current) agendaInputRef.current.value = '';
  };

  const handleAgendaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert("Please select a PDF file.");
      return;
    }
    setAgendaFile(file);
  };

  const uploadAgenda = async () => {
    if (!agendaFile) return formData.agendaUrl;
    setAgendaUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', agendaFile);
      const res = await api.post('/api/files/upload', fd, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return `${BASE_URL}/api/files/download/${res.data.data}`;
    } catch (err) {
      console.error("Agenda upload failed", err);
      return formData.agendaUrl;
    } finally {
      setAgendaUploading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Date Validation
    const start = new Date(formData.startTime);
    const end = new Date(formData.endTime);
    const now = new Date();
    
    if (start < now) {
      alert("Start time cannot be in the past.");
      return;
    }
    
    if (end <= start) {
      alert("End time must be after the start time.");
      return;
    }
    
    // Ensure at least a 30-minute gap
    const gapMs = end - start;
    if (gapMs < 30 * 60 * 1000) {
      alert("Event must be at least 30 minutes long.");
      return;
    }

    setSaving(true);
    try {
      const uploadedUrl = await uploadImage();
      const uploadedAgendaUrl = await uploadAgenda();
      
      const payload = {
        ...formData,
        eventUrl: uploadedUrl,
        agendaUrl: uploadedAgendaUrl,
        startTime: formData.startTime.replace('T', ' ') + (formData.startTime.length === 16 ? ':00' : ''),
        endTime: formData.endTime.replace('T', ' ') + (formData.endTime.length === 16 ? ':00' : ''),
        coordinatorId: user.userId
      };
      await api.put(`/api/events/${id}`, payload, { withCredentials: true });
      alert("Event details updated successfully!");
      navigate(`/events/${id}`);
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update event.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-teal-600 mb-4" size={48} />
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Fetching Manifest Data...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] font-['Inter',sans-serif] text-left min-h-screen pb-20">
      
      {/* 1. Simplified Header Area */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 px-12 h-20 flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <span onClick={() => navigate('/coordinator/dashboard')} className="hover:text-teal-600 cursor-pointer transition-colors">Dashboard</span>
              <ChevronRight size={10} />
              <span className="text-slate-900 border-b-2 border-teal-500 pb-0.5">Edit Manifest</span>
            </div>
         </div>

         <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(`/events/${id}`)}
              className="px-6 h-10 flex items-center justify-center gap-2 rounded-xl bg-gray-50 border border-gray-200 text-slate-600 font-bold text-[11px] uppercase tracking-wider hover:bg-gray-100 transition-all shadow-sm"
            >
              <Eye size={16} /> Public View
            </button>
            <button 
              onClick={handleSubmit} disabled={saving || imageUploading || agendaUploading}
              className="px-10 h-10 flex items-center justify-center gap-3 rounded-xl bg-[#0b1120] hover:bg-slate-800 text-white font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-[#0b1120]/10 transition-all active:scale-95 disabled:bg-gray-400"
            >
              {saving ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
              {saving ? 'Saving...' : 'Save Manifest'}
            </button>
         </div>
      </header>

      {/* 2. Main Content - Clean 2 Column Layout */}
      <main className="max-w-7xl mx-auto px-12 py-12">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* LEFT COLUMN: Form Sections */}
            <div className="lg:col-span-2 space-y-12">
               
               {/* Primary Information */}
               <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm space-y-10">
                  <div className="border-l-4 border-teal-700 pl-4">
                    <h3 className="font-bold text-xs tracking-widest uppercase text-slate-800">Basic Information</h3>
                  </div>

                  <div className="space-y-8">
                     <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Event Name</label>
                        <input 
                          type="text" name="title" value={formData.title} onChange={handleInputChange} 
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-teal-500 transition-all text-sm"
                        />
                     </div>

                     <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">About Event</label>
                        <textarea 
                          name="about" value={formData.about} onChange={handleInputChange} rows={6}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-5 font-medium text-slate-700 leading-relaxed focus:outline-none focus:bg-white focus:border-teal-500 transition-all resize-none text-sm"
                        />
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                           <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Start Date & Time</label>
                           <div className="relative">
                              <Clock className="absolute left-5 top-4.5 text-gray-300" size={16} />
                              <input 
                                type="datetime-local" name="startTime" value={formData.startTime} onChange={handleInputChange}
                                min={minDateTime}
                                className="w-full h-14 pl-14 pr-6 bg-gray-50 border border-gray-200 rounded-xl font-bold text-slate-700 text-sm outline-none focus:bg-white focus:border-teal-500 transition-all"
                              />
                           </div>
                        </div>
                        <div>
                           <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">End Date & Time</label>
                           <div className="relative">
                              <Clock className="absolute left-5 top-4.5 text-gray-300" size={16} />
                              <input 
                                type="datetime-local" name="endTime" value={formData.endTime} onChange={handleInputChange}
                                min={formData.startTime || minDateTime}
                                className="w-full h-14 pl-14 pr-6 bg-gray-50 border border-gray-200 rounded-xl font-bold text-slate-700 text-sm outline-none focus:bg-white focus:border-teal-500 transition-all"
                              />
                           </div>
                        </div>
                     </div>

                     <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Select Venue</label>
                        <div className="relative">
                           <MapPin className="absolute left-5 top-4.5 text-gray-300" size={16} />
                           <select 
                             name="venueId" value={formData.venueId} onChange={handleInputChange}
                             className="w-full h-14 pl-14 pr-12 bg-gray-50 border border-gray-200 rounded-xl font-bold text-slate-900 text-sm outline-none focus:bg-white focus:border-teal-500 appearance-none cursor-pointer transition-all"
                           >
                              <option value="">Select Site</option>
                              {venues.map(v => (
                                <option key={v.venueId} value={v.venueId}>{v.name} • {v.location}</option>
                              ))}
                           </select>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Extended Data Forms */}
               <div className="space-y-12">
                  <DynamicJsonForm 
                     initialValue={formData.budgetReport} 
                     onChange={(json) => handleJsonUpdate('budgetReport', json)}
                     title="Budget Breakdown"
                     subtitle="Add items and their costs"
                  />
                  <DynamicJsonForm 
                     initialValue={formData.sponsorships} 
                     onChange={(json) => handleJsonUpdate('sponsorships', json)}
                     title="Sponsorship Tiers"
                     subtitle="List your official sponsors"
                  />
                  <DynamicJsonForm 
                     initialValue={formData.committee} 
                     onChange={(json) => handleJsonUpdate('committee', json)}
                     title="Committee Members"
                     subtitle="Add members and their roles"
                  />
               </div>
            </div>

            {/* RIGHT COLUMN: Visuals & Meta */}
            <div className="space-y-12">
               
               {/* Banner Section */}
               <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm sticky top-32">
                  <div className="border-l-4 border-teal-700 pl-4 mb-8">
                    <h3 className="font-bold text-xs tracking-widest uppercase text-slate-800">Visual Identity</h3>
                  </div>

                  {imagePreview ? (
                    <div className="relative rounded-xl overflow-hidden w-full aspect-square border border-gray-100 shadow-inner group">
                      <img src={imagePreview} alt="Banner" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button type="button" onClick={clearImage} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg active:scale-95">
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer transition-all ${dragOver ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-gray-50 hover:border-teal-400 hover:bg-teal-50/30'}`}
                    >
                      <UploadCloud size={32} className={`mb-3 ${dragOver ? 'text-teal-600' : 'text-gray-300'}`} />
                      <p className="text-[11px] font-bold text-slate-700">Drop banner or <span className="text-teal-600 underline">browse</span></p>
                      <p className="text-[9px] text-gray-400 mt-2 uppercase tracking-widest font-bold">PNG • JPG • WEBP</p>
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" onChange={handleFileInputChange} className="hidden" accept="image/*" />

                  <div className="mt-8 pt-8 border-t border-gray-50">
                     <div className="border-l-4 border-teal-700 pl-4 mb-4">
                       <h3 className="font-bold text-xs tracking-widest uppercase text-slate-800">Event Agenda</h3>
                     </div>
                     {(agendaFile || formData.agendaUrl) ? (
                       <div className="flex items-center justify-between bg-teal-50 border border-teal-100 p-4 rounded-xl">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-teal-600 shadow-sm border border-teal-100">
                             <CheckCircle2 size={18} />
                           </div>
                           <div>
                             <p className="text-xs font-bold text-slate-800">{agendaFile?.name || 'agenda_document.pdf'}</p>
                             <p className="text-[10px] font-bold text-teal-500 uppercase tracking-widest">PDF Ready</p>
                           </div>
                         </div>
                         <button type="button" onClick={clearAgenda} className="bg-red-50 text-red-500 p-2 rounded hover:bg-red-100 transition-colors">
                           <X size={16} />
                         </button>
                       </div>
                     ) : (
                       <div
                         onClick={() => agendaInputRef.current?.click()}
                         className="border-2 border-dashed border-gray-200 bg-gray-50 hover:border-teal-400 hover:bg-teal-50/30 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all"
                       >
                         <UploadCloud size={24} className="mb-2 text-gray-300" />
                         <p className="text-[11px] font-bold text-slate-700">Upload Agenda <span className="text-teal-600 underline">browse</span></p>
                         <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-widest font-bold">PDF Only</p>
                       </div>
                     )}
                     <input ref={agendaInputRef} type="file" onChange={handleAgendaChange} className="hidden" accept="application/pdf" />
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Status</span>
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 size={12} /> Active Node
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                        Data synchronized with university core. All changes are real-time once saved.
                      </p>
                    </div>
                  </div>
               </div>

            </div>

         </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}} />
    </div>
  );
};

export default ModifyEvent;
