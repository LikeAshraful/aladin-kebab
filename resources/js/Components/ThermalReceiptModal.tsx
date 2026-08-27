import React, { useState } from 'react';
import { X, Printer, Check, Copy } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '../types';
import { translations, Locale } from '../lib/i18n';

interface ThermalReceiptModalProps {
    receiptText: string | null;
    onClose: () => void;
}

export const ThermalReceiptModal: React.FC<ThermalReceiptModalProps> = ({ receiptText, onClose }) => {
    const { locale = 'pl' } = usePage<PageProps>().props;
    const currentLocale = (locale as Locale) || 'pl';
    const t = translations[currentLocale] || translations.pl;

    const [copied, setCopied] = useState(false);

    if (!receiptText) return null;

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                <head>
                    <title>${t.brandName} - POS</title>
                    <style>
                        @page { size: 80mm auto; margin: 0; }
                        body {
                            font-family: 'Courier New', Courier, monospace;
                            font-size: 11px;
                            line-height: 1.2;
                            margin: 8px;
                            width: 72mm;
                            white-space: pre-wrap;
                            color: black;
                            background: white;
                        }
                    </style>
                </head>
                <body>${receiptText}</body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(receiptText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800 shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                            <Printer className="w-4 h-4" />
                        </div>
                        <div>
                            <h4 className="text-base font-black text-white">{t.receiptPreviewTitle}</h4>
                            <span className="text-xs text-neutral-400">{t.receiptFormatSubtitle}</span>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Monospace Receipt Paper Body */}
                <div className="my-4 p-4 rounded-2xl bg-neutral-950 border border-neutral-800 overflow-y-auto flex-1 font-mono text-[11px] sm:text-xs text-neutral-200 leading-relaxed select-all whitespace-pre-wrap">
                    {receiptText}
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>{copied ? t.copied : t.copyText}</span>
                    </button>

                    <button
                        type="button"
                        onClick={handlePrint}
                        className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                    >
                        <Printer className="w-4 h-4" />
                        <span>{t.printReceiptBtn}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
