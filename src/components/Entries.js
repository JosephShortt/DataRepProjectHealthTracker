import EntryItem from "./EntryItem";
import { Row, Col } from 'react-bootstrap'; // Import Bootstrap grid components

const Entries = (props) => {
    return (
      <Row>
        {props.myEntries.map((entry) => (
          <Col md={4} key={entry._id} className="mb-4">
            {/* Each column takes up 4/12 of the row, resulting in 3 columns per row */}
            <EntryItem myEntry={entry} Reload={props.ReloadData} />
          </Col>
        ))}
      </Row>
    );
  };
export default Entries;