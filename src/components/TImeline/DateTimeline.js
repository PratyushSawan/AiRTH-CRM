import React, { useEffect, useState } from 'react';
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import { BsBagFill, BsTools, BsCheckAll } from "react-icons/bs"
import firebase from "firebase"
import {
    Button,
    FormGroup,
    Input,
    Modal,
    Col,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label
} from "reactstrap";
import "./DateTimeline.css";
import moment from 'moment';
import { db } from 'components/firebase';


function DateTimeline({ purchasedAt, id, futureMaintenance }) {

    const [dates, setDates] = useState([])
    const [upcomingMaintenance, setUpcomingMaintenance] = useState(futureMaintenance);

    const [doneDate, setDoneDate] = useState(new Date());
    const [doneBy, setDoneBy] = useState("")

    useEffect(async () => {
        if (id) {
            await db.collection("products").doc(id).collection("maintenanceDone").orderBy('doneAt', 'asc').onSnapshot((snapshot) => setDates(snapshot.docs.map(doc => ({
                ID: doc.id,
                Data: doc.data()
            }))))
        }

    }, [id])

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await db.collection('products').doc(id).collection("maintenanceDone").add({
                actualDate: upcomingMaintenance,
                doneAt: new Date(doneDate),
                doneBy: doneBy,
                registerAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            await db.collection('products').doc(id).update({
                'upcomingMaintenance': new Date((moment(doneDate).add(6, 'months'))),
                'lastMaintenanceDate': new Date((moment(doneDate)))
            })

            toggle()

            console.log(new Date(moment(doneDate).add(6, 'months')))
            // history.push("/registeredProducts")
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <>
            <Timeline minEvent={10} placeholder>
                <TimelineEvent
                    color="#87a2c7"
                    icon={BsBagFill}
                    title={purchasedAt && moment(purchasedAt.toDate()).format("LL")}
                    subtitle="Purchased At"
                />
                {dates ? dates.map(date =>
                (<TimelineEvent
                    color='#54e346'
                    icon={BsCheckAll}
                    title={moment(date.Data.doneAt.toDate()).format("LL")}
                    subtitle={`${moment(date.Data.actualDate.toDate()).format("MMMM YYYY")} Done by ${date.Data.doneBy}`}
                />)
                )
                    : (<TimelineEvent
                        color='#54e346'
                        icon={BsCheckAll}
                        title=''
                        subtitle='No Maintenece yet'
                    />)
                }
                <TimelineEvent
                    color="#9c2919"
                    icon={BsTools}
                    title={moment(upcomingMaintenance.toDate()).format('Do MMMM YYYY')}
                    subtitle="Pending Maintenace"
                    action={{
                        label: "Done",
                        onClick: () => setModal(!modal)
                    }}
                />
            </Timeline>

            <Modal isOpen={modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                toggle={toggle}>
                <ModalHeader toggle={toggle}>Fill Details Regarding Maintenance</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="exampleDate">Maintenace Done Date</Label>
                        <Input
                            type="date"
                            name="date"
                            id="exampleDate"
                            value={doneDate}
                            onChange={e => setDoneDate(e.target.value)}
                            placeholder="date placeholder"
                            required
                        />
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleSelect" sm={6}>Maintenace Done By:</Label>
                        <Col sm={6}>
                            <Input type="select" name="select" id="exampleSelect" value={doneBy} onChange={e => setDoneBy(e.target.value)}>
                                <option>ServiceProvier1</option>
                                <option>ServiceProvider2</option>
                                <option>ServiceProvider3</option>
                                <option>ServiceProvider4</option>
                                <option>ServiceProvider5</option>
                            </Input>
                        </Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>Maintenace Done</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default DateTimeline