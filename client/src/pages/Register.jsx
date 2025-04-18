import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbarcomponents/Navbar';
import LinearColor from '../Components/Bodycomponents/linearprogress';
import { supabase } from '../config/supabaseClient';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [isValid, setIsvalid] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [isUserExist, setIsuserExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsvalid(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isValid]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValidPassword(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [validPassword]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsuserExist(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isUserExist]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailResult = emailRegex.test(username);
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]}|;:'",.<>/?]).{8,}$/;
  const passwordResult = passwordRegex.test(password);

  const HandleClick = () => {
    if (page === 0 && emailResult) {
      setPage(page + 1);
    }
    if (!emailResult) {
      setIsvalid(true);
    }
  };

  const Submit = async () => {
    if (!passwordResult || password !== confirmPassword) {
      setValidPassword(true);
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Sign up the user with Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: username,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setIsuserExist(true);
        } else {
          setError(signUpError.message);
        }
        return;
      }

      if (data?.user) {
        // Show success message and redirect
        alert('Registration successful! Please check your email to verify your account before logging in.');
        navigate('/login');
      } else {
        setError('Something went wrong during registration. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An unexpected error occurred. Please try again.');
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
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="">
                {page === 0 ? (
                  <>
                    <h2 className="text-xl font-bold font-sans my-6">Create an account</h2>
                    <label className="text-base font-semibold font-sans">Email address</label>
                    <br />
                    <input
                      value={username}
                      onChange={(ev) => setUsername(ev.target.value)}
                      type="email"
                      className="text-lg my-2 font-semibold focus:outline-none font-sans rounded py-2 px-11 bg-[#f2f2f2]"
                      placeholder="youremail@example.com"
                    />
                    {isValid && (
                      <div className="flex justify-center">
                        <p className="text-red-500">Invalid Email address</p>
                      </div>
                    )}
                    <div className="my-4 w-full flex justify-center">
                      <button
                        onClick={HandleClick}
                        className="px-14 py-3 bg-orange opacity-95 text-white hover:opacity-100 rounded hover:shadow-xl font-bold"
                      >
                        Continue with email
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold font-sans my-6">Create password</h2>
                    <label className="text-base font-semibold font-sans">Password</label>
                    <br />
                    <input
                      value={password}
                      onChange={(ev) => setPassword(ev.target.value)}
                      type="password"
                      className="text-lg my-2 font-semibold focus:outline-none font-sans rounded py-2 px-11 bg-[#f2f2f2]"
                      placeholder="Enter a password"
                    />
                    <br />
                    <label className="text-base font-semibold font-sans">Confirm password</label>
                    <br />
                    <input
                      value={confirmPassword}
                      onChange={(ev) => setConfirmPassword(ev.target.value)}
                      type="password"
                      className="text-lg my-2 font-semibold focus:outline-none font-sans rounded py-2 px-11 bg-[#f2f2f2]"
                      placeholder="Confirm your password"
                    />
                    {validPassword && (
                      <div className="flex justify-center">
                        <p className="text-red-500">Password must contain at least 8 characters, including uppercase, lowercase, number, and special character</p>
                      </div>
                    )}
                    {password !== confirmPassword && !validPassword && confirmPassword.length > 0 && (
                      <div className="flex justify-center">
                        <p className="text-red-500">Password Mismatch</p>
                      </div>
                    )}
                    {isUserExist && (
                      <div className="flex justify-center">
                        <p className="text-red-500">This email is already registered</p>
                      </div>
                    )}
                    {error && (
                      <div className="flex justify-center">
                        <p className="text-red-500">{error}</p>
                      </div>
                    )}
                    <div className="my-4 w-full flex justify-center">
                      <button
                        onClick={Submit}
                        disabled={loading}
                        className="px-14 py-3 bg-orange opacity-95 text-white hover:opacity-100 rounded hover:shadow-xl font-bold disabled:opacity-50"
                      >
                        {loading ? 'Creating account...' : 'Create account'}
                      </button>
                    </div>
                  </>
                )}
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="text-orange hover:underline"
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
