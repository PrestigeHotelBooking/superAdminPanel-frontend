import React from 'react';
import * as MaterialIcons from '@mui/icons-material';

export type MaterialIconsType = keyof typeof MaterialIcons;

interface PrMaterialIconProps {
  name: MaterialIconsType;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  onClick?: () => void; // Add the optional onClick prop
}

const PrIconV2: React.FC<PrMaterialIconProps> = ({ name, size = 'medium', color = 'currentColor', onClick }) => {
  const IconComponent = MaterialIcons[name];

  if (!IconComponent) {
    return null;
  }

  const iconClasses = `cursor-pointer ${onClick ? 'hover:cursor-pointer' : ''}`;

  return <IconComponent className={iconClasses} fontSize={size} style={{ color }} onClick={onClick} />;
};

export default PrIconV2;
