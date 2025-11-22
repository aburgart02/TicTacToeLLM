import React from 'react';
import { Box, ButtonBase } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import type { CellValue } from '../hooks/useTicTacToe';

interface CellProps {
    value: CellValue;
    onClick: () => void;
    isWinning: boolean;
    disabled: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isWinning, disabled }) => {
    return (
        <ButtonBase
            onClick={onClick}
            disabled={disabled}
            sx={{
                width: '100px',
                height: '100px',
                borderRadius: '16px',
                backgroundColor: isWinning ? 'rgba(144, 202, 249, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                cursor: disabled ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                    backgroundColor: disabled ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)',
                    transform: disabled ? 'none' : 'translateY(-2px)',
                    boxShadow: disabled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : '0 6px 40px rgba(0, 0, 0, 0.2)',
                },
            }}
        >
            <AnimatePresence mode="wait">
                {value && (
                    <motion.div
                        key={value}
                        initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <Box
                            component="span"
                            sx={{
                                color: value === 'X' ? '#ff4081' : '#00e676',
                                fontWeight: 'bold',
                                textShadow: value === 'X' ? '0 0 20px rgba(255, 64, 129, 0.5)' : '0 0 20px rgba(0, 230, 118, 0.5)',
                            }}
                        >
                            {value}
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </ButtonBase>
    );
};

export default Cell;
