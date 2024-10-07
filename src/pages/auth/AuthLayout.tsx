import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='w-full  flex flex-row gap-5 justify-between py-6 px-20'>
      <div className="w-full sm:w-[48%]">
          <div className='text-3xl font-bold text-[#3c406d]'>Quizzler</div>
          <div className='py-16 mt-6 rounded-xl flex flex-col items-center bg-[#5cdae6]'>
            <img src="/img/bg.jpg" alt="Background Image" className='w-[430px]' />
            <p className='text-[#3c406d] text-xl font-bold'>Lorem ipsum dolor sit amet</p>
          </div>
      </div>

      <div className="w-full sm:w-[48%]">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
