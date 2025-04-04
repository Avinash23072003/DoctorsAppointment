import React, { useState } from 'react'

const Login = () => {
  const [state,setState]=useState('Sign Up');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');

  const onSubmit=async(e)=>{
    e.preventDefault();
  }
  return (
    <form className="pt-34 min-h-[80vh] flex items-center  onScroll(0,0)" >
    <div  className="flex flex-col gap-3  m-auto p-4 justify-center w-full max-w-[400px] sm:max-w-[300px] shadow-zinc-400 shadow-lg rounded-2xl" > 
      <p className="text-center font-semibold text-2xl text-blue-600">{state=='Sign Up' ? 'Create Account' :' Sign In' }</p>

     
      <p className="p-4">Please {state=='Sign Up'? 'Create Account': 'Sign In'} booking appointment</p>
      
      {
        state=='Sign Up' && 
        <div>
        <p>Full Name</p>
        <input className="pt-2 p-2  border border-solid w-full rounded-sm " type="text" onChange={(e)=>setName(e.target.value) } value={name}/>
      </div>
      }

      <div>
        <p>Email </p>
        <input  className="pt-2  p-2 border border-solid w-full rounded-sm " type="text" onChange={(e)=>setEmail(e.target.value) } value={email}/>
      </div>

      <div>
        <p>Password </p>
        <input className="pt-2  p-2 border border-solid w-full rounded-sm " type="password" onChange={(e)=>setPassword(e.target.value) } value={password}/>
      </div>
      <button className="mt-4 p-2 bg-blue-300 hover:bg-blue-600 rounded-sm">{state=='Sign Up' ? 'Create Account' :' Sign In' }</button>
      {
        state==='Sign Up' ? <p>Already have an acoount ? <span onClick ={()=>setState('Sign In')}className=" cursor-pointer text-blue-600">Login here</span></p> 
        : <p  className="cursor-pointer text-blue-600" onClick ={()=>setState('Sign Up')}>Create a new Account</p>

      }
    </div>
    </form>

  )
}

export default Login