import { useAuth } from 'components/contexts/AuthContext'
import BackendHeader from "../../components/Headers/BackendHeader"
import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
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
    UncontrolledDropdown
} from 'reactstrap'

function Index() {
    const { currentUser } = useAuth();
    const history = useHistory();

    useEffect(() => {
        console.log(currentUser)
    }, [])
    return (
        <>
            <BackendHeader />
            {/* Page Content */}
            <Container className='mt--7' fluid>
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
                                    <th scope="col">Contact Person Name</th>
                                    <th scope="col">Contact Person Phone</th>
                                    <th scope="col">Org Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col" />

                                </thead>
                                <tbody>
                                    <tr>
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
                                                        A4322J
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

                                    </tr>
                                    <tr>
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

                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default Index
