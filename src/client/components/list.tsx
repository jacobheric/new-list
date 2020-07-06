import * as React from "react";
import { ChangeEvent, useState } from "react";
import * as r from "ramda";
import InputComponent, { cacheUpdate, mergeNote, Note } from "./input";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { gqlClient } from "../graphqlClient";
import { feature } from "../../config";
import { DataContainer } from "../util";
import ItemComponent from "./item";

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
  const [input, setInput] = useState<Note>();
  const [search, setSearch] = useState("");

  if (feature.realTime) {
    const sub = useSubscription(NOTE_SUB);
    if (sub.data) {
      mergeNote(gqlClient, sub.data.noteChanged);
    }
  }

  //
  // prettier-ignore
  const filter = () =>
    r.filter(
       (item: Note) =>
          r.includes(search.toLowerCase(), item.note.toLowerCase()),
       data.notes);

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
          filter().map((item: Note) =>
            item.archived ? null : (
              <ItemComponent item={item} setInput={setInput} />
            )
          )}
      </ul>
    </DataContainer>
  );
};

export default ListComponent;
