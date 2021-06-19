
import React, { useState, useEffect } from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    Label,
} from "reactstrap";
// core components
// import UserHeader from "components/Headers/UserHeader.js";
import { useAuth } from "components/contexts/AuthContext";
import { db } from "components/firebase";
import RegistrationHeader from "components/Headers/Backend/RegistrationHeader";
import Indivisual from "./RegistrationForm/Indivisual";
import Orgnisation from "./RegistrationForm/Organisation";

const Registration = () => {
    const { currentUser } = useAuth();
    const [details, setDetails] = useState("")
    const [buyerType, setBuyerType] = useState('Individual')

    useEffect(() => {
        if (currentUser) {
            db
                .collection('users')
                .doc(currentUser?.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        // console.log(doc.data())
                        setDetails(doc.data())
                    }
                })

            console.log(details)
        } else {
            console.log("not fetched")
        }
    }, [])
    return (
        <>
            <RegistrationHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    {/* <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile shadow">
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">
                                    <div className="card-profile-image">
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            <img
                                                alt="..."
                                                className="rounded-circle"
                                                src={
                                                    require("../../assets/img/theme/team-4-800x800.jpg")
                                                        .default
                                                }
                                            />
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <div className="d-flex justify-content-between">
                                    <Button
                                        className="mr-4"
                                        color="info"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                        size="sm"
                                    >
                                        Connect
                  </Button>
                                    <Button
                                        className="float-right"
                                        color="default"
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                        size="sm"
                                    >
                                        Message
                  </Button>
                                </div>
                            </CardHeader>
                            <CardBody className="pt-0 pt-md-4">
                                <Row>
                                    <div className="col">
                                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                            <div>
                                                <span className="heading">5</span>
                                                <span className="description">Products</span>
                                            </div>
                                            <div>
                                                <span className="heading">10</span>
                                                <span className="description">Maintenace Done</span>
                                            </div>
                                            <div>
                                                <span className="heading">5</span>
                                                <span className="description">Refers</span>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <div className="text-center">
                                    <h3>
                                        {currentUser.email}
                                        <span className="font-weight-light">, 27</span>
                                    </h3>
                                    <div className="h5 font-weight-300">
                                        <i className="ni location_pin mr-2" />
                    Deoghar,Jharkhand
                  </div>
                                    <div className="h5 mt-4">
                                        <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                                    <div>
                                        <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                                    <hr className="my-4" />
                                    <p>
                                        Ryan — the name taken by Melbourne-raised, Brooklyn-based
                                        Nick Murphy — writes, performs and records all of his own
                                        music.
                  </p>
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        Show more
                  </a>
                                </div>
                            </CardBody>
                        </Card>
                    </Col> */}

                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Register A New Product</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            {buyerType}
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>

                                <FormGroup tag="fieldset">
                                    <legend>Type of Buyer</legend>
                                    <div className="custom-control custom-radio mb-3">
                                        <input
                                            className="custom-control-input"
                                            id="customRadio5"
                                            defaultChecked
                                            name="custom-radio-2"
                                            type="radio"
                                            value="Individual"
                                            onClick={e => setBuyerType(e.target.value)}
                                        />
                                        <label className="custom-control-label" htmlFor="customRadio5">
                                            Indivisual
                                            </label>
                                    </div>
                                    <div className="custom-control custom-radio mb-3">
                                        <input
                                            className="custom-control-input"
                                            id="customRadio6"
                                            name="custom-radio-2"
                                            type="radio"
                                            value="Organization"
                                            onClick={e => setBuyerType(e.target.value)}
                                        />
                                        <label className="custom-control-label" htmlFor="customRadio6">
                                            Organization
                                            </label>
                                    </div>
                                </FormGroup>
                                <hr></hr>
                                {buyerType == "Individual" ? <Indivisual /> : <Orgnisation />}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Registration;
