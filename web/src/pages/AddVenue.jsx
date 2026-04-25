import React, { useState, useEffect, useRef } from 'react';
import { Pencil, Trash2, Building, Users, MapPin, UploadCloud, X } from 'lucide-react';
import api from '../api/axiosConfig';
import { useToast } from '../contexts/ToastContext';
import ConfirmModal, { defaultConfirmModalState } from '../components/ConfirmModal';

const BASE_URL = 'http://localhost:8080';

const AddVenue = () => {
  const [venues, setVenues] = useState([]);
  const [confirmModal, setConfirmModal] = useState(defaultConfirmModalState);
  const [processingConfirm, setProcessingConfirm] = useState(false);
  const { success, error: toastError } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    description: '',
    venueUrl: '',
    facilities: '',
    booked: false
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const res = await api.get('/api/venues', { withCredentials: true });
      setVenues(res.data.data);
    } catch (error) {
      console.error("Failed to fetch venues", error);
      toastError('Failed to fetch venues.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
    setFormData(prev => ({ ...prev, venueUrl: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.venueUrl; // keep existing URL if no new file
    setImageUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', imageFile);
      const res = await api.post('/api/files/upload', fd, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const filename = res.data.data;
      return `${BASE_URL}/api/files/cdn/${filename}`;
    } catch (err) {
      console.error("Image upload failed", err);
      toastError('Image upload failed. Retaining existing image if available.');
      return formData.venueUrl;
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const uploadedUrl = await uploadImage();

      const payload = {
        name: formData.name,
        location: formData.location,
        capacity: formData.capacity ? parseInt(formData.capacity, 10) : 0,
        description: formData.description,
        venueUrl: uploadedUrl,
        facilities: formData.facilities.split(',').map(f => f.trim()).filter(Boolean),
        booked: formData.booked
      };

      if (editId) {
        await api.put(`/api/venues/${editId}`, payload, { withCredentials: true });
        success('Venue updated successfully.');
      } else {
        await api.post('/api/venues', payload, { withCredentials: true });
        success('Venue created successfully.');
      }

      setFormData({ name: '', location: '', capacity: '', description: '', venueUrl: '', facilities: '', booked: false });
      setEditId(null);
      clearImage();
      fetchVenues();
    } catch (error) {
      console.error("Failed to save venue", error);
      toastError('Failed to save venue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (venue) => {
    setEditId(venue.venueId);
    let cap = venue.capacity || '';
    let desc = venue.description || '';
    if (desc.includes('|||')) {
      const parts = desc.split('|||');
      if (cap === 0 || cap === '') cap = parts[0];
      desc = parts.slice(1).join('|||');
    }
    setFormData({
      name: venue.name,
      location: venue.location,
      capacity: cap,
      description: desc,
      venueUrl: venue.venueUrl || '',
      facilities: venue.facilities ? venue.facilities.join(', ') : '',
      booked: venue.booked
    });
    // Show existing image as preview
    if (venue.venueUrl) {
      setImagePreview(venue.venueUrl);
    } else {
      setImagePreview(null);
    }
    setImageFile(null);
  };

  const openConfirmModal = ({ title, description, confirmText, action }) => {
    setConfirmModal({ open: true, title, description, confirmText, action });
  };

  const closeConfirmModal = () => {
    if (processingConfirm) return;
    setConfirmModal(defaultConfirmModalState);
  };

  const runConfirmAction = async () => {
    if (!confirmModal.action) return;
    setProcessingConfirm(true);
    try {
      await confirmModal.action();
      closeConfirmModal();
    } catch (error) {
      console.error("Confirmation action failed:", error);
      toastError('Failed to perform the action.');
    } finally {
      setProcessingConfirm(false);
    }
  };

  const handleDelete = (id) => {
    openConfirmModal({
      title: 'Delete Venue',
      description: 'Are you sure you want to delete this venue? This action cannot be undone.',
      confirmText: 'Delete Venue',
      action: async () => {
        await api.delete(`/api/venues/${id}`, { withCredentials: true });
        fetchVenues();
        success('Venue deleted successfully.');
      }
    });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({ name: '', location: '', capacity: '', description: '', venueUrl: '', facilities: '', booked: false });
    clearImage();
  };

  return (
    <div className="bg-[#fafafa] font-sans text-left min-h-screen pb-20">
      <main className="max-w-7xl mx-auto p-8 mt-4">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-[#1a1a1a] mb-3 tracking-tight">Venue Management</h1>
          <p className="text-gray-600 text-sm max-w-2xl leading-relaxed">
            Create, update, and manage academic facilities and event spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Form Column */}
          <div className="lg:col-span-1 space-y-6">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
              <div className="border-l-4 border-teal-700 pl-3">
                <h3 className="font-bold text-xs tracking-widest uppercase text-slate-800">
                  {editId ? 'Edit Venue' : 'Create New Venue'}
                </h3>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">Venue Image</label>
                {imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden w-full h-40 group">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={clearImage} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${dragOver ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-gray-50 hover:border-teal-400 hover:bg-teal-50/30'}`}
                  >
                    <UploadCloud size={28} className={`mb-2 ${dragOver ? 'text-teal-600' : 'text-gray-400'}`} />
                    <p className="text-xs font-bold text-slate-700">Drop image or <span className="text-teal-600 underline">click to browse</span></p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">PNG · JPG · WEBP</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">Venue Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g. Main Auditorium"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-teal-500 transition-all" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} required placeholder="e.g. Faculty of Science"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-teal-500 transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">Capacity</label>
                  <input type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} required placeholder="e.g. 500"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-teal-500 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">Status</label>
                  <div className="flex items-center h-[46px] gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 cursor-pointer"
                    onClick={() => setFormData(p => ({ ...p, booked: !p.booked }))}>
                    <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${formData.booked ? 'bg-red-500 border-red-500' : 'bg-white border-gray-300'}`}>
                      {formData.booked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{formData.booked ? 'Booked' : 'Available'}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">Facilities (Comma Separated)</label>
                <input type="text" name="facilities" value={formData.facilities} onChange={handleInputChange} placeholder="WiFi, Projector, AC..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-teal-500 transition-all" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} required
                  placeholder="Brief description of the venue..." rows={3}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-teal-500 transition-all resize-none" />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <button type="submit" disabled={loading || imageUploading}
                  className="w-full sm:flex-1 bg-[#0b1120] hover:bg-slate-800 disabled:bg-gray-400 text-white px-4 py-3 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95">
                  {imageUploading ? 'Uploading Image...' : loading ? 'Saving...' : (editId ? 'Update Venue' : 'Create Venue')}
                </button>
                {editId && (
                  <button type="button" onClick={handleCancelEdit}
                    className="w-full sm:w-auto px-4 py-3 bg-gray-100 hover:bg-gray-200 text-slate-700 rounded-xl text-sm font-bold transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Venue List Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-[#1a1a1a]">Existing Venues</h2>
              <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">{venues.length} Total</span>
            </div>

            <div className="space-y-4 max-h-[680px] overflow-y-auto pr-2 custom-scrollbar">
              {venues.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <Building className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <h3 className="text-sm font-semibold text-gray-900">No venues found</h3>
                  <p className="text-sm text-gray-500 mt-1">Get started by creating a new venue.</p>
                </div>
              ) : (
                venues.map(venue => {
                  let cap = venue.capacity || 'N/A';
                  let desc = venue.description || '';
                  if (desc.includes('|||')) {
                    const parts = desc.split('|||');
                    if (cap === 'N/A' || cap === 0) cap = parts[0];
                    desc = parts.slice(1).join('|||');
                  }

                  return (
                    <div key={venue.venueId} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-teal-300 transition-colors overflow-hidden group">
                      <div className="flex flex-col sm:flex-row">
                        {/* Thumbnail */}
                        <div className="w-full sm:w-32 h-28 sm:h-auto flex-shrink-0 bg-slate-200 relative overflow-hidden">
                          {venue.venueUrl ? (
                            <img src={venue.venueUrl} alt={venue.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-800">
                              <Building size={28} className="text-slate-400" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-bold text-slate-800 text-base">{venue.name}</h4>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${venue.booked ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                {venue.booked ? 'Booked' : 'Available'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-2 flex items-center gap-4">
                              <span className="flex items-center gap-1.5"><MapPin size={13} className="text-gray-400" /> {venue.location}</span>
                              <span className="flex items-center gap-1.5"><Users size={13} className="text-teal-500" /> {cap} Passengers</span>
                            </p>
                            {venue.facilities && venue.facilities.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {venue.facilities.slice(0, 3).map((f, idx) => (
                                  <span key={idx} className="bg-gray-100 text-gray-600 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">{f}</span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button onClick={() => handleEdit(venue)}
                              className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors border border-transparent hover:border-teal-200" title="Edit">
                              <Pencil size={17} />
                            </button>
                            <button onClick={() => handleDelete(venue.venueId)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200" title="Delete">
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}} />

      <ConfirmModal
        modal={confirmModal}
        onConfirm={runConfirmAction}
        onCancel={closeConfirmModal}
        processing={processingConfirm}
      />
    </div>
  );
};

export default AddVenue;