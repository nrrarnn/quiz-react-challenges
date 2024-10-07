import { useState } from 'react'
import AuthLayout from './AuthLayout'
import { Button, Input } from '@nextui-org/react'
import { BsEye, BsEyeFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  return (
    <AuthLayout>
      <div className='flex flex-col w-full py-4 gap-6'>
        <div className='flex flex-row items-center justify-end gap-4 w-full'>
          <p className='text-slate-600'>Create an account</p>
          <button className='bg-teal-400 text-white px-4 py-2 rounded-full font-semibold'><Link to={'/register'}>Sign up</Link></button>
        </div>
        <div className='mt-10'>
          <p className='text-2xl font-bold'>Welcome to Quizzler</p>
          <p className='text-slate-600 text-sm pt-2'>register your account</p>
        </div>
        <form action="" className='flex flex-col gap-6'>
          <Input type="email" label="Email"/>
            <Input
              label="Password"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                  {isVisible ? (
                    <BsEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
          <Button type='submit' className='bg-teal-400 text-white px-4 py-2 rounded-full font-semibold mt-8'>Login</Button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default LoginPage
