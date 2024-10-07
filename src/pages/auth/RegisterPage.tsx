import { useState } from 'react'
import AuthLayout from './AuthLayout'
import { Button, Input } from '@nextui-org/react';
import { BsEye, BsEyeFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { register } from '../../api/authApiServices';

const registerSchema = z.object({
  username: z.string().min(4, "Name minimal 4 karakter"),
  email: z.string().email("Format email belum sesuai"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});
const RegisterPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    try {
      registerSchema.parse({ username, email, password, confirmPassword });
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        validationError.errors.forEach((err) => {
          if (err.path[0] === 'username') {
            setUsernameError(err.message);
          } else if (err.path[0] === 'email') {
            setEmailError(err.message);
          } else if (err.path[0] === 'password') {
            setPasswordError(err.message);
          } else if (err.path[0] === 'confirmPassword') {
            setConfirmPasswordError(err.message);
          }
        });
        return;
      }
    }

    try {
      const response = await register(username, email, password);
      
      console.log(response)
      alert("Register Success");

      navigate('/');
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <div className='flex flex-col w-full py-4 gap-6'>
        <div className='flex flex-row items-center justify-end gap-4 w-full'>
          <p className='text-slate-600'>Already have an account?</p>
          <button className='bg-teal-400 text-white px-4 py-2 rounded-full font-semibold'><Link to={'/'}>Login</Link></button>
        </div>
        <div className='mt-2'>
          <p className='text-2xl font-bold'>Welcome to Quizzler</p>
          <p className='text-slate-600 text-sm pt-2'>register your account</p>
        </div>
        <form onSubmit={handleRegister} className='flex flex-col gap-6'>
          <Input 
            type="text" 
            label="Username"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className={usernameError ? 'border-red-500' : ''}/>
            {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
          <Input 
            type="email" 
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            className={emailError ? 'border-red-500' : ''}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
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
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={passwordError ? 'border-red-500' : ''}
              />
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

            <Input
              label="Confirm Password"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility2} aria-label="toggle password visibility">
                  {isVisible2 ? (
                    <BsEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible2 ? "text" : "password"}
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className={confirmPasswordError ? 'border-red-500' : ''}
              />
              {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
          <Button type='submit' className='bg-teal-400 text-white px-4 py-2 rounded-full font-semibold mt-2'>Register</Button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default RegisterPage
