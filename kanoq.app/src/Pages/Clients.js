import React, { useContext, useEffect, useState } from "react";

import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Collapse,
  Container,
  ButtonGroup,
  Spinner,
  Alert,
  InputGroup,
} from "react-bootstrap";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import ApiClient, { uri } from "../Helpers/ApiClient";

import NotificationContext from "../store/NotificationContext";
import {
  CreateErrorNotification,
  CreateSuccessNotification,
} from "../Helpers/NotificationHelper";
import { AppMap } from "../Helpers/AppMap";
import Modal from "../Components/Modal/Modal";

function Clients() {
  const ctxNotification = useContext(NotificationContext);

  //#region Client List

  const [clients, setClients] = useState([]);
  const [isListLoading, setIsListLoading] = useState(false);

  useEffect(() => {
    setIsListLoading(true);
    async function GetClients() {
      try {
        var data = (await ApiClient.get(uri.client.getAll)).data;
        setClients(data);
      } catch (e) {
        ctxNotification.AddNotificationItem(
          CreateErrorNotification(
            e,
            AppMap.Pages.CLIENTS,
            AppMap.Actions.CLIENTS.LOAD_LIST
          )
        );
      }
      setIsListLoading(false);
    }

    GetClients();
  }, []);

  //#endregion

  //#region Add Client Form

  const emptyClientEntry = {
    Name: "",
    Email: "",
    PhoneNumber: "",
  };

  const [addClientEntry, setAddClientEntry] = useState(emptyClientEntry);

  const [isAddClientFormOpen, setIsAddClientFormOpen] = useState(false);

  const [isAdding, setIsAdding] = useState(false);

  const [isAddClientFormValidated, setIsAddClientFormValidated] =
    useState(false);

  const ToggleAddClientForm = (val) => {
    if (val) {
      setIsAddClientFormOpen(val);
      return;
    }
    setIsAddClientFormOpen((prev) => !prev);
  };

  const onAddFormChangeHandler = (e) => {
    setAddClientEntry((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const AddClient = (event) => {
    event.preventDefault();
    setIsAdding(true);

    const isFormValid = event.currentTarget.checkValidity();

    if (isFormValid === false) {
      event.stopPropagation();
    }

    setIsAddClientFormValidated(true);

    const InsertClient = async () => {
      try {
        var res = await ApiClient.post(uri.client.insert, addClientEntry);

        setClients((prev) => {
          return [res.data, ...prev];
        });
      } catch (e) {
        ctxNotification.AddNotificationItem(
          CreateErrorNotification(
            e,
            AppMap.Pages.CLIENTS,
            AppMap.Actions.CLIENTS.ADD_NEW_CLIENT
          )
        );
      }
    };

    if (isFormValid) {
      InsertClient(addClientEntry);
      setAddClientEntry(emptyClientEntry);
      setIsAddClientFormValidated(false);
    }

    setTimeout(() => {
      setIsAdding(false);
      document.getElementById("Name").focus();
    }, 500);
  };

  const ResetAddClientForm = () => {
    setAddClientEntry(emptyClientEntry);
    ToggleAddClientForm(false);
    setIsAddClientFormValidated(false);
    setIsAdding(false);
  };
  //#endregion

  //#region Update Form

  const [updateClientEntry, setUpdateClientEntry] = useState(emptyClientEntry);

  const [isUpdateClientFormOpen, setIsUpdateClientFormOpen] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const [isUpdateClientFormValidated, setIsUpdateClientFormValidated] =
    useState(false);

  const ToggleUpdateClientForm = (val) => {
    if (val) {
      setIsUpdateClientFormOpen(val);
      return;
    }
    setIsUpdateClientFormOpen((prev) => !prev);
  };

  const onUpdateFormChangeHandler = (e) => {
    setUpdateClientEntry((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const ResetUpdateClientForm = () => {
    setUpdateClientEntry(emptyClientEntry);
    ToggleUpdateClientForm(false);
    setIsUpdateClientFormValidated(false);
    setIsUpdating(false);
  };

  const UpdateClient = (event) => {
    event.preventDefault();
    setIsUpdateClientFormValidated(false);
    setIsUpdating(true);

    const isFormValid = event.currentTarget.checkValidity();

    if (isFormValid === false) {
      event.stopPropagation();
    }

    setIsUpdateClientFormValidated(true);

    const ModifyClient = async () => {
      try {
        var res = await ApiClient.post(uri.client.update, updateClientEntry);

        var updateClientId = updateClientEntry.Id;

        setClients((prev) => {
          var cl = prev.filter((c) => c.Id !== updateClientId);
          cl.unshift(updateClientEntry);
          return cl;
        });

        ctxNotification.AddNotificationItem(
          CreateSuccessNotification(
            `${updateClientEntry.Name} updated`,
            AppMap.Pages.CLIENTS,
            AppMap.Actions.CLIENTS.EDIT_CLIENT
          )
        );

        ResetUpdateClientForm();
      } catch (e) {
        setIsUpdating(false);
        ctxNotification.AddNotificationItem(
          CreateErrorNotification(
            e,
            AppMap.Pages.CLIENTS,
            AppMap.Actions.CLIENTS.EDIT_CLIENT
          )
        );
      }
    };

    if (isFormValid) {
      ModifyClient();
    }

    setTimeout(() => {
      setIsUpdating(false);
    }, 500);
  };

  const EditClientClickHandler = (row) => {
    setUpdateClientEntry(row);
    ToggleUpdateClientForm(true);
  };
  //#endregion

  //#region Delete Client

  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useState(false);
  const [deleteClientEntry, setDeleteClientEntry] = useState(emptyClientEntry);
  const [isDeleting, setIsDeleting] = useState(false);

  const DeleteClientClickHandler = (row) => {
    setDeleteClientEntry(row);
    setIsDeleteWarningOpen(true);
  };

  const ResetDeleteClientWarning = () => {
    setIsDeleteWarningOpen(false);
    setDeleteClientEntry(emptyClientEntry);
    setIsDeleting(false);
  };

  const YesDelete = () => {
    setIsDeleting(true);

    const RemoveClient = async () => {
      try {
        var deleteClientId = deleteClientEntry.Id;
        var res = await ApiClient.post(
          uri.client.delete + `/${deleteClientId}`
        );

        setClients((prev) => {
          var cl = prev.filter((c) => c.Id !== deleteClientId);

          return cl;
        });

        ctxNotification.AddNotificationItem(
          CreateSuccessNotification(
            `${deleteClientEntry.Name} removed`,
            AppMap.Pages.CLIENTS,
            AppMap.Actions.CLIENTS.DELETE_CLIENT
          )
        );

        ResetDeleteClientWarning();
      } catch (e) {
        setIsDeleting(false);
        ctxNotification.AddNotificationItem(
          CreateErrorNotification(
            e,
            AppMap.Pages.CLIENTS,
            AppMap.Actions.CLIENTS.DELETE_CLIENT
          )
        );
      }
    };

    RemoveClient();
    setTimeout(() => {
      setIsDeleting(false);
    }, 2000);
  };
  //#endregion

  return (
    <>
      <Container>
        <Row>
          <Col align="left">
            <h1>Clients</h1>
          </Col>
          <Col align="right">
            <Button
              onClick={() => ToggleAddClientForm()}
              //variant="dark"
            >
              +
            </Button>
          </Col>
        </Row>
        <Row></Row>
      </Container>

      <Collapse in={isAddClientFormOpen} dimension="height">
        <Card className="p-3  mb-2 shadow-lg">
          <Form
            id="addClientForm"
            onSubmit={AddClient}
            noValidate
            validated={isAddClientFormValidated}
          >
            <Row>
              <Form.Group className="m-1" controlId="Name" as={Col} md="3">
                <Form.Control
                  stype="text"
                  placeholder="Name"
                  value={addClientEntry.Name}
                  onChange={onAddFormChangeHandler}
                  required
                  disabled={isAdding}
                />
                <Form.Control.Feedback type="invalid" align="left">
                  * Mandatory
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="m-1" controlId="Email" as={Col} md="3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={addClientEntry.Email}
                  onChange={onAddFormChangeHandler}
                  disabled={isAdding}
                />
                <Form.Control.Feedback type="invalid" align="left">
                  Enter Valid Email Id
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className="m-1"
                controlId="PhoneNumber"
                as={Col}
                md="3"
              >
                <Form.Control
                  type="number"
                  placeholder="Phone Number"
                  value={addClientEntry.PhoneNumber}
                  onChange={onAddFormChangeHandler}
                  //id="PhoneNumber"
                  min={1000000000}
                  max={9999999999}
                  disabled={isAdding}
                />
                <Form.Control.Feedback type="invalid" align="left">
                  Enter Valid Phone Number
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="m-1" as={Col} sm="2">
                <ButtonGroup>
                  <Button
                    variant="primary"
                    type="submit"
                    className="m-1 shadow-lg"
                    disabled={isAdding}
                  >
                    {isAdding && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    Add
                  </Button>
                  <Button
                    variant="secondary"
                    type="reset"
                    onClick={() => ResetAddClientForm(false)}
                    className="m-1 shadow-lg"
                    hidden={isAdding}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </Form.Group>
            </Row>
          </Form>
        </Card>
      </Collapse>

      <Modal visible={isUpdateClientFormOpen || isDeleteWarningOpen}>
        {isUpdateClientFormOpen && (
          <Card style={{ textAlign: "left" }} className="shadow-lg">
            <Card.Header as="h5">Edit Client</Card.Header>

            <Card.Body>
              <Form
                id="updateClientForm"
                onSubmit={UpdateClient}
                noValidate
                validated={isUpdateClientFormValidated}
                className=""
                style={{ minWidth: "300px" }}
              >
                <Form.Group className="p-1" controlId="Name">
                  <Form.Label>Name</Form.Label>

                  <Form.Control
                    stype="text"
                    placeholder="Name"
                    value={updateClientEntry.Name}
                    onChange={onUpdateFormChangeHandler}
                    required
                    disabled={isUpdating}
                  />
                  <Form.Control.Feedback type="invalid" align="left">
                    * Mandatory
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="p-1" controlId="Email">
                  <Form.Label>Email</Form.Label>

                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={updateClientEntry.Email}
                    onChange={onUpdateFormChangeHandler}
                    disabled={isUpdating}
                  />
                  <Form.Control.Feedback type="invalid" align="left">
                    Enter Valid Email Id
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="p-1" controlId="PhoneNumber">
                  <Form.Label>Phone</Form.Label>

                  <Form.Control
                    type="number"
                    placeholder="Phone Number"
                    value={updateClientEntry.PhoneNumber}
                    onChange={onUpdateFormChangeHandler}
                    //id="PhoneNumber"
                    min={1000000000}
                    max={9999999999}
                    disabled={isUpdating}
                  />
                  <Form.Control.Feedback type="invalid" align="left">
                    Enter Valid Phone Number
                  </Form.Control.Feedback>
                </Form.Group>
                <hr></hr>
                <Form.Group className="m-1">
                  <ButtonGroup>
                    <Button
                      variant="primary"
                      type="submit"
                      className="m-1 shadow-lg"
                      disabled={isUpdating}
                    >
                      {isUpdating && (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                      Update
                    </Button>
                    <Button
                      variant="secondary"
                      type="reset"
                      onClick={() => ResetUpdateClientForm(false)}
                      className="m-1 shadow-lg"
                      hidden={isUpdating}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        )}

        {isDeleteWarningOpen && (
          <Alert variant="secondary">
            <Alert.Heading>Client Deletion Warning!</Alert.Heading>
            <hr />
            <Container fluid align={"left"}>
              <Form.Group className="p-1" controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={deleteClientEntry.Name}
                  disabled
                />
              </Form.Group>

              <Form.Group className="p-1" controlId="Name">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={deleteClientEntry.Email}
                  disabled
                />
              </Form.Group>
              <Form.Group className="p-1" controlId="Name">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  value={deleteClientEntry.PhoneNumber}
                  disabled
                />
              </Form.Group>
            </Container>
            <hr />
            <p className="mb-0">Are you sure you want to delete?</p>
            <ButtonGroup>
              <Button
                variant="danger"
                className="m-1 shadow-lg"
                onClick={YesDelete}
                disabled={isDeleting}
              >
                {isDeleting && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                Yes
              </Button>
              <Button
                variant="primary"
                className="m-1 shadow-lg"
                onClick={() => setIsDeleteWarningOpen(false)}
                disabled={isDeleting}
              >
                No
              </Button>
            </ButtonGroup>
          </Alert>
        )}
      </Modal>

      <Card className="p-3 mt-1 shadow-lg">
        {isListLoading && (
          <Container>
            <Spinner
              as="span"
              animation="border"
              size="lg"
              role="status"
              aria-hidden="true"
            />
          </Container>
        )}
        {!isListLoading && (
          <BootstrapTable
            data={clients}
            search
            striped
            hover
            bordered
            pagination={true}
            condensed
          >
            <TableHeaderColumn dataField="Id" isKey={true} dataSort hidden>
              Id
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="Name"
              dataSort
              editable={{ type: "text" }}
              editColumnClassName="editing-jobsname-class"
              invalidEditColumnClassName="invalid-jobsname-class"
            >
              Name
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="Email"
              dataSort
              editable={{ type: "email" }}
            >
              Email
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="PhoneNumber"
              dataSort
              editable={{ type: "number" }}
            >
              Phone Number
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="actions"
              dataFormat={(c, r) => (
                <>
                  <Button
                    variant="primary"
                    className="m-1 shadow-lg"
                    onClick={() => EditClientClickHandler(r)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="m-1 shadow-lg"
                    onClick={() => DeleteClientClickHandler(r)}
                  >
                    Delete
                  </Button>
                </>
              )}
            ></TableHeaderColumn>
          </BootstrapTable>
        )}
      </Card>
    </>
  );
}

export default Clients;
