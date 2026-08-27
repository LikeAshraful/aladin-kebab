import { create } from 'zustand';
import { Branch } from '../types';

interface NearestResult {
    nearest_branch: Branch;
    distance_km: number;
    is_deliverable: boolean;
    delivery_fee: number;
    min_order_amount: number;
    free_delivery_threshold: number | null;
    estimated_delivery_minutes: number;
    all_branches_distance: Array<{
        branch: Branch;
        distance_km: number;
        is_deliverable: boolean;
    }>;
}

interface LocationState {
    isLocationModalOpen: boolean;
    isLocating: boolean;
    userCoords: { lat: number; lng: number } | null;
    nearestResult: NearestResult | null;
    searchQuery: string;

    // Actions
    setLocationModalOpen: (open: boolean) => void;
    setIsLocating: (isLocating: boolean) => void;
    setUserCoords: (coords: { lat: number; lng: number } | null) => void;
    setNearestResult: (result: NearestResult | null) => void;
    setSearchQuery: (query: string) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
    isLocationModalOpen: false,
    isLocating: false,
    userCoords: null,
    nearestResult: null,
    searchQuery: '',

    setLocationModalOpen: (isLocationModalOpen) => set({ isLocationModalOpen }),
    setIsLocating: (isLocating) => set({ isLocating }),
    setUserCoords: (userCoords) => set({ userCoords }),
    setNearestResult: (nearestResult) => set({ nearestResult }),
    setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
