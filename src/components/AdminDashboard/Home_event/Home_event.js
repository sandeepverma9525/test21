import React from 'react'
import EventIntro from './EventIntro'

//
const Home_event = () => {
  return (
    <div>
     <EventIntro apiType="eventIntro"/>
     <EventIntro apiType="templeIntro"/>
     <EventIntro apiType="publicationIntro"/>

    </div>
  )
}

export default Home_event
