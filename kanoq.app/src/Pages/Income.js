import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Collapse,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import ApiClient, { uri } from "../Helpers/ApiClient";
import ArrayHelper from "../Helpers/ArrayHelper";
import { AppMap } from "../Helpers/AppMap";
import { CreateErrorNotification } from "../Helpers/NotificationHelper";
import NotificationContext from "../store/NotificationContext";

function Income() {
  const ctxNotification = useContext(NotificationContext);

  //#region On PageLoad

  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function GetClients() {
      try {
        var data = (await ApiClient.get(uri.client.getAll)).data;

        ArrayHelper.Sort(data, "Name");

        setClients(data);
      } catch (e) {
        ctxNotification.AddNotificationItem(
          CreateErrorNotification(
            e,
            AppMap.Pages.INCOME,
            AppMap.Actions.CLIENTS.LOAD_LIST
          )
        );
      }
    }

    GetClients();
  }, []);

  //#endregion

  //#region Add new income

  const [isAddFormOpen, setIsAddFormOpen] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const ToggleAddForm = (val) => {
    if (val) {
      setIsAddFormOpen(val);
      return;
    }
    setIsAddFormOpen((prev) => !prev);
  };

  const ResetAddForm = () => {
    //setAddClientEntry(emptyClientEntry);
    ToggleAddForm(false);
    //setIsAddClientFormValidated(false);
    setIsAdding(false);
  };
  //#endregion

  return (
    <>
      <Container fluid>
        <Row>
          <Col align="left">
            <h1>Income</h1>
          </Col>
          <Col align="right">
            <Button
              onClick={() => ToggleAddForm()}
              //variant="dark"
            >
              +
            </Button>
          </Col>
        </Row>
      </Container>

      <Collapse in={isAddFormOpen} dimension="height">
        <Card className="p-3  mb-2 shadow-lg">
          <Form
            align="left"
            id="addClientForm"
            //onSubmit={AddClient}
            noValidate
            //validated={isAddClientFormValidated}
          >
            <Container fluid>
              <Row>
                <Col>
                  <Form.Group className="m-1" controlId="Client">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                      //value={addClientEntry.Email}
                      //onChange={onAddFormChangeHandler}
                      disabled={isAdding}
                      as="select"
                      //isInvalid={true}
                    >
                      <option
                        key="00000000-0000-0000-0000-000000000000"
                        value="00000000-0000-0000-0000-000000000000"
                      ></option>
                      {clients.map((c) => {
                        return (
                          <option
                            key={`${c.Id}`}
                            value={`${c.Id}`}
                          >{`${c.Name}`}</option>
                        );
                      })}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid" align="left">
                      Select a client
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="m-1" controlId="ReceivedOn">
                    <Form.Label>Recieved on</Form.Label>

                    <Form.Control
                      type="date"
                      placeholder="Recieved on"
                      //value={addClientEntry.Name}
                      //onChange={onAddFormChangeHandler}
                      required
                      disabled={isAdding}
                      //isInvalid={true}
                    />
                    <Form.Control.Feedback type="invalid" align="left">
                      * Mandatory
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="m-1" controlId="Amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="currency"
                      placeholder="Amount"
                      //value={addClientEntry.PhoneNumber}
                      //onChange={onAddFormChangeHandler}
                      //id="PhoneNumber"
                      min={1}
                      max={9999999999}
                      disabled={isAdding}
                    />
                    <Form.Control.Feedback type="invalid" align="left">
                      Enter Valid Phone Number
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="m-1" controlId="Amount">
                    <Form.Label>Particulars</Form.Label>
                    <Form.Control
                      placeholder="Particulars"
                      //value={addClientEntry.PhoneNumber}
                      //onChange={onAddFormChangeHandler}
                      //id="PhoneNumber"
                      as="textarea"
                      disabled={isAdding}
                    />
                    <Form.Control.Feedback type="invalid" align="left">
                      Enter Valid Phone Number
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group className="m-1" as={Col}>
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
                      onClick={() => ResetAddForm(false)}
                      className="m-1 shadow-lg"
                      hidden={isAdding}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                </Form.Group>
              </Row>
            </Container>
          </Form>
        </Card>
      </Collapse>
    </>
  );
}

export default Income;
