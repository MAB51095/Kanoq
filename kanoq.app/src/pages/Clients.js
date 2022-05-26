import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBDataTable,
  MDBEdgeHeader,
  MDBFreeBird,
  MDBIcon,
  MDBRow,
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
} from "mdbreact";

import { useState, React, useRef, useEffect, useReducer } from "react";
import { setConstantValue } from "typescript";
import Loading from "../components/loading";
import SectionContainer from "../components/sectionContainer";
import kanoqApiClient, { uri } from "../helper/Api/kanoqApiClient";

function Clients() {
  //#region misc
  const ActionButtons = (id) => {
    return (
      <>
        <button onClick={() => Remove(id)}>Remove</button>
        <button onClick={() => Update(id)}>Update</button>
      </>
    );
  };

  const transformData = (clients) => {
    return clients.map((data) => {
      data = {
        ...data,
        Action: ActionButtons(data.Id),
      };
      return data;
    });
  };

  function getid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  //#endregion

  //#region  state manaagement
  const [clients, setClients] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const nameRef = useRef("");
  const phoneNumberRef = useRef("");
  const emailRef = useRef("");
  //#endregion

  //#region reducers

  const modalActions = {
    ADD: "ADD",
    UPDATE: "UPDATE",
    CANCEL: "CANCEL",
    ON_CHANGE: "ON_CHANGE",
    OPEN_AS_ADD: "OPEN_AS_ADD",
    OPEN_AS_UPDATE: "OPEN_AS_UPDATE",
  };

  const modalInitialState = {
    Id: "",
    Name: "",
    PhoneNumber: "",
    Email: "",
    IsOpen: false,
    Header: null,
    Mode: null,
  };

  const modalReducer = (state, action) => {
    switch (action.type) {
      case modalActions.UPDATE:
        return modalInitialState;
        break;
      case modalActions.CANCEL:
        return modalInitialState;
        break;
      case modalActions.ON_CHANGE:
        switch (action.id.toLowerCase()) {
          case "name":
            return { ...state, Name: action.val };
            break;
          case "phonenumber":
            return { ...state, PhoneNumber: action.val };
            break;
          case "email":
            return { ...state, Email: action.val };
            break;
        }
        break;
      case modalActions.OPEN_AS_ADD:
        return { ...state, IsOpen: true, Header: "Add", Mode: "Add" };
        break;
      case modalActions.OPEN_AS_UPDATE:
        return { ...state, IsOpen: true, Header: "Update", Mode: "Update" };
        break;
      case modalActions.CANCEL:
        return { ...state, IsOpen: false };
        break;
      case modalActions.ADD:
        setClients((clients) => {
          const clientState = clients;
          const id = getid(); // will use the id from API call response

          // let client = {
          //   Name: nameRef.current.value,
          //   PhoneNumber: phoneNumberRef.current.value,
          //   Email: emailRef.current.value,
          // };

          // let response = await kanoqApiClient.post(uri.client.insert, client);

          // console.log(response.data);

          clientState.push({
            Id: id,
            Name: state.Name,
            PhoneNumber: state.PhoneNumber,
            Email: state.Email,
            Action: ActionButtons(id),
          });

          return clientState;
        });
        return modalInitialState;
        break;
      default:
        return state;
    }
  };

  const [modalState, modalDispatch] = useReducer(
    modalReducer,
    modalInitialState
  );

  //#endregion

  //#region intial setup

  useEffect(async () => {
    let fetchedData = (await kanoqApiClient.get(uri.client.getAll)).data;

    setClients(transformData(fetchedData));
    setIsDataLoading(false);
  }, []);

  const data = {
    columns: [
      {
        label: "Name",
        field: "Name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Phone Number",
        field: "PhoneNumber",
        sort: "asc",
        width: 270,
      },
      {
        label: "Email",
        field: "Email",
        sort: "asc",
        width: 200,
      },
      {
        label: "",
        field: "Action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: clients,
  };

  //#endregion

  //#region pageevent

  const OnChangeHandler = (event) => {
    modalDispatch({
      type: modalActions.ON_CHANGE,
      id: event.target.id,
      val: event.target.value,
    });
  };

  const SubmitHandler = (e) => {
    e.preventDefault();

    // //Call Add CLient API here

    // setClients((clients) => {
    //   const state = clients;
    //   const id = getid(); // will use the id from API call response

    //   // let client = {
    //   //   Name: nameRef.current.value,
    //   //   PhoneNumber: phoneNumberRef.current.value,
    //   //   Email: emailRef.current.value,
    //   // };

    //   // let response = await kanoqApiClient.post(uri.client.insert, client);

    //   // console.log(response.data);

    //   state.push({
    //     Id: id,
    //     Name: nameRef.current.value,
    //     PhoneNumber: phoneNumberRef.current.value,
    //     Email: emailRef.current.value,
    //     Action: ActionButtons(id),
    //   });

    //   return state;
    // });

    // setIsAddModalOpen(false);
    switch (modalState.Mode) {
      case "Add":
        modalDispatch({
          type: modalActions.ADD,
        });
        break;
      case "Update":
        modalDispatch({
          type: modalActions.UPDATE,
        });
        break;
    }
  };

  const Update = (id) => {
    //Call Update Client API  here a

    var updateClient = clients.filter((client) => client.Id == id)[0];
    updateClient = {
      ...updateClient,
      Name: "Updated",
    };
    setClients((clients) => {
      let removeClient = clients.filter((client) => client.Id !== id);
      let update = [...removeClient, updateClient];

      return transformData(update);
    });
  };

  const Remove = (id) => {
    //Call Delete Client API  here
    setClients((clients) => clients.filter((client) => client.Id !== id));
  };

  const OpenAdddModal = () => {
    modalDispatch({
      type: modalActions.OPEN_AS_ADD,
    });
  };

  const CancelModal = () => {
    modalDispatch({
      type: modalActions.CANCEL,
    });
  };

  //#endregion

  //#region view
  return (
    <>
      <MDBModal
        className="modal-notify modal-primary white-text"
        isOpen={modalState.IsOpen}
        toggle={CancelModal}
      >
        <MDBModalHeader
          className="text-center"
          titleClass="w-100 font-weight-bold"
          toggle={CancelModal}
        >
          Add Client
        </MDBModalHeader>
        <MDBModalBody>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12">
                <form onSubmit={SubmitHandler}>
                  <label
                    htmlFor="defaultFormRegisterNameEx"
                    className="grey-text"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    //ref={nameRef}
                    text={modalState.Name}
                    onChange={OnChangeHandler}
                  />
                  <br />
                  <label
                    htmlFor="defaultFormRegisterEmailEx"
                    className="grey-text"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    //ref={emailRef}
                    text={modalState.Email}
                    onChange={OnChangeHandler}
                  />
                  <br />
                  <label
                    htmlFor="defaultFormRegisterConfirmEx"
                    className="grey-text"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    id="phoneNumber"
                    className="form-control"
                    //ref={phoneNumberRef}
                    text={modalState.PhoneNumber}
                    onChange={OnChangeHandler}
                  />
                  <br />

                  <div className="text-center mt-4">
                    <MDBBtn color="primary" type="submit">
                      Add
                    </MDBBtn>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBModalBody>
      </MDBModal>
      <MDBEdgeHeader color="indigo darken-3" className="sectionPage" />
      <div className="mt-3 mb-5">
        <MDBFreeBird>
          <MDBRow>
            <MDBCol
              md="10"
              className="mx-auto float-none white z-depth-1 py-2 px-2"
            >
              <MDBCardBody className="">
                <MDBRow className="mx-auto justify-content-between">
                  <h2 className="h2-responsive mb-4">
                    <strong className="font-weight-bold">Clients</strong>
                  </h2>

                  <MDBBtn color="primary" onClick={OpenAdddModal} size="sm">
                    <MDBIcon stack="1x" icon="plus" color="primary" size="2x" />
                  </MDBBtn>
                </MDBRow>
                {isDataLoading ? (
                  <Loading />
                ) : (
                  <MDBDataTable striped bordered hover data={data} />
                )}
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBFreeBird>
      </div>
    </>
  );
  //#endregion
}

export default Clients;
