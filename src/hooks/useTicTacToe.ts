import { useState, useCallback } from 'react';

export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Winner = Player | 'Draw' | null;

interface UseTicTacToeReturn {
    board: CellValue[];
    isXNext: boolean;
    winner: Winner;
    winningLine: number[] | null;
    handleClick: (index: number) => void;
    resetGame: () => void;
}

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export const useTicTacToe = (): UseTicTacToeReturn => {
    const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState<boolean>(true);
    const [winner, setWinner] = useState<Winner>(null);
    const [winningLine, setWinningLine] = useState<number[] | null>(null);

    const checkWinner = useCallback((currentBoard: CellValue[]) => {
        for (const combination of WINNING_COMBINATIONS) {
            const [a, b, c] = combination;
            if (
                currentBoard[a] &&
                currentBoard[a] === currentBoard[b] &&
                currentBoard[a] === currentBoard[c]
            ) {
                return { winner: currentBoard[a] as Player, line: combination };
            }
        }

        if (!currentBoard.includes(null)) {
            return { winner: 'Draw', line: null };
        }

        return null;
    }, []);

    const handleClick = useCallback(
        (index: number) => {
            if (board[index] || winner) return;

            const newBoard = [...board];
            newBoard[index] = isXNext ? 'X' : 'O';
            setBoard(newBoard);

            const result = checkWinner(newBoard);
            if (result) {
                setWinner(result.winner as Winner);
                setWinningLine(result.line);
            } else {
                setIsXNext(!isXNext);
            }
        },
        [board, isXNext, winner, checkWinner]
    );

    const resetGame = useCallback(() => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setWinningLine(null);
    }, []);

    return {
        board,
        isXNext,
        winner,
        winningLine,
        handleClick,
        resetGame,
    };
};
