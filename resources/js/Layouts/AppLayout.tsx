import React, { PropsWithChildren } from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps, Branch } from '../types';
import { Navbar } from '../Components/Navbar';
import { Footer } from '../Components/Footer';
import { LocationModal } from '../Components/LocationModal';
import { CartDrawer } from '../Components/CartDrawer';
import { useCartStore } from '../stores/cartStore';

interface AppLayoutProps {
    branches?: Branch[];
    selectedBranch?: Branch | null;
}

export const AppLayout: React.FC<PropsWithChildren<AppLayoutProps>> = ({
    children,
    branches: propBranches,
    selectedBranch: propSelectedBranch,
}) => {
    const pageProps = usePage<PageProps>().props;
    const branches = propBranches || pageProps.branches || [];

    const { selectedBranch: storeBranch, setSelectedBranch } = useCartStore();

    // Determine current active branch
    const activeBranch = propSelectedBranch || storeBranch || branches[0] || null;

    // Keep store synchronized
    React.useEffect(() => {
        if (propSelectedBranch && propSelectedBranch.id !== storeBranch?.id) {
            setSelectedBranch(propSelectedBranch);
        }
    }, [propSelectedBranch]);

    const flash = pageProps.flash;

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
            {/* Flash messages toast */}
            {flash?.success && (
                <div className="fixed bottom-5 right-5 z-50 p-4 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-sm font-semibold shadow-2xl animate-in slide-in-from-bottom-5">
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="fixed bottom-5 right-5 z-50 p-4 rounded-2xl bg-red-950 border border-red-500 text-red-200 text-sm font-semibold shadow-2xl animate-in slide-in-from-bottom-5">
                    {flash.error}
                </div>
            )}

            {/* Navbar */}
            <Navbar branches={branches} selectedBranch={activeBranch} />

            {/* Main Page Content */}
            <main className="flex-1">{children}</main>

            {/* Location Selector Modal */}
            <LocationModal branches={branches} selectedBranch={activeBranch} />

            {/* Cart & Checkout Drawer */}
            <CartDrawer branches={branches} selectedBranch={activeBranch} />

            {/* Footer */}
            <Footer branches={branches} />
        </div>
    );
};

export default AppLayout;
