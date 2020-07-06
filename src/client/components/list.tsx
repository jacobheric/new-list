import * as React from "react";
import { ChangeEvent, SyntheticEvent, useContext, useState } from "react";
import * as r from "ramda";
import InputComponent, {
  ADD_NOTE,
  cacheUpdate,
  mergeNote,
  Note
} from "./input";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { gqlClient } from "../graphqlClient";
import { feature } from "../../config";
import { DataContainer } from "../util";
import { ErrorActionContext } from "./error";
import { useEffect } from "react";
import classNames from "classnames";

export const GET_NOTES = gql`
  query getNotes {
    notes {
      uuid
      note
      done
      archived
    }
  }
`;

const NOTE_SUB = gql`
  subscription onNoteChange {
    noteChanged {
      uuid
      note
      done
      archived
    }
  }
`;

const ListComponent = () => {
  const { loading, error, data } = useQuery(GET_NOTES);
  const [addNote, { error: mutationError }] = useMutation(
    ADD_NOTE,
    cacheUpdate
  );
  const [input, setInput] = useState();
  const [search, setSearch] = useState("");
  const { addError } = useContext(ErrorActionContext);

  if (feature.realTime) {
    const sub = useSubscription(NOTE_SUB);
    if (sub.data) {
      mergeNote(gqlClient, sub.data.noteChanged);
    }
  }

  useEffect(() => {
    if (mutationError) {
      addError(mutationError.message);
    }
  }, [mutationError]);

  const edit = (note: Note) => {
    setInput(r.omit(["__typename"], note));
  };

  //
  // prettier-ignore
  const filter = () =>
    r.filter(
       (item: Note) =>
          r.includes(search.toLowerCase(), item.note.toLowerCase()),
       data.notes);

  //
  // update a note
  const update = (e: SyntheticEvent, note: Note) => {
    e.stopPropagation();
    addNote({ variables: { note: r.omit(["__typename"], note) } });
  };

  return (
    <DataContainer error={error ? error.message : undefined} loading={loading}>
      <div className="row">
        <input
          className="w-full"
          placeholder={"search"}
          value={search}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearch(event.target.value)
          }
        />
        <button onClick={() => setSearch(search)}>Search</button>
      </div>
      <hr />
      <InputComponent note={input} />
      <ul>
        {data &&
          filter().map((item: Note, i: number) =>
            item.archived
              ? null
              : [
                  <li className="row px-1" key={i} onClick={() => edit(item)}>
                    <div
                      className={classNames("w-full", "cursor-pointer", {
                        strike: item.done
                      })}>
                      {item.note}
                    </div>
                    <div
                      className="cursor-pointer px-2 text-xl"
                      onClick={e =>
                        update(e, { ...item, ...{ archived: true } })
                      }>
                      ⓧ
                    </div>
                    <div
                      className="cursor-pointer px-2 text-xl"
                      onClick={e =>
                        update(e, { ...item, ...{ done: !item.done } })
                      }>
                      ✓
                    </div>
                  </li>,
                  <hr key={`h${i}`} />
                ]
          )}
      </ul>
    </DataContainer>
  );
};

export default ListComponent;
