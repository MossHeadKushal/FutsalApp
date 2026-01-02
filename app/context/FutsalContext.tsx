import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the shape of a Futsal
export interface Futsal {
    id: string;
    name: string;
    slug?: string;
    address: string;
    courts: number;
    image?: string;
    status: string; // 'Active' | 'Inactive'
}

// Define the Context Types
interface FutsalContextType {
    futsals: Futsal[];
    addFutsal: (futsal: Omit<Futsal, 'id' | 'status'>) => void;
}

// Create Context
const FutsalContext = createContext<FutsalContextType | undefined>(undefined);

// Initial Dummy Data
const INITIAL_FUTSALS: Futsal[] = [
    {
        id: '1',
        name: 'Blue Arena',
        slug: 'blue-arena',
        address: 'Kathmandu',
        courts: 3,
        image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2071&auto=format&fit=crop',
        status: 'Active',
    },
    {
        id: '2',
        name: 'Red Court',
        slug: 'red-court',
        address: 'Lalitpur',
        courts: 2,
        image: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=2070&auto=format&fit=crop',
        status: 'Active',
    },
];

// Provider Component
export const FutsalProvider = ({ children }: { children: ReactNode }) => {
    const [futsals, setFutsals] = useState<Futsal[]>(INITIAL_FUTSALS);

    const addFutsal = (newFutsalData: Omit<Futsal, 'id' | 'status'>) => {
        const newFutsal: Futsal = {
            id: Math.random().toString(36).substr(2, 9),
            status: 'Active',
            ...newFutsalData,
        };
        setFutsals((prev) => [newFutsal, ...prev]);
    };

    return (
        <FutsalContext.Provider value={{ futsals, addFutsal }}>
            {children}
        </FutsalContext.Provider>
    );
};

// Custom Hook for usage
export const useFutsals = () => {
    const context = useContext(FutsalContext);
    if (!context) {
        throw new Error('useFutsals must be used within a FutsalProvider');
    }
    return context;
};
