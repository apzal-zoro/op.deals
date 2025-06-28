'use client';

import { useState, useMemo, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { mockDeals } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Flame } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { DealCard } from '@/components/deals/deal-card';

const GRID_SIZE = 8;
const DIRT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M0,0H2V1H3V2H5V1H7V0H8V1H9V2H10V5H9V6H8V7H7V8H6V9H4V8H3V7H2V6H1V5H0V0ZM1,1V4H2V5H3V6H4V7H6V6H7V5H8V4H9V1H8V2H7V3H5V2H3V1H2V2H1Z" fill="#A0522D"/></svg>`;
const TREASURE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M0,3H1V2H2V1H8V2H9V3H10V8H9V9H1V8H0V3ZM2,3V7H8V3H2Z" fill="#B8860B"/><path d="M1,4H2V3H8V4H9V7H8V8H2V7H1V4Z" fill="#FFD700"/><path d="M3,4V5H4V6H6V5H7V4H3Z" fill="#FFFFFF" fill-opacity="0.5"/></svg>`;


export default function DiggerPage() {
    const [grid, setGrid] = useState(() => Array(GRID_SIZE * GRID_SIZE).fill('dirt'));
    const [dugCount, setDugCount] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [foundDeal, setFoundDeal] = useState(false);
    
    const historicDeal = useMemo(() => mockDeals.find(d => d.isHistoricLow), []);
    const [treasureIndex, setTreasureIndex] = useState<number | null>(null);

    useEffect(() => {
        setTreasureIndex(Math.floor(Math.random() * GRID_SIZE * GRID_SIZE));
    }, []);

    const handleDig = (index: number) => {
        if (gameOver || grid[index] !== 'dirt' || treasureIndex === null) return;

        const newGrid = [...grid];
        setDugCount(c => c + 1);

        if (index === treasureIndex) {
            newGrid[index] = 'treasure';
            setFoundDeal(true);
            setGameOver(true);
        } else {
            newGrid[index] = 'empty';
        }
        setGrid(newGrid);
    };

    const resetGame = () => {
        setGrid(Array(GRID_SIZE * GRID_SIZE).fill('dirt'));
        setDugCount(0);
        setGameOver(false);
        setFoundDeal(false);
        setTreasureIndex(Math.floor(Math.random() * GRID_SIZE * GRID_SIZE));
    };

    const getTileContent = (state: string) => {
        if (state === 'treasure') return `url("data:image/svg+xml,${encodeURIComponent(TREASURE_SVG)}")`;
        if (state === 'empty') return 'none';
        return `url("data:image/svg+xml,${encodeURIComponent(DIRT_SVG)}")`;
    }

    return (
        <MainLayout>
            <div className="space-y-6 pt-8">
                <div className="text-center">
                    <h1 className="text-2xl text-primary">Deal Digger</h1>
                    <p className="text-muted-foreground text-sm mt-2">
                        Dig for treasure! Unearth a deal with a historic low price.
                    </p>
                </div>
                
                <div className="p-4 bg-card/50 rounded-lg mx-auto max-w-max">
                    <div className="grid gap-1" style={{gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`}}>
                        {grid.map((cell, index) => (
                            <button
                                key={index}
                                onClick={() => handleDig(index)}
                                className={cn(
                                    "w-10 h-10 bg-repeat bg-center transition-colors",
                                    cell === 'dirt' && "hover:bg-yellow-900/50",
                                    cell === 'empty' && "bg-background/50",
                                )}
                                style={{
                                    backgroundImage: getTileContent(cell),
                                    backgroundSize: 'cover',
                                    imageRendering: 'pixelated',
                                    cursor: cell === 'dirt' ? 'pointer' : 'default',
                                }}
                                aria-label={`Dig at position ${index}`}
                                disabled={gameOver}
                            />
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <p className="font-headline">Dug: {dugCount}</p>
                    {gameOver && (
                        <Button onClick={resetGame} className="mt-4 rounded-md font-headline hover:shadow-glow-primary">Play Again</Button>
                    )}
                </div>
            </div>

            <AlertDialog open={foundDeal} onOpenChange={setFoundDeal}>
                <AlertDialogContent className="rounded-lg shadow-glow-primary border-primary">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-primary text-2xl flex items-center justify-center gap-2">
                            <Flame /> BAHUBALI DEAL! <Flame />
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center pt-2">
                            You've unearthed a deal at its historic lowest price!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="p-4">
                        {historicDeal && <DealCard deal={historicDeal} boxArtHint="dark fantasy" storeLogoHint="gog" />}
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogAction className="w-full font-headline rounded-md">Awesome!</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </MainLayout>
    );
}
