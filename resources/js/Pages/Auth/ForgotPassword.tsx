import React, { FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
 import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Send, ArrowLeft } from 'lucide-react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout subtitle="Odzyskiwanie Hasła">
            <Head title="Zapomniałeś hasła" />

            <div className="mb-4 text-xs text-neutral-400 leading-relaxed">
                Nie pamiętasz hasła? Wprowadź swój adres e-mail, a prześlemy Ci link do zresetowania hasła i utworzenia nowego.
            </div>

            {status && (
                <div className="mb-4 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Adres e-mail" className="text-xs font-bold text-neutral-300 mb-1.5" />

                    <div className="relative">
                        <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="pl-10 block w-full bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-2xl text-sm py-2.5"
                            placeholder="twoj.email@example.com"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>

                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center py-3.5 text-xs font-black rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-xl shadow-red-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all gap-2"
                        disabled={processing}
                    >
                        <Send className="w-4 h-4" />
                        <span>{processing ? 'Wysyłanie...' : 'Wyślij link do resetu'}</span>
                    </PrimaryButton>
                </div>

                <div className="pt-4 text-center border-t border-neutral-800/80">
                    <Link
                        href={route('login')}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Wróć do logowania</span>
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}

