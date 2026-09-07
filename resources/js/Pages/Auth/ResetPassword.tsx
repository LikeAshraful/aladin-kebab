import React, { FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Mail, Lock, KeyRound } from 'lucide-react';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout subtitle="Ustaw Nowe Hasło">
            <Head title="Reset Hasła" />

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
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>

                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Nowe hasło" className="text-xs font-bold text-neutral-300 mb-1.5" />

                    <div className="relative">
                        <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="pl-10 block w-full bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-2xl text-sm py-2.5"
                            autoComplete="new-password"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </div>

                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Potwierdź nowe hasło"
                        className="text-xs font-bold text-neutral-300 mb-1.5"
                    />

                    <div className="relative">
                        <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <TextInput
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="pl-10 block w-full bg-neutral-950 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-2xl text-sm py-2.5"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />
                    </div>

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1.5"
                    />
                </div>

                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center py-3.5 text-xs font-black rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-xl shadow-red-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all gap-2"
                        disabled={processing}
                    >
                        <KeyRound className="w-4 h-4" />
                        <span>{processing ? 'Zapisywanie...' : 'Zapisz nowe hasło'}</span>
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

