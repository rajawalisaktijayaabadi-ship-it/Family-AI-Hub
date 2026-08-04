import React, { useState } from 'react';
import { useFinanceStore } from '../../stores/useFinanceStore';
import { Target, PieChart, Plus, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

export const FinanceBudgetTab: React.FC = () => {
  const { budgets, goals, saveBudget, addGoal, updateGoalProgress } = useFinanceStore();

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalDeadline, setGoalDeadline] = useState('');
  const [goalPriority, setGoalPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [addProgressAmt, setAddProgressAmt] = useState('');

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle || !goalTarget) return;

    await addGoal({
      title: goalTitle,
      targetAmount: Number(goalTarget),
      currentAmount: 0,
      deadline: goalDeadline || '2027-12-31',
      priority: goalPriority,
    });

    setGoalTitle('');
    setGoalTarget('');
    setGoalDeadline('');
    setShowAddGoal(false);
  };

  const handleUpdateProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGoalId || !addProgressAmt) return;

    await updateGoalProgress(selectedGoalId, Number(addProgressAmt));
    setSelectedGoalId(null);
    setAddProgressAmt('');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Budget Categories Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-emerald-600" />
              <span>Anggaran Pos Bulanan (Agustus 2026)</span>
            </h3>
            <p className="text-xs text-slate-500">Batas toleransi peringatan ditetapkan pada 80%</p>
          </div>
        </div>

        <div className="space-y-3">
          {budgets.map((b) => {
            const pct = Math.min(100, Math.round((b.spentAmount / b.monthlyLimit) * 100));
            const isWarning = pct >= b.alertThresholdPercent;

            return (
              <div
                key={b.id}
                className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{b.category}</span>
                    {isWarning && (
                      <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                        <AlertTriangle className="h-3 w-3" />
                        Peringatan Limit ({pct}%)
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {formatIDR(b.spentAmount)} / {formatIDR(b.monthlyLimit)}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      pct >= 90
                        ? 'bg-rose-500'
                        : pct >= b.alertThresholdPercent
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Terpakai: {pct}%</span>
                  <span>Sisa: {formatIDR(Math.max(0, b.monthlyLimit - b.spentAmount))}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Financial Goals Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-600" />
              <span>Target Keuangan Impian Keluarga</span>
            </h3>
            <p className="text-xs text-slate-500">Perencanaan dana masa depan & investasi terarah</p>
          </div>
          <button
            onClick={() => setShowAddGoal(true)}
            className="flex items-center gap-1 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-200"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Target Baru</span>
          </button>
        </div>

        {/* Create Goal Form Modal */}
        {showAddGoal && (
          <form onSubmit={handleCreateGoal} className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-3">
            <h4 className="text-xs font-bold text-emerald-900">Buat Target Keuangan Baru</h4>
            <input
              type="text"
              placeholder="Nama Target (misal: DP Rumah 2)"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Target Dana (Rp)"
                value={goalTarget}
                onChange={(e) => setGoalTarget(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <input
                type="date"
                value={goalDeadline}
                onChange={(e) => setGoalDeadline(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddGoal(false)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white"
              >
                Simpan Target
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {goals.map((goal) => {
            const pct = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
            const isAchieved = goal.status === 'Achieved' || pct >= 100;

            return (
              <div
                key={goal.id}
                className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{goal.title}</span>
                    {isAchieved ? (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        Tercapai
                      </span>
                    ) : (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          goal.priority === 'High'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        Prioritas {goal.priority}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-emerald-700">
                    {formatIDR(goal.currentAmount)} / {formatIDR(goal.targetAmount)}
                  </span>
                </div>

                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isAchieved ? 'bg-emerald-500' : 'bg-teal-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Tercapai: {pct}%</span>
                  <span>Tenggat: {goal.deadline}</span>
                </div>

                {!isAchieved && (
                  <div className="pt-2 border-t border-slate-100">
                    {selectedGoalId === goal.id ? (
                      <form onSubmit={handleUpdateProgress} className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Jumlah Setoran (Rp)"
                          value={addProgressAmt}
                          onChange={(e) => setAddProgressAmt(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs focus:outline-none"
                          required
                        />
                        <button
                          type="submit"
                          className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shrink-0"
                        >
                          Simpan
                        </button>
                      </form>
                    ) : (
                      <button
                        onClick={() => setSelectedGoalId(goal.id)}
                        className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                      >
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span>+ Tambah Setoran Tabungan Target</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
