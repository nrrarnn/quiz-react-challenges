import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { CiLogout } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store'
import { logout } from '../store/authReducer'



const HeaderLayouts = ({ children }: { children: React.ReactNode}) => {
  const username = useSelector((state: RootState) => state.auth.username)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(logout()); 
    navigate('/');
  };
  return (
    <div className='p-8 font-sans'>
      <header className='flex justify-between px-4'>
        <h1 className='text-3xl font-bold'>Quizzler</h1>
        <div className='flex gap-3 items-center'>
          <h1>Hello, {username}</h1>
          <Dropdown>
            <DropdownTrigger>
              <img src="https://img.icons8.com/ios-glyphs/30/000000/expand-arrow--v1.png" alt="expand" className='w-[20px]' />
            </DropdownTrigger>
            <DropdownMenu variant='flat'>
              <DropdownItem >
                <button className='flex items-center gap-2' onClick={handleLogout}>
                  <CiLogout/> Logout
                </button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </header>
      <div>
        {children}
      </div>
    </div>
  )
}

export default HeaderLayouts;
