import React, { Fragment } from "react";
import { ModalContainer, Overlay, FloatingSider } from "components";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Fragment>
      <FloatingSider />
      <Overlay />
      <div>
        <ModalContainer />
      </div>
      <ToastContainer autoClose={3000} />
    </Fragment>
  );
};

export default App;
