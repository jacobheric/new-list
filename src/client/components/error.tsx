import React, { FunctionComponent, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import * as r from "ramda";

export interface ErrorContext {
  error: string;
  id: string;
}

export interface ErrorActionContext {
  addError: (error: string) => void;
  removeError: (id: string) => void;
}

//
// A separate context for data and mutations
// minimizes re-renders for components that don't care about error state
export const ErrorContext = React.createContext<ErrorContext[]>([]);
export const ErrorActionContext = React.createContext<ErrorActionContext>({
  addError: () => void 0,
  removeError: () => void 0
});

export const Error: FunctionComponent = () => {
  const errors = useContext(ErrorContext);
  const { removeError } = useContext(ErrorActionContext);
  return r.isEmpty(errors) ? null : (
    <>
      {errors.map((error: ErrorContext, i) => (
        <div
          className="error row border-solid border-2 rounded-md border-pink-300 p-5"
          key={i}>
          Error: {error.error}
          <button onClick={() => removeError(error.id)}>Dismiss</button>
        </div>
      ))}
    </>
  );
};

export const ErrorProvider: React.FunctionComponent = props => {
  const [errors, setErrors] = useState<ErrorContext[]>([]);
  const addError = (error: string) =>
    setErrors([...(errors || []), { error, id: uuid() }]);

  const removeError = (id: string) =>
    setErrors(errors ? errors.filter(t => t.id !== id) : []);
  const provider = { addError, removeError };

  return (
    <ErrorContext.Provider value={errors}>
      <ErrorActionContext.Provider value={provider}>
        {props.children}
      </ErrorActionContext.Provider>
    </ErrorContext.Provider>
  );
};
