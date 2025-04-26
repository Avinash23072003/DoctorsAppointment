import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext.jsx';
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const {token, backendURL,setToken } = useContext(AppContext);
 
  const [mode, setMode] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

const navigate=useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (mode === 'Sign Up') {
        const { data } = await axios.post(backendURL+'/api/users/register', {
          name,
          password,
          email
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success('User registration successful');
        } else {
          toast.error(data.message || 'Registration failed');
        }

      } 
      else{
        const { data } = await axios.post(backendURL + '/api/users/login', {
        password,
        email
      })
      if (data.success) {
        console.log('Sending login data:', { email, password });
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success('Login successful');
      } 
      else{
        toast.error(data.message);
      }
      
    }
    } catch (error) {
      console.error('Error during auth:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong');
      }
      
      
    }
  
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form
      onSubmit={onSubmitHandler}
      className="pt-34 min-h-[80vh] flex items-center"
    >
      <div className="flex flex-col gap-3 m-auto p-4 justify-center w-full max-w-[400px] sm:max-w-[300px] shadow-zinc-400 shadow-lg rounded-2xl">
        <p className="text-center font-semibold text-2xl text-blue-600">
          {mode === 'Sign Up' ? 'Create Account' : 'Sign In'}
        </p>

        <p className="p-4">
          Please {mode === 'Sign Up' ? 'create an account' : 'sign in'} to book
          an appointment
        </p>

        {mode === 'Sign Up' && (
          <div>
            <p>Full Name</p>
            <input
              className="pt-2 p-2 border border-solid w-full rounded-sm"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
              required
            />
          </div>
        )}

        <div>
          <p>Email</p>
          <input
            className="pt-2 p-2 border border-solid w-full rounded-sm"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <p>Password</p>
          <input
            className="pt-2 p-2 border border-solid w-full rounded-sm"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 p-2 bg-blue-300 hover:bg-blue-600 rounded-sm"
        >
          {mode === 'Sign Up' ? 'Create Account' : 'Sign In'}
        </button>

        {mode === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setMode('Sign In')}
              className="cursor-pointer text-blue-600"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?{' '}
            <span
              onClick={() => setMode('Sign Up')}
              className="cursor-pointer text-blue-600"
            >
              Create one
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
