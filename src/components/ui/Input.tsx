import React, { useState } from 'react';
import { Eye, EyeOff, Search, Calendar, Clock, AlertCircle } from 'lucide-react';

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input: React.FC<BaseInputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  containerClassName = '',
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const inputId = id || React.useId();

  return (
    <div className={`space-y-1.5 w-full ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full min-h-[48px] px-3.5 py-2.5 text-sm rounded-2xl bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border transition focus:outline-none focus:ring-2 ${
            error
              ? 'border-rose-500 focus:ring-rose-500/20'
              : 'border-slate-200 dark:border-slate-700/80 focus:border-blue-500 focus:ring-blue-500/20'
          } ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 text-slate-400 dark:text-slate-500">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1 text-[11px] font-medium text-rose-500 pt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
      {hint && !error && (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">{hint}</p>
      )}
    </div>
  );
};

export const PasswordInput: React.FC<Omit<BaseInputProps, 'type' | 'rightIcon'>> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      type={showPassword ? 'text' : 'password'}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
          aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }
    />
  );
};

export const SearchInput: React.FC<Omit<BaseInputProps, 'leftIcon'>> = (props) => {
  return <Input {...props} leftIcon={<Search className="w-4 h-4" />} type="search" />;
};

export const CurrencyInput: React.FC<Omit<BaseInputProps, 'leftIcon'>> = (props) => {
  return (
    <Input
      {...props}
      type="number"
      leftIcon={<span className="text-xs font-bold text-slate-500 dark:text-slate-400">Rp</span>}
    />
  );
};

export const PhoneInput: React.FC<Omit<BaseInputProps, 'leftIcon'>> = (props) => {
  return (
    <Input
      {...props}
      type="tel"
      leftIcon={<span className="text-xs font-bold text-slate-500 dark:text-slate-400">+62</span>}
      placeholder="812-xxxx-xxxx"
    />
  );
};

export const DateInput: React.FC<Omit<BaseInputProps, 'leftIcon'>> = (props) => {
  return <Input {...props} type="date" leftIcon={<Calendar className="w-4 h-4" />} />;
};

export const TimeInput: React.FC<Omit<BaseInputProps, 'leftIcon'>> = (props) => {
  return <Input {...props} type="time" leftIcon={<Clock className="w-4 h-4" />} />;
};

export interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (val: string) => void;
  label?: string;
  error?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  label,
  error,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const char = e.target.value.slice(-1);
    const newValue = value.split('');
    newValue[index] = char;
    const joined = newValue.join('').slice(0, length);
    onChange(joined);

    if (char && index < length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="space-y-2 w-full">
      {label && <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</label>}
      <div className="flex gap-2 justify-between">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(e, index)}
            className={`w-11 h-12 text-center text-lg font-bold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border ${
              error ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
            } focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          />
        ))}
      </div>
      {error && <p className="text-[11px] font-medium text-rose-500">{error}</p>}
    </div>
  );
};

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, hint, className = '', id, ...props }) => {
  const textareaId = id || React.useId();

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={3}
        className={`w-full p-3 text-sm rounded-2xl bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border transition focus:outline-none focus:ring-2 ${
          error
            ? 'border-rose-500 focus:ring-rose-500/20'
            : 'border-slate-200 dark:border-slate-700/80 focus:border-blue-500 focus:ring-blue-500/20'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-[11px] font-medium text-rose-500">{error}</p>}
      {hint && !error && <p className="text-[11px] text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
};
