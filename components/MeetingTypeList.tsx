"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/components/ui/use-toast"

const MeetingTypeList = () => {
    const router = useRouter();

    const {toast} = useToast();
    const [meetingState, setMeetingState] = useState< 'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting'| undefined >();
    const [values,setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })
    const [callDetails,setCallDetails] = useState<Call>();
    const {user} = useUser();
    const client = useStreamVideoClient();
    const createMeeting = async ()=>{
        if(!client || !user) return ;

        try{
            if(!values.dateTime){
                toast({title: "Please select data and time."})
                return ;
            }
            const id = crypto.randomUUID();
            const call = client.call("default", id);
            if(!call) throw new Error("Failed to create call");

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || "Instant Meeting";

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call);

            if(!values.description){
                router.push(`/meeting/${call.id}`);
                toast({title: "Meeting Created"});
            }
        }
        catch(err){
            console.log(err)
            toast({
                title: "Failed to create meeting",
            })
        }
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