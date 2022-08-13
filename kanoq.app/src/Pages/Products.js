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

function Products() {
  const ctxNotification = useContext(NotificationContext);

  //#region Product List

  const [products, setProducts] = useState([]);
  const [isListLoading, setIsListLoading] = useState(false);

  useEffect(() => {
    setIsListLoading(true);
    async function GetProducts() {
      try {
        var data = (await ApiClient.get(uri.product.getAll)).data;
        setProducts(data);
      } catch (e) {
        ctxNotification.AddNotificationItem(
          CreateErrorNotification(
            e,
            AppMap.Pages.PRODUCTS,
            AppMap.Actions.PRODUCTS.LOAD_LIST
          )
        );
      }
      setIsListLoading(false);
    }

    GetProducts();
  }, []);

  //#endregion

  //#region Add Product Form

  const emptyProductEntry = {
    Name: "",
  };

  const [addProductEntry, setAddProductEntry] = useState(emptyProductEntry);

  const [isAddProductFormOpen, setIsAddProductFormOpen] = useState(false);

  const [isAdding, setIsAdding] = useState(false);

  const [isAddProductFormValidated, setIsAddProductFormValidated] =
    useState(false);

  const ToggleAddProductForm = (val) => {
    if (val) {
      setIsAddProductFormOpen(val);
      return;
    }
    setIsAddProductFormOpen((prev) => !prev);
  };

  const onAddFormChangeHandler = (e) => {
    setAddProductEntry((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const AddProduct = (event) => {
    event.preventDefault();
    setIsAdding(true);

    const isFormValid = event.currentTarget.checkValidity();

    if (isFormValid === false) {
      event.stopPropagation();
    }

    setIsAddProductFormValidated(true);

    const InsertProduct = async () => {
      try {
        var res = await ApiClient.post(uri.product.insert, addProductEntry);

        setProducts((prev) => {
          return [res.data, ...prev];
        });
      } catch (e) {
        ctxNotification.AddNotificationItem(
          CreateErrorNotification(
            e,
            AppMap.Pages.PRODUCTS,
            AppMap.Actions.PRODUCTS.ADD_NEW_PRODUCT
          )
        );
      }
    };

    if (isFormValid) {
      InsertProduct(addProductEntry);
      setAddProductEntry(emptyProductEntry);
      setIsAddProductFormValidated(false);
    }

    setTimeout(() => {
      setIsAdding(false);
      document.getElementById("Name").focus();
    }, 500);
  };

  const ResetAddProductForm = () => {
    setAddProductEntry(emptyProductEntry);
    ToggleAddProductForm(false);
    setIsAddProductFormValidated(false);
    setIsAdding(false);
  };
  //#endregion

  //#region Update Form

  const [updateProductEntry, setUpdateProductEntry] =
    useState(emptyProductEntry);

  const [isUpdateProductFormOpen, setIsUpdateProductFormOpen] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const [isUpdateProductFormValidated, setIsUpdateProductFormValidated] =
    useState(false);

  const ToggleUpdateProductForm = (val) => {
    if (val) {
      setIsUpdateProductFormOpen(val);
      return;
    }
    setIsUpdateProductFormOpen((prev) => !prev);
  };

  const onUpdateFormChangeHandler = (e) => {
    setUpdateProductEntry((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const ResetUpdateProductForm = () => {
    setUpdateProductEntry(emptyProductEntry);
    ToggleUpdateProductForm(false);
    setIsUpdateProductFormValidated(false);
    setIsUpdating(false);
  };

  const UpdateProduct = (event) => {
    event.preventDefault();
    setIsUpdateProductFormValidated(false);
    setIsUpdating(true);

    const isFormValid = event.currentTarget.checkValidity();

    if (isFormValid === false) {
      event.stopPropagation();
    }

    setIsUpdateProductFormValidated(true);

    const ModifyProduct = async () => {
      try {
        var res = await ApiClient.post(uri.product.update, updateProductEntry);

        var updateProductId = updateProductEntry.Id;

        setProducts((prev) => {
          var cl = prev.filter((c) => c.Id !== updateProductId);
          cl.unshift(updateProductEntry);
          return cl;
        });

        ctxNotification.AddNotificationItem(
          CreateSuccessNotification(
            `${updateProductEntry.Name} updated`,
            AppMap.Pages.PRODUCTS,
            AppMap.Actions.PRODUCTS.EDIT_PRODUCT
          )
        );

        ResetUpdateProductForm();
      } catch (e) {
        setIsUpdating(false);
        ctxNotification.AddNotificationItem(
          CreateErrorNotification(
            e,
            AppMap.Pages.PRODUCTS,
            AppMap.Actions.PRODUCTS.EDIT_PRODUCT
          )
        );
      }
    };

    if (isFormValid) {
      ModifyProduct();
    }

    setTimeout(() => {
      setIsUpdating(false);
    }, 500);
  };

  const EditProductClickHandler = (row) => {
    setUpdateProductEntry(row);
    ToggleUpdateProductForm(true);
  };
  //#endregion

  //#region Delete Product

  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useState(false);
  const [deleteProductEntry, setDeleteProductEntry] =
    useState(emptyProductEntry);
  const [isDeleting, setIsDeleting] = useState(false);

  const DeleteProductClickHandler = (row) => {
    setDeleteProductEntry(row);
    setIsDeleteWarningOpen(true);
  };

  const ResetDeleteProductWarning = () => {
    setIsDeleteWarningOpen(false);
    setDeleteProductEntry(emptyProductEntry);
    setIsDeleting(false);
  };

  const YesDelete = () => {
    setIsDeleting(true);

    const RemoveProduct = async () => {
      try {
        var deleteProductId = deleteProductEntry.Id;
        var res = await ApiClient.post(
          uri.product.delete + `/${deleteProductId}`
        );

        setProducts((prev) => {
          var cl = prev.filter((c) => c.Id !== deleteProductId);

          return cl;
        });

        ctxNotification.AddNotificationItem(
          CreateSuccessNotification(
            `${deleteProductEntry.Name} removed`,
            AppMap.Pages.PRODUCTS,
            AppMap.Actions.PRODUCTS.DELETE_PRODUCT
          )
        );

        ResetDeleteProductWarning();
      } catch (e) {
        setIsDeleting(false);
        ctxNotification.AddNotificationItem(
          CreateErrorNotification(
            e,
            AppMap.Pages.PRODUCTS,
            AppMap.Actions.PRODUCTS.DELETE_PRODUCT
          )
        );
      }
    };

    RemoveProduct();
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
            <h1>Products</h1>
          </Col>
          <Col align="right">
            <Button
              onClick={() => ToggleAddProductForm()}
              //variant="dark"
            >
              +
            </Button>
          </Col>
        </Row>
      </Container>

      <Collapse in={isAddProductFormOpen} dimension="height">
        <Card className="p-3  mb-2 shadow-lg">
          <Form
            id="addProductForm"
            onSubmit={AddProduct}
            noValidate
            validated={isAddProductFormValidated}
          >
            <Row>
              <Form.Group className="m-1" controlId="Name" as={Col} md="3">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={addProductEntry.Name}
                  onChange={onAddFormChangeHandler}
                  required
                  disabled={isAdding}
                />
                <Form.Control.Feedback type="invalid" align="left">
                  * Mandatory
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
                    onClick={() => ResetAddProductForm(false)}
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

      <Modal visible={isUpdateProductFormOpen || isDeleteWarningOpen}>
        {isUpdateProductFormOpen && (
          <Card style={{ textAlign: "left" }} className="shadow-lg">
            <Card.Header as="h5">Edit Product</Card.Header>

            <Card.Body>
              <Form
                id="updateProductForm"
                onSubmit={UpdateProduct}
                noValidate
                validated={isUpdateProductFormValidated}
                className=""
                style={{ minWidth: "300px" }}
              >
                <Form.Group className="p-1" controlId="Name">
                  <Form.Label>Name</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={updateProductEntry.Name}
                    onChange={onUpdateFormChangeHandler}
                    required
                    disabled={isUpdating}
                  />
                  <Form.Control.Feedback type="invalid" align="left">
                    * Mandatory
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
                      onClick={() => ResetUpdateProductForm(false)}
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
            <Alert.Heading>Product Deletion Warning!</Alert.Heading>
            <hr />
            <Container fluid align={"left"}>
              <Form.Group className="p-1" controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={deleteProductEntry.Name}
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
            data={products}
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
            <TableHeaderColumn dataField="Name" dataSort>
              Name
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="actions"
              dataFormat={(c, r) => (
                <>
                  <Button
                    size="sm"
                    variant="primary"
                    className="m-1 shadow-lg"
                    onClick={() => EditProductClickHandler(r)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="m-1 shadow-lg"
                    onClick={() => DeleteProductClickHandler(r)}
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

export default Products;
