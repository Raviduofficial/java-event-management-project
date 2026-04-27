import React, { useState, useEffect } from 'react';
import {
  Search, ChevronRight,
  Plus, Building2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const Organizations = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await api.get('/api/auth/users?role=ORGANIZATION', { withCredentials: true });
        if (res.data && res.data.data) {
          setOrganizations(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch organizations', err);
        setError('Failed to load organizations.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizations();
  }, []);

  // Color themes cycling by index since organizationType isn't in the DTO
  const themes = [
    { bg: 'bg-gradient-to-br from-teal-700 to-teal-900', text: 'text-teal-800' },
    { bg: 'bg-gradient-to-br from-blue-600 to-indigo-800', text: 'text-blue-800' },
    { bg: 'bg-gradient-to-br from-purple-500 to-fuchsia-600', text: 'text-purple-600' },
    { bg: 'bg-gradient-to-br from-emerald-500 to-emerald-700', text: 'text-emerald-700' },
    { bg: 'bg-gradient-to-br from-rose-500 to-pink-700', text: 'text-rose-700' },
    { bg: 'bg-gradient-to-br from-amber-500 to-orange-700', text: 'text-amber-700' },
  ];

  const getTheme = (index) => themes[index % themes.length];

  const filteredOrgs = organizations.filter(org =>
    org.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-left pb-20">

      <main className="max-w-7xl mx-auto p-8 mt-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#0e1b35] mb-2">Organizations Overview</h1>
          <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
            Connect with faculty societies, student councils, and interest-based clubs. Discover upcoming events and become an active member of our vibrant community.
          </p>
        </header>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 mb-10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search organizations by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm w-full outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <span className="text-sm text-gray-400 whitespace-nowrap ml-auto">
            {filteredOrgs.length} organization{filteredOrgs.length !== 1 ? 's' : ''} found
          </span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20 text-emerald-500 font-bold">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500 mr-3"></div>
            Loading Organizations...
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-20 bg-white rounded-2xl border border-red-100">
            <Building2 className="mx-auto text-red-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-700">Something went wrong</h3>
            <p className="text-gray-500 text-sm mt-2">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredOrgs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Building2 className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-700">No organizations found</h3>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search term.</p>
          </div>
        )}

        {/* Grid Cards */}
        {!loading && !error && filteredOrgs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {filteredOrgs.map((org, index) => {
              const theme = getTheme(index);
              return (
                <div
                  key={org.userId}
                  onClick={() => navigate(`/organizations/${org.userId}`)}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  <div className={`h-36 ${theme.bg} relative flex items-center justify-center`}>
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 overflow-hidden border-4 border-white">
                      {org.orgUrl ? (
                        <img src={org.orgUrl} alt={org.name} className="w-full h-full object-cover" />
                      ) : (
                        <Building2 className={theme.text} size={28} />
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-[#0e1b35] text-lg mb-1 leading-tight">{org.name}</h3>
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-3 ${theme.text}`}>
                      {org.role ? org.role.replace('_', ' ') : 'ORGANIZATION'}
                    </p>
                    <p className="text-xs text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                      {org.mission || org.history || 'No description available for this organization.'}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
                      <div className="flex gap-6">
                        <div>
                          <p className="text-[10px] text-gray-400 mb-0.5">President</p>
                          <p className="text-sm font-bold text-[#0e1b35] truncate max-w-[80px]">
                            {org.committee?.president || '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 mb-0.5">Email</p>
                          <p className="text-[11px] font-bold text-emerald-500 truncate max-w-[80px]" title={org.email}>
                            {org.email}
                          </p>
                        </div>
                      </div>
                      <button className="min-w-[32px] w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-emerald-500 hover:text-emerald-500 transition-colors">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </main>

    </div>
  );
};

export default Organizations;