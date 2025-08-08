import React from 'react';
import { motion } from 'framer-motion';

const Square = ({ value, onClick }) => {
  const getColor = () => {
    if (value === 'X') return 'text-[#38BDF8]';
    if (value === 'O') return 'text-[#F472B6]';
    return 'text-white';
  };

  return (
    <motion.button
      className={`w-20 h-20 md:w-24 md:h-24 bg-[#1E293B] rounded-lg flex items-center justify-center text-4xl font-bold ${getColor()} shadow-md hover:bg-[#334155] transition-colors`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      initial={{ scale: 0.9, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {value}
    </motion.button>
  );
};

export default Square;