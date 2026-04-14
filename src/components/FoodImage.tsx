interface FoodImageProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xl",
  md: "w-12 h-12 text-3xl",
  lg: "w-16 h-16 text-4xl",
  xl: "w-24 h-24 text-6xl",
};

const isEmoji = (str: string) => {
  return str.length <= 4 && /\p{Emoji}/u.test(str);
};

export const FoodImage = ({ src, alt, size = "md", className = "" }: FoodImageProps) => {
  const sizeClass = sizeClasses[size];

  if (isEmoji(src)) {
    return (
      <span className={`${sizeClass} flex items-center justify-center ${className}`}>
        {src}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`${sizeClass} rounded-xl object-cover ${className}`}
    />
  );
};
