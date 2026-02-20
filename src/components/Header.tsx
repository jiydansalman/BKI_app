"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, User, LogOut } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ nama: string; role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <header className="h-20 flex items-center justify-end px-10 relative bg-transparent">
      <div 
        className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Info Text */}
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-gray-800 leading-tight">
            {user?.nama || 'Muhammad'}
          </p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            {user?.role || 'Surveyor'}
          </p>
        </div>

        {/* Profile Image */}
        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-white">
          <img 
            src="/images/avatar-muhammad.jpg" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>

        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-20 right-10 w-48 bg-white rounded-2xl shadow-xl border border-gray-50 py-2 z-50 animate-in fade-in zoom-in duration-150">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <User size={16} /> Profil Saya
          </button>
          <div className="border-t border-gray-50 my-1"></div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </header>
  );
}