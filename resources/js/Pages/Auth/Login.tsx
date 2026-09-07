import React, { FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, LogIn, Shield, Store, UtensilsCrossed, Sparkles } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const fillCredentials = (email: string, pass: string = 'password') => {
        setData((prev) => ({
            ...prev,
            email,
            password: pass,
        }));
    };

    return (
        <GuestLayout subtitle="Panel Pracownika & Administratora">
            <Head title="Logowanie do panelu" />

            {status && (
                <div className="mb-5 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                {/* Email input */}
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
                            placeholder="admin@aladenkebab.pl"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>

                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                {/* Password input */}
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <InputLabel htmlFor="password" value="Hasło" className="text-xs font-bold text-neutral-300" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                            >
                                Zapomniałeś hasła?
                            </Link>
                        )}
                    </div>

                    <div className="relative">
                        <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="pl-10 block w-full bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-2xl text-sm py-2.5"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </div>

                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                {/* Remember me */}
                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData(
                                    'remember',
                                    (e.target.checked || false) as false,
                                )
                            }
                            className="rounded-lg border-neutral-700 bg-neutral-950 text-amber-500 focus:ring-amber-500/20 w-4 h-4"
                        />
                        <span className="text-xs text-neutral-300 font-medium">
                            Zapamiętaj mnie
                        </span>
                    </label>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center py-3.5 text-xs font-black rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-xl shadow-red-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all gap-2"
                        disabled={processing}
                    >
                        <LogIn className="w-4 h-4" />
                        <span>{processing ? 'Logowanie...' : 'Zaloguj się do panelu'}</span>
                    </PrimaryButton>
                </div>
            </form>

            {/* Quick Demo Login Preset Helper */}
            <div className="mt-6 pt-5 border-t border-neutral-800/80 space-y-2.5">
                <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Szybkie logowanie testowe:
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">hasło: password</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <button
                        type="button"
                        onClick={() => fillCredentials('admin@aladenkebab.pl')}
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-white transition-all text-center group"
                    >
                        <Shield className="w-4 h-4 text-red-500 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] font-bold text-white leading-tight">Admin</span>
                        <span className="text-[9px] text-neutral-500 truncate max-w-full">Master</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => fillCredentials('bedzin.manager@aladenkebab.pl')}
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-white transition-all text-center group"
                    >
                        <Store className="w-4 h-4 text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] font-bold text-white leading-tight">Manager</span>
                        <span className="text-[9px] text-neutral-500 truncate max-w-full">Będzin</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => fillCredentials('bedzin.kitchen@aladenkebab.pl')}
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-white transition-all text-center group"
                    >
                        <UtensilsCrossed className="w-4 h-4 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] font-bold text-white leading-tight">Kuchnia</span>
                        <span className="text-[9px] text-neutral-500 truncate max-w-full">KDS</span>
                    </button>
                </div>
            </div>
        </GuestLayout>
    );
}

