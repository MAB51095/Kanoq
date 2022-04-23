import React from "react";
import {
  MDBEdgeHeader,
  MDBFreeBird,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBIcon,
  MDBCard,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
  MDBAnimation,
  MDBNavLink,
} from "mdbreact";
import "./HomePage.css";

import picWorks from "../assets/img/Works.jpg";
import picTailors from "../assets/img/Tailors.jpg";
import picProducts from "../assets/img/Products.jpg";
import picClients from "../assets/img/Clients.jpg";
import picPayments from "../assets/img/Payments.jpg";
import picAnalytics from "../assets/img/Analytics.jpg";

class HomePage extends React.Component {
  scrollToTop = () => window.scrollTo(0, 0);

  render() {
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
                <MDBCardBody className="text-center">
                  <h2 className="h2-responsive mb-4">
                    <strong className="font-weight-bold">
                      <MDBIcon icon="calculator" className="mr-2" />
                      Kanoq
                    </strong>
                  </h2>
                  <MDBRow />
                  <p>Screen Printing Management</p>
                  <MDBRow>
                    <MDBCol md="4">
                      <MDBAnimation reveal type="fadeInBottom">
                        <MDBCard cascade className="my-3 grey lighten-4">
                          <MDBCardImage
                            cascade
                            className="img-fluid"
                            src={picWorks}
                          />
                          <MDBCardBody cascade className="text-center">
                            <MDBCardTitle>
                              <strong>Works</strong>
                            </MDBCardTitle>
                            <MDBCardText>Keep your works in track</MDBCardText>
                            <MDBNavLink
                              tag="button"
                              to="/Works"
                              color="mdb-color"
                              className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
                              onClick={this.scrollToTop}
                            >
                              More
                            </MDBNavLink>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBAnimation>
                    </MDBCol>
                    <MDBCol md="4">
                      <MDBAnimation reveal type="fadeInBottom">
                        <MDBCard cascade className="my-3 grey lighten-4">
                          <MDBCardImage
                            cascade
                            className="img-fluid"
                            src={picPayments}
                          />
                          <MDBCardBody cascade className="text-center">
                            <MDBCardTitle>
                              <strong>Payments</strong>
                            </MDBCardTitle>
                            <MDBCardText>Track your Payments</MDBCardText>
                            <MDBNavLink
                              tag="button"
                              to="/Payments"
                              color="mdb-color"
                              className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
                              onClick={this.scrollToTop}
                            >
                              More
                            </MDBNavLink>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBAnimation>
                    </MDBCol>
                    <MDBCol md="4">
                      <MDBAnimation reveal type="fadeInBottom">
                        <MDBCard cascade className="my-3 grey lighten-4">
                          <MDBCardImage
                            cascade
                            className="img-fluid"
                            src={picAnalytics}
                          />
                          <MDBCardBody cascade className="text-center">
                            <MDBCardTitle>
                              <strong>Analytics</strong>
                            </MDBCardTitle>
                            <MDBCardText>
                              Identify outstanding Payments
                            </MDBCardText>
                            <MDBNavLink
                              tag="button"
                              to="/Analytics"
                              color="mdb-color"
                              className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
                              onClick={this.scrollToTop}
                            >
                              More
                            </MDBNavLink>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBAnimation>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="4">
                      <MDBAnimation reveal type="fadeInBottom">
                        <MDBCard cascade className="my-3 grey lighten-4">
                          <MDBCardImage
                            cascade
                            className="img-fluid"
                            src={picClients}
                          />
                          <MDBCardBody cascade className="text-center">
                            <MDBCardTitle>
                              <strong>Clients</strong>
                            </MDBCardTitle>
                            <MDBCardText>
                              Add, Update & Delete Client Details
                            </MDBCardText>
                            <MDBNavLink
                              tag="button"
                              to="/Clients"
                              color="mdb-color"
                              className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
                              onClick={this.scrollToTop}
                            >
                              More
                            </MDBNavLink>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBAnimation>
                    </MDBCol>
                    <MDBCol md="4">
                      <MDBAnimation reveal type="fadeInBottom">
                        <MDBCard cascade className="my-3 grey lighten-4">
                          <MDBCardImage
                            cascade
                            className="img-fluid"
                            src={picTailors}
                          />
                          <MDBCardBody cascade className="text-center">
                            <MDBCardTitle>
                              <strong>Tailors</strong>
                            </MDBCardTitle>
                            <MDBCardText>
                              Add, Update & Delete Tailors Details
                            </MDBCardText>
                            <MDBNavLink
                              tag="button"
                              to="/Tailors"
                              color="mdb-color"
                              className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
                              onClick={this.scrollToTop}
                            >
                              More
                            </MDBNavLink>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBAnimation>
                    </MDBCol>

                    <MDBCol md="4">
                      <MDBAnimation reveal type="fadeInBottom">
                        <MDBCard cascade className="my-3 grey lighten-4">
                          <MDBCardImage
                            cascade
                            className="img-fluid"
                            src={picProducts}
                          />
                          <MDBCardBody cascade className="text-center">
                            <MDBCardTitle>
                              <strong>Products</strong>
                            </MDBCardTitle>
                            <MDBCardText>
                              Keep your products updated here
                            </MDBCardText>
                            <MDBNavLink
                              tag="button"
                              to="/Products"
                              color="mdb-color"
                              className="btn btn-outline-mdb-color btn-sm btn-rounded d-inline"
                              onClick={this.scrollToTop}
                            >
                              More
                            </MDBNavLink>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBAnimation>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>
        </div>
      </>
    );
  }
}

export default HomePage;
