import React, { FormEventHandler } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { MailCheck, LogOut } from 'lucide-react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout subtitle="Weryfikacja E-mail">
            <Head title="Weryfikacja adresu e-mail" />

            <div className="mb-4 text-xs text-neutral-400 leading-relaxed">
                Dziękujemy za rejestrację w Aladen Spicy Kebab! Zanim zaczniesz, prosimy o zweryfikowanie adresu e-mail poprzez kliknięcie w link przesłany w wiadomości.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
                    Nowy link weryfikacyjny został wysłany na Twój adres e-mail.
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center py-3.5 text-xs font-black rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-xl shadow-red-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all gap-2"
                        disabled={processing}
                    >
                        <MailCheck className="w-4 h-4" />
                        <span>{processing ? 'Wysyłanie...' : 'Wyślij ponownie link'}</span>
                    </PrimaryButton>
                </div>

                <div className="pt-4 text-center border-t border-neutral-800/80">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Wyloguj się</span>
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}

