import React, { useState } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import PrIcon from '@/components/common/PrIcon/PrIcon';

interface CollapsibleSectionProps {
  sections: Array<{ title: string; content: React.ReactNode }>;
}

const PhotoCollopser: React.FC<CollapsibleSectionProps> = ({ sections }) => {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>(
    Object.fromEntries(sections?.map((_, index) => [index, false]))
  );

  const toggleSection = (index: number) => {
    setExpandedSections((prevExpandedSections) => ({
      ...prevExpandedSections,
      [index]: !prevExpandedSections[index],
    }));
  };

  return (
    <div>
    {sections.map((section, index) => (
      <Paper key={index} className='p-6 cursor-pointer'>
        <div className='flex flex-row items-center justify-between'  onClick={() => toggleSection(index)}>
            <Typography variant="h6" className='flex flex-row space-x-4'>
                <div>{index}.</div>
                <div>{section.title}</div>
            </Typography>
          <PrIcon
            name={expandedSections[index] ? 'ChevronUp' : 'ChevronDown'}
            size={32}
            onClick={() => toggleSection(index)}
          ></PrIcon>
        </div>
        {expandedSections[index] && section.content}
      </Paper>
    ))}
  </div>
  
  );
};

export default PhotoCollopser;
