"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'

const MeetingTypeList = () => {
    const router = useRouter();

    const [meetingState, setMeetingState] = useState< 'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting'>();

    const createMeeting = ()=>{

    }
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                title='New Meeting'
                description='Start an instant meeting'
                color='orange'
                img='/icons/add-meeting.svg' 
                handleClick={()=>setMeetingState('isInstantMeeting')}
            />
            <HomeCard
                title='Schedule Meeting'
                description='Plan your meeting'
                color='blue'
                img='/icons/schedule.svg'
                handleClick={()=>setMeetingState('isScheduleMeeting')}
            />
            <HomeCard
                title='ViewRecording'
                description='Check out you recordings'
                color='purple'
                img='/icons/recordings.svg' 
                handleClick={()=>router.push('/recordings')}
            />
            <HomeCard
                title='Join Meeting'
                description='Join meeting via invite link'
                color='yellow'
                img='/icons/join-meeting.svg' 
                handleClick={()=>setMeetingState('isJoiningMeeting')}
            />
            <MeetingModal
                isOpen={meetingState==='isInstantMeeting'}
                onClose={()=>setMeetingState(undefined)}
                title= "Start an Instant Meeting"
                className='text-center'
                buttonText='Start Meeting'
                handleClick={createMeeting}
            />
        </section>
    )
}

export default MeetingTypeList