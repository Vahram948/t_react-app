import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import config from '../config';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const initialState = {
    isEventsOnLive: true,
    isSocketConnected: false,
    isSearching: false,
    inboxEvents: [],
    events: []
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    const loadEvents = async () => {
        const socket = io(config.apiBase);

        socket.on('error', () => {
            toast.info('Sorry, there seems to be an issue with the connection!')
        })

        socket.on('connect', () => {
            toast.info('Socket successfully connected')
            dispatch({ type: "SET_SOCKET_CONNECTED" });
            socket.on(config.channel, (data) => {
                setEvents(JSON.parse(data))
            });
        });
    }

    // todo check
    const setEvents = (events) => {
        // console.log(events, 888);
        // if (!state.isEventsOnLive) {
        //     return;
        // }

        dispatch({ type: "SET_EVENTS", payload: events });
    }

    const filterEvents = (event) => {
        dispatch({
            type: "FILTER_EVENTS",
            payload: event.target.value
        });
    }

    const pauseEventsListening = () => {
        toast.info('Events Listening Paused')
        dispatch({
            type: "PAUSE_EVENT_LISTENING",
        });
    }

    const resumeEventsListening = () => {
        toast.info('Events Listening Resumed')
        dispatch({
            type: "RESUME_EVENTS_LISENING",
        });

    }

    return (
        <GlobalContext.Provider
            value={{
                events: state.events,
                loadEvents,
                filterEvents,
                isEventsOnLive: state.isEventsOnLive,
                resumeEventsListening,
                pauseEventsListening
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
