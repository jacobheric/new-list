import * as React from "react";
import {
  FunctionComponent,
  SyntheticEvent,
  useContext,
  useEffect
} from "react";
import { ADD_NOTE, cacheUpdate, Note } from "./input";
import classNames from "classnames";
import * as r from "ramda";
import { useMutation } from "@apollo/client";
import { ErrorActionContext } from "./error";

const ItemComponent: FunctionComponent<{
  item: Note;
  setInput: (note: Note) => void;
}> = ({ item, setInput }) => {
  const { addError } = useContext(ErrorActionContext);
  const [addNote, { error: mutationError }] = useMutation(
    ADD_NOTE,
    cacheUpdate
  );

  useEffect(() => {
    if (mutationError) {
      addError(mutationError.message);
    }
  }, [mutationError]);
  //
  // update a note
  const update = (e: SyntheticEvent, note: Note) => {
    e.stopPropagation();
    addNote({ variables: { note: r.omit(["__typename"], note) } });
  };

  const edit = (note: Note) => {
    setInput(r.omit(["__typename"], note));
  };

  return (
    <>
      <li className="row px-1" key={item.uuid} onClick={() => edit(item)}>
        <div
          className={classNames("w-full", "cursor-pointer", {
            strike: item.done
          })}>
          {item.note}
        </div>
        <div
          className="cursor-pointer px-2 text-xl"
          onClick={e => update(e, { ...item, ...{ archived: true } })}>
          ⓧ
        </div>
        <div
          className="cursor-pointer px-2 text-xl"
          onClick={e => update(e, { ...item, ...{ done: !item.done } })}>
          ✓
        </div>
      </li>
      <hr key={`h${item.uuid}`} />
    </>
  );
};
export default ItemComponent;
