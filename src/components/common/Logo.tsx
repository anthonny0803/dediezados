// Logo component - single source of truth
interface LogoProps {
  variant?: 'color' | 'white';
  width?: number;
  height?: number;
  className?: string;
}

export const Logo = ({ 
  variant = 'color', 
  width = 126, 
  height = 80,
  className = '' 
}: LogoProps) => {
  const logoUrl = 'https://res.cloudinary.com/dk5kc8pu3/image/upload/f_auto,q_auto,w_150,h_95,c_fit/v1763054957/ChatGPT_Image_13_nov_2025_17_57_14_1_nutc4q.png';
  
  return (
    <img 
      src={logoUrl}
      alt="Logo De Diez a Dos"
      width={width}
      height={height}
      className={`logo-img ${variant === 'white' ? 'logo-white' : ''} ${className}`}
      loading="eager" // Critical image
    />
  );
};