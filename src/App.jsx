import React, { useEffect, useState } from 'react';
import ScoreBoard from './components/ScoreBoard';
import GameBoard from './components/GameBoard';
import { checkWinner } from './utils/winner';
import { getAiMoveFromOpenRouter } from './utils/aiOpenRouter';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [isThinking, setIsThinking] = useState(false);

  const handleClick = (i) => {
    if (!isPlayerTurn || board[i] || winner) return;
    
    const newBoard = [...board];
    newBoard[i] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  useEffect(() => {
    if (winner) return;

    const result = checkWinner(board);
    if (result?.winner) {
      setWinner(result.winner);
      if (result.winner === "X" || result.winner === "O") {
        setScore(prev => ({
          ...prev,
          [result.winner]: prev[result.winner] + 1
        }));
      }
      return;
    }

    if (!isPlayerTurn && !winner) {
      setIsThinking(true);
      const aiTurn = async () => {
        const move = await getAiMoveFromOpenRouter(board);
        if (move !== null && board[move] === null) {
          const newBoard = [...board];
          newBoard[move] = "O";
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
        setIsThinking(false);
      };

      const timeout = setTimeout(aiTurn, 600);
      return () => {
        clearTimeout(timeout);
        setIsThinking(false);
      };
    }
  }, [board, isPlayerTurn, winner]);

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white flex flex-col items-center justify-center p-4'>
      <motion.h1 
        className='text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#F472B6]'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tic Tac Bot 🤖
      </motion.h1>

      <ScoreBoard score={score} />

      <div className='relative'>
        <GameBoard board={board} handleClick={handleClick} />
        
        {isThinking && (
          <motion.div 
            className='absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='text-white text-xl'
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5
              }}
            >
              AI is thinking...
            </motion.div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {winner && (
          <motion.div 
            className='mt-6 text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <motion.p 
              className='text-2xl mb-4'
              initial={{ scale: 0.9 }}
              animate={{ scale: 1.1 }}
              transition={{ 
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 0.8
              }}
            >
              {winner === "Draw" ? "It's a Draw! 🎭" : `${winner} Wins! 🎉`}
            </motion.p>
            <motion.button 
              onClick={restartGame}
              className='px-6 py-2 bg-gradient-to-r from-[#38BDF8] to-[#F472B6] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className='mt-6 text-sm text-gray-400'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {isPlayerTurn ? "Your turn (X)" : "AI's turn (O)"}
      </motion.div>
    </div>
  );
};

export default App;