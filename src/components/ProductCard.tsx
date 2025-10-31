import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price?: string;
  showPrice?: boolean;
  onButtonClick?: () => void;
}

export function ProductCard({ image, title, description, price, showPrice = true, onButtonClick }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg border border-[var(--netral-garis-batas)] overflow-hidden transition-shadow hover:shadow-lg">
      <div className="aspect-square w-full overflow-hidden bg-[var(--brand-coklat-muda)]">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 space-y-3">
        <h3 className="text-[var(--brand-coklat-tua)]">{title}</h3>
        <p className="text-[var(--netral-abu-abu)]">{description}</p>
        <div className={showPrice ? "flex items-center justify-between" : "flex justify-end"}>
          {showPrice && price && (
            <p className="text-[var(--brand-coklat-sedang)]" style={{ fontWeight: 600, fontSize: '18px' }}>{price}</p>
          )}
          <button
            onClick={onButtonClick}
            className="px-6 py-3 bg-[var(--aksen-kuning-cerah)] text-[var(--netral-hitam)] rounded-lg transition-all hover:bg-[#F4C020] active:scale-95"
            style={{ fontFamily: 'Montserrat', fontWeight: 600 }}
          >
            Selengkapnya
          </button>
        </div>
      </div>
    </div>
  );
}
