
import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container className="d-flex align-items-center" fluid>
                    <Row>
                        <Col lg="7" md="10">
                            <h1 className="display-2 text-white">Welcome!</h1>
                            <p className="text-white mt-0 mb-5">
                                You can manage your all Products from one Place
                                This is AiRTH CRM Dashboard
              </p>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <div className="header-body">
                        {/* Card stats */}
                        <Row>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Registerd Products
                        </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    5
                        </span>
                                            </div>
                                            <Col className="col-auto" onClick={e => console.log("clicked")}>
                                                <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                                                    <i className="ni ni-fat-add" />

                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-nowrap">Click + icon to add New</span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Recent Upcoming Maintenace
                        </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">A4322J</span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                    <i className="ni ni-settings" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-danger mr-2">
                                                <i className="ni ni-watch-time" />
                                            </span>{" "}
                                            <span className="text-nowrap">5 June 2021</span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>



                            {/* <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Performance
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">49,65%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col> */}

                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default Header;
