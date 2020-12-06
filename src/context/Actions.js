
export const setEvents = (events) => ({
    type: "SET_EVENTS",
    payload: events
})

export const filterEvents = (search) => ({
    type: "FILTER_EVENTS",
    payload: search
})

export const pauseEventsListening = () => ({
    type: "PAUSE_EVENTS_LISENING"
})

export const resumeEventsListening = () => ({
    type: "RESUME_EVENTS_LISENING"
})