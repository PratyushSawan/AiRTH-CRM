import { db } from 'components/firebase';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import { Alert, Button, Col, Form, FormGroup, Input, Row } from 'reactstrap';
import firebase from 'firebase'

function Indivisual() {

    // Product Details Variable
    const [deviceId, setDeviceId] = useState("")
    const [dateofPurchase, setDateofPurchase] = useState()
    // const maintenanceDateRef = useRef();

    // User Information Variable
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState("")

    // Adress Variable
    const [add, setAdd] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("")
    const [zip, setZip] = useState()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [devices, setDevices] = useState(false)
    const history = useHistory()

    useEffect(() => {
        db.collection('products').onSnapshot(snapshot => (
            setDevices(snapshot.docs.map(doc => ({
                id: doc.id
            })))
        ));
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setLoading(true)


            const CheckId = await devices.forEach((device) => {
                if (device.id === deviceId) {
                    setError("Product is Already registered with this ID");
                }
            })

            if (error === "") {
                await db.collection('products').doc(deviceId).set({
                    deviceId: deviceId,
                    userType: "Individual",
                    purchaseDate: new Date(dateofPurchase),
                    upcomingMaintenance: new Date(moment(dateofPurchase).add(6, 'months')),
                    Address: add,
                    City: city,
                    State: state,
                    Zip: zip,
                    contactPersonName: firstName + " " + lastName,
                    contactPersonPhone: phone,
                    contactPersonEmail: email,
                    lastMaintenaceDate: null,
                    registrationDate: firebase.firestore.FieldValue.serverTimestamp(),
                })
                alert(`Product Successfully Registered and upcoming maintenance is ${(moment(dateofPurchase).add(6, 'months'))}`)
                history.push("/backend/index")
            }
        } catch (err) {
            setError("Failed to Register The Item")
            console.log(err)
        }
    }


    async function fetchAPi(e) {
        setError("")
        const response = await fetch(`https://api.postalpincode.in/pincode/${zip}`);
        const data = await response.json();

        // console.log(data)
        // console.log(data[0].PostOffice[0].District);
        if (data[0].PostOffice) {
            setCity(data[0].PostOffice[0].District);
            setState(data[0].PostOffice[0].State)
        } else {
            setError("Invalid Pin Code")
        }
    }
    return (
        <>
            {error && <Alert color="danger">{error}</Alert>}
            <Form style={{ backgroundImage: 'url(http://airth.host/wp-content/uploads/2019/11/sectionbg_wrapper-03.jpg)' }} onSubmit={handleSubmit} >
                <h6 className="heading-small text-muted mb-4">Product Details</h6>
                <div className="pl-lg-4">
                    <Row>
                        <Col lg="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-first-name"
                                >
                                    Product ID
                          </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-productId"
                                    placeholder="Enter 6 digit product Id"
                                    value={deviceId}
                                    onChange={e => setDeviceId(e.target.value)}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-last-name"
                                >
                                    Date of Purchase
                          </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-dateofPurchase"
                                    type="date"
                                    value={dateofPurchase}
                                    onChange={e => setDateofPurchase(e.target.value)}
                                    required

                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                <h6 className="heading-small text-muted mb-4">
                    User Information
                </h6>
                <div className="pl-lg-4">
                    <Row>
                        <Col lg="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-first-name"
                                >
                                    First name
                          </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-first-name"
                                    placeholder="First name"
                                    type="text"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-last-name"
                                >
                                    Last name
                          </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-last-name"
                                    placeholder="Last name"
                                    type="text"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                >
                                    Phone No
                                                    </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-phone"
                                    placeholder="Phone Number"
                                    type="text"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-email"
                                >
                                    Email address
                          </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-email"
                                    placeholder="jesse@example.com"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                </div>
                <hr className="my-4" />
                {/* Address */}
                <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                <div className="pl-lg-4">
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-address"
                                >
                                    Address
                          </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-address"
                                    placeholder="Full Address"
                                    type="text"
                                    value={add}
                                    onChange={e => setAdd(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-zip"
                                >
                                    Postal code
                          </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-postal-code"
                                    placeholder="Postal code"
                                    value={zip}
                                    type="postal"
                                    required
                                    onChange={e => setZip(e.target.value)}
                                    onBlur={fetchAPi}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg="4">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-city"

                                >
                                    City
                          </label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-city"
                                    placeholder="City"
                                    type="text"
                                    value={city}
                                    disabled
                                />
                            </FormGroup>
                        </Col>
                        <Col lg="4">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-state"
                                >
                                    State
                          </label>
                                <Input
                                    className="form-control-alternative"
                                    defaultValue="United States"
                                    id="input-country"
                                    placeholder="State"
                                    value={state}
                                    type="text"
                                    disabled
                                />
                            </FormGroup>
                        </Col>

                    </Row>
                </div>
                <hr className="my-4" />
                {/* Description */}
                <Button color="info" type='submit' disabled={loading}>{loading ? 'Loading...' : 'Register'}</Button>
            </Form>
        </>
    )
}

export default Indivisual
