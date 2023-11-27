import React from 'react'

interface PrLabelProps {
  text: string
  className?: string // Make className an optional prop
}

const PrLabel: React.FC<PrLabelProps> = ({ text, className }) => {
  return <span className={`font-bold ${className}`}>{text}</span>
}

export default PrLabel
