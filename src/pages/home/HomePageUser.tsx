import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import CardQuizCategory from '../../components/CardQuizCategory'

const HomePageUser = () => {
  const username = useSelector((state: RootState) => state.auth.username)
  return (
    <div className='p-8'>
      <header className='flex justify-between'>
        <h1 className='text-3xl font-bold'>Quizzler</h1>
        <button>{username}</button>
      </header>
      <div>
        <CardQuizCategory />
      </div>
    </div>
  )
}

export default HomePageUser
