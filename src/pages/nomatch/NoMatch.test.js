import React from 'react';
import { render } from '@testing-library/react';
import Nomatch from './NoMatch.js';
import { BrowserRouter as Router } from "react-router-dom";

 
describe('Nomatch test', () => {

  test('renders component', () => {
    const location = { pathname: '/' };
    const { getByText } = render(<Router><Nomatch location={ location }/></Router>);
    const link_test = getByText("back to home page");
    expect(link_test).toBeTruthy()

  });

});