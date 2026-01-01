
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ArrowLeft, 
  User, 
  Grid, 
  List, 
  Lock, 
  ChevronRight, 
  FileText, 
  Mic, 
  IndianRupee, 
  Users,
  Calendar,
  Filter,
  MoreVertical,
  Camera,
  MessageSquarePlus
} from 'lucide-react';
import { MOCK_DATA } from './constants';
import { RecallItem, FilterState, ViewMode } from './types';

// Standard Chat List Data
const CHATS = [
  { id: 1, name: 'Event Planner', message: 'Sent ₹24,000 for venue booking', time: '2:15 PM', unread: 0, avatar: 'https://picsum.photos/seed/planner/100/100' },
  { id: 2, name: 'Ramesh Electric', message: 'The invoice is attached below.', time: '10:45 AM', unread: 2, avatar: 'https://picsum.photos/seed/ramesh/100/100' },
  { id: 3, name: 'Family Group', message: 'Dad: Good morning everyone!', time: '8:00 AM', unread: 0, avatar: 'https://picsum.photos/seed/family/100/100' },
  { id: 4, name: 'Boss', message: 'Voice message (4:32)', time: 'Yesterday', unread: 1, avatar: 'https://picsum.photos/seed/boss/100/100' },
  { id: 5, name: 'Rohan (Roommate)', message: 'Payment received, thanks!', time: 'Nov 10', unread: 0, avatar: 'https://picsum.photos/seed/rohan/100/100' },
  { id: 6, name: 'Sarah', message: 'Are we still on for today?', time: 'Tuesday', unread: 0, avatar: 'https://picsum.photos/seed/sarah/100/100' },
];

const MainHeader: React.FC<{ onSearch: () => void }> = ({ onSearch }) => (
  <header className="px-4 py-4 bg-[#121B20] text-white flex flex-col gap-4 border-b border-[#2A3942]">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold wa-green">WhatsApp</h1>
      <div className="flex items-center gap-6 text-[#8696a0]">
        <Camera className="w-6 h-6" />
        <motion.button whileTap={{ scale: 0.9 }} onClick={onSearch}>
          <Search className="w-6 h-6" />
        </motion.button>
        <MoreVertical className="w-6 h-6" />
      </div>
    </div>
    <div className="flex items-center justify-between text-[#8696a0] font-bold text-sm uppercase tracking-wider px-2">
      <div className="pb-2 border-b-2 border-[#25D366] text-[#25D366] flex-1 text-center">Chats</div>
      <div className="pb-2 flex-1 text-center">Status</div>
      <div className="pb-2 flex-1 text-center">Calls</div>
    </div>
  </header>
);

const SearchHeader: React.FC<{ onBack: () => void; query: string; setQuery: (q: string) => void; paymentsActive: boolean }> = ({ onBack, query, setQuery, paymentsActive }) => (
  <header className="flex items-center gap-3 px-4 py-3 bg-[#121B20] text-white border-b border-[#2A3942] sticky top-0 z-50">
    <motion.button 
      whileTap={{ scale: 0.9 }} 
      onClick={onBack}
      className="text-[#8696a0]"
    >
      <ArrowLeft className="w-6 h-6" />
    </motion.button>
    
    <div className="flex-1 flex items-center gap-3 wa-input px-4 py-2.5 rounded-2xl border border-[#25D366]/30 shadow-[0_0_20px_rgba(37,211,102,0.1)]">
      <AnimatePresence mode="wait">
        {paymentsActive ? (
          <motion.div key="rupee" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
            <IndianRupee className="w-5 h-5 wa-green" />
          </motion.div>
        ) : (
          <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Search className="w-5 h-5 text-[#8696a0]" />
          </motion.div>
        )}
      </AnimatePresence>
      <input 
        autoFocus
        type="text"
        placeholder="Search conversations, bills, notes..."
        className="flex-1 bg-transparent border-none outline-none text-white placeholder-[#8696a0] text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <motion.div 
        animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1.05, 0.95] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Lock className="w-4 h-4 text-[#25D366]/40" />
      </motion.div>
    </div>
  </header>
);

const Chip: React.FC<{ 
  label: string; 
  icon: React.ReactNode; 
  active: boolean; 
  onClick: () => void;
  primary?: boolean;
}> = ({ label, icon, active, onClick, primary }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-xs font-semibold transition-all duration-300 border
      ${active 
        ? 'bg-[#25D366] text-[#121B20] border-[#25D366] shadow-[0_0_15px_rgba(37,211,102,0.3)]' 
        : 'bg-[#1F2C34] text-[#8696a0] border-[#2A3942] hover:border-[#8696a0]'
      } ${primary ? 'ring-1 ring-inset ring-[#25D366]/20' : ''}`}
  >
    {icon}
    {label}
  </motion.button>
);

const ResultCard: React.FC<{ item: RecallItem; viewMode: ViewMode }> = ({ item, viewMode }) => {
  if (viewMode === 'grid') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileTap={{ scale: 0.98 }}
        className="bg-[#1F2C34] rounded-2xl overflow-hidden shadow-xl border border-[#2A3942] group relative"
      >
        <div className="relative aspect-[4/5] bg-[#121B20] flex items-center justify-center">
          {item.screenshotUrl ? (
            <img src={item.screenshotUrl} alt="Visual content" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          ) : (
            <div className="p-6 text-center">
              {item.type === 'doc' && <FileText className="w-12 h-12 wa-green mx-auto mb-2" />}
              {item.type === 'voice' && <Mic className="w-12 h-12 wa-green mx-auto mb-2" />}
              <p className="text-xs text-[#8696a0] uppercase tracking-wider">{item.type}</p>
            </div>
          )}
          {item.amount && (
            <div className="absolute top-3 right-3 bg-[#25D366] text-[#121B20] px-2 py-1 rounded text-[10px] font-bold flex items-center gap-0.5 shadow-lg">
              <IndianRupee className="w-2.5 h-2.5" /> {item.amount.replace('₹', '')}
            </div>
          )}
        </div>
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <img src={item.senderAvatar} className="w-5 h-5 rounded-full border border-[#2A3942]" alt={item.sender} />
            <span className="text-[10px] text-[#8696a0] font-medium truncate">{item.sender}</span>
          </div>
          <p className="text-xs text-white line-clamp-2 leading-tight font-medium">
            {item.type === 'doc' ? item.file : item.text || 'Message context...'}
          </p>
          <p className="text-[9px] text-[#8696a0] mt-2 font-medium">{item.date}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      whileTap={{ scale: 0.99 }}
      className="flex items-start gap-4 p-4 border-b border-[#2A3942] hover:bg-[#2A3942]/20 transition-colors"
    >
      <div className="relative">
        <img src={item.senderAvatar} className="w-12 h-12 rounded-full border border-[#2A3942]" alt={item.sender} />
        <div className={`absolute -bottom-1 -right-1 p-1 rounded-full border border-[#121B20] shadow-sm
          ${item.type === 'payment' ? 'bg-[#25D366]' : 'bg-[#1F2C34]'}`}>
          {item.type === 'payment' && <IndianRupee className="w-2.5 h-2.5 text-[#121B20]" />}
          {item.type === 'doc' && <FileText className="w-2.5 h-2.5 wa-green" />}
          {item.type === 'voice' && <Mic className="w-2.5 h-2.5 wa-green" />}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <h3 className="font-semibold text-white truncate">{item.sender}</h3>
          <span className="text-[10px] text-[#8696a0] font-medium whitespace-nowrap">{item.date}</span>
        </div>
        <div className="flex items-center gap-2">
          {item.type === 'doc' && (
            <div className="flex items-center gap-2 bg-[#121B20] px-3 py-1.5 rounded-xl border border-[#2A3942] w-full mt-1">
              <FileText className="w-4 h-4 text-[#8696a0]" />
              <span className="text-sm text-[#d1d7db] truncate font-medium">{item.file}</span>
            </div>
          )}
          {item.type === 'voice' && (
            <div className="flex items-center gap-2 w-full mt-1">
              <div className="flex-1 bg-[#2A3942] h-1 rounded-full overflow-hidden relative">
                 <div className="absolute inset-0 bg-[#25D366] w-1/3" />
              </div>
              <span className="text-[10px] font-medium text-[#8696a0]">{item.duration}</span>
            </div>
          )}
          {item.type === 'payment' && (
            <p className="text-sm wa-green font-semibold flex items-center gap-1 mt-1">
               {item.text}
            </p>
          )}
          {item.type !== 'doc' && item.type !== 'voice' && item.type !== 'payment' && (
            <p className="text-sm text-[#8696a0] truncate mt-1">{item.text}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [filters, setFilters] = useState<FilterState>({
    last7Days: false,
    clients: false,
    docs: false,
    payments: false,
    longVoice: false,
    excludeGroups: false
  });

  const toggleFilter = (key: keyof FilterState) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredItems = useMemo(() => {
    let result = MOCK_DATA;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.sender.toLowerCase().includes(q) || 
        item.text?.toLowerCase().includes(q) || 
        item.file?.toLowerCase().includes(q)
      );
    }
    if (filters.last7Days) result = result.filter(item => item.date.includes('Today') || item.date.includes('Yesterday'));
    if (filters.docs) result = result.filter(item => item.type === 'doc');
    if (filters.payments) result = result.filter(item => item.type === 'payment');
    if (filters.longVoice) result = result.filter(item => {
      if (item.type !== 'voice') return false;
      const [min] = (item.duration || '0:00').split(':').map(Number);
      return min >= 1;
    });
    if (filters.excludeGroups) result = result.filter(item => !item.isGroup);

    return result;
  }, [searchQuery, filters]);

  useEffect(() => {
    if (filters.payments) setViewMode('grid');
    else if (!filters.payments && isSearching) setViewMode('list');
  }, [filters.payments, isSearching]);

  return (
    <div className="flex justify-center min-h-screen wa-bg-dark text-[#d1d7db] selection:bg-[#25D366]/30">
      <div className="w-full max-w-[480px] bg-[#121B20] min-h-screen relative flex flex-col shadow-2xl overflow-hidden border-x border-[#2A3942]">
        
        <AnimatePresence mode="wait">
          {!isSearching ? (
            <motion.div 
              key="chat-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98, filter: 'blur(5px)' }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="flex flex-col flex-1"
            >
              <MainHeader onSearch={() => setIsSearching(true)} />
              <div className="flex-1 overflow-y-auto">
                {CHATS.map(chat => (
                  <div key={chat.id} className="flex items-center gap-4 px-4 py-3 border-b border-[#2A3942]/30 active:bg-[#2A3942]/50 transition-colors cursor-pointer">
                    <img src={chat.avatar} className="w-14 h-14 rounded-full" alt={chat.name} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-white truncate">{chat.name}</h3>
                        <span className={`text-xs ${chat.unread > 0 ? 'wa-green' : 'text-[#8696a0]'}`}>{chat.time}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-[#8696a0] truncate flex-1">{chat.message}</p>
                        {chat.unread > 0 && (
                          <span className="wa-bg-green text-[#121B20] text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-2 min-w-[18px] text-center">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <motion.div 
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-6 right-6 wa-bg-green p-4 rounded-[18px] shadow-2xl z-10 cursor-pointer"
              >
                <MessageSquarePlus className="w-6 h-6 text-[#121B20]" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="recall-search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="flex flex-col flex-1"
            >
              <SearchHeader 
                onBack={() => { setIsSearching(false); setSearchQuery(''); }} 
                query={searchQuery}
                setQuery={setSearchQuery}
                paymentsActive={filters.payments}
              />

              {/* Smart Filters Chips */}
              <div className="hide-scrollbar overflow-x-auto flex gap-3 px-4 py-4 scroll-smooth">
                <Chip 
                  label="₹ Payments" 
                  icon={<IndianRupee className="w-3.5 h-3.5" />} 
                  active={filters.payments} 
                  onClick={() => toggleFilter('payments')}
                  primary
                />
                <Chip 
                  label="Docs" 
                  icon={<FileText className="w-3.5 h-3.5" />} 
                  active={filters.docs} 
                  onClick={() => toggleFilter('docs')} 
                />
                <Chip 
                  label="Exclude Groups" 
                  icon={<Users className="w-3.5 h-3.5" />} 
                  active={filters.excludeGroups} 
                  onClick={() => toggleFilter('excludeGroups')} 
                />
                <Chip 
                  label="🎤 Voice >1m" 
                  icon={<Mic className="w-3.5 h-3.5" />} 
                  active={filters.longVoice} 
                  onClick={() => toggleFilter('longVoice')} 
                />
                <Chip 
                  label="Last 7 Days" 
                  icon={<Calendar className="w-3.5 h-3.5" />} 
                  active={filters.last7Days} 
                  onClick={() => toggleFilter('last7Days')} 
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#2A3942]/30">
                <h2 className="text-[10px] font-bold text-[#8696a0] uppercase tracking-[0.2em] flex items-center gap-2">
                  <Filter className="w-3 h-3" />
                  {filteredItems.length} Result{filteredItems.length !== 1 ? 's' : ''}
                </h2>
                
                <div className="flex bg-[#1F2C34] rounded-xl p-1 border border-[#2A3942]">
                  <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#2A3942] text-[#25D366] shadow-lg' : 'text-[#8696a0]'}`}>
                    <List className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#2A3942] text-[#25D366] shadow-lg' : 'text-[#8696a0]'}`}>
                    <Grid className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Results */}
              <main className="flex-1 overflow-y-auto px-4 pb-10 hide-scrollbar">
                <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4 pt-4 pb-6' : 'flex flex-col pt-2 pb-6'}>
                  <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => (
                      <ResultCard key={item.id} item={item} viewMode={viewMode} />
                    ))}
                  </AnimatePresence>
                </div>

                {filteredItems.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-64 text-center px-10">
                    <div className="w-20 h-20 rounded-full wa-surface flex items-center justify-center mb-6 border border-[#2A3942]/50 shadow-inner">
                      <Search className="w-10 h-10 opacity-20 text-[#25D366]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No recalls found</h3>
                    <p className="text-sm text-[#8696a0] leading-relaxed">Privacy-first AI couldn't find matches. Try broadening your filters.</p>
                  </motion.div>
                )}
              </main>

              {/* Bottom Privacy Label */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[9px] font-bold text-[#8696a0] opacity-60 uppercase tracking-widest bg-[#121B20]/80 backdrop-blur py-1 px-3 rounded-full border border-[#2A3942]">
                <Lock className="w-2.5 h-2.5" /> End-to-end Encrypted Search
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Background Glow Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-gradient-radial from-[#25D366]/5 to-transparent opacity-10" />
        </div>
      </div>
    </div>
  );
}
