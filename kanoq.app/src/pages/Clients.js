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
} from "mdbreact";
import { useState, React } from "react";
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
  ];
  const [clients, setClients] = useState(
    fetchedData.map((data) => {
      data = {
        ...data,
        Action: (
          <>
            <button onClick={() => Remove(data.Id)}>Remove</button>
            <button onClick={() => Update(data.Id)}>Update</button>
          </>
        ),
      };
      return data;
    })
  );
  const Remove = (id) => {
    setClients((clients) => clients.filter((client) => client.Id !== id));
  };

  const Update = (id) => {
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
      <MDBEdgeHeader color="indigo darken-3" className="sectionPage" />
      <div className="mt-3 mb-5">
        <MDBFreeBird>
          <MDBRow>
            <MDBCol
              md="10"
              className="mx-auto float-none white z-depth-1 py-2 px-2"
            >
              <MDBCardBody className="">
                <h2 className="h2-responsive mb-4">
                  <strong className="font-weight-bold">Clients</strong>
                </h2>
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
