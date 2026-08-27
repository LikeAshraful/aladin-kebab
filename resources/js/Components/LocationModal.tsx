import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { MapPin, Navigation, X, Check, Clock, AlertCircle, Sparkles } from 'lucide-react';
import { Branch } from '../types';
import { useLocationStore } from '../stores/locationStore';
import axios from 'axios';

interface LocationModalProps {
    branches: Branch[];
    selectedBranch: Branch | null;
}

export const LocationModal: React.FC<LocationModalProps> = ({ branches, selectedBranch }) => {
    const {
        isLocationModalOpen,
        setLocationModalOpen,
        isLocating,
        setIsLocating,
        nearestResult,
        setNearestResult,
    } = useLocationStore();

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    if (!isLocationModalOpen) return null;

    const handleSelectBranch = (branch: Branch) => {
        router.post(`/branches/${branch.id}/select`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                setLocationModalOpen(false);
            },
        });
    };

    const handleDetectLocation = () => {
        if (!navigator.geolocation) {
            setErrorMsg('Twoja przeglądarka nie obsługuje geolokalizacji.');
            return;
        }

        setIsLocating(true);
        setErrorMsg(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await axios.post('/api/branches/nearest', {
                        lat: latitude,
                        lng: longitude,
                    });
                    setNearestResult(response.data);
                } catch (err: any) {
                    setErrorMsg('Nie udało się ustalić najbliższego lokalu dla Twojej pozycji.');
                } finally {
                    setIsLocating(false);
                }
            },
            (error) => {
                setIsLocating(false);
                if (error.code === error.PERMISSION_DENIED) {
                    setErrorMsg('Brak zgody na udostępnienie lokalizacji w przeglądarce.');
                } else {
                    setErrorMsg('Wystąpił błąd podczas pobierania lokalizacji.');
                }
            },
            { timeout: 10000 }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-700 rounded-3xl p-6 shadow-2xl overflow-hidden text-white">
                {/* Close button */}
                <button
                    onClick={() => setLocationModalOpen(false)}
                    className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white">Wybierz swój lokal Aladen</h3>
                        <p className="text-xs text-neutral-400">
                            Wskaż restaurację, aby zobaczyć aktualną dostępność i czas realizacji
                        </p>
                    </div>
                </div>

                {/* Detect GPS Button */}
                <button
                    onClick={handleDetectLocation}
                    disabled={isLocating}
                    className="w-full mb-5 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 transition-all disabled:opacity-50"
                >
                    <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
                    <span>{isLocating ? 'Wyszukiwanie najbliższego lokalu...' : 'Użyj mojej lokalizacji GPS (Automatyczny wybór)'}</span>
                </button>

                {errorMsg && (
                    <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-800 text-xs text-red-300 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                    </div>
                )}

                {nearestResult && (
                    <div className="mb-4 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-600/60 text-xs text-emerald-200 animate-in fade-in">
                        <div className="font-bold text-sm text-emerald-300 flex items-center gap-1.5 mb-1">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            Najbliższy lokal: {nearestResult.nearest_branch.name} ({nearestResult.distance_km} km)
                        </div>
                        <div>
                            {nearestResult.is_deliverable ? (
                                <span className="text-emerald-400">
                                    ✓ Twój adres znajduje się w strefie dostawy! (Szacowany czas: ~{nearestResult.estimated_delivery_minutes} min)
                                </span>
                            ) : (
                                <span className="text-amber-400">
                                    ⚠️ Poza strefą bezpośredniej dostawy (dostępny odbiór osobisty na miejscu).
                                </span>
                            )}
                        </div>
                    </div>
                )}

                <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Dostępne filie w Twojej okolicy:
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {branches.map((b) => {
                        const isSelected = selectedBranch?.id === b.id;
                        return (
                            <div
                                key={b.id}
                                onClick={() => handleSelectBranch(b)}
                                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                                    isSelected
                                        ? 'bg-amber-500/15 border-amber-500/50 shadow-md shadow-amber-500/10'
                                        : 'bg-neutral-800/60 hover:bg-neutral-800 border-neutral-700/60 text-neutral-200'
                                }`}
                            >
                                <div className="space-y-1 min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-sm text-white truncate">{b.name}</span>
                                        {isSelected && (
                                            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 font-black text-[10px] uppercase tracking-wider">
                                                Aktywny
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-xs text-neutral-400 flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                                        <span>{b.address}, {b.city}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[11px] text-amber-400/90 pt-0.5">
                                        <span>Dostawa: min. {b.min_order_amount} zł</span>
                                        <span>•</span>
                                        <span>Opłata: {b.delivery_fee} zł</span>
                                        <span>•</span>
                                        <span>Zasięg: {b.delivery_radius_km} km</span>
                                    </div>
                                </div>

                                <div className="ml-3 shrink-0">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        isSelected ? 'bg-amber-500 text-black' : 'bg-neutral-700 text-neutral-400'
                                    }`}>
                                        <Check className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
