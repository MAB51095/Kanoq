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
import ValidationHelper from "../Helpers/ValidationHelper";

function Tailors() {
  const ctxNotification = useContext(NotificationContext);

  //#region Helpers
  const emptyTailorEntry = {
    Name: "",
    Email: "",
    PhoneNumber: "",
  };

  const nullTailorEntry = {
    Name: null,
    Email: null,
    PhoneNumber: null,
  };

  const ValidateForm = (inputs) => {
    let isFormValid = false;

    let Name = ValidationHelper.Validate_Name(inputs.Name);
    let Email = ValidationHelper.Validate_Email(inputs.Email);
    let PhoneNumber = ValidationHelper.Validate_PhoneNumber(inputs.PhoneNumber);

    let errors = { Name, Email, PhoneNumber };

    isFormValid = !Object.keys(errors).some((k) => errors[k].length > 0);

    return { isFormValid, errors };
  };
  //#endregion

  //#region Tailor List

  const [tailors, setTailors] = useState([]);
  const [isListLoading, setIsListLoading] = useState(false);

  useEffect(() => {
    setIsListLoading(true);
    async function GetTailors() {
      try {
        var data = (await ApiClient.get(uri.tailor.getAll)).data;
        setTailors(data);
      } catch (e) {
        ctxNotification.AddNotificationItem(
          CreateErrorNotification(
            e,
            AppMap.Pages.TAILORS,
            AppMap.Actions.TAILORS.LOAD_LIST
          )
        );
      }
      setIsListLoading(false);
    }

    GetTailors();
  }, []);

  //#endregion

  //#region Add Tailor Form

  const [addTailorEntry, setAddTailorEntry] = useState(emptyTailorEntry);

  const [isAddTailorFormOpen, setIsAddTailorFormOpen] = useState(false);

  const [isAdding, setIsAdding] = useState(false);

  const [addFormValidationErrors, setAddFormValidationErrors] =
    useState(nullTailorEntry);

  const ToggleAddTailorForm = (val) => {
    if (val) {
      setIsAddTailorFormOpen(val);
      return;
    }
    setIsAddTailorFormOpen((prev) => !prev);
  };

  const onAddFormChangeHandler = (e) => {
    setAddTailorEntry((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const AddTailor = (event) => {
    event.preventDefault();
    setIsAdding(true);

    const InsertTailor = async () => {
      try {
        var res = await ApiClient.post(uri.tailor.insert, addTailorEntry);

        setTailors((prev) => {
          return [res.data, ...prev];
        });
      } catch (e) {
        ctxNotification.AddNotificationItem(
          CreateErrorNotification(
            e,
            AppMap.Pages.TAILORS,
            AppMap.Actions.TAILORS.ADD_NEW_TAILOR
          )
        );
      }
    };

    const { isFormValid, errors } = ValidateForm(addTailorEntry);

    if (!isFormValid) {
      event.stopPropagation();
      setAddFormValidationErrors(errors);
    } else {
      InsertTailor(addTailorEntry);
      setAddTailorEntry(emptyTailorEntry);
      setAddFormValidationErrors(nullTailorEntry);
    }

    setTimeout(() => {
      setIsAdding(false);
      document.getElementById("Name").focus();
    }, 500);
  };

  const ResetAddTailorForm = () => {
    //ToggleAddTailorForm(false);
    setAddTailorEntry(emptyTailorEntry);
    setAddFormValidationErrors(nullTailorEntry);
    setIsAdding(false);
  };
  //#endregion

  //#region Update Form

  const [updateTailorEntry, setUpdateTailorEntry] = useState(emptyTailorEntry);

  const [isUpdateTailorFormOpen, setIsUpdateTailorFormOpen] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const [updateFormValidationErrors, setUpdateFormValidationErrors] =
    useState(nullTailorEntry);

  const ToggleUpdateTailorForm = (val) => {
    if (val) {
      setIsUpdateTailorFormOpen(val);
      return;
    }
    setIsUpdateTailorFormOpen((prev) => !prev);
  };

  const onUpdateFormChangeHandler = (e) => {
    setUpdateTailorEntry((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const ResetUpdateTailorForm = () => {
    setUpdateTailorEntry(emptyTailorEntry);
    ToggleUpdateTailorForm(false);
    setUpdateFormValidationErrors(nullTailorEntry);
    setIsUpdating(false);
  };

  const UpdateTailor = (event) => {
    event.preventDefault();
    setIsUpdating(true);

    const ModifyTailor = async () => {
      try {
        await ApiClient.post(uri.tailor.update, updateTailorEntry);

        var updateTailorId = updateTailorEntry.Id;

        setTailors((prev) => {
          var cl = prev.filter((c) => c.Id !== updateTailorId);
          cl.unshift(updateTailorEntry);
          return cl;
        });

        ctxNotification.AddNotificationItem(
          CreateSuccessNotification(
            `${updateTailorEntry.Name} updated`,
            AppMap.Pages.TAILORS,
            AppMap.Actions.TAILORS.EDIT_TAILOR
          )
        );

        ResetUpdateTailorForm();
      } catch (e) {
        setIsUpdating(false);
        ctxNotification.AddNotificationItem(
          CreateErrorNotification(
            e,
            AppMap.Pages.TAILORS,
            AppMap.Actions.TAILORS.EDIT_TAILOR
          )
        );
      }
    };

    const { isFormValid, errors } = ValidateForm(updateTailorEntry);

    if (!isFormValid) {
      event.stopPropagation();
      setUpdateFormValidationErrors(errors);
    } else {
      ModifyTailor();
    }

    setTimeout(() => {
      setIsUpdating(false);
    }, 500);
  };

  const EditTailorClickHandler = (row) => {
    setUpdateTailorEntry(row);
    ToggleUpdateTailorForm(true);
  };
  //#endregion

  //#region Delete Tailor

  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useState(false);
  const [deleteTailorEntry, setDeleteTailorEntry] = useState(emptyTailorEntry);
  const [isDeleting, setIsDeleting] = useState(false);

  const DeleteTailorClickHandler = (row) => {
    setDeleteTailorEntry(row);
    setIsDeleteWarningOpen(true);
  };

  const ResetDeleteTailorWarning = () => {
    setIsDeleteWarningOpen(false);
    setDeleteTailorEntry(emptyTailorEntry);
    setIsDeleting(false);
  };

  const YesDelete = () => {
    setIsDeleting(true);

    const RemoveTailor = async () => {
      try {
        var deleteTailorId = deleteTailorEntry.Id;
        await ApiClient.post(uri.tailor.delete + `/${deleteTailorId}`);

        setTailors((prev) => {
          var cl = prev.filter((c) => c.Id !== deleteTailorId);

          return cl;
        });

        ctxNotification.AddNotificationItem(
          CreateSuccessNotification(
            `${deleteTailorEntry.Name} removed`,
            AppMap.Pages.TAILORS,
            AppMap.Actions.TAILORS.DELETE_TAILOR
          )
        );

        ResetDeleteTailorWarning();
      } catch (e) {
        setIsDeleting(false);
        ctxNotification.AddNotificationItem(
          CreateErrorNotification(
            e,
            AppMap.Pages.TAILORS,
            AppMap.Actions.TAILORS.DELETE_TAILOR
          )
        );
      }
    };

    RemoveTailor();
    setTimeout(() => {
      setIsDeleting(false);
    }, 2000);
  };
  //#endregion

  return (
    <>
      <Container fluid>
        <Row>
          <Col align="left">
            <h1>Tailors</h1>
          </Col>
          <Col align="right">
            <Button
              onClick={() => ToggleAddTailorForm()}
              //variant="dark"
            >
              +
            </Button>
          </Col>
        </Row>
      </Container>

      <Collapse in={isAddTailorFormOpen} dimension="height">
        <Card className="p-3  mb-2 shadow-lg">
          <Form id="addTailorForm" onSubmit={AddTailor}>
            <Row>
              <Form.Group className="m-1" controlId="Name" as={Col} md="3">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={addTailorEntry.Name}
                  onChange={onAddFormChangeHandler}
                  required
                  disabled={isAdding}
                  className={ValidationHelper.AssignClass(
                    addFormValidationErrors.Name
                  )}
                />
                <Form.Control.Feedback type="invalid" align="left">
                  {addFormValidationErrors.Name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="m-1" controlId="Email" as={Col} md="3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={addTailorEntry.Email}
                  onChange={onAddFormChangeHandler}
                  disabled={isAdding}
                  className={ValidationHelper.AssignClass(
                    addFormValidationErrors.Email
                  )}
                />
                <Form.Control.Feedback type="invalid" align="left">
                  {addFormValidationErrors.Email}
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
                  value={addTailorEntry.PhoneNumber}
                  onChange={onAddFormChangeHandler}
                  //id="PhoneNumber"
                  // min={1000000000}
                  // max={9999999999}
                  disabled={isAdding}
                  className={ValidationHelper.AssignClass(
                    addFormValidationErrors.PhoneNumber
                  )}
                />
                <Form.Control.Feedback type="invalid" align="left">
                  {addFormValidationErrors.PhoneNumber}
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
                    onClick={() => ResetAddTailorForm(false)}
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

      <Modal visible={isUpdateTailorFormOpen || isDeleteWarningOpen}>
        {isUpdateTailorFormOpen && (
          <Card style={{ textAlign: "left" }} className="shadow-lg">
            <Card.Header as="h5">Edit Tailor</Card.Header>

            <Card.Body>
              <Form
                id="updateTailorForm"
                onSubmit={UpdateTailor}
                style={{ minWidth: "300px" }}
              >
                <Form.Group className="p-1" controlId="Name">
                  <Form.Label>Name</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={updateTailorEntry.Name}
                    onChange={onUpdateFormChangeHandler}
                    required
                    disabled={isUpdating}
                    className={ValidationHelper.AssignClass(
                      updateFormValidationErrors.Name
                    )}
                  />
                  <Form.Control.Feedback type="invalid" align="left">
                    {updateFormValidationErrors.Name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="p-1" controlId="Email">
                  <Form.Label>Email</Form.Label>

                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={updateTailorEntry.Email}
                    onChange={onUpdateFormChangeHandler}
                    disabled={isUpdating}
                    className={ValidationHelper.AssignClass(
                      updateFormValidationErrors.Email
                    )}
                  />
                  <Form.Control.Feedback type="invalid" align="left">
                    {updateFormValidationErrors.Email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="p-1" controlId="PhoneNumber">
                  <Form.Label>Phone</Form.Label>

                  <Form.Control
                    type="number"
                    placeholder="Phone Number"
                    value={updateTailorEntry.PhoneNumber}
                    onChange={onUpdateFormChangeHandler}
                    //id="PhoneNumber"
                    // min={1000000000}
                    // max={9999999999}
                    disabled={isUpdating}
                    className={ValidationHelper.AssignClass(
                      updateFormValidationErrors.PhoneNumber
                    )}
                  />
                  <Form.Control.Feedback type="invalid" align="left">
                    {updateFormValidationErrors.PhoneNumber}
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
                      onClick={() => ResetUpdateTailorForm(false)}
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
            <Alert.Heading>Tailor Deletion Warning!</Alert.Heading>
            <hr />
            <Container fluid align={"left"}>
              <Form.Group className="p-1" controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={deleteTailorEntry.Name}
                  disabled
                />
              </Form.Group>

              <Form.Group className="p-1" controlId="Name">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={deleteTailorEntry.Email}
                  disabled
                />
              </Form.Group>
              <Form.Group className="p-1" controlId="Name">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  value={deleteTailorEntry.PhoneNumber}
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
            data={tailors}
            search
            striped
            hover
            bordered
            pagination={true}
            condensed
            stickyHeader
          >
            <TableHeaderColumn dataField="Id" isKey={true} dataSort hidden>
              Id
            </TableHeaderColumn>
            <TableHeaderColumn dataField="Name" dataSort>
              Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="Email" dataSort>
              Email
            </TableHeaderColumn>
            <TableHeaderColumn dataField="PhoneNumber" dataSort>
              Phone Number
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="actions"
              dataFormat={(c, r) => (
                <>
                  <Button
                    size="sm"
                    variant="primary"
                    className="m-1 shadow-lg"
                    onClick={() => EditTailorClickHandler(r)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="m-1 shadow-lg"
                    onClick={() => DeleteTailorClickHandler(r)}
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

export default Tailors;
