import React, { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  CheckCircle2,
  Circle,
  AlertCircle,
  Package,
  DollarSign,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { useCalendarStore } from '../../../stores/useCalendarStore';

interface GroceryInventoryTabProps {
  onOpenModal: (type: 'grocery') => void;
}

export const GroceryInventoryTab: React.FC<GroceryInventoryTabProps> = ({ onOpenModal }) => {
  const { groceries, shoppingPlans, inventory, toggleGroceryStatus, addInventoryItem } =
    useCalendarStore();

  const [activeSubTab, setActiveSubTab] = useState<'Daftar Belanja' | 'Stok Kulkas (Inventory)'>(
    'Daftar Belanja'
  );

  // Quick Add Inventory Form State
  const [invName, setInvName] = useState('');
  const [invQty, setInvQty] = useState(1);
  const [invUnit, setInvUnit] = useState('kg');
  const [invExpiry, setInvExpiry] = useState('');

  const handleAddInventory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invName.trim()) return;
    addInventoryItem({
      itemName: invName,
      category: 'Kebutuhan Rumah',
      quantity: Number(invQty),
      unit: invUnit,
      purchaseDate: new Date().toISOString().split('T')[0],
      expiredDate: invExpiry || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      lowStockThreshold: 1,
    });
    setInvName('');
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Sub Tab Switcher */}
      <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center space-x-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {(['Daftar Belanja', 'Stok Kulkas (Inventory)'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeSubTab === tab
                  ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          onClick={() => onOpenModal('grocery')}
          className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-md shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>+ Item Belanja</span>
        </button>
      </div>

      {activeSubTab === 'Daftar Belanja' ? (
        <div className="space-y-6">
          {/* Shopping Plan Overview Card */}
          {shoppingPlans.map((sp) => (
            <div
              key={sp.id}
              className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-500/30 dark:border-amber-500/20"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500 text-white">
                    {sp.status}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {sp.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Jadwal: {sp.scheduleDate}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Estimasi Anggaran:</span>
                  <p className="text-base font-extrabold text-amber-600 dark:text-amber-400">
                    Rp {sp.estimatedBudget.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Grocery List */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              <span>Daftar Barang Belanja ({groceries.length})</span>
            </h3>

            <div className="space-y-2">
              {groceries.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleGroceryStatus(item.id)}
                  className={`p-3.5 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                    item.status === 'Sudah Dibeli'
                      ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.status === 'Sudah Dibeli' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                    )}

                    <div>
                      <h4
                        className={`text-xs font-bold ${
                          item.status === 'Sudah Dibeli'
                            ? 'line-through text-slate-400'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {item.itemName}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Kategori: {item.category} • Jumlah: {item.quantity} {item.unit}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      item.priority === 'High'
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Food Inventory / Stock Kulkas View */
        <div className="space-y-6">
          {/* Quick Add Inventory */}
          <form onSubmit={handleAddInventory} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
              <Package className="w-4 h-4 text-amber-500" />
              <span>Tambah Stok Bahan Makanan ke Kulkas</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                type="text"
                placeholder="Nama Bahan (mis. Minyak Goreng)"
                value={invName}
                onChange={(e) => setInvName(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
              />
              <input
                type="number"
                placeholder="Jumlah"
                value={invQty}
                onChange={(e) => setInvQty(Number(e.target.value))}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
              />
              <input
                type="text"
                placeholder="Satuan (Liter / Pcs)"
                value={invUnit}
                onChange={(e) => setInvUnit(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition"
              >
                + Simpan Stok
              </button>
            </div>
          </form>

          {/* Inventory Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inventory.map((inv) => {
              const isLowStock = inv.quantity <= inv.lowStockThreshold;
              return (
                <div
                  key={inv.id}
                  className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border transition shadow-sm ${
                    isLowStock
                      ? 'border-rose-300 dark:border-rose-900 bg-rose-50/20 dark:bg-rose-950/10'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {inv.category}
                        </span>
                        {isLowStock && (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white flex items-center space-x-1">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Stok Menipis</span>
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1.5">
                        {inv.itemName}
                      </h4>

                      <p className="text-xs text-slate-500 mt-1">
                        Sisa Stok: <strong className="text-slate-800 dark:text-slate-200">{inv.quantity} {inv.unit}</strong>
                      </p>
                    </div>

                    <div className="text-right text-[11px] text-slate-400">
                      <p>Kedaluwarsa:</p>
                      <p className="font-semibold text-rose-500">{inv.expiredDate}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
