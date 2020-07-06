import {
  default as React,
  FunctionComponent,
  useContext,
  useEffect
} from "react";
import { ErrorActionContext } from "./components/error";

export const echo = (msg: string, val: any) => {
  // eslint-disable-next-line no-console
  console.log(msg, val);
  return val;
};

export const DataContainer: FunctionComponent<{
  loading: boolean;
  error?: string;
}> = ({ loading, error, children }) => {
  if (loading) {
    return <div className="row">Loading...</div>;
  }

  if (error) {
    const { addError } = useContext(ErrorActionContext);
    useEffect(() => {
      addError(error);
    }, [error]);
    return null;
  }

  return <>{children}</>;
};
