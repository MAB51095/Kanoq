import React, { useContext, useEffect, useState } from "react";

import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Collapse,
  Container,
  Toast,
  Alert,
  InputGroup,
  ButtonGroup,
  Spinner,
} from "react-bootstrap";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import ApiClient, { uri } from "../Helpers/ApiClient";

import NotificationContext from "../store/NotificationContext";
import { CreateErrorNotification } from "../Helpers/NotificationHelper";
import { AppMap } from "../Helpers/AppMap";

function Clients() {
  const ctxNotification = useContext(NotificationContext);

  //#region Client List

  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      }
    }

    GetClients();
  }, []);

  //#endregion

  //#region Add Client Form

  const emptyAddClientEntry = {
    Name: "",
    Email: "",
    PhoneNumber: "",
  };

  const [addClientEntry, setAddClientEntry] = useState(emptyAddClientEntry);

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

  const onChangeHandler = (e) => {
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
      setAddClientEntry(emptyAddClientEntry);
      setIsAddClientFormValidated(false);
    }

    setIsAdding(false);
  };

  const ResetAddClientForm = () => {
    setAddClientEntry(emptyAddClientEntry);
    ToggleAddClientForm(false);
    setIsAddClientFormValidated(false);
    setIsAdding(false);
  };
  //#endregion

  //#region Table Edit

  const [showToast, setShowToast] = useState(true);

  const beforeSaveCell = (row, cellName, cellValue) => {
    // if you dont want to save this editing, just return false to cancel it.
    setClients((prev) => {
      prev.forEach((element) => {
        if (element.id == row.id) {
          element = { ...element, [cellName]: cellValue };
        }
      });
      return prev;
    });
    console.log("state updated");
    console.log("api call here");
    setShowToast(true);

    return true;
  };

  const cellEditProp = {
    mode: "dbclick",
    beforeSaveCell,
  };

  const selectRow = {
    mode: "dbclick",
    clickToSelect: true,
  };

  const onEdit = () => {
    console.log("Edit Triggerd");
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
            <Button variant="dark" onClick={() => ToggleAddClientForm()}>
              +
            </Button>
          </Col>
        </Row>
        <Row></Row>
      </Container>

      <Collapse in={isAddClientFormOpen} dimension="height">
        <Card className="p-3 ">
          <Form
            id="addClientForm"
            onSubmit={AddClient}
            noValidate
            validated={isAddClientFormValidated}
          >
            <Row>
              <Form.Group className="m-1" controlId="Name" as={Col} sm="3">
                <Form.Control
                  stype="text"
                  placeholder="Name"
                  value={addClientEntry.Name}
                  onChange={onChangeHandler}
                  required
                  disabled={isAdding}
                />
                <Form.Control.Feedback type="invalid" align="left">
                  * Mandatory
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="m-1" controlId="Email" as={Col} sm="3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={addClientEntry.Email}
                  onChange={onChangeHandler}
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
                sm="3"
              >
                <Form.Control
                  type="number"
                  placeholder="Phone Number"
                  value={addClientEntry.PhoneNumber}
                  onChange={onChangeHandler}
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
                    variant="dark"
                    type="submit"
                    className="m-1"
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
                    variant="dark"
                    type="reset"
                    onClick={() => ResetAddClientForm(false)}
                    className="m-1"
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

      <Card className="p-3 mt-1">
        <BootstrapTable
          data={clients}
          search
          cellEdit={cellEditProp}
          striped
          hover
          bordered
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
            dataField="PhoneNumber"
            dataSort
            editable={{ type: "number" }}
          >
            Phone Number
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="Email"
            dataSort
            editable={{ type: "email" }}
          >
            Email
          </TableHeaderColumn>
        </BootstrapTable>
      </Card>
    </>
  );
}

export default Clients;
