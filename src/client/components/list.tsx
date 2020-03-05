import * as React from "react";
import { ChangeEvent, SyntheticEvent, useContext, useState } from "react";
import * as r from "ramda";
import {
  ActionButton,
  HR,
  Input,
  NoteAction,
  NoteLI,
  NoteList,
  NoteText,
  Row
} from "./styles";
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
      <Row>
        <Input
          placeholder={"search"}
          value={search}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearch(event.target.value)
          }
          width={100}
        />
        <ActionButton onClick={() => setSearch(search)}>Search</ActionButton>
      </Row>
      <HR />
      <InputComponent note={input ? input : undefined} />
      <NoteList>
        {data &&
          filter().map((item: Note, i: number) =>
            item.archived ? null : (
              <NoteLI key={i} onClick={() => edit(item)}>
                <NoteText done={item.done}> {item.note} </NoteText>
                <NoteAction
                  onClick={e => update(e, { ...item, ...{ archived: true } })}>
                  ⓧ
                </NoteAction>
                <NoteAction
                  onClick={e =>
                    update(e, { ...item, ...{ done: !item.done } })
                  }>
                  ✓
                </NoteAction>
              </NoteLI>
            )
          )}
      </NoteList>
    </DataContainer>
  );
};

export default ListComponent;
