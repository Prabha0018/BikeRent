import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbarcomponents/Navbar';
import LinearColor from '../Components/Bodycomponents/linearprogress';
import { supabase } from '../config/supabaseClient';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const Submit = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email: email.trim().toLowerCase(),
                password: password
            });

            if (signInError) {
                console.error('Sign in error:', signInError);
                throw new Error('Invalid email or password');
            }

            if (data?.user) {
                // Successfully signed in
                navigate('/');
            } else {
                throw new Error('Something went wrong');
            }
        } catch (e) {
            console.error('Login error:', e);
            setError(e.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <LinearColor />}
            <div className="">
                <Navbar />
                <div className="flex items-center justify-center">
                    <div className="max-w-screen-md p-4 mt-16">
                        <form onSubmit={Submit}>
                            <div className="">
                                <h2 className="text-xl font-bold font-sans my-6">Sign in</h2>
                                <label className="text-base font-semibold font-sans">Email address</label>
                                <br />
                                <input
                                    value={email}
                                    onChange={ev => setEmail(ev.target.value)}
                                    type="email"
                                    className="text-lg my-2 font-semibold focus:outline-none font-sans rounded py-2 px-11 bg-[#f2f2f2]"
                                    placeholder="youremail@example.com"
                                    required
                                />
                                <br />
                                <label className="text-base font-semibold font-sans">Password</label>
                                <br />
                                <input
                                    value={password}
                                    onChange={ev => setPassword(ev.target.value)}
                                    type="password"
                                    className="text-lg my-2 font-semibold focus:outline-none font-sans rounded py-2 px-11 bg-[#f2f2f2]"
                                    placeholder="password"
                                    required
                                    minLength={6}
                                />
                                {error && (
                                    <div className="text-center mt-2">
                                        <p className="text-red-500 text-sm">{error}</p>
                                    </div>
                                )}
                                <div className="my-4 w-full flex flex-col items-center gap-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-14 py-3 bg-orange opacity-95 text-white hover:opacity-100 rounded hover:shadow-xl font-bold z-0 disabled:opacity-50"
                                    >
                                        {loading ? 'Signing in...' : 'Sign in'}
                                    </button>
                                </div>
                                <div className="text-center mt-4">
                                    <p className="text-sm text-gray-600">
                                        Don't have an account?{' '}
                                        <button
                                            type="button"
                                            onClick={() => navigate('/register')}
                                            className="text-orange hover:underline"
                                        >
                                            Register here
                                        </button>
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/reset-password')}
                                        className="text-orange hover:underline text-sm mt-2"
                                    >
                                        Forgot your password?
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}