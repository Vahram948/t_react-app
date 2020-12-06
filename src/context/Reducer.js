export const initialState = {
    isEventsOnLive: true,
    isSocketConnected: false,
    isSearching: false,
    inboxEvents: [],
    events: [],
}

export const reducer = (state, {type, payload}) => {
    switch (type) {
        case "SET_SOCKET_CONNECTED":
            return {
                ...state,
                isSocketConnected: true
            };

        case "SET_EVENTS":
            return {
                ...state,
                inboxEvents: [payload, ...state.inboxEvents],
                events: !state.isSearching ? [payload, ...state.events] : state.events
            };

        case "FILTER_EVENTS":
            return {
                ...state,
                isSearching: payload ? true : false,
                events: state.inboxEvents.filter(event => {

                    const search = payload.toLowerCase();

                    let content = ''

                    if (event.type === 'page' && 'properties' in event) {
                        content = event.properties.path;
                    } else if (event.type === 'identify' && 'traits' in event) {
                        content = event.traits.email;
                    } else {
                        content = event.event;
                    }

                    return content.toLowerCase().includes(search)
                        || event.type.includes(search)
                        || event.receivedAt.includes(search)
                })
            };

        case "PAUSE_EVENTS_LISENING":
            return {
                ...state,
                isEventsOnLive: false
            };

        case "RESUME_EVENTS_LISENING":
            return {
                ...state,
                isEventsOnLive: true
            };
        default:
            return state;
    }
};
