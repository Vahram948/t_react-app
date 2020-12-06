import { useEffect } from 'react';
import { EventItem } from '../../components';
import { Search as SearchIcon } from 'react-bootstrap-icons'
import { useStateValue } from '../../context';
import config from '../../config';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import {
    Button,
    Alert,
    InputGroup,
    ListGroup,
    FormControl,
    ButtonGroup,
    Container,
    Row,
    Col
} from 'react-bootstrap'
import {
    filterEvents,
    pauseEventsListening,
    resumeEventsListening,
    setEvents
} from '../../context/Actions';

// todo create socket provider
const socket = io(config.apiBase);

const EventList = () => {

    const [state, dispatch] = useStateValue();

    useEffect(() => {
        connect()
    }, [])

    const connect = async () => {

        socket.on('error', () => {
            toast.info('Sorry, there seems to be an issue with the connection!')
        })

        socket.on('connect', () => {
            toast.info('Socket connected')
            socket.on(config.channel, (data) => {
                dispatch(setEvents(JSON.parse(data)))
            });
        });

        socket.on('disconnect', () => {
            toast.info('Socket disconnected')
        });

    }

    const renderEventList = () =>
        <ListGroup variant="flush">
            {state.events.slice(0, 8).map((item, index) => <EventItem key={index} event={item} />)}
        </ListGroup>

    const renderEmptyMsg = () =>
        <div className="text-center">
            <div>Not Events yet</div>
        </div>

    const handleResumeEventsClick = () => {
        socket.connect()
        dispatch(resumeEventsListening());
    }

    const handlePauseEventsClick = () => {
        socket.disconnect()
        dispatch(pauseEventsListening());
    }

    const handleSearchInput = (e) => {
        dispatch(filterEvents(e.target.value))
    }

    return (
        <div>
            <Container>
                <Row className="mt-3 ">
                    <Col>
                        <Alert variant="primary">
                            <InputGroup>
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant={state.isEventsOnLive ? 'primary' : 'secondary'}
                                        onClick={() => handleResumeEventsClick()}
                                        disabled={state.isEventsOnLive}
                                    >
                                        Live
                                    </Button>
                                    <Button variant={state.isEventsOnLive ? 'secondary' : 'primary'}
                                        onClick={() => handlePauseEventsClick()}
                                        disabled={!state.isEventsOnLive}
                                    >
                                        Pause
                                    </Button>
                                </ButtonGroup>
                                <InputGroup.Prepend className="ml-3">
                                    <InputGroup.Text id="btnGroupAddon">
                                        <SearchIcon />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    type="text"
                                    onChange={handleSearchInput}
                                    placeholder="Type to search..."
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                            </InputGroup>
                        </Alert>
                    </Col>
                </Row>

                {state.events.length
                    ? renderEventList()
                    : renderEmptyMsg()
                }

            </Container>
        </div>
    )
}

export default EventList