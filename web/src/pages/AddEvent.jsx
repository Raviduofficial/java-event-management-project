import React, { useState, useRef } from 'react';
import { 
  ChevronRight, UploadCloud, X, 
  Info, Send, Loader2, Layout, FileText, CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/axiosConfig';

const BASE_URL = 'http://localhost:8080';

const AddEvent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    about: '',
    eventUrl: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    if (!imageFile) return '';
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
      return '';
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.userId) return;
    
    setLoading(true);
    try {
      let uploadedUrl = '';
      if (imageFile) {
        uploadedUrl = await uploadImage();
        if (!uploadedUrl) {
          setLoading(false);
          return;
        }
      }

      await api.post('/api/events', {
        title: formData.title,
        about: formData.about,
        eventUrl: uploadedUrl,
        coordinatorId: user.userId
      }, { withCredentials: true });

      alert("Event proposal submitted successfully!");
      navigate('/coordinator/dashboard');
    } catch (error) {
      console.error("Failed to submit event", error);
      alert("Failed to submit proposal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fafafa] font-['Inter',sans-serif] text-left min-h-screen pb-20">
      <main className="max-w-7xl mx-auto p-8 mt-4">
        
        {/* Breadcrumbs & Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            <span onClick={() => navigate('/coordinator/dashboard')} className="hover:text-teal-600 cursor-pointer transition-colors">Dashboard</span>
            <ChevronRight size={12} />
            <span className="text-slate-900">New Proposal</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#1a1a1a] mb-3 tracking-tight">Create Event Proposal</h1>
          <p className="text-gray-500 text-sm max-w-2xl leading-relaxed font-medium">
            Submit your initial event manifest for review. Once approved, you can define venues, budgets, and personnel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT: Main Form Column */}
          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
              
              <div className="border-l-4 border-teal-700 pl-4">
                <h3 className="font-bold text-xs tracking-widest uppercase text-slate-800">General Manifest</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Manifest Title</label>
                  <input 
                    type="text" name="title" value={formData.title} onChange={handleInputChange} required
                    placeholder="e.g. Annual Tech Symposium 2024" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:bg-white focus:border-teal-500 transition-all font-medium text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Strategic Objective / About</label>
                  <textarea 
                    name="about" value={formData.about} onChange={handleInputChange} required rows={6}
                    placeholder="Describe the purpose and vision of this event..." 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:bg-white focus:border-teal-500 transition-all resize-none font-medium text-sm leading-relaxed"
                  />
                </div>

                {/* Banner Upload Zone - Similar to AddVenue */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">Visual Identity (Banner)</label>
                  {imagePreview ? (
                    <div className="relative rounded-2xl overflow-hidden w-full h-72 group border border-gray-100 shadow-sm">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button type="button" onClick={clearImage} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg active:scale-90">
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
                      className={`border-2 border-dashed rounded-2xl p-16 flex flex-col items-center justify-center cursor-pointer transition-all ${dragOver ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-gray-50 hover:border-teal-400 hover:bg-teal-50/30'}`}
                    >
                      <UploadCloud size={40} className={`mb-3 ${dragOver ? 'text-teal-600' : 'text-gray-400'}`} />
                      <p className="text-sm font-bold text-slate-700">Drop banner image or <span className="text-teal-600 underline">click to browse</span></p>
                      <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-bold">Recommended: 16:9 Aspect Ratio • Max 5MB</p>
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" onChangeCapture={handleFileInputChange} className="hidden" />
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-6 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                    Draft Proposal
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <button 
                      type="button" onClick={() => navigate('/coordinator/dashboard')}
                      className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-slate-600 rounded-xl text-sm font-bold transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" disabled={loading || imageUploading}
                      className="w-full sm:w-auto bg-[#0b1120] hover:bg-slate-800 disabled:bg-gray-400 text-white px-10 py-3.5 rounded-xl text-sm font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                      {loading || imageUploading ? (
                        <><Loader2 className="animate-spin" size={18} /> Submitting...</>
                      ) : (
                        <>Publish Proposal <Send size={16} /></>
                      )}
                    </button>
                  </div>
              </div>
            </form>
          </div>

          {/* RIGHT: Guidelines Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-sm font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-teal-600" size={18} /> Proposal Guidelines
              </h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">1</div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800 mb-1">Clear Objectives</p>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-medium">Define exactly what you aim to achieve with this academic event.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">2</div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800 mb-1">Visual Presence</p>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-medium">Upload a high-quality banner to represent the event's visual brand.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">3</div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800 mb-1">Peer Review</p>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-medium">Once submitted, the proposal enters the PENDING queue for approval.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100/50">
              <div className="w-10 h-10 rounded-xl bg-white text-teal-600 flex items-center justify-center mb-6 shadow-sm">
                <Info size={20} />
              </div>
              <h4 className="font-extrabold text-[#0b1120] text-sm mb-2 uppercase tracking-tight">System Info</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                Initial proposals are restricted to 3 core fields. Full entity definition (Budget, Team, Venue) is unlocked upon approval.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AddEvent;