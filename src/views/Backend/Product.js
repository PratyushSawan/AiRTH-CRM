import React, { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Media,
  Badge,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import ProductHeader from "components/Headers/ProductHeader.js";
import { useParams } from "react-router";
import productimg from "../../assets/img/AiRTHMachine.png";
import { db } from "components/firebase";
import DateTimeline from "components/TImeline/DateTimeline";
import moment from "moment";
// import Maintenance from "components/Timeline/Maintenance";

const Product = (props) => {
  const { pid } = useParams();
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  const [device, setDevice] = useState("");
  const [error, setError] = useState(false);

  useEffect(async () => {
    let query = db.collection("products").doc(pid);

    await query.onSnapshot((doc) => {
      if (doc.data()) {
        setDevice(doc.data());
        console.log("Device found");
      } else {
        console.log("Device not found");
        setError(true);
      }
    });
  }, []);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      {error ? (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <Card>
            <CardBody>
              <h1>No Device Found with this Id</h1>
            </CardBody>
          </Card>
        </Container>
      ) : (
        <>
        {device && (
          <ProductHeader
            futureMaintenance={device.upcomingMaintenance}
            lastMaintenace={device.lastMaintenanceDate}
            personName={device.contactPersonName}
            personPhone={device.contactPersonPhone}
            personEmail= "customer@airth.in"
          />
        )}
          
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row>
              <Col className="mb-5 mb-xl-0" xl="8">
                <Card className="bg-gradient-default shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-light ls-1 mb-1">
                          Overview
                        </h6>
                        <h2 className="text-white mb-0">Air Quality Index</h2>
                      </div>
                      <div className="col">
                        <Nav className="justify-content-end" pills>
                          <NavItem>
                            <NavLink
                              className={classnames("py-2 px-3", {
                                active: activeNav === 1,
                              })}
                              href="#pablo"
                              onClick={(e) => toggleNavs(e, 1)}
                            >
                              <span className="d-none d-md-block">PM1</span>
                              <span className="d-md-none">M</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames("py-2 px-3", {
                                active: activeNav === 2,
                              })}
                              data-toggle="tab"
                              href="#pablo"
                              onClick={(e) => toggleNavs(e, 2)}
                            >
                              <span className="d-none d-md-block">PM2.5</span>
                              <span className="d-md-none">W</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames("py-2 px-3", {
                                active: activeNav === 3,
                              })}
                              href="#pablo"
                              onClick={(e) => toggleNavs(e, 3)}
                            >
                              <span className="d-none d-md-block">PM10</span>
                              <span className="d-md-none">Y</span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart">
                      <Line
                        data={chartExample1[chartExample1Data]}
                        options={chartExample1.options}
                        getDatasetAtEvent={(e) => console.log(e)}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="4">
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                          Prouduct ID
                        </h6>
                        <h2 className="mb-0">{device.deviceId}</h2>
                      </div>
                      <div className="col">
                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                          {device.userType == "Organization" ? "Contact Person" : "Owner"}
                          <Badge color="primary">{device.userType}</Badge>
                        </h6>
                        <h5 className="mb-0">{device.contactPersonName}
                          ({device.contactPersonPhone})</h5>
                        <h6 className="mb-0">{device.City},{device.State}</h6>

                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart">
                      <Media src={productimg} style={{ width: "300px" }} />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="mb-5 mb-xl-0" xl="12">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Maintenace Timeline</h3>
                      </div>
                      <div className="col text-right">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) =>
                            console.log(device.registrationDate.toDate())
                          }
                          size="sm"
                        >
                          See all
                        </Button>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col>
                        {
                          device && (
                            <DateTimeline
                              purchasedAt={device.registrationDate}
                              futureMaintenance={device.upcomingMaintenance}
                              id={pid}
                            />
                          )
                        }
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              {/* <Col xl="4">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <Row className="align-items-center">
                                            <div className="col">
                                                <h3 className="mb-0">Social traffic</h3>
                                            </div>
                                            <div className="col text-right">
                                                <Button
                                                    color="primary"
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                    size="sm"
                                                >
                                                    See all
                        </Button>
                                            </div>
                                        </Row>
                                    </CardHeader>
                                    <Table className="align-items-center table-flush" responsive>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">Referral</th>
                                                <th scope="col">Visitors</th>
                                                <th scope="col" />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">Facebook</th>
                                                <td>1,480</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span className="mr-2">60%</span>
                                                        <div>
                                                            <Progress
                                                                max="100"
                                                                value="60"
                                                                barClassName="bg-gradient-danger"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Facebook</th>
                                                <td>5,480</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span className="mr-2">70%</span>
                                                        <div>
                                                            <Progress
                                                                max="100"
                                                                value="70"
                                                                barClassName="bg-gradient-success"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Google</th>
                                                <td>4,807</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span className="mr-2">80%</span>
                                                        <div>
                                                            <Progress max="100" value="80" />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Instagram</th>
                                                <td>3,678</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span className="mr-2">75%</span>
                                                        <div>
                                                            <Progress
                                                                max="100"
                                                                value="75"
                                                                barClassName="bg-gradient-info"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">twitter</th>
                                                <td>2,645</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span className="mr-2">30%</span>
                                                        <div>
                                                            <Progress
                                                                max="100"
                                                                value="30"
                                                                barClassName="bg-gradient-warning"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card>
                            </Col> */}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Product;
