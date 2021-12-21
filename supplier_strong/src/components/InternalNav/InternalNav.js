import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import TableAdd from '../Table/TableAdd'

const InternalNav = () => {
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Add Stock</Accordion.Header>
                <Accordion.Body>
                    <TableAdd />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default InternalNav;
