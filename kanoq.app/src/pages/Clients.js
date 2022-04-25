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
import { useState, React, useRef } from "react";
import { setConstantValue } from "typescript";
import SectionContainer from "../components/sectionContainer";

function Clients() {
  const fetchedData = [
    {
      Id: "d9ffb8f9-9f58-430c-bd29-afb9bc92843b",
      Name: "Wildcraft",
      PhoneNumber: null,
      Email: null,
    },
    {
      Id: "c9ffb8f9-9f58-430c-bd29-afb9bc92843c",
      Name: "American Express",
      PhoneNumber: null,
      Email: null,
    },
  ]; //Call Get All Client API here in useEffect

  function getid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  } //Remove when add client API is being called

  const nameRef = useRef("");
  const phoneNumberRef = useRef("");
  const emailRef = useRef("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  //IsUpdateModalOpen state here

  const ActionItems = (id) => {
    return (
      <>
        <button onClick={() => Remove(id)}>Remove</button>
        <button onClick={() => Update(id)}>Update</button>
      </>
    );
  };

  const Add = (e) => {
    e.preventDefault();

    //Call Add CLient API here

    setClients((clients) => {
      const state = clients;
      const id = getid(); // will use the id from API call response

      state.push({
        Id: id,
        Name: nameRef.current.value,
        PhoneNumber: phoneNumberRef.current.value,
        Email: emailRef.current.value,
        Action: ActionItems(id),
      });

      return state;
    });

    setIsAddModalOpen(false);
  };

  const Update = (id) => {
    //Call Update Client API  here a

    var updateClient = clients.filter((client) => client.Id == id)[0];
    updateClient = {
      ...updateClient,
      Name: "Updated",
    };
    setClients((clients) => {
      const removeClient = clients.filter((client) => client.Id !== id);
      const update = [...removeClient, updateClient];

      //   const update = [...clients, updateClient];

      return update;
    });
  };

  const Remove = (id) => {
    //Call Delete Client API  here
    setClients((clients) => clients.filter((client) => client.Id !== id));
  };

  const [clients, setClients] = useState(
    fetchedData.map((data) => {
      data = {
        ...data,
        Action: ActionItems(data.Id),
      };
      return data;
    })
  );

  const ToggleAddModal = () => {
    setIsAddModalOpen((state) => !state);
  };

  //Implement ToggleUpdateModal() to call update

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
  return (
    <>
      <MDBModal
        className="modal-notify modal-primary white-text"
        isOpen={isAddModalOpen}
        toggle={ToggleAddModal}
      >
        <MDBModalHeader
          className="text-center"
          titleClass="w-100 font-weight-bold"
          toggle={ToggleAddModal}
        >
          Add Client
        </MDBModalHeader>
        <MDBModalBody>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12">
                <form onSubmit={Add}>
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
                    ref={nameRef}
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
                    ref={emailRef}
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
                    ref={phoneNumberRef}
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

                  <MDBBtn color="primary" onClick={ToggleAddModal} size="sm">
                    <MDBIcon stack="1x" icon="plus" color="primary" size="2x" />
                  </MDBBtn>
                </MDBRow>
                <MDBDataTable striped bordered hover data={data} />
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBFreeBird>
      </div>
    </>
  );
}

export default Clients;
