import React from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react';

const toastStyles = {
  success: {
    container: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    badge: 'bg-emerald-500/10 text-emerald-600',
    icon: <CheckCircle2 size={18} />
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-900',
    badge: 'bg-red-500/10 text-red-600',
    icon: <XCircle size={18} />
  },
  info: {
    container: 'bg-slate-900 text-slate-100 border-slate-700',
    badge: 'bg-slate-200/15 text-slate-100',
    icon: <Info size={18} />
  },
  warning: {
    container: 'bg-amber-50 border-amber-200 text-amber-900',
    badge: 'bg-amber-500/10 text-amber-700',
    icon: <AlertTriangle size={18} />
  }
};

const ToastContainer = ({ toasts }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <>
      <style>{`
        .toast-entry {
          opacity: 0;
          transform: translateY(12px) scale(0.98);
          animation: toast-enter 260ms ease-out forwards;
        }

        @keyframes toast-enter {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none">
        {toasts.map((toast) => {
          const style = toastStyles[toast.type] || toastStyles.info;
          return (
            <div
              key={toast.id}
              className={`toast-entry pointer-events-auto w-full rounded-[1.75rem] border px-4 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.14)] backdrop-blur-sm ${style.container}`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-3xl border ${style.badge}`}>
                  {style.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold leading-snug">{toast.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ToastContainer;
