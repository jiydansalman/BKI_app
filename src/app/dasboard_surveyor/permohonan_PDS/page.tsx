import React, { useState } from 'react';
import {
  Home,
  FileText,
  ChevronDown,
  ChevronUp,
  Plus,
  Calendar,
  Edit,
  AlignJustify,
  User,
} from 'lucide-react';

// --- Interfaces ---
interface TableData {
  id: number;
  tanggal: string;
  lokasi: string;
  permohonan: string;
  keperluan: string;
  status: 'Proses' | 'Upload Bukti' | 'Selesai';
}

// --- Mock Data ---
const tableDataMock: TableData[] = [
  { id: 1, tanggal: '02/02/2026', lokasi: 'LAUT JAWA', permohonan: 'PDS', keperluan: 'TRAINING LE...', status: 'Proses' },
  { id: 2, tanggal: '02/02/2026', lokasi: 'LAUT JAWA', permohonan: 'PDS', keperluan: 'TRAINING LE...', status: 'Upload Bukti' },
  { id: 3, tanggal: '02/02/2026', lokasi: 'LAUT JAWA', permohonan: 'PDS', keperluan: 'TRAINING LE...', status: 'Selesai' },
];

export default function PermohonanPDS() {
  // State untuk dropdown sidebar
  const [isPdsOpen, setIsPdsOpen] = useState<boolean>(true);

  // Fungsi handler untuk upload file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi tambahan bisa dilakukan di sini
      alert(`File "${file.name}" dipilih untuk ${documentType}. \nTipe: ${file.type}`);
    }
  };

  const renderStatusBadge = (status: TableData['status']) => {
    switch (status) {
      case 'Proses':
        return <span className="px-3 py-1 bg-red-300 text-red-900 rounded-md font-semibold text-sm">Proses</span>;
      case 'Upload Bukti':
        return <span className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded-md font-semibold text-sm">Upload Bukti</span>;
      case 'Selesai':
        return <span className="px-3 py-1 bg-green-300 text-green-900 rounded-md font-semibold text-sm">Selesai</span>;
      default:
        return null;
    }
  };

  // Komponen Reusable untuk Kolom Upload
  const UploadAction = ({ label }: { label: string }) => (
    <div className="flex items-center gap-2">
      <button className="text-gray-400 hover:text-gray-600 bg-gray-200 p-1 rounded">
        <AlignJustify size={16} />
      </button>
      <label className="cursor-pointer text-white bg-blue-500 hover:bg-blue-600 p-1 rounded flex items-center justify-center">
        <Edit size={16} />
        {/* Input file disembunyikan, hanya menerima jpg dan pdf */}
        <input 
          type="file" 
          accept=".jpg, .jpeg, .pdf" 
          className="hidden" 
          onChange={(e) => handleFileUpload(e, label)} 
        />
      </label>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="text-teal-600 font-bold text-2xl flex items-center">
            <span className="text-teal-500">✔</span>ID<span className="text-blue-900">Survey</span> <span className="text-teal-600 ml-1">bki</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-teal-700 bg-teal-50 rounded-lg">
            <Home size={20} />
            Dashboard
          </a>

          <div>
            <button 
              onClick={() => setIsPdsOpen(!isPdsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-white bg-[#0A8E9A] rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3">
                <FileText size={20} />
                PDS
              </div>
              {isPdsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* Dropdown Menu */}
            {isPdsOpen && (
              <div className="ml-8 mt-2 space-y-2">
                <a href="#" className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-gray-800">
                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                  Permohonan PDS
                </a>
                <a href="#" className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-gray-500 hover:text-gray-800">
                  <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                  Riwayat PDS
                </a>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">Muhammad</p>
              <p className="text-xs text-gray-500">Surveyor</p>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
               <User className="text-gray-500" />
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <h1 className="text-4xl font-bold text-[#1F2937] mb-6">Permohonan PDS</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-pink-50 p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-pink-200 rounded-full text-pink-600">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold">Total Permohonan</p>
                <p className="text-xl font-bold text-gray-900">10</p>
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-orange-200 rounded-full text-orange-600">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold">Menunggu Persetujuan</p>
                <p className="text-xl font-bold text-gray-900">4</p>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-purple-200 rounded-full text-purple-600">
                <Edit size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold">Upload Bukti</p>
                <p className="text-xl font-bold text-gray-900">8</p>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 bg-green-200 rounded-full text-green-600">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold">Selesai</p>
                <p className="text-xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="bg-[#0A8E9A] hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center gap-2 font-medium mb-6">
            <Plus size={18} />
            Buat Permohonan
          </button>

          {/* Filters */}
          <div className="bg-white p-4 rounded-t-xl border border-gray-200">
            <p className="text-sm font-bold text-gray-700 mb-3">Filter</p>
            <div className="grid grid-cols-5 gap-4">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 outline-none focus:border-teal-500">
                <option>Status</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 outline-none focus:border-teal-500">
                <option>Lokasi</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 outline-none focus:border-teal-500">
                <option>Permohonan</option>
              </select>
              <div className="relative">
                <input type="text" placeholder="Tanggal" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 outline-none focus:border-teal-500" />
                <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400" />
              </div>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 outline-none focus:border-teal-500">
                <option>Keperluan</option>
              </select>
            </div>
          </div>

          {/* Table Container - Horizontal Scroll Enabled */}
          <div className="bg-white border-x border-b border-gray-200 overflow-x-auto whitespace-nowrap pb-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#B9C6D3] text-gray-800 text-sm">
                  <th className="py-3 px-6 font-semibold">Tanggal</th>
                  <th className="py-3 px-6 font-semibold">Lokasi</th>
                  <th className="py-3 px-6 font-semibold">Permohonan</th>
                  <th className="py-3 px-6 font-semibold">Keperluan</th>
                  <th className="py-3 px-6 font-semibold text-center">Status</th>
                  <th className="py-3 px-6 font-semibold">Bukti Survey</th>
                  <th className="py-3 px-6 font-semibold">Bukti Transportasi</th>
                  <th className="py-3 px-6 font-semibold">Boarding Pass</th>
                  <th className="py-3 px-6 font-semibold">Bukti Lainnya</th>
                </tr>
              </thead>
              <tbody>
                {tableDataMock.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 text-sm text-gray-800 font-medium">
                    <td className="py-4 px-6">{row.tanggal}</td>
                    <td className="py-4 px-6">{row.lokasi}</td>
                    <td className="py-4 px-6">{row.permohonan}</td>
                    <td className="py-4 px-6">{row.keperluan}</td>
                    <td className="py-4 px-6 text-center">{renderStatusBadge(row.status)}</td>
                    <td className="py-4 px-6"><UploadAction label="Bukti Survey" /></td>
                    <td className="py-4 px-6"><UploadAction label="Bukti Transportasi" /></td>
                    <td className="py-4 px-6"><UploadAction label="Boarding Pass" /></td>
                    <td className="py-4 px-6"><UploadAction label="Bukti Lainnya" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-6 py-4 border-t border-gray-200 rounded-b-xl flex items-center justify-between">
            <p className="text-sm text-gray-500">Menampilkan 1 sampai {tableDataMock.length} dari {tableDataMock.length}</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded text-sm hover:bg-gray-300 font-medium">&lt; Back</button>
              <button className="px-3 py-1 bg-[#0A8E9A] text-white rounded text-sm font-medium">1</button>
              <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded text-sm hover:bg-gray-300 font-medium">Next &gt;</button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}