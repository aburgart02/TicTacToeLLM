import { renderHook, act } from '@testing-library/react';
import { useTicTacToe } from './useTicTacToe';
import { describe, it, expect } from 'vitest';

describe('useTicTacToe', () => {
    it('should initialize with default state', () => {
        const { result } = renderHook(() => useTicTacToe());

        expect(result.current.board).toEqual(Array(9).fill(null));
        expect(result.current.isXNext).toBe(true);
        expect(result.current.winner).toBeNull();
        expect(result.current.winningLine).toBeNull();
    });

    it('should handle moves correctly', () => {
        const { result } = renderHook(() => useTicTacToe());

        act(() => {
            result.current.handleClick(0);
        });

        expect(result.current.board[0]).toBe('X');
        expect(result.current.isXNext).toBe(false);

        act(() => {
            result.current.handleClick(1);
        });

        expect(result.current.board[1]).toBe('O');
        expect(result.current.isXNext).toBe(true);
    });

    it('should detect a winner', () => {
        const { result } = renderHook(() => useTicTacToe());

        // X wins: 0, 1, 2
        act(() => {
            result.current.handleClick(0); // X
        });
        act(() => {
            result.current.handleClick(3); // O
        });
        act(() => {
            result.current.handleClick(1); // X
        });
        act(() => {
            result.current.handleClick(4); // O
        });
        act(() => {
            result.current.handleClick(2); // X
        });

        expect(result.current.winner).toBe('X');
        expect(result.current.winningLine).toEqual([0, 1, 2]);
    });

    it('should detect a draw', () => {
        const { result } = renderHook(() => useTicTacToe());

        /*
          X O X
          X O O
          O X X
        */
        const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];

        moves.forEach((index) => {
            act(() => {
                result.current.handleClick(index);
            });
        });

        expect(result.current.winner).toBe('Draw');
        expect(result.current.winningLine).toBeNull();
    });

    it('should not allow moves on occupied cells', () => {
        const { result } = renderHook(() => useTicTacToe());

        act(() => {
            result.current.handleClick(0);
        });

        act(() => {
            result.current.handleClick(0);
        });

        expect(result.current.board[0]).toBe('X');
        expect(result.current.isXNext).toBe(false); // Still O's turn
    });

    it('should not allow moves after game over', () => {
        const { result } = renderHook(() => useTicTacToe());

        // X wins
        [0, 3, 1, 4, 2].forEach((index) => {
            act(() => {
                result.current.handleClick(index);
            });
        });

        expect(result.current.winner).toBe('X');

        act(() => {
            result.current.handleClick(8);
        });

        expect(result.current.board[8]).toBeNull();
    });

    it('should reset the game', () => {
        const { result } = renderHook(() => useTicTacToe());

        act(() => {
            result.current.handleClick(0);
            result.current.resetGame();
        });

        expect(result.current.board).toEqual(Array(9).fill(null));
        expect(result.current.isXNext).toBe(true);
        expect(result.current.winner).toBeNull();
    });
});
