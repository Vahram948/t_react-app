const AppReducer = (state, action) => {
    switch (action.type) {
        case "SET_SOCKET_CONNECTED":
            return {
                ...state,
                isSocketConnected: true
            };

        case "SET_EVENTS":
            return {
                ...state,
                inboxEvents: [action.payload, ...state.inboxEvents],
                events: !state.isSearching ? [action.payload, ...state.events] : state.events
            };

        case "FILTER_EVENTS":
            return {
                ...state,
                isSearching: action.payload ? true : false,
                events: state.inboxEvents.filter(event => {

                    const search = action.payload.toLowerCase();

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

export default AppReducer;