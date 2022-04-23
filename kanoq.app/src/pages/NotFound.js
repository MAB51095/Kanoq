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
// import "./NotFound.css";

class NotFound extends React.Component {
  scrollToTop = () => window.scrollTo(0, 0);

  render() {
    return (
      <>
        <MDBEdgeHeader color="indigo darken-3" className="sectionPage" />
        <div className="mt-3 mb-5">
          <MDBFreeBird>
            <MDBRow>
              <MDBCol
                xl="10"
                className="mx-auto float-none white z-depth-1 py-2 px-2"
              >
                <MDBCardBody className="text-center">
                  <MDBCol>
                    <MDBIcon icon="search" className="mt-5 mb-5" size="5x" />
                    <h2 className="h2-responsive mb-4">
                      <strong className="font-weight-bold">
                        Page Not Found
                      </strong>
                    </h2>

                    <p>Please check the URL</p>
                    <p className="pb-4">
                      This application does not contain this page.
                    </p>
                  </MDBCol>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>
        </div>
      </>
    );
  }
}

export default NotFound;
