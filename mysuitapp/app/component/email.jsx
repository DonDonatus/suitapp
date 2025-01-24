import React from "react";

const email = ({ fullname, code }) => {
  return (
    <div>
      <p>Hello {fullname}, Let's get you suited up!</p>
      <p>
        Your code is: <strong>{code}</strong>
      </p>
    </div>
  );
};

export default email;
