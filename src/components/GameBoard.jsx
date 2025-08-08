import React from 'react';
import Square from './Square';
import { motion } from 'framer-motion';

const GameBoard = ({ board, handleClick }) => {
  return (
    <motion.div 
      className='grid grid-cols-3 gap-3 p-4 bg-[#1E293B]/30 rounded-xl backdrop-blur-sm'
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
    >
      {board.map((val, i) => (
        <Square key={i} value={val} onClick={() => handleClick(i)} />
      ))}
    </motion.div>
  );
};

export default GameBoard;