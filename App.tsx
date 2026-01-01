
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
  Filter
} from 'lucide-react';
import { MOCK_DATA } from './constants';
import { RecallItem, FilterState, ViewMode } from './types';

// Sub-components defined inside to maintain order and context
const Header: React.FC = () => (
  <header className="flex items-center justify-between px-4 py-3 bg-[#121B20] text-white border-b border-[#2A3942] z-50">
    <div className="flex items-center gap-4">
      <motion.div whileTap={{ scale: 0.9 }}>
        <ArrowLeft className="w-6 h-6 text-[#8696a0]" />
      </motion.div>
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">Smart Recall</h1>
        <span className="text-xs text-[#25D366] font-medium flex items-center gap-1">
          <Lock className="w-2.5 h-2.5" /> Private AI Search
        </span>
      </div>
    </div>
    <motion.div whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full overflow-hidden border border-[#2A3942]">
      <img src="https://picsum.photos/seed/me/100/100" alt="Profile" className="w-full h-full object-cover" />
    </motion.div>
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
    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 border
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
        className="bg-[#1F2C34] rounded-2xl overflow-hidden shadow-xl border border-[#2A3942] group"
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
            <div className="absolute top-3 right-3 bg-[#25D366] text-[#121B20] px-2 py-1 rounded text-xs font-bold flex items-center gap-0.5">
              <IndianRupee className="w-3 h-3" /> {item.amount.replace('₹', '')}
            </div>
          )}
        </div>
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <img src={item.senderAvatar} className="w-5 h-5 rounded-full" alt={item.sender} />
            <span className="text-[10px] text-[#8696a0] font-medium truncate">{item.sender}</span>
          </div>
          <p className="text-xs text-white line-clamp-2 leading-relaxed">
            {item.type === 'doc' ? item.file : item.text || 'Message context...'}
          </p>
          <p className="text-[9px] text-[#8696a0] mt-2">{item.date}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileTap={{ scale: 0.99 }}
      className="flex items-start gap-4 p-4 border-b border-[#2A3942] hover:bg-[#2A3942]/30 transition-colors"
    >
      <div className="relative">
        <img src={item.senderAvatar} className="w-12 h-12 rounded-full border border-[#2A3942]" alt={item.sender} />
        <div className={`absolute -bottom-1 -right-1 p-1 rounded-full border border-[#121B20] 
          ${item.type === 'payment' ? 'bg-[#25D366]' : 'bg-[#1F2C34]'}`}>
          {item.type === 'payment' && <IndianRupee className="w-2.5 h-2.5 text-[#121B20]" />}
          {item.type === 'doc' && <FileText className="w-2.5 h-2.5 wa-green" />}
          {item.type === 'voice' && <Mic className="w-2.5 h-2.5 wa-green" />}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <h3 className="font-semibold text-white truncate">{item.sender}</h3>
          <span className="text-xs text-[#8696a0] whitespace-nowrap">{item.date}</span>
        </div>
        <div className="flex items-center gap-2">
          {item.type === 'doc' && (
            <div className="flex items-center gap-2 bg-[#121B20] px-2 py-1 rounded border border-[#2A3942] w-full mt-1">
              <FileText className="w-4 h-4 text-[#8696a0]" />
              <span className="text-sm text-[#d1d7db] truncate">{item.file}</span>
            </div>
          )}
          {item.type === 'voice' && (
            <div className="flex items-center gap-2 w-full mt-1">
              <div className="flex-1 bg-[#2A3942] h-1.5 rounded-full overflow-hidden relative">
                 <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-transparent w-1/3" />
              </div>
              <span className="text-xs text-[#8696a0]">{item.duration}</span>
            </div>
          )}
          {item.type === 'payment' && (
            <p className="text-sm wa-green font-medium flex items-center gap-1 mt-1">
               {item.text}
            </p>
          )}
          {item.type === 'noise' || item.type === 'media' && !item.amount ? (
            <p className="text-sm text-[#8696a0] truncate mt-1">{item.text}</p>
          ) : null}
        </div>
        {item.context && <p className="text-xs text-[#8696a0] italic mt-1">Found in: {item.context}</p>}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
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

    if (filters.last7Days) {
      result = result.filter(item => item.date.includes('Today') || item.date.includes('Yesterday'));
    }
    if (filters.clients) {
      result = result.filter(item => !item.sender.includes('Group'));
    }
    if (filters.docs) {
      result = result.filter(item => item.type === 'doc');
    }
    if (filters.payments) {
      result = result.filter(item => item.type === 'payment');
    }
    if (filters.longVoice) {
      result = result.filter(item => {
        if (item.type !== 'voice') return false;
        const [min] = (item.duration || '0:00').split(':').map(Number);
        return min >= 1;
      });
    }
    if (filters.excludeGroups) {
      result = result.filter(item => !item.isGroup);
    }

    return result;
  }, [searchQuery, filters]);

  // When payments is active, force grid view for that "visual finance" feel
  useEffect(() => {
    if (filters.payments) setViewMode('grid');
    else setViewMode('list');
  }, [filters.payments]);

  return (
    <div className="flex justify-center min-h-screen wa-bg-dark text-[#d1d7db]">
      {/* Mobile Frame */}
      <div className="w-full max-w-[480px] bg-[#121B20] min-h-screen relative flex flex-col shadow-2xl overflow-hidden border-x border-[#2A3942]">
        
        <Header />

        {/* Search Bar Container */}
        <div className="px-4 pt-4 pb-2 z-40 bg-[#121B20]">
          <motion.div 
            animate={{ 
              borderColor: isFocused ? '#25D366' : '#2A3942',
              scale: isFocused ? 1.01 : 1
            }}
            className="flex items-center gap-3 wa-input px-4 py-3 rounded-2xl border border-[#2A3942] transition-all"
          >
            <AnimatePresence mode="wait">
              {filters.payments ? (
                <motion.div
                  key="rupee"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <IndianRupee className="w-5 h-5 wa-green" />
                </motion.div>
              ) : (
                <motion.div
                  key="search"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Search className="w-5 h-5 text-[#8696a0]" />
                </motion.div>
              )}
            </AnimatePresence>
            
            <input 
              type="text"
              placeholder="Search conversations, bills, notes..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-[#8696a0]"
              onFocus={() => setIsFocused(true)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <motion.div 
              animate={{ 
                opacity: [0.4, 1, 0.4],
                scale: [0.95, 1.05, 0.95]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Lock className="w-4 h-4 text-[#25D366]/60" />
            </motion.div>
          </motion.div>
        </div>

        {/* Smart Chips Section */}
        <div className="relative overflow-hidden">
          <AnimatePresence>
            {isFocused && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="hide-scrollbar overflow-x-auto flex gap-3 px-4 py-3"
              >
                <Chip 
                  label="Payments" 
                  icon={<IndianRupee className="w-4 h-4" />} 
                  active={filters.payments} 
                  onClick={() => toggleFilter('payments')}
                  primary
                />
                <Chip 
                  label="Docs" 
                  icon={<FileText className="w-4 h-4" />} 
                  active={filters.docs} 
                  onClick={() => toggleFilter('docs')} 
                />
                <Chip 
                  label="Exclude Groups" 
                  icon={<Users className="w-4 h-4" />} 
                  active={filters.excludeGroups} 
                  onClick={() => toggleFilter('excludeGroups')} 
                />
                <Chip 
                  label="Voice >1m" 
                  icon={<Mic className="w-4 h-4" />} 
                  active={filters.longVoice} 
                  onClick={() => toggleFilter('longVoice')} 
                />
                <Chip 
                  label="Last 7 Days" 
                  icon={<Calendar className="w-4 h-4" />} 
                  active={filters.last7Days} 
                  onClick={() => toggleFilter('last7Days')} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View Toggle - Only show when results exist */}
        <AnimatePresence>
          {filteredItems.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between px-4 py-2"
            >
              <h2 className="text-xs font-bold text-[#8696a0] uppercase tracking-widest flex items-center gap-2">
                <Filter className="w-3 h-3" />
                {filteredItems.length} Result{filteredItems.length !== 1 ? 's' : ''}
              </h2>
              
              <div className="flex bg-[#1F2C34] rounded-lg p-1 border border-[#2A3942]">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-[#2A3942] text-white shadow-sm' : 'text-[#8696a0]'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#2A3942] text-white shadow-sm' : 'text-[#8696a0]'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Body */}
        <main className="flex-1 overflow-y-auto px-4 pb-10">
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4 pt-4' : 'flex flex-col pt-2'}>
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <ResultCard key={item.id} item={item} viewMode={viewMode} />
              ))}
            </AnimatePresence>
          </div>

          {filteredItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-64 text-[#8696a0] text-center px-10"
            >
              <div className="w-20 h-20 rounded-full wa-surface flex items-center justify-center mb-6">
                <Search className="w-10 h-10 opacity-20" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No recalls found</h3>
              <p className="text-sm">Try using simpler keywords or clearing your active filters.</p>
            </motion.div>
          )}
        </main>

        {/* Floating Action Hint */}
        <AnimatePresence>
          {!isFocused && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-6 right-6 wa-bg-green p-4 rounded-full shadow-2xl z-50 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFocused(true)}
            >
              <Search className="w-6 h-6 text-[#121B20]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Background Pulse */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-gradient-radial from-[#25D366]/5 to-transparent opacity-20" />
        </div>
      </div>
    </div>
  );
}
