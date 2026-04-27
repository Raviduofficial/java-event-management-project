import { X } from 'lucide-react';

export const defaultConfirmModalState = {
  open: false,
  title: '',
  description: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  action: null
};

const ConfirmModal = ({
  modal,
  open,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  processing = false
}) => {
  const config = modal ? { confirmText, cancelText, ...modal, processing } : {
    open,
    title,
    description,
    confirmText,
    cancelText,
    processing
  };

  if (!config.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[2rem] bg-white border border-slate-200 shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between px-8 py-6 border-b border-slate-200">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 mb-2">Confirmation required</p>
            <h2 className="text-2xl font-bold text-slate-900">{config.title}</h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-8 py-6">
          <p className="text-sm leading-7 text-slate-600">{config.description}</p>
        </div>

        <div className="flex flex-col gap-3 px-8 pb-8 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-3xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 sm:w-auto"
          >
            {config.cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={processing}
            className="w-full rounded-3xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {processing ? 'Processing...' : config.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
