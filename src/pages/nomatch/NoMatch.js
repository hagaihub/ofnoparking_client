import React from "react";
import { Link } from "react-router-dom";

function NoMatch({ location }) {
  return (
    <>
      <div>
        No match for <code>{location.pathname}</code>
      </div>
      <div>
        <Link to="/">back to home page</Link>
      </div>
    </>
  );
}
export default NoMatch;
