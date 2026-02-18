"use client";

import { PointerEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

type Cell = string | null;
type Board = Cell[][];

type PieceType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

type Piece = {
  type: PieceType;
  rotation: number;
  x: number;
  y: number;
};

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const PIECE_COLORS: Record<PieceType, string> = {
  I: "#22d3ee",
  O: "#facc15",
  T: "#a855f7",
  S: "#4ade80",
  Z: "#f43f5e",
  J: "#3b82f6",
  L: "#fb923c",
};

const SHAPES: Record<PieceType, number[][][]> = {
  I: [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  ],
  O: [
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 1],
    ],
    [
      [1, 1],
      [1, 1],
    ],
  ],
  T: [
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  S: [
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  Z: [
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
  ],
  J: [
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
  ],
  L: [
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
  ],
};

const PIECES: PieceType[] = ["I", "O", "T", "S", "Z", "J", "L"];

function emptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () => Array<Cell>(BOARD_WIDTH).fill(null));
}

function randomPieceType(): PieceType {
  return PIECES[Math.floor(Math.random() * PIECES.length)];
}

function createPiece(type = randomPieceType()): Piece {
  return {
    type,
    rotation: 0,
    x: 3,
    y: -1,
  };
}

function canPlace(board: Board, piece: Piece): boolean {
  const shape = SHAPES[piece.type][piece.rotation];

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === 0) continue;

      const x = piece.x + col;
      const y = piece.y + row;

      if (x < 0 || x >= BOARD_WIDTH || y >= BOARD_HEIGHT) {
        return false;
      }

      if (y >= 0 && board[y][x]) {
        return false;
      }
    }
  }

  return true;
}

function mergePiece(board: Board, piece: Piece): Board {
  const next = board.map((row) => [...row]);
  const shape = SHAPES[piece.type][piece.rotation];

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === 0) continue;

      const x = piece.x + col;
      const y = piece.y + row;

      if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
        next[y][x] = PIECE_COLORS[piece.type];
      }
    }
  }

  return next;
}

function clearLines(board: Board): { board: Board; lines: number } {
  const remaining = board.filter((row) => row.some((cell) => cell === null));
  const lines = BOARD_HEIGHT - remaining.length;

  if (lines === 0) {
    return { board, lines: 0 };
  }

  const filled = Array.from({ length: lines }, () => Array<Cell>(BOARD_WIDTH).fill(null));
  return {
    board: [...filled, ...remaining],
    lines,
  };
}

function scoreForLines(lines: number): number {
  if (lines === 1) return 100;
  if (lines === 2) return 300;
  if (lines === 3) return 500;
  if (lines >= 4) return 800;
  return 0;
}

export function TetrisGame() {
  const [board, setBoard] = useState<Board>(() => emptyBoard());
  const [current, setCurrent] = useState<Piece>(() => createPiece());
  const [nextType, setNextType] = useState<PieceType>(() => randomPieceType());
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const boardRef = useRef(board);
  const currentRef = useRef(current);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const haptic = useCallback((ms = 8) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(ms);
    }
  }, []);

  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const dropInterval = useMemo(() => Math.max(120, 700 - (level - 1) * 60), [level]);

  const lockCurrentPiece = useCallback(() => {
    const merged = mergePiece(boardRef.current, currentRef.current);
    const cleared = clearLines(merged);

    setBoard(cleared.board);

    if (cleared.lines > 0) {
      setLines((prev) => {
        const total = prev + cleared.lines;
        setLevel(Math.floor(total / 10) + 1);
        return total;
      });
      setScore((prev) => prev + scoreForLines(cleared.lines) * level);
    }

    const incoming = createPiece(nextType);
    setNextType(randomPieceType());

    if (!canPlace(cleared.board, incoming)) {
      setGameOver(true);
      setIsRunning(false);
      return;
    }

    setCurrent(incoming);
  }, [level, nextType]);

  const movePiece = useCallback((dx: number, dy: number) => {
    if (!isRunning || gameOver) return;

    const candidate: Piece = {
      ...currentRef.current,
      x: currentRef.current.x + dx,
      y: currentRef.current.y + dy,
    };

    if (canPlace(boardRef.current, candidate)) {
      setCurrent(candidate);
      haptic(6);
      return true;
    }

    if (dy === 1) {
      lockCurrentPiece();
    }

    return false;
  }, [gameOver, haptic, isRunning, lockCurrentPiece]);

  const rotatePiece = useCallback(() => {
    if (!isRunning || gameOver) return;

    const base = currentRef.current;
    const candidate: Piece = {
      ...base,
      rotation: (base.rotation + 1) % 4,
    };

    if (canPlace(boardRef.current, candidate)) {
      setCurrent(candidate);
      haptic(10);
      return;
    }

    const kickedRight = { ...candidate, x: candidate.x + 1 };
    if (canPlace(boardRef.current, kickedRight)) {
      setCurrent(kickedRight);
      haptic(10);
      return;
    }

    const kickedLeft = { ...candidate, x: candidate.x - 1 };
    if (canPlace(boardRef.current, kickedLeft)) {
      setCurrent(kickedLeft);
      haptic(10);
    }
  }, [gameOver, haptic, isRunning]);

  const hardDrop = useCallback(() => {
    if (!isRunning || gameOver) return;

    let dropped = 0;
    const candidate = { ...currentRef.current };

    while (canPlace(boardRef.current, { ...candidate, y: candidate.y + 1 })) {
      candidate.y += 1;
      dropped += 1;
    }

    setCurrent(candidate);
    if (dropped > 0) {
      setScore((prev) => prev + dropped * 2);
      haptic(16);
    }
    setTimeout(() => lockCurrentPiece(), 0);
  }, [gameOver, haptic, isRunning, lockCurrentPiece]);

  const resetGame = useCallback(() => {
    const freshBoard = emptyBoard();
    const firstPiece = createPiece();

    setBoard(freshBoard);
    setCurrent(firstPiece);
    setNextType(randomPieceType());
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOver(false);
    setIsRunning(true);
  }, []);

  useEffect(() => {
    if (!isRunning || gameOver) return;

    const id = setInterval(() => {
      movePiece(0, 1);
    }, dropInterval);

    return () => clearInterval(id);
  }, [dropInterval, gameOver, isRunning, movePiece]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " ", "p", "P"].includes(event.key)) {
        event.preventDefault();
      }

      if (event.key === "p" || event.key === "P") {
        if (!gameOver) {
          setIsRunning((prev) => !prev);
        }
        return;
      }

      if (!isRunning || gameOver) return;

      if (event.key === "ArrowLeft") movePiece(-1, 0);
      if (event.key === "ArrowRight") movePiece(1, 0);
      if (event.key === "ArrowDown") movePiece(0, 1);
      if (event.key === "ArrowUp") rotatePiece();
      if (event.key === " ") hardDrop();
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gameOver, hardDrop, isRunning, movePiece, rotatePiece]);

  const displayBoard = useMemo(() => {
    const overlaid = board.map((row) => [...row]);
    const shape = SHAPES[current.type][current.rotation];

    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] === 0) continue;

        const x = current.x + col;
        const y = current.y + row;

        if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
          overlaid[y][x] = PIECE_COLORS[current.type];
        }
      }
    }

    return overlaid;
  }, [board, current]);

  const nextShape = SHAPES[nextType][0];

  const onBoardPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const point = event.pointerType === "mouse" ? null : { x: event.clientX, y: event.clientY };
    touchStartRef.current = point;
  };

  const onBoardPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;

    if (!start || !isRunning || gameOver) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    const threshold = 22;

    if (absX < threshold && absY < threshold) {
      rotatePiece();
      return;
    }

    if (absX > absY) {
      if (dx > 0) movePiece(1, 0);
      else movePiece(-1, 0);
      return;
    }

    if (dy > threshold * 1.6) {
      hardDrop();
      return;
    }

    if (dy > 0) {
      movePiece(0, 1);
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-muted-foreground">
        Mobile-friendly Tetris. Swipe on the board to move/drop (tap to rotate), use buttons below, or keyboard on desktop (← → ↓ move, ↑ rotate, space hard drop, P pause).
      </p>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px] items-start">
        <div className="w-full max-w-[420px] mx-auto md:mx-0 select-none">
          <div
            className="grid grid-cols-10 gap-[2px] bg-border/80 p-2 rounded-lg shadow-sm"
            style={{ touchAction: "none" }}
            onPointerDown={onBoardPointerDown}
            onPointerUp={onBoardPointerUp}
          >
            {displayBoard.flatMap((row, rowIdx) =>
              row.map((cell, colIdx) => (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className="aspect-square rounded-[2px]"
                  style={{
                    backgroundColor: cell ?? "hsl(var(--background))",
                    border: cell ? "none" : "1px solid hsl(var(--border))",
                  }}
                />
              ))
            )}
          </div>

          {gameOver && (
            <p className="mt-3 text-sm text-red-500 font-medium">Game over. Tap New Game to play again.</p>
          )}
        </div>

        <div className="space-y-3">
          <div className="rounded-lg border border-border p-3 space-y-1 text-sm">
            <p><span className="font-medium">Score:</span> {score}</p>
            <p><span className="font-medium">Lines:</span> {lines}</p>
            <p><span className="font-medium">Level:</span> {level}</p>
          </div>

          <div className="rounded-lg border border-border p-3">
            <p className="text-sm font-medium mb-2">Next</p>
            <div className="grid gap-[2px] w-16">
              {nextShape.map((row, i) => (
                <div key={i} className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
                  {row.map((cell, j) => (
                    <div
                      key={`${i}-${j}`}
                      className="aspect-square rounded-[2px]"
                      style={{
                        backgroundColor: cell ? PIECE_COLORS[nextType] : "hsl(var(--background))",
                        border: cell ? "none" : "1px solid hsl(var(--border))",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsRunning((prev) => !prev)}
              disabled={gameOver}
              className="px-3 py-2 rounded-md border border-border text-sm hover:bg-muted disabled:opacity-50"
            >
              {isRunning ? "Pause" : "Resume"}
            </button>
            <button
              type="button"
              onClick={resetGame}
              className="px-3 py-2 rounded-md border border-border text-sm hover:bg-muted"
            >
              New Game
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-[420px] pb-1">
        <button type="button" onClick={() => rotatePiece()} className="col-span-3 rounded-md border border-border bg-muted/40 py-3.5 text-sm font-medium hover:bg-muted active:scale-[0.99]">Rotate</button>
        <button type="button" onClick={() => movePiece(-1, 0)} className="rounded-md border border-border bg-muted/40 py-3.5 text-sm font-medium hover:bg-muted active:scale-[0.99]">Left</button>
        <button type="button" onClick={() => movePiece(0, 1)} className="rounded-md border border-border bg-muted/40 py-3.5 text-sm font-medium hover:bg-muted active:scale-[0.99]">Down</button>
        <button type="button" onClick={() => movePiece(1, 0)} className="rounded-md border border-border bg-muted/40 py-3.5 text-sm font-medium hover:bg-muted active:scale-[0.99]">Right</button>
        <button type="button" onClick={() => hardDrop()} className="col-span-3 rounded-md border border-border bg-muted/40 py-3.5 text-sm font-medium hover:bg-muted active:scale-[0.99]">Hard Drop</button>
      </div>
    </div>
  );
}
