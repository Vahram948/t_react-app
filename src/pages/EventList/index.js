import { useEffect, useContext } from 'react';
import { EventItem } from '../../components';
import { GlobalContext } from "../../context/GlobalState";
import { Search as SearchIcon } from 'react-bootstrap-icons'
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


const EventList = () => {
    
    const {
        events,
        loadEvents,
        filterEvents,
        isEventsOnLive,
        resumeEventsListening,
        pauseEventsListening
    } = useContext(GlobalContext);

    useEffect(() => {
        loadEvents()
    }, [])

    const renderEventList = () =>
        <ListGroup variant="flush">
            {events.slice(0, 8).map((item, index) => <EventItem key={index} event={item} />)}
        </ListGroup>

    const renderEmptyMsg = () =>
        <div className="text-center">
            <div>Not Events yet</div>
        </div>

    return (
        <div>
            <Container>
                <Row className="mt-3 ">
                    <Col>
                        <Alert variant="primary">
                            <InputGroup>
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant={isEventsOnLive ? 'primary' : 'secondary'}
                                        onClick={() => resumeEventsListening()}
                                        disabled={isEventsOnLive}
                                    >
                                        Live
                                    </Button>
                                    <Button variant={isEventsOnLive ? 'secondary' : 'primary'}
                                        onClick={() => pauseEventsListening()}
                                        disabled={!isEventsOnLive}
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
                                    onChange={filterEvents}
                                    placeholder="Type to search..."
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                            </InputGroup>
                        </Alert>
                    </Col>
                </Row>

                {events.length
                    ? renderEventList()
                    : renderEmptyMsg()
                }

            </Container>
        </div>
    )
}

export default EventList