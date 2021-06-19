import BackendHeader from "../../components/Headers/BackendHeader";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  Badge,
  Card,
  CardHeader,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import { db } from "components/firebase";
import moment from "moment";

function Index() {
  const history = useHistory();

  const [devices, setDevices] = useState([]);

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
        // console.log(devices)
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  return (
    <>
      <BackendHeader totalProducts={devices.length} />
      {/* Page Content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Latest Registration</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <th scope="col">Device ID</th>
                  <th scope="col">Purchase Date</th>
                  <th scope="col">Last Maintenance Date</th>
                  <th scope="col">Upcoming Maintenace</th>
                  <th scope="col">Contact Person Phone</th>
                  <th scope="col">Contact Person</th>
                  <th scope="col">User Type</th>
                  <th scope="col" />
                </thead>
                <tbody>
                  {devices.slice(0, 3).map((device) => (
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
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Index;
