import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Signin from "./Signin.js";

describe("Signin test", () => {
  test("renders component", () => {
    const { getByText } = render(
      <Router>
        <Signin />
      </Router>
    );
    const Sign_in_text_header = getByText("Sign in to your account");

    expect(Sign_in_text_header).toBeTruthy();
  });

  test("click", () => {
    const { getByLabelText, getByText, getByTestId, findByText } = render(
      <Router>
        <Signin />
      </Router>
    );

    fireEvent.change(getByTestId("test_email"), {
      target: { value: "123@asd.com" },
    });
    fireEvent.change(getByTestId("test_password"), {
      target: { value: "123123" },
    });
    fireEvent.click(getByTestId("signsubmit"));

    //const Sign_in_text_header =await  findByText("Oops..we encountered a problem. Please try again later");

    //expect(Sign_in_text_header).toBeTruthy();
  });
});
