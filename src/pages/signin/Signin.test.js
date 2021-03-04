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
    const Sign_in_text_header = getByText("Sign in");

    expect(Sign_in_text_header).toBeTruthy();
  });

  test("click", () => {

    
     
    const { getByLabelText, getByText } = render( <Router>
      <Signin />
    </Router>);
    
  
    fireEvent.change(getByLabelText("/Email Address/i"), { target: { value: "asdasd@asd" } });
    //fireEvent.change(getByLabelText("password"), { target: { value: "123" } });
    //fireEvent.click(getByText("/Sign In/i"));
  
  
     




  });
});
