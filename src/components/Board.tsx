import React from 'react';
import { Box } from '@mui/material';
import Cell from './Cell';
import type { CellValue } from '../hooks/useTicTacToe';

interface BoardProps {
    board: CellValue[];
    onClick: (index: number) => void;
    winningLine: number[] | null;
    isGameActive: boolean;
}

const Board: React.FC<BoardProps> = ({ board, onClick, winningLine, isGameActive }) => {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 2,
                p: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '24px',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
        >
            {board.map((value, index) => (
                <Cell
                    key={index}
                    value={value}
                    onClick={() => onClick(index)}
                    isWinning={winningLine?.includes(index) ?? false}
                    disabled={!isGameActive && !value}
                />
            ))}
        </Box>
    );
};

export default Board;
