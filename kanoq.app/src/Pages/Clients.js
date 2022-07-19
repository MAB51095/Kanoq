import React, { useEffect, useState } from "react";

import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Collapse,
  Container,
  Toast,
} from "react-bootstrap";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ApiClient, { uri } from "../Helpers/ApiClient";
import Validator from "../Helpers/Validator";

import "../Icons/Edit.svg";

function Clients() {
  //#region Client List
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function GetClients() {
      var data = (await ApiClient.get(uri.client.getAll)).data;
      setClients(data);
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

  const AddClient = (e) => {
    e.preventDefault();

    const InsertClient = async () => {
      var res = await ApiClient.post(uri.client.insert, addClientEntry);

      setClients((prev) => {
        return [res.data, ...prev];
      });
    };

    if (Validator(addClientEntry)) {
      InsertClient(addClientEntry);
    } else {
    }
    ToggleAddClientForm(false);
    setAddClientEntry(emptyAddClientEntry);
  };
  //#endregion

  //#region Table Edit

  const [showToast, setShowToast] = useState(false);

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
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        animation={true}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: 0,
          right: 0,
        }}
        bg="Danger"
      >
        <Toast.Header>
          <strong className="mr-auto">Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>

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
      </Container>

      <Collapse in={isAddClientFormOpen} dimension="height">
        <Card className="p-3">
          <Form>
            <Row>
              <Col sm="3">
                <Form.Control
                  className="m-1"
                  type="text"
                  placeholder="Name"
                  value={addClientEntry.Name}
                  onChange={onChangeHandler}
                  id="Name"
                />
              </Col>
              <Col sm="3">
                <Form.Control
                  className="m-1"
                  type="email"
                  placeholder="Email"
                  value={addClientEntry.Email}
                  onChange={onChangeHandler}
                  id="Email"
                />
              </Col>
              <Col sm="3">
                <Form.Control
                  className="m-1"
                  type="number"
                  placeholder="Phone Number"
                  value={addClientEntry.PhoneNumber}
                  onChange={onChangeHandler}
                  id="PhoneNumber"
                />
              </Col>
              <Col className="m-auto" sm="3">
                <Button
                  className="m-1"
                  variant="dark"
                  type="submit"
                  onClick={AddClient}
                >
                  Add
                </Button>
                <Button
                  className="m-1"
                  variant="dark"
                  type="reset"
                  onClick={() => ToggleAddClientForm(false)}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Collapse>

      <Card className="p-3">
        <BootstrapTable
          data={clients}
          search
          cellEdit={cellEditProp}
          striped
          hover
          bordered
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
