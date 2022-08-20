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
import ValidationHelper from "../Helpers/ValidationHelper";

function Income() {
  const ctxNotification = useContext(NotificationContext);

  //#region Helpers

  const emptyIncomeEntry = {
    Client: "",
    Amount: "",
    ReceivedOn: "", //new Date().toISOString().split("T")[0],
    Particulars: "",
  };

  const nullIncomeEntry = {
    Client: null,
    Amount: null,
    ReceivedOn: null,
    Particulars: null,
  };

  const ValidateForm = (inputs) => {
    let isFormValid = false;

    let Client = ValidationHelper.Validate_DropDown(inputs.Client, true);
    let Amount = ValidationHelper.Validate_Currency(inputs.Amount, true);
    let Particulars = ValidationHelper.Validate_Description(
      inputs.Particulars,
      false
    );
    let ReceivedOn = ValidationHelper.Validate_Date(inputs.ReceivedOn, true);

    let errors = { Client, Amount, Particulars, ReceivedOn };

    isFormValid = !Object.keys(errors).some((k) => errors[k].length > 0);

    return { isFormValid, errors };
  };
  //#endregion

  //#region On PageLoad
  const [incomes, setIncomes] = useState([]);
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

  const [addIncomeEntry, setAddIncomeEntry] = useState(emptyIncomeEntry);
  const [addFormValidationErrors, setAddFormValidationErrors] =
    useState(nullIncomeEntry);

  const ToggleAddForm = (val) => {
    if (val) {
      setIsAddFormOpen(val);
      return;
    }
    setIsAddFormOpen((prev) => !prev);
  };

  const onAddFormChangeHandler = (e) => {
    setAddIncomeEntry((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const AddNewIncome = (e) => {
    e.preventDefault();

    setIsAdding(true);

    console.log(addIncomeEntry);

    const { isFormValid, errors } = ValidateForm(addIncomeEntry);

    if (!isFormValid) {
      e.stopPropagation();
      setAddFormValidationErrors(errors);
    } else {
      //InsertClient(addClientEntry);
      setAddIncomeEntry(emptyIncomeEntry);
      setAddFormValidationErrors(nullIncomeEntry);
    }

    setTimeout(() => {
      setIsAdding(false);
      document.getElementById("Client").focus();
    }, 500);
  };

  const ResetAddForm = () => {
    setAddIncomeEntry(emptyIncomeEntry);
    //ToggleAddForm(false);
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
          <Form align="left" id="addClientForm" onSubmit={AddNewIncome}>
            <Container fluid>
              <Row>
                <Col>
                  <Form.Group className="m-1" controlId="Client">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                      value={addIncomeEntry.Client}
                      onChange={onAddFormChangeHandler}
                      disabled={isAdding}
                      as="select"
                      required
                      className={ValidationHelper.AssignClass(
                        addFormValidationErrors.Client
                      )}
                    >
                      <option
                        key="00000000-0000-0000-0000-000000000000"
                        value=""
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
                      {addFormValidationErrors.Client}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="m-1" controlId="ReceivedOn">
                    <Form.Label>Recieved on</Form.Label>

                    <Form.Control
                      type="date"
                      placeholder="Recieved on"
                      value={addIncomeEntry.ReceivedOn}
                      onChange={onAddFormChangeHandler}
                      required
                      disabled={isAdding}
                      className={ValidationHelper.AssignClass(
                        addFormValidationErrors.ReceivedOn
                      )}
                    />
                    <Form.Control.Feedback type="invalid" align="left">
                      {addFormValidationErrors.ReceivedOn}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="m-1" controlId="Amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Amount"
                      value={addIncomeEntry.Amount}
                      onChange={onAddFormChangeHandler}
                      //id="PhoneNumber"
                      min={1}
                      max={9999999999}
                      disabled={isAdding}
                      step={0.01}
                      required
                      className={ValidationHelper.AssignClass(
                        addFormValidationErrors.Amount
                      )}
                    />
                    <Form.Control.Feedback type="invalid" align="left">
                      {addFormValidationErrors.Amount}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="m-1" controlId="Particulars">
                    <Form.Label>Particulars</Form.Label>
                    <Form.Control
                      placeholder="Particulars"
                      value={addIncomeEntry.Particulars}
                      onChange={onAddFormChangeHandler}
                      //id="PhoneNumber"
                      as="textarea"
                      disabled={isAdding}
                      className={ValidationHelper.AssignClass(
                        addFormValidationErrors.Particulars
                      )}
                    />
                    <Form.Control.Feedback type="invalid" align="left">
                      {addFormValidationErrors.Particulars}
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
