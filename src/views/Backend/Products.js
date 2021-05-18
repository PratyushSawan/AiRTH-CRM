import { useAuth } from "components/contexts/AuthContext";
import { db } from "components/firebase";
import ProductsHeader from "components/Headers/Backend/ProductsHeader";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardHeader,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Media,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";

function Products() {
  const { currentUser } = useAuth();
  const history = useHistory();

  const [devices, setDevices] = useState([]);

  // fILTer Variable
  const [searchOption, setSearchOption] = useState("Product ID");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Date Picker Component
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showAll, setShowALl] = useState(true);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  useEffect(() => {
    // setLoading(true)
    const getData = () => {
      try {
        db.collection("products")
          .orderBy("purchaseDate", "desc")
          .onSnapshot((snapshot) => {
            setDevices(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          });

        // console.log('Data Fetched')
        // console.log(devices)
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  // Date Picker Functions
  const handelSearch = async () => {
    setShowALl(false);
    setShowSearch(false);
  };

  const clearFilter = () => {
    setShowALl(true);
    setEndDate(startDate);
  };

  return (
    <>
      <ProductsHeader totalProduct={devices.length} />
      {/* Page Content */}

      <Container className="mt--7" fluid>
        <Navbar
          className="navbar-horizontal navbar-dark bg-default"
          expand="lg"
        >
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <small>Search By</small> {searchOption}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  onClick={(e) => {
                    setSearchOption("Product ID");
                  }}
                >
                  Product ID
                </DropdownItem>
                <DropdownItem
                  onClick={(e) => {
                    setSearchOption("Org. Name");
                  }}
                >
                  Org. Name
                </DropdownItem>
                <DropdownItem
                  onClick={(e) => {
                    setSearchOption("Maintenance Month");
                  }}
                  disabled={!showAll}
                >
                  Maintenance Month
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder={`Enter ${searchOption}`}
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
            </Form>
          </Nav>
          <div>
            {showSearch && (
              <div
                style={{
                  position: "absolute",
                  left: "60%",
                  top: "50px",
                  display: "flex",
                  flexDirection: "column",
                  zIndex: "10000",
                }}
              >
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                />
                <Button onClick={handelSearch}>Search</Button>
              </div>
            )}
            <Button onClick={() => setShowSearch(!showSearch)}>
              Search Upcoming Maintenance By Date
            </Button>
          </div>
        </Navbar>

        {startDate.toString() != endDate && (
          <Navbar bg="sucess" stcky="top" style={{ justifyContent: "center" }}>
            <NavbarBrand>
              Maintenance B/w <strong>{moment(startDate).format("LL")} </strong>{" "}
              to <strong>{moment(endDate).format("LL")}</strong>
            </NavbarBrand>
            <Button onClick={clearFilter}>Clear Filter</Button>
          </Navbar>
        )}

        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">All Products</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <th scope="col">Device ID</th>
                  <th scope="col">Purchase Date</th>
                  <th scope="col">Last Maintenance Date</th>
                  <th scope="col">Upcoming Maintenance</th>
                  <th scope="col">Contact Person Phone</th>
                  <th scope="col">Contact Person</th>
                  <th scope="col">User Type</th>
                  <th scope="col" />
                </thead>
                <tbody>
                  {devices
                    .filter((device) => {
                      if (!showAll) {
                        if (
                          startDate <
                            device.data.upcomingMaintenance.toDate() &&
                          endDate > device.data.upcomingMaintenance.toDate()
                        ) {
                          if (searchTerm === "") {
                            return device;
                          } else if (
                            device.id
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) &&
                            searchOption === "P ID"
                          ) {
                            return device;
                          }
                        }
                      } else {
                        if (searchTerm === "") {
                          return device;
                        } else if (
                          device.id
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) &&
                          searchOption === "Product ID"
                        ) {
                          return device;
                        } else if (
                          device.data.orgName &&
                          device.data.orgName
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) &&
                          searchOption === "Org. Name"
                        ) {
                          return device;
                        } else if (
                          moment(device.data.upcomingMaintenance.toDate())
                            .format("MMMM")
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) &&
                          searchOption === "Maintenance Month"
                        ) {
                          return device;
                        }
                      }
                    })
                    .map((device) => (
                      <tr key={device.id}>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#"
                              onClick={(e) =>
                                history.push(`/backend/Product/${device.id}`)
                              }
                            >
                              <img
                                alt="Vsure Product Img"
                                src={
                                  require("../../assets/img/theme/vue.jpg")
                                    .default
                                }
                              />
                            </a>
                            <Media>
                              <span className="mb-0 text-sm">{device.id}</span>
                            </Media>
                          </Media>
                        </th>
                        <td>
                          {moment(device.data.purchaseDate.toDate()).format(
                            "Do MMMM YYYY"
                          )}
                        </td>
                        <td>
                          {device.data.lastMaintenanceDate
                            ? moment(
                                device.data.lastMaintenanceDate.toDate()
                              ).format("LL")
                            : "---"}
                        </td>
                        <td>
                          {moment(
                            device.data.upcomingMaintenance.toDate()
                          ).format("LL")}
                        </td>
                        <td>{device.data.contactPersonPhone}</td>
                        <td>{device.data.contactPersonName}</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-warning" />
                            {device.data.userType}
                          </Badge>
                        </td>

                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}

                  {/* <tr>
                                        <th scope="row">
                                            <Media className="align-items-center">
                                                <a className="avatar rounded-circle mr-3"
                                                    href="#"
                                                    onClick={(e) => history.push("/customer/Product/A4322J")}
                                                >
                                                    <img
                                                        alt="Vsure Product Img"
                                                        src={
                                                            require("../../assets/img/theme/vue.jpg").default
                                                        } />
                                                </a>
                                                <Media>
                                                    <span className="mb-0 text-sm">
                                                        A2312J
                                                    </span>
                                                </Media>
                                            </Media>
                                        </th>
                                        <td>8 Apr 2021</td>
                                        <td>---</td>
                                        <td>Rajan Kumar Verma</td>
                                        <td>82762989278</td>
                                        <td>WebDev Society</td>
                                        <td>
                                            <Badge color="" className="badge-dot mr-4">
                                                <i className="bg-warning" />
                                                    pending

                                            </Badge>
                                        </td>

                                        <td className="text-right">
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    className="btn-icon-only text-light"
                                                    href="#pablo"
                                                    role="button"
                                                    size="sm"
                                                    color=""
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    <i className="fas fa-ellipsis-v" />
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                    <DropdownItem
                                                        href="#pablo"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        Action
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        href="#pablo"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        Another action
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>

                                    </tr> */}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Products;
