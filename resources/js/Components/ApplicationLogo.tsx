import React from 'react';
import { Flame } from 'lucide-react';

interface ApplicationLogoProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showText?: boolean;
    subtitle?: string;
    iconOnly?: boolean;
}

export default function ApplicationLogo({
    size = 'md',
    showText = true,
    subtitle = 'Authentic Spicy Grill',
    iconOnly = false,
    className = '',
    ...props
}: ApplicationLogoProps) {
    const sizeConfig = {
        sm: {
            container: 'w-8 h-8 rounded-xl',
            icon: 'w-4 h-4',
            title: 'text-sm sm:text-base',
            sub: 'text-[8px]',
        },
        md: {
            container: 'w-11 h-11 rounded-2xl',
            icon: 'w-6 h-6',
            title: 'text-lg sm:text-xl',
            sub: 'text-[9px]',
        },
        lg: {
            container: 'w-14 h-14 rounded-2xl',
            icon: 'w-8 h-8',
            title: 'text-2xl sm:text-3xl',
            sub: 'text-[11px]',
        },
        xl: {
            container: 'w-16 h-16 rounded-3xl',
            icon: 'w-9 h-9',
            title: 'text-3xl sm:text-4xl',
            sub: 'text-xs',
        },
    }[size];

    return (
        <div
            className={`inline-flex items-center gap-3 select-none group ${className}`}
            {...props}
        >
            <div
                className={`${sizeConfig.container} bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-red-600/30 shrink-0 group-hover:scale-105 transition-transform duration-300`}
            >
                <Flame className={`${sizeConfig.icon} text-white fill-white`} />
            </div>

            {showText && !iconOnly && (
                <div className="flex flex-col text-left">
                    <span
                        className={`${sizeConfig.title} font-black tracking-tight text-white leading-tight flex items-center gap-1.5`}
                    >
                        ALADEN <span className="text-amber-400">KEBAB</span>
                    </span>
                    {subtitle && (
                        <span
                            className={`${sizeConfig.sub} text-neutral-400 font-semibold tracking-wider uppercase mt-0.5`}
                        >
                            {subtitle}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

