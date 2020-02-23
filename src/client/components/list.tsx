import * as React from "react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import * as r from "ramda";
import { Container, HR, Input, NoteAction, NoteLI, NoteList, NoteText, Row } from "./styles";
import InputComponent, { ADD_NOTE, cacheUpdate, mergeNote, Note } from "./input";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { gqlClient } from "../graphqlClient";
import { feature } from "../../config";

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
  const [addNote] = useMutation(ADD_NOTE, cacheUpdate);
  const [input, setInput] = useState();
  const [search, setSearch] = useState("");

  if (feature.realTime) {
    const sub = useSubscription(NOTE_SUB);
    if (sub.data) {
      mergeNote(gqlClient, sub.data.noteChanged);
    }
  }

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

  if (loading) {
    return <Row>Loading...</Row>;
  }

  if (error) {
    return <Row>Error retrieving data</Row>;
  }

  return (
    <Container>
      <Row>
        <Input
          placeholder={"search"}
          value={search}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
          width={100}
        />
      </Row>
      <HR />
      <InputComponent note={input ? input : undefined} />
      <NoteList>
        {filter().map((item: Note, i: number) =>
          item.archived ? null : (
            <NoteLI key={i} onClick={() => edit(item)}>
              <NoteText done={item.done}> {item.note} </NoteText>
              <NoteAction onClick={e => update(e, { ...item, ...{ archived: true } })}>
                ⓧ
              </NoteAction>
              <NoteAction onClick={e => update(e, { ...item, ...{ done: !item.done } })}>
                ✓
              </NoteAction>
            </NoteLI>
          )
        )}
      </NoteList>
    </Container>
  );
};

export default ListComponent;
