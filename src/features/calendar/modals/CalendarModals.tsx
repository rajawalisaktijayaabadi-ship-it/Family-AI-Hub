import React, { useState } from 'react';
import { X, Calendar, Plus, Utensils, ShoppingCart, Users, Bell } from 'lucide-react';
import { useCalendarStore } from '../../../stores/useCalendarStore';
import { EventCategory, GroceryCategory, FamilyEventCategory } from '../../../types/calendar';

interface CalendarModalsProps {
  activeModal: 'event' | 'meal' | 'grocery' | 'familyEvent' | 'reminder' | 'recipe' | null;
  onClose: () => void;
}

export const CalendarModals: React.FC<CalendarModalsProps> = ({ activeModal, onClose }) => {
  const {
    addEvent,
    addMealPlan,
    addGrocery,
    addFamilyEvent,
    addReminder,
    addRecipe,
  } = useCalendarStore();

  // Event State
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<EventCategory>('Keluarga');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [eventTime, setEventTime] = useState('10:00');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDesc, setEventDesc] = useState('');

  // Meal State
  const [mealDate, setMealDate] = useState(new Date().toISOString().split('T')[0]);
  const [mealType, setMealType] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'>('Breakfast');
  const [mealName, setMealName] = useState('');
  const [mealCalories, setMealCalories] = useState(300);

  // Grocery State
  const [groceryName, setGroceryName] = useState('');
  const [groceryCategory, setGroceryCategory] = useState<GroceryCategory>('Sayur');
  const [groceryQty, setGroceryQty] = useState(1);
  const [groceryUnit, setGroceryUnit] = useState('kg');
  const [groceryPriority, setGroceryPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  // Family Event State
  const [feTitle, setFeTitle] = useState('');
  const [feCategory, setFeCategory] = useState<FamilyEventCategory>('Family Gathering');
  const [feDate, setFeDate] = useState('');
  const [feLocation, setFeLocation] = useState('');
  const [feBudget, setFeBudget] = useState(1000000);
  const [feDesc, setFeDesc] = useState('');

  // Reminder State
  const [remTitle, setRemTitle] = useState('');
  const [remTime, setRemTime] = useState('08:00');

  // Recipe State
  const [recName, setRecName] = useState('');
  const [recCategory, setRecCategory] = useState<'Healthy Menu' | 'Family Menu' | 'Kids Menu' | 'Budget Menu' | 'Quick Meal'>('Healthy Menu');
  const [recIngredients, setRecIngredients] = useState('');
  const [recDuration, setRecDuration] = useState(20);
  const [recCalories, setRecCalories] = useState(250);

  if (!activeModal) return null;

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;
    addEvent({
      title: eventTitle,
      category: eventCategory,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      description: eventDesc,
      participants: ['Keluarga'],
      reminderFrequency: 'One Time',
      isCompleted: false,
    });
    onClose();
  };

  const handleCreateMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealName.trim()) return;
    addMealPlan({
      date: mealDate,
      mealType,
      recipeName: mealName,
      caloriesEstimate: Number(mealCalories),
      assignedMember: 'Ibu',
    });
    onClose();
  };

  const handleCreateGrocery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groceryName.trim()) return;
    addGrocery({
      itemName: groceryName,
      category: groceryCategory,
      quantity: Number(groceryQty),
      unit: groceryUnit,
      priority: groceryPriority,
      status: 'Belum Dibeli',
    });
    onClose();
  };

  const handleCreateFamilyEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feTitle.trim()) return;
    addFamilyEvent({
      title: feTitle,
      category: feCategory,
      date: feDate || new Date().toISOString().split('T')[0],
      location: feLocation,
      organizer: 'Ayah & Ibu',
      budgetEstimate: Number(feBudget),
      actualSpent: 0,
      participantsCount: 4,
      description: feDesc,
    });
    onClose();
  };

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remTitle.trim()) return;
    addReminder({
      title: remTitle,
      reminderTime: remTime,
      frequency: 'Daily',
      isActive: true,
    });
    onClose();
  };

  const handleCreateRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recName.trim()) return;
    addRecipe({
      name: recName,
      category: recCategory,
      ingredients: recIngredients.split(',').map((s) => s.trim()).filter(Boolean),
      steps: ['Siapkan bahan', 'Masak hingga matang dan sajikan'],
      durationMinutes: Number(recDuration),
      calories: Number(recCalories),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {activeModal === 'event' && (
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
              <Calendar className="w-6 h-6" />
              <h3 className="text-lg font-bold">Tambah Agenda / Acara</h3>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Judul Agenda</label>
              <input
                type="text"
                required
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="mis. Dokter Anak / Arisan RT"
                className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Kategori</label>
                <select
                  value={eventCategory}
                  onChange={(e) => setEventCategory(e.target.value as EventCategory)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
                >
                  <option value="Keluarga">Keluarga</option>
                  <option value="Sekolah">Sekolah</option>
                  <option value="Pekerjaan">Pekerjaan</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Keuangan">Keuangan</option>
                  <option value="Liburan">Liburan</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Tanggal</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Waktu</label>
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Lokasi</label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="mis. RS Bunda / Zoom"
                  className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Catatan Detail</label>
              <textarea
                value={eventDesc}
                onChange={(e) => setEventDesc(e.target.value)}
                placeholder="Catatan tambahan untuk keluarga..."
                rows={2}
                className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-sm transition"
            >
              Simpan Agenda
            </button>
          </form>
        )}

        {activeModal === 'meal' && (
          <form onSubmit={handleCreateMeal} className="space-y-4">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <Utensils className="w-6 h-6" />
              <h3 className="text-lg font-bold">Rencana Menu Makanan</h3>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Nama Menu / Masakan</label>
              <input
                type="text"
                required
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                placeholder="mis. Sup Ayam Kampung Bumbu Jahe"
                className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Sesi Makan</label>
                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
                >
                  <option value="Breakfast">Sarapan (Breakfast)</option>
                  <option value="Lunch">Makan Siang (Lunch)</option>
                  <option value="Dinner">Makan Malam (Dinner)</option>
                  <option value="Snack">Snack / Camilan</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Tanggal</label>
                <input
                  type="date"
                  value={mealDate}
                  onChange={(e) => setMealDate(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Estimasi Kalori (kcal)</label>
              <input
                type="number"
                value={mealCalories}
                onChange={(e) => setMealCalories(Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition"
            >
              Tambahkan ke Jadwal Menu
            </button>
          </form>
        )}

        {activeModal === 'grocery' && (
          <form onSubmit={handleCreateGrocery} className="space-y-4">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
              <ShoppingCart className="w-6 h-6" />
              <h3 className="text-lg font-bold">Tambah Item Belanja</h3>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Nama Barang / Bahan</label>
              <input
                type="text"
                required
                value={groceryName}
                onChange={(e) => setGroceryName(e.target.value)}
                placeholder="mis. Telor Ayam / Bawang Merah"
                className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Kategori</label>
                <select
                  value={groceryCategory}
                  onChange={(e) => setGroceryCategory(e.target.value as GroceryCategory)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
                >
                  <option value="Sayur">Sayur</option>
                  <option value="Buah">Buah</option>
                  <option value="Daging">Daging</option>
                  <option value="Ikan">Ikan</option>
                  <option value="Minuman">Minuman</option>
                  <option value="Bumbu">Bumbu</option>
                  <option value="Snack">Snack</option>
                  <option value="Kebutuhan Rumah">Kebutuhan Rumah</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Prioritas</label>
                <select
                  value={groceryPriority}
                  onChange={(e) => setGroceryPriority(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
                >
                  <option value="High">Tinggi (Penting)</option>
                  <option value="Medium">Sedang</option>
                  <option value="Low">Rendah</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Jumlah</label>
                <input
                  type="number"
                  value={groceryQty}
                  onChange={(e) => setGroceryQty(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Satuan</label>
                <input
                  type="text"
                  value={groceryUnit}
                  onChange={(e) => setGroceryUnit(e.target.value)}
                  placeholder="kg / pcs / liter"
                  className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold text-sm transition"
            >
              Simpan ke Daftar Belanja
            </button>
          </form>
        )}

        {activeModal === 'familyEvent' && (
          <form onSubmit={handleCreateFamilyEvent} className="space-y-4">
            <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
              <Users className="w-6 h-6" />
              <h3 className="text-lg font-bold">Event Utama Keluarga</h3>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Nama Acara Utama</label>
              <input
                type="text"
                required
                value={feTitle}
                onChange={(e) => setFeTitle(e.target.value)}
                placeholder="mis. Liburan Akhir Tahun / Syukuran"
                className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Kategori Event</label>
                <select
                  value={feCategory}
                  onChange={(e) => setFeCategory(e.target.value as FamilyEventCategory)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
                >
                  <option value="Family Gathering">Family Gathering</option>
                  <option value="Vacation">Vacation / Liburan</option>
                  <option value="Birthday">Birthday Party</option>
                  <option value="Meeting">Family Meeting</option>
                  <option value="School Event">School Event</option>
                  <option value="Religious Event">Religious Event</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Tanggal</label>
                <input
                  type="date"
                  value={feDate}
                  onChange={(e) => setFeDate(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Estimasi Anggaran (Rp)</label>
                <input
                  type="number"
                  value={feBudget}
                  onChange={(e) => setFeBudget(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Lokasi / Venue</label>
                <input
                  type="text"
                  value={feLocation}
                  onChange={(e) => setFeLocation(e.target.value)}
                  placeholder="mis. Puncak Villa / Bali"
                  className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Keterangan & Rencana</label>
              <textarea
                value={feDesc}
                onChange={(e) => setFeDesc(e.target.value)}
                placeholder="Rincian acara dan susunan panitia..."
                rows={2}
                className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-sm transition"
            >
              Buat Family Event
            </button>
          </form>
        )}

        {activeModal === 'reminder' && (
          <form onSubmit={handleCreateReminder} className="space-y-4">
            <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400">
              <Bell className="w-6 h-6" />
              <h3 className="text-lg font-bold">Pengingat Baru</h3>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Judul Pengingat</label>
              <input
                type="text"
                required
                value={remTitle}
                onChange={(e) => setRemTitle(e.target.value)}
                placeholder="mis. Minum Vitamin Pagi"
                className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Waktu Alarm</label>
              <input
                type="time"
                value={remTime}
                onChange={(e) => setRemTime(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold text-sm transition"
            >
              Aktifkan Pengingat
            </button>
          </form>
        )}

        {activeModal === 'recipe' && (
          <form onSubmit={handleCreateRecipe} className="space-y-4">
            <div className="flex items-center space-x-2 text-teal-600 dark:text-teal-400">
              <Plus className="w-6 h-6" />
              <h3 className="text-lg font-bold">Tambah Resep Baru</h3>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Nama Masakan</label>
              <input
                type="text"
                required
                value={recName}
                onChange={(e) => setRecName(e.target.value)}
                placeholder="mis. Soto Ayam Madura"
                className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Kategori</label>
                <select
                  value={recCategory}
                  onChange={(e) => setRecCategory(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
                >
                  <option value="Healthy Menu">Healthy Menu</option>
                  <option value="Family Menu">Family Menu</option>
                  <option value="Kids Menu">Kids Menu</option>
                  <option value="Budget Menu">Budget Menu</option>
                  <option value="Quick Meal">Quick Meal</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Durasi Masak (Menit)</label>
                <input
                  type="number"
                  value={recDuration}
                  onChange={(e) => setRecDuration(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Bahan Utama (Pisahkan dengan koma)</label>
              <textarea
                value={recIngredients}
                onChange={(e) => setRecIngredients(e.target.value)}
                placeholder="Daging ayam, Wortel, Bawang putih, Seledri"
                rows={2}
                className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold text-sm transition"
            >
              Simpan Resep Masakan
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
