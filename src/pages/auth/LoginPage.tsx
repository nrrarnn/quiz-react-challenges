import { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { Button, Input } from '@nextui-org/react'
import { BsEye, BsEyeFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/authApiServices';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/authReducer';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }), // Validasi email harus format email
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }), // Validasi password minimal 6 karakter
});

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(''); 
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(''); 
    setPasswordError('');

    try {
      loginSchema.parse({ email, password }); 
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        validationError.errors.forEach((err) => {
          if (err.path[0] === "email") {
            setEmailError(err.message); 
          } else if (err.path[0] === "password") {
            setPasswordError(err.message); 
          }
        });
        return;
      }
    }

    try {
      const response = await login(email, password);
      const token: string = response.token
      const username: string = response.user.username
      const userEmail: string = response.user.email
      
      
      localStorage.setItem("token", token)
      localStorage.setItem("username", username)
      localStorage.setItem("email", userEmail)

      dispatch(setAuth({ token, username, userEmail }));

      navigate('/dashboard');
    } catch (error) {
      console.log('Login error:', error); 
    }
  };


  
  return (
    <AuthLayout>
      <div className='flex flex-col w-full py-4 gap-6'>
        <div className='flex flex-row items-center justify-end gap-4 w-full'>
          <p className='text-slate-600'>Create an account</p>
          <button className='bg-teal-400 text-white px-4 py-2 rounded-full font-semibold'><Link to={'/register'}>Sign up</Link></button>
        </div>
        <div className='mt-10'>
          <p className='text-2xl font-bold'>Welcome to Quizzler</p>
          <p className='text-slate-600 text-sm pt-2'>login to your account</p>
        </div>
        <form onSubmit={handleLogin} className='flex flex-col gap-6'>
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
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          <Button type='submit' className='bg-teal-400 text-white px-4 py-2 rounded-full font-semibold mt-8'>Login</Button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default LoginPage
