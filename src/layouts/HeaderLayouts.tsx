import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { CiLogout } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store'
import { logout } from '../store/authReducer'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';



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
  const onLogout = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
          container: 'swal-container',
          popup: 'swal-popup',
          title: 'swal-title',
          confirmButton: 'swal-confirm',
          cancelButton: 'swal-cancel'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          handleLogout();
        }
      });
    }
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
                <button className='flex items-center gap-2' onClick={onLogout}>
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
