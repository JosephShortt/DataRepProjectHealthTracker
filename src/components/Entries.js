import EntryItem from "./EntryItem";
import { Row, Col } from 'react-bootstrap'; // Import Bootstrap grid components

const Entries = (props) => {
    return (
      //Renders entries in a bootstrap grid
      <Row>
        {/*For each entry, render a column*/}
        {props.myEntries.map((entry) => (
          <Col md={4} key={entry._id} className="mb-4">
            {/*3 entries per row*/}
            <EntryItem myEntry={entry} Reload={props.ReloadData} />
          </Col>
        ))}
      </Row>
    );
  };
export default Entries;