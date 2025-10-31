import { Search } from "lucide-react";

interface InputFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  icon?: boolean;
  label?: string;
}

export function InputField({ 
  placeholder = "Cari produk...", 
  value, 
  onChange, 
  type = "text",
  icon = false,
  label
}: InputFieldProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-[var(--netral-hitam)]" style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search className="h-5 w-5 text-[var(--netral-abu-abu)]" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-white border border-[var(--netral-garis-batas)] rounded-lg text-[var(--netral-hitam)] placeholder:text-[var(--netral-abu-abu)] focus:outline-none focus:ring-2 focus:ring-[var(--aksen-kuning-cerah)] focus:border-transparent transition-all`}
          style={{ fontFamily: 'Montserrat' }}
        />
      </div>
    </div>
  );
}
