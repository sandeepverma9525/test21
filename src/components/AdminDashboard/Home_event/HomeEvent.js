import React from 'react'
import EventIntro from './EventIntro'

const HomeEvent = () => {
  return (
    <div>
      <EventIntro apiType="eventIntro"/>
     <EventIntro apiType="templeIntro"/>
     <EventIntro apiType="publicationIntro"/>
     

    </div>
  )
}

export default HomeEvent
