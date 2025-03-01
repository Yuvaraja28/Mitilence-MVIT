'use client';
import React from "react";

type Params = Promise<{ eventId: string }> 

export default function EventRedirect({ params }: { params: Params }) {
  const eventId = React.use(params).eventId
  React.useEffect(() => {
    location.replace(`/events?event=${eventId}`)
  }, [])
  return <></>
}