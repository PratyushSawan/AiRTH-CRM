
import React, { useState } from "react";
import { useAuth } from "../../components/contexts/AuthContext"

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Alert,
    Spinner,
} from "reactstrap";
import { useHistory } from "react-router";

const AdminLogin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { login, } = useAuth()
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            setError("")
            setLoading(true)
            await login(email, password)
            history.push("/backend")
        } catch {
            setError("Failed to Login")
            console.log("Error accured")
        }
        setLoading(false)
    }


    return (
        <>

            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0" style={{ backgroundImage: 'url(http://airth.host/wp-content/uploads/2019/11/sectionbg_wrapper-03.jpg)' }}>
                    <CardHeader className="bg-transparent pb-5">
                        <div className="text-muted text-center mt-2 mb-3">
                            <small>Sign in As Admin</small>
                        </div>
                        <div className="btn-wrapper text-center">

                            <Button
                                className="btn-neutral btn-icon"
                                color="default"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                <span className="btn-inner--icon">
                                    <img
                                        alt="..."
                                        src={
                                            require("../../assets/img/brand/Airth-logo.webp")
                                                .default
                                        }
                                    />
                                </span>
                                <span className="btn-inner--text">AiRTH </span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        {error && <Alert color="danger">{error}</Alert>}
                        <div className="text-center text-muted mb-4">
                            <small>Sign in with Credentials</small>
                        </div>
                        <Form role="form" onSubmit={handleSubmit}>
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        autoComplete="new-email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <div className="custom-control custom-control-alternative custom-checkbox">
                                <input
                                    className="custom-control-input"
                                    id=" customCheckLogin"
                                    type="checkbox"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor=" customCheckLogin"
                                >
                                    <span className="text-muted">Remember me</span>
                                </label>
                            </div>
                            <div className="text-center">
                                <Button className="my-4" color="primary" type="submit" disabled={loading}>
                                    {loading ? <Spinner color="primary" /> : "Sign In"}
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
                {/* <Row className="mt-3">
                    <Col xs="6">
                        <a
                            className="text-light"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                        >
                            <small>Forgot password?</small>
                        </a>
                    </Col>
                    <Col className="text-right" xs="6">
                        <a
                            className="text-light"
                            href=""
                            onClick={(e) => history.push("/auth/register")}
                        >
                            <small>Create new account</small>
                        </a>
                    </Col>
                </Row> */}
            </Col>
        </>
    );
};

export default AdminLogin;
