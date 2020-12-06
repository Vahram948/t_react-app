import './style.scss';
import { ListGroup } from 'react-bootstrap';
import CheckIconSvg from '../../assets/icons/check.svg';

const EventItem = ({ event }) => {

    const getEventContent = (event) => {
        switch (event.type) {
            case 'page':
                return event.properties.path || '-'
            case 'track':
                return event.event || '-'
            case 'identify':
                return event.traits.email || '-'
            default:
                return '-'
        }
    }

    const content = getEventContent(event);

    return (
        <ListGroup.Item action>
            <div className="event-item">
                <div className="row align-items-center">
                    <img src={CheckIconSvg} className="check-icon" alt="check" />
                    <span className="col-md-1 text-uppercase">{event.type}</span>
                    <span className="ml-2">{content}</span>
                    <span className="col text-right"> {event.receivedAt} </span>
                </div>
            </div>
        </ListGroup.Item >
    )
}

export default EventItem