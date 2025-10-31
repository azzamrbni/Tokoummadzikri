interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  fullWidth = false,
  type = 'button'
}: ButtonProps) {
  const baseClasses = "px-6 py-3 rounded-lg transition-all active:scale-95";
  
  const variantClasses = {
    primary: "bg-[var(--aksen-kuning-cerah)] text-[var(--netral-hitam)] hover:bg-[#F4C020]",
    secondary: "bg-[var(--brand-coklat-sedang)] text-white hover:bg-[#6D4C41]",
    outline: "bg-transparent border-2 border-[var(--brand-coklat-sedang)] text-[var(--brand-coklat-sedang)] hover:bg-[var(--brand-coklat-muda)]"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''}`}
      style={{ fontFamily: 'Montserrat', fontWeight: 600 }}
    >
      {children}
    </button>
  );
}
