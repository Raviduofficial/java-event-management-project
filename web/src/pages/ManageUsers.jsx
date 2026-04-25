import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, Building2, UserCircle, Search, Plus, 
  Trash2, Edit, X, Phone, Mail, MapPin, 
  ChevronRight, Shield, GraduationCap,
  Image as ImageIcon, Key, Layers, Globe, Fingerprint
} from 'lucide-react';
import api from '../api/axiosConfig';
import { useToast } from '../contexts/ToastContext';
import DynamicJsonForm from '../components/DynamicJsonForm';
import ConfirmModal, { defaultConfirmModalState } from '../components/ConfirmModal';

const BASE_URL = 'http://localhost:8080';

const ManageUsers = () => {
  const [activeTab, setActiveTab] = useState('ORGANIZATION');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  
  // Image State
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { success, error: toastError } = useToast();
  const [confirmModal, setConfirmModal] = useState(defaultConfirmModalState);
  const [processingConfirm, setProcessingConfirm] = useState(false);

  const initialFormState = {
    userName: '',
    name: '',
    email: '',
    password: '',
    telephone: '',
    address: '',
    role: 'ORGANIZATION',
    department: '',
    specialization: '',
    batchName: '',
    year: '',
    committee: {},
    mission: '',
    vision: '',
    history: '',
    orgUrl: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  // Deep Toned Premium Palette
  const tabs = [
    { 
      id: 'ORGANIZATION', 
      label: 'Organizations', 
      icon: Building2, 
      accent: '#0d9488', 
      bg: 'bg-teal-50/50', 
      cardBg: 'bg-teal-50/30',
      border: 'border-teal-100/50',
      text: 'text-teal-700',
      gradient: 'from-teal-600 to-emerald-600'
    },
    { 
      id: 'BATCH_REP', 
      label: 'Coordinators', 
      icon: Layers, 
      accent: '#2563eb', 
      bg: 'bg-blue-50/50', 
      cardBg: 'bg-blue-50/30',
      border: 'border-blue-100/50',
      text: 'text-blue-700',
      gradient: 'from-blue-600 to-indigo-600'
    },
    { 
      id: 'ADMIN_LEC', 
      label: 'Lecturers', 
      icon: GraduationCap, 
      accent: '#7c3aed', 
      bg: 'bg-violet-50/50', 
      cardBg: 'bg-violet-50/30',
      border: 'border-violet-100/50',
      text: 'text-violet-700',
      gradient: 'from-violet-600 to-fuchsia-600'
    }
  ];

  const currentTab = tabs.find(t => t.id === activeTab);

  const baseInputClass = "w-full h-16 px-8 bg-slate-100 border-2 border-slate-200 rounded-[2rem] outline-none focus:bg-white focus:border-slate-800 transition-all font-bold text-slate-900 text-lg shadow-sm";
  const baseTextareaClass = "w-full px-10 py-8 bg-slate-100 border-2 border-slate-200 rounded-[2rem] outline-none focus:bg-white focus:border-slate-800 transition-all text-base font-bold text-slate-900 shadow-sm resize-none";
  const errorBorder = "border-red-500 bg-red-50";

  useEffect(() => {
    fetchUsers(activeTab);
  }, [activeTab]);

  const fetchUsers = async (role) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/auth/users?role=${role}`, { withCredentials: true });
      if (res.data && res.data.data) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.error(`Failed to fetch ${role} list`, error);
      toastError('Failed to fetch users.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setFormErrors(prev => ({ ...prev, orgUrl: undefined }));
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData(prev => ({ ...prev, orgUrl: '' }));
    setFormErrors(prev => ({ ...prev, orgUrl: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validateUserForm = () => {
    const errors = {};
    const trim = (value) => (typeof value === 'string' ? value.trim() : '');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d[\d\s-]{6,}$/;

    if (!trim(formData.name)) {
      errors.name = 'Full name is required.';
    }
    if (!trim(formData.userName)) {
      errors.userName = 'Username is required.';
    }
    if (!editingUser && !trim(formData.password)) {
      errors.password = 'Password is required for new users.';
    }
    if (!trim(formData.email)) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (!trim(formData.telephone)) {
      errors.telephone = 'Phone number is required.';
    } else if (!phoneRegex.test(formData.telephone)) {
      errors.telephone = 'Enter a valid phone number.';
    }
    if (!trim(formData.address)) {
      errors.address = 'Postal address is required.';
    }

    if (activeTab === 'ADMIN_LEC') {
      if (!trim(formData.department)) {
        errors.department = 'Department is required.';
      }
      if (!trim(formData.specialization)) {
        errors.specialization = 'Specialization is required.';
      }
    }

    if (activeTab === 'BATCH_REP') {
      if (!trim(formData.batchName)) {
        errors.batchName = 'Batch name is required.';
      }
      if (!trim(formData.year)) {
        errors.year = 'Academic year is required.';
      } else if (Number(formData.year) <= 0) {
        errors.year = 'Enter a valid year.';
      }
    }

    if (activeTab === 'ORGANIZATION') {
      if (!formData.committee || Object.keys(formData.committee).length === 0) {
        errors.committee = 'Committee structure is required.';
      }
      if (!trim(formData.mission)) {
        errors.mission = 'Mission statement is required.';
      }
      if (!trim(formData.vision)) {
        errors.vision = 'Strategic vision is required.';
      }
      if (!trim(formData.history)) {
        errors.history = 'Organization history is required.';
      }
      if (!formData.orgUrl && !imagePreview) {
        errors.orgUrl = 'Organization image is required.';
      }
    }

    return errors;
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
      console.error('Confirmation action failed:', error);
      toastError('Failed to complete the action.');
    } finally {
      setProcessingConfirm(false);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.orgUrl;
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
      return formData.orgUrl;
    } finally {
      setImageUploading(false);
    }
  };

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({ ...initialFormState, role: activeTab });
    setFormErrors({});
    clearImage();
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormErrors({});
    const mappedData = {
      ...initialFormState,
      userId: user.userId,
      userName: user.userName,
      name: user.name,
      email: user.email,
      telephone: user.telephone,
      address: user.address,
      role: user.role,
      password: ''
    };

    if (user.role === 'ADMIN_LEC') {
      mappedData.department = user.department || '';
      mappedData.specialization = user.specialization || '';
    } else if (user.role === 'BATCH_REP') {
      mappedData.batchName = user.batchName || '';
      mappedData.year = user.year || '';
    } else if (user.role === 'ORGANIZATION') {
      mappedData.committee = user.committee || {};
      mappedData.mission = user.mission || '';
      mappedData.vision = user.vision || '';
      mappedData.history = user.history || '';
      mappedData.orgUrl = user.orgUrl || '';
      setImagePreview(user.orgUrl || null);
    }

    setFormData(mappedData);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateUserForm();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      toastError('Please fix the highlighted fields before submitting.');
      return;
    }

    setFormLoading(true);
    try {
      let uploadedUrl = formData.orgUrl;
      if (formData.role === 'ORGANIZATION' && imageFile) {
        uploadedUrl = await uploadImage();
      }

      const payload = { ...formData, orgUrl: uploadedUrl };

      if (editingUser) {
        await api.put(`/api/auth/update/${editingUser.userId}`, payload, { withCredentials: true });
        success('User updated successfully.');
      } else {
        await api.post('/api/auth/register', payload, { withCredentials: true });
        success('User created successfully.');
      }
      
      setIsModalOpen(false);
      fetchUsers(activeTab);
    } catch (error) {
      console.error("Form submission failed", error);
      toastError(error.response?.data?.message || 'Action failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = (userId) => {
    openConfirmModal({
      title: 'Delete User',
      description: 'Are you sure you want to permanently delete this user? This action cannot be undone.',
      confirmText: 'Delete User',
      action: async () => {
        await api.delete(`/api/auth/${userId}`, { withCredentials: true });
        fetchUsers(activeTab);
        success('User deleted successfully.');
      }
    });
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans text-slate-800">
      
      {/* 1. Sidebar - Ultra Deep Glassmorphism */}
      <aside className="w-72 bg-[#0f172a] flex flex-col pt-10 relative z-20">
        <div className="px-8 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-indigo-500/40">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-white leading-none">RUTECH</h2>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Administrative Layer</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <p className="px-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">User Gallery</p>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] transition-all duration-300 relative group overflow-hidden ${
                  isActive 
                  ? 'bg-slate-800 text-white font-bold shadow-lg shadow-black/20' 
                  : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {isActive && (
                  <div className={`absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b ${tab.gradient} rounded-full`}></div>
                )}
                <tab.icon size={18} className={isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-400'} />
                <span className="text-sm tracking-wide">{tab.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400"></div>}
              </button>
            );
          })}
        </nav>

        <div className="p-8">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-[2rem] p-6 text-white overflow-hidden relative group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${currentTab.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}></div>
            <Globe size={20} className="mb-4 text-slate-500" />
            <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400">Total Users</h4>
            <div className="text-2xl font-black mt-1 leading-none">{users?.length}</div>
            <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-widest">Active Accounts</p>
          </div>
        </div>
      </aside>

      {/* 2. Main content - Less White, More Sophisticated Tones */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Soft Toned Header */}
        <header className="h-24 px-12 flex items-center justify-between shrink-0 bg-slate-100/40 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                {currentTab.label}
              </h3>
              <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${currentTab.border} ${currentTab.bg} ${currentTab.text}`}>
                Authorized View
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder={`Search ${currentTab.label.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 h-12 bg-slate-200/50 border border-slate-300/40 rounded-2xl text-sm w-72 outline-none focus:bg-white focus:ring-4 focus:ring-slate-200/50 focus:border-slate-400 transition-all font-semibold placeholder:text-slate-500 shadow-inner"
              />
            </div>
            <button 
              onClick={openAddModal}
              className={`bg-slate-900 hover:bg-black text-white px-8 h-12 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2.5 transition-all active:scale-95 shadow-2xl shadow-slate-300`}
            >
              <Plus size={18} /> Add Entry
            </button>
          </div>
        </header>

        {/* Listing Area - Soft backgrounds */}
        <div className="flex-1 p-12 overflow-auto custom-scrollbar">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center gap-6">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Loading Users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-40">
              <div className="w-24 h-24 bg-slate-200 rounded-[2.5rem] flex items-center justify-center mb-6">
                <Layers size={32} className="text-slate-400" />
              </div>
              <p className="font-black text-[10px] uppercase tracking-widest">No matching records found</p>
            </div>
          ) : (
            <div className="bg-white/60 backdrop-blur-sm rounded-[3rem] border border-slate-200/80 overflow-hidden shadow-2xl shadow-slate-200/40">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200/60 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    <th className="px-10 py-7">Identify</th>
                    <th className="px-10 py-7">Contact Details</th>
                    <th className="px-10 py-7">Additional Info</th>
                    <th className="px-10 py-7 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  {filteredUsers.map(user => (
                    <tr key={user.userId} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-10 py-9">
                        <div className="flex items-center gap-5">
                          <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-2xl shadow-xl border-4 border-white overflow-hidden ${currentTab.cardBg} ${currentTab.text} shadow-slate-200`}>
                            {user.role === 'ORGANIZATION' && user.orgUrl ? <img src={user.orgUrl} className="w-full h-full object-cover" /> : user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-black text-slate-900 text-lg mb-0.5 tracking-tight">{user.name}</div>
                            <div className="flex items-center gap-2 opacity-60">
                              <span className="text-[9px] font-black bg-slate-200 px-2.5 py-0.5 rounded-full text-slate-600 tracking-tighter uppercase font-mono">@{user.userName}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-9">
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-3 text-[13px] text-slate-700 font-bold group-hover:text-indigo-600 transition-colors">
                            <Mail size={14} className="opacity-40" /> {user.email}
                          </div>
                          <div className="flex items-center gap-3 text-[13px] text-slate-500 font-semibold">
                            <Phone size={14} className="opacity-40" /> {user.telephone}
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-9">
                        <div className="space-y-2">
                          <div className="text-[12px] font-black text-slate-800 tracking-tight">
                            {user.role === 'ADMIN_LEC' ? user.department : user.role === 'BATCH_REP' ? user.batchName : 'University Society'}
                          </div>
                          <div className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider inline-block border ${currentTab.border} ${currentTab.bg} ${currentTab.text}`}>
                            {user.role === 'ADMIN_LEC' ? user.specialization : user.role === 'BATCH_REP' ? `BATCH OF ${user.year}` : 'Verified Entity'}
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-9 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                          <button 
                            onClick={() => openEditModal(user)}
                            className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-2xl transition-all"
                          >
                            <Edit size={20} />
                          </button>
                          <button 
                            onClick={() => handleDelete(user.userId)}
                            className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* 3. CRUD Modal - Refined Colors, Toned Backgrounds */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-slate-900/80 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="bg-[#f8fafc] rounded-[4rem] w-full max-w-5xl max-h-[92vh] flex flex-col shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] scale-in-center overflow-hidden border border-slate-700/30">
            
            <header className="px-16 py-12 flex items-center justify-between shrink-0 border-b border-slate-200">
              <div>
                <h4 className="text-3xl font-black text-slate-900 tracking-tighter">
                  {editingUser ? 'Edit User' : 'Register New User'}
                </h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Account Type: {activeTab}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-14 h-14 flex items-center justify-center rounded-[1.5rem] bg-slate-200/50 hover:bg-slate-200 hover:text-slate-900 text-slate-500 transition-all active:scale-90"
              >
                <X size={28} />
              </button>
            </header>

            <form onSubmit={handleSubmit} className="flex-1 overflow-auto custom-scrollbar px-16 py-12 space-y-16">
              
              {/* Image Segment */}
              {activeTab === 'ORGANIZATION' && (
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-44 h-44 rounded-[3.5rem] bg-slate-200 border-8 border-slate-100 shadow-2xl overflow-hidden flex items-center justify-center group-hover:scale-105 transition-all duration-500">
                      {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <ImageIcon size={56} className="text-slate-400" />}
                    </div>
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-2 -right-2 w-14 h-14 bg-[#0f172a] text-white rounded-[1.5rem] flex items-center justify-center border-4 border-[#f8fafc] shadow-2xl hover:bg-indigo-600 transition-all active:scale-90"
                    >
                      <Plus size={24} />
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                  </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-6">Upload Profile Image</p>
                    {formErrors.orgUrl && <p className="mt-2 text-xs text-red-600">{formErrors.orgUrl}</p>}
                </div>
              )}

              {/* Core Field Manifest */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                <div className="space-y-10">
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block px-1 group-focus-within:text-slate-900 transition-colors">Full Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleInputChange} required
                      className={`${baseInputClass} ${formErrors.name ? errorBorder : ''}`}
                      placeholder="e.g. John Doe"
                    />
                    {formErrors.name && <p className="mt-2 text-xs text-red-600">{formErrors.name}</p>}
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block px-1 group-focus-within:text-slate-900 transition-colors">Username <span className="text-red-500">*</span></label>
                    <input 
                      type="text" name="userName" value={formData.userName} onChange={handleInputChange} required
                      className={`${baseInputClass} ${formErrors.userName ? errorBorder : ''}`}
                      placeholder="e.g. johndoe_99"
                    />
                    {formErrors.userName && <p className="mt-2 text-xs text-red-600">{formErrors.userName}</p>}
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block px-1 group-focus-within:text-slate-900 transition-colors">
                      {editingUser ? 'Reset Password (Optional)' : 'Password'} {!editingUser && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <Key size={18} className="absolute left-7 top-5.5 text-slate-400" />
                      <input 
                        type="password" name="password" value={formData.password} onChange={handleInputChange} required={!editingUser}
                        className={`${baseInputClass} pl-16 pr-8 ${formErrors.password ? errorBorder : ''}`}
                        placeholder={editingUser ? "Leave blank to keep unchanged" : "••••••••"}
                      />
                      {formErrors.password && <p className="mt-2 text-xs text-red-600">{formErrors.password}</p>}
                    </div>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block px-1 group-focus-within:text-slate-900 transition-colors">Email Address <span className="text-red-500">*</span></label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleInputChange} required
                      className={`${baseInputClass} ${formErrors.email ? errorBorder : ''}`}
                      placeholder="example@email.com"
                    />
                    {formErrors.email && <p className="mt-2 text-xs text-red-600">{formErrors.email}</p>}
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block px-1 group-focus-within:text-slate-900 transition-colors">Phone Number <span className="text-red-500">*</span></label>
                    <input 
                      type="text" name="telephone" value={formData.telephone} onChange={handleInputChange} required
                      className={`${baseInputClass} ${formErrors.telephone ? errorBorder : ''}`}
                      placeholder="+94 7X XXX XXXX"
                    />
                    {formErrors.telephone && <p className="mt-2 text-xs text-red-600">{formErrors.telephone}</p>}
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block px-1 group-focus-within:text-slate-900 transition-colors">Postal Address <span className="text-red-500">*</span></label>
                    <input 
                      type="text" name="address" value={formData.address} onChange={handleInputChange} required
                      className={`${baseInputClass} ${formErrors.address ? errorBorder : ''}`}
                      placeholder="City, Street, Building"
                    />
                    {formErrors.address && <p className="mt-2 text-xs text-red-600">{formErrors.address}</p>}
                  </div>
                </div>
              </div>

              {/* Categorical Data Blobs - No Header */}
              <div className="space-y-12">
                {activeTab === 'ADMIN_LEC' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-100 p-12 rounded-[3.5rem] border border-slate-200">
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">Department <span className="text-red-500">*</span></label>
                      <input type="text" name="department" value={formData.department} onChange={handleInputChange} required
                        className={`${baseInputClass} ${formErrors.department ? errorBorder : ''}`} />
                      {formErrors.department && <p className="mt-2 text-xs text-red-600">{formErrors.department}</p>}
                    </div>
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">Specialization <span className="text-red-500">*</span></label>
                      <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} required
                        className={`${baseInputClass} ${formErrors.specialization ? errorBorder : ''}`} />
                      {formErrors.specialization && <p className="mt-2 text-xs text-red-600">{formErrors.specialization}</p>}
                    </div>
                  </div>
                )}

                {activeTab === 'BATCH_REP' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-100 p-12 rounded-[3.5rem] border border-slate-200">
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">Batch Name <span className="text-red-500">*</span></label>
                      <input type="text" name="batchName" value={formData.batchName} onChange={handleInputChange} required
                        className={`${baseInputClass} ${formErrors.batchName ? errorBorder : ''}`} />
                      {formErrors.batchName && <p className="mt-2 text-xs text-red-600">{formErrors.batchName}</p>}
                    </div>
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">Academic Year <span className="text-red-500">*</span></label>
                      <input type="number" name="year" value={formData.year} onChange={handleInputChange} required
                        className={`${baseInputClass} ${formErrors.year ? errorBorder : ''}`} />
                      {formErrors.year && <p className="mt-2 text-xs text-red-600">{formErrors.year}</p>}
                    </div>
                  </div>
                )}

                {activeTab === 'ORGANIZATION' && (
                  <div className="bg-slate-100 p-12 rounded-[3.5rem] border border-slate-200 space-y-12">
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block px-1">Committee Structure <span className="text-red-500">*</span></label>
                      <DynamicJsonForm 
                        key={editingUser?.userId || 'new'}
                        initialValue={formData.committee}
                        onChange={(json) => {
                          setFormData(prev => ({ ...prev, committee: json }));
                          setFormErrors(prev => ({ ...prev, committee: undefined }));
                        }}
                      />
                      {formErrors.committee && <p className="mt-2 text-xs text-red-600">{formErrors.committee}</p>}
                    </div>
                    <div className="group">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">Organization Mission <span className="text-red-500">*</span></label>
                      <textarea name="mission" value={formData.mission} onChange={handleInputChange} rows={3} required
                        className={`${baseTextareaClass} ${formErrors.mission ? errorBorder : ''}`} />
                      {formErrors.mission && <p className="mt-2 text-xs text-red-600">{formErrors.mission}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="group">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">Strategic Vision <span className="text-red-500">*</span></label>
                        <textarea name="vision" value={formData.vision} onChange={handleInputChange} rows={5} required
                          className={`${baseTextareaClass} ${formErrors.vision ? errorBorder : ''}`} />
                      {formErrors.vision && <p className="mt-2 text-xs text-red-600">{formErrors.vision}</p>}
                      </div>
                      <div className="group">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block">Organization History <span className="text-red-500">*</span></label>
                        <textarea name="history" value={formData.history} onChange={handleInputChange} rows={5} required
                          className={`${baseTextareaClass} ${formErrors.history ? errorBorder : ''}`} />
                        {formErrors.history && <p className="mt-2 text-xs text-red-600">{formErrors.history}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Terminal Operations */}
              <div className="flex justify-end gap-6 pt-6 pb-12">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-12 h-16 rounded-[2rem] text-[11px] font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest">Cancel</button>
                <button type="submit" disabled={formLoading || imageUploading} className="bg-slate-900 hover:bg-black disabled:bg-slate-300 text-white px-16 h-16 rounded-[2rem] text-[11px] font-black shadow-2xl transition-all active:scale-95 flex items-center gap-4 uppercase tracking-[0.2em]">
                  {(formLoading || imageUploading) ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : (editingUser ? 'Save Changes' : 'Create Account')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Internal Engine Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
        
        .scale-in-center { animation: scale-in-center 0.5s cubic-bezier(0.190, 1.000, 0.220, 1.000) both; }
        @keyframes scale-in-center {
          0% { transform: scale(0.97); opacity: 0; filter: blur(5px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
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

export default ManageUsers;
