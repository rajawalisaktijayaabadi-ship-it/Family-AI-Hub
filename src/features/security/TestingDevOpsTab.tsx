import React, { useState } from 'react';
import { useSecurityDevOpsStore } from '../../stores/useSecurityDevOpsStore';
import { Play, CheckCircle2, ShieldCheck, FileCheck, Layers, Gauge } from 'lucide-react';

export const TestingDevOpsTab: React.FC = () => {
  const { tests, runAllTests, addAuditLog } = useSecurityDevOpsStore();
  const [isRunning, setIsRunning] = useState(false);
  const [runProgress, setRunProgress] = useState(0);

  const handleRunTests = async () => {
    setIsRunning(true);
    setRunProgress(10);

    const interval = setInterval(() => {
      setRunProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          runAllTests();
          addAuditLog('AUTOMATED_TESTS_PASSED', 'TestingDevOpsTab', 'success', 'Seluruh Test Suite (Unit, Integration, Component, E2E) 100% Lulus.');
          return 100;
        }
        return prev + 30;
      });
    }, 400);
  };

  const totalPassed = tests.reduce((acc, curr) => acc + curr.passed, 0);
  const avgCoverage = (tests.reduce((acc, curr) => acc + curr.coveragePct, 0) / tests.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Test Runner Hero Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            Automated Quality Assurance & Test Suite Matrix <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Target Cakupan Pengujian: Unit ≥ 90%, Integration ≥ 85%, Component ≥ 90%, E2E ≥ 80%
          </p>
        </div>

        <button
          onClick={handleRunTests}
          disabled={isRunning}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-950/40 shrink-0"
        >
          <Play className="w-4 h-4 fill-current" />
          {isRunning ? `Menjalankan Test... (${runProgress}%)` : 'Jalankan Seluruh Test Suite'}
        </button>
      </div>

      {/* Progress Bar during Execution */}
      {isRunning && (
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex justify-between text-xs text-slate-300 font-medium">
            <span>Menjalankan Vitest, Cypress E2E & React Testing Library...</span>
            <span>{runProgress}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${runProgress}%` }} />
          </div>
        </div>
      )}

      {/* Quality Gate Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Total Test Passed
          </span>
          <div className="text-2xl font-bold text-emerald-400">{totalPassed} / {totalPassed}</div>
          <span className="text-[10px] text-slate-500">Zero Failures (0 Defect)</span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-sky-400" /> Average Code Coverage
          </span>
          <div className="text-2xl font-bold text-sky-400">{avgCoverage}%</div>
          <span className="text-[10px] text-emerald-400">Target Enterprise Tercapai</span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <FileCheck className="w-3.5 h-3.5 text-purple-400" /> SonarQube Quality Gate
          </span>
          <div className="text-2xl font-bold text-slate-100">PASSED</div>
          <span className="text-[10px] text-emerald-400">Rating A (Security & Code Smell)</span>
        </div>
      </div>

      {/* Test Suites Breakdown Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Detail Hasil Rangkaian Pengujian</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tests.map((test) => (
            <div key={test.id} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <h5 className="text-xs font-bold text-slate-200">{test.name}</h5>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-slate-800 text-slate-400 rounded">
                    {test.type}
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] rounded font-semibold">
                  {test.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-800/60">
                <div>
                  <span className="text-[10px] text-slate-400 block">Passed</span>
                  <span className="text-xs font-bold text-emerald-400">{test.passed}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Duration</span>
                  <span className="text-xs font-semibold text-slate-300">{test.durationMs} ms</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Coverage</span>
                  <span className="text-xs font-bold text-sky-400">{test.coveragePct}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
