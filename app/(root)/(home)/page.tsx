"use client"
import MeetingTypeList from '@/components/MeetingTypeList';
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [now,setNow] = useState(new Date());
  const [time,setTime] = useState(now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}));
  const [date,setDate] = useState(new Intl.DateTimeFormat('en-US',{dateStyle:'full'}).format(now));

  setInterval(()=>{
    setNow(new Date());
    setTime(now.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}));
    setDate(new Intl.DateTimeFormat('en-US',{dateStyle:'full'}).format(now));
  },30000);

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming meeting at 12:00 PM</h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
      
    </section>
  )
}

export default Home