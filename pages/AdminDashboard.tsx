import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { LogOut, Plus, Trash2, Calendar, Users, MessageSquare, Mail, AlertTriangle } from 'lucide-react';
import { Event, Member, Review, Inquiry } from '../types';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'events' | 'members' | 'reviews' | 'inquiries'>('events');
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    api.logout();
    navigate('/');
  };

  const forceUpdate = () => setRefresh(p => p + 1);

  // Forms State
  const [newEvent, setNewEvent] = useState<Partial<Event>>({ title: '', date: '', type: 'Workshop', isUpcoming: true, description: '', image: 'https://picsum.photos/800/600' });
  const [newMember, setNewMember] = useState<Partial<Member>>({ name: '', role: '', bio: '', joinYear: '', image: 'https://picsum.photos/400/400' });
  const [showForm, setShowForm] = useState(false);

  // Handlers
  const handleDeleteEvent = (id: string) => { api.deleteEvent(id); forceUpdate(); };
  const handleDeleteMember = (id: string) => { api.deleteMember(id); forceUpdate(); };
  const handleDeleteReview = (id: string) => { api.deleteReview(id); forceUpdate(); };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if(newEvent.title) {
        api.addEvent(newEvent as Omit<Event, 'id'>);
        setShowForm(false);
        forceUpdate();
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if(newMember.name) {
        api.addMember(newMember as Omit<Member, 'id'>);
        setShowForm(false);
        forceUpdate();
    }
  };

  // Renderers
  const renderEvents = () => {
    const events = api.getEvents();
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Events</h2>
          <button onClick={() => setShowForm(true)} className="bg-dragon-black text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold uppercase hover:bg-gray-800"><Plus size={16}/> Add Event</button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map(e => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{e.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(e.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold ${e.isUpcoming ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{e.type}</span></td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDeleteEvent(e.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Add Event Modal */}
        {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white p-8 rounded-lg max-w-md w-full">
                    <h3 className="text-xl font-bold mb-4">New Event</h3>
                    <form onSubmit={handleAddEvent} className="space-y-4">
                        <input className="w-full border p-2 rounded" placeholder="Title" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} required />
                        <input className="w-full border p-2 rounded" type="date" value={newEvent.date ? newEvent.date.substring(0,10) : ''} onChange={e => setNewEvent({...newEvent, date: new Date(e.target.value).toISOString()})} required />
                        <input className="w-full border p-2 rounded" placeholder="Description" value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} required />
                        <input className="w-full border p-2 rounded" placeholder="Location" value={newEvent.location || ''} onChange={e => setNewEvent({...newEvent, location: e.target.value})} required />
                         <select className="w-full border p-2 rounded" value={newEvent.type} onChange={e => setNewEvent({...newEvent, type: e.target.value as any})}>
                            <option value="Workshop">Workshop</option>
                            <option value="Tournament">Tournament</option>
                            <option value="Social">Social</option>
                        </select>
                        <div className="flex justify-end gap-2 mt-4">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-dragon-red text-white rounded">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
      </div>
    );
  };

  const renderMembers = () => {
    const members = api.getMembers();
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Members</h2>
          <button onClick={() => setShowForm(true)} className="bg-dragon-black text-white px-4 py-2 rounded flex items-center gap-2 text-sm font-bold uppercase hover:bg-gray-800"><Plus size={16}/> Add Member</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {members.map(m => (
            <div key={m.id} className="bg-white p-4 rounded shadow flex items-center gap-4">
              <img src={m.image} alt={m.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-grow">
                <div className="font-bold">{m.name}</div>
                <div className="text-xs text-gray-500">{m.role}</div>
              </div>
              <button onClick={() => handleDeleteMember(m.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18}/></button>
            </div>
          ))}
        </div>

         {/* Add Member Modal */}
        {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white p-8 rounded-lg max-w-md w-full">
                    <h3 className="text-xl font-bold mb-4">New Member</h3>
                    <form onSubmit={handleAddMember} className="space-y-4">
                        <input className="w-full border p-2 rounded" placeholder="Name" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} required />
                        <input className="w-full border p-2 rounded" placeholder="Role" value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})} required />
                        <textarea className="w-full border p-2 rounded" placeholder="Bio" value={newMember.bio} onChange={e => setNewMember({...newMember, bio: e.target.value})} required />
                        <input className="w-full border p-2 rounded" placeholder="Join Year" value={newMember.joinYear} onChange={e => setNewMember({...newMember, joinYear: e.target.value})} required />
                        <div className="flex justify-end gap-2 mt-4">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-dragon-red text-white rounded">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
      </div>
    );
  };

  const renderInquiries = () => {
      const inquiries = api.getInquiries();
      return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Inquiries & Join Requests</h2>
            {inquiries.length === 0 ? <div className="text-gray-500 italic">No messages yet.</div> : (
                <div className="space-y-4">
                    {inquiries.map(inq => (
                        <div key={inq.id} className="bg-white p-6 rounded shadow border-l-4 border-dragon-gold">
                            <div className="flex justify-between mb-2">
                                <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${inq.type === 'Join' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>{inq.type}</span>
                                <span className="text-xs text-gray-400">{new Date(inq.date).toLocaleDateString()}</span>
                            </div>
                            <h4 className="font-bold">{inq.name} <span className="font-normal text-gray-500 text-sm">&lt;{inq.email}&gt;</span></h4>
                            <p className="text-gray-600 mt-2">{inq.message}</p>
                        </div>
                    ))}
                </div>
            )}
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-dragon-black text-gray-400 flex flex-col">
        <div className="p-6">
            <h1 className="text-white text-xl font-black uppercase tracking-wider">Admin <span className="text-dragon-red">Panel</span></h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button onClick={() => setActiveTab('events')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === 'events' ? 'bg-dragon-red text-white' : 'hover:bg-gray-800'}`}>
            <Calendar size={18}/> Events
          </button>
          <button onClick={() => setActiveTab('members')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === 'members' ? 'bg-dragon-red text-white' : 'hover:bg-gray-800'}`}>
            <Users size={18}/> Members
          </button>
           <button onClick={() => setActiveTab('reviews')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === 'reviews' ? 'bg-dragon-red text-white' : 'hover:bg-gray-800'}`}>
            <MessageSquare size={18}/> Reviews
          </button>
           <button onClick={() => setActiveTab('inquiries')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${activeTab === 'inquiries' ? 'bg-dragon-red text-white' : 'hover:bg-gray-800'}`}>
            <Mail size={18}/> Inquiries
          </button>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-2 text-red-400 hover:text-white transition-colors">
            <LogOut size={18}/> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'members' && renderMembers()}
        {activeTab === 'inquiries' && renderInquiries()}
        {activeTab === 'reviews' && (
            <div>
                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Reviews</h2>
                 <div className="space-y-4">
                     {api.getReviews().map(r => (
                         <div key={r.id} className="bg-white p-4 rounded shadow flex justify-between items-start">
                             <div>
                                 <p className="text-gray-800 italic">"{r.text}"</p>
                                 <div className="text-sm text-gray-500 mt-2">— {r.author}</div>
                             </div>
                             <button onClick={() => handleDeleteReview(r.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16}/></button>
                         </div>
                     ))}
                 </div>
            </div>
        )}
      </main>
    </div>
  );
};

export const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.login(password);
            navigate('/admin');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4 relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
             
             <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md relative z-10">
                 <div className="text-center mb-8">
                     <h2 className="text-3xl font-black uppercase text-dragon-black">Admin Access</h2>
                     <p className="text-gray-500 text-sm mt-2">Restricted Area. Authorized Personnel Only.</p>
                 </div>

                 {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm flex items-center gap-2"><AlertTriangle size={16}/> {error}</div>}

                 <form onSubmit={handleLogin} className="space-y-6">
                     <div>
                         <label className="block text-sm font-bold text-gray-700 mb-1">Passcode</label>
                         <input 
                            type="password" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-dragon-red focus:border-transparent outline-none"
                            placeholder="Enter admin code..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                         />
                     </div>
                     <button type="submit" className="w-full bg-dragon-black text-white font-bold py-3 rounded hover:bg-gray-800 transition-colors uppercase tracking-wider">
                         Authenticate
                     </button>
                 </form>

                 <div className="mt-6 text-center">
                     <p className="text-xs text-gray-400">Hint: The password is <span className="font-mono text-dragon-red font-bold">dragonfist</span></p>
                 </div>
             </div>
        </div>
    )
}