import React from 'react';

const RegisterInput = (input: {
  name: string;
  label: string;
  type: string;
  place_holder: string;
}) => {
  return (
    <div className="formField">
      <label htmlFor={input.name}>{input.label}</label>
      <input
        type={input.type}
        name={input.name}
        id={input.name}
        placeholder={input.place_holder}
      />
    </div>
  );
};

export default RegisterInput;
