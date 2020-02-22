import { v4 as uuid } from "uuid";
import * as React from "react";
import {
  ChangeEvent,
  FunctionComponent,
  KeyboardEvent,
  useEffect,
  useState
} from "react";
import * as r from "ramda";
import { ActionButton, Input, Row } from "./styles";
import { GET_NOTES } from "./list";
import gql from "graphql-tag";
import { ApolloClient, useMutation, useQuery } from "@apollo/client";

export interface Note {
  uuid: string;
  note: string;
  done: boolean;
  archived: boolean;
}

export const ADD_NOTE = gql`
  mutation AddNote($note: NoteI!) {
    addNote(note: $note) {
      uuid
      note
      done
      archived
    }
  }
`;

export const mergeNote = (store: ApolloClient<any>, note: Note) => {
  const { notes } = store.readQuery<{ notes: Note[] }>({
    query: GET_NOTES
  }) || { notes: [] };

  const index = r.findIndex(r.propEq("uuid", note.uuid), notes);
  //
  // replace or add
  store.writeQuery({
    query: GET_NOTES,
    data: {
      notes: index > -1 ? r.update(index, note, notes) : notes.concat(note)
    }
  });
};

//
// TODO: type this properly
export const cacheUpdate = {
  update(cache: any, { data: { addNote } }: any) {
    mergeNote(cache, addNote);
  }
};

const newNote = (note?: Note) =>
  note ? note : { uuid: uuid(), note: "", done: false, archived: false };

const InputComponent: FunctionComponent<{ note?: Note }> = ({ note }) => {
  const { data } = useQuery(GET_NOTES);
  const [input, setInput] = useState<Note>(newNote(note));
  const [addNote] = useMutation(ADD_NOTE, cacheUpdate);

  //
  // clicking on a note in the parent (list) component populates the input here,
  // a bit of an anti-pattern
  useEffect(() => {
    if (note) {
      setInput(note);
    }
  }, [note]);

  const add = () => {
    //
    // Dedupe non-archived by note value
    const dupe = r.find(
      r.allPass([r.propEq("archived", false), r.propEq("note", input.note)]),
      data.notes
    );

    if (input.note && !dupe) {
      addNote({ variables: { note: input } });
    }
    //
    // clear input
    setInput(newNote());
  };

  const keyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      add();
    }
  };

  return (
    <Row>
      <Input
        placeholder={"add"}
        value={input.note}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setInput({ ...input, ...{ note: event.target.value } })
        }
        onKeyPress={keyPress}
        width={100}
      />
      <ActionButton onClick={() => add()}>Add</ActionButton>
    </Row>
  );
};

export default InputComponent;
