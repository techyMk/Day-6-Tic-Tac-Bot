import React from 'react';
import { motion } from 'framer-motion';

const ScoreBoard = ({ score }) => {
  return (
    <motion.div 
      className='flex justify-between w-full max-w-md mb-6 p-4 bg-[#1E293B]/50 rounded-xl backdrop-blur-sm'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div 
        className='text-[#38BDF8] text-lg font-semibold flex items-center'
        whileHover={{ scale: 1.05 }}
      >
        <span className='mr-2'>👤</span> You (X): {score.X}
      </motion.div>
      <motion.div 
        className='text-[#F472B6] text-lg font-semibold flex items-center'
        whileHover={{ scale: 1.05 }}
      >
        <span className='mr-2'>🤖</span> AI (O): {score.O}
      </motion.div>
    </motion.div>
  );
};

export default ScoreBoard;