import { gql } from "apollo-boost";
import { v4 as uuid } from "uuid";
import { useMutation, useQuery } from "@apollo/react-hooks";
import * as React from "react";
import { ChangeEvent, FunctionComponent, KeyboardEvent, useEffect, useState } from "react";
import * as r from "ramda";
import { NoteInput } from "./styles";
import { GET_NOTES } from "./list";

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

//
// TODO: type this properly
export const cacheUpdate = {
   update(cache: any, { data: { addNote } }: any) {
      const { notes } = cache.readQuery({ query: GET_NOTES });
      const index = r.findIndex(r.propEq("uuid", addNote.uuid), notes);
      //
      // replace or add
      cache.writeQuery({
         query: GET_NOTES,
         data: { notes: index > -1 ? r.update(index, addNote, notes): notes.concat(addNote) },
      });
   }
};

const newNote = (note?: Note) => note ? note :
      ({ uuid: uuid(), note: "", done: false, archived: false });

const InputComponent: FunctionComponent<{ note?: Note}> = ({ note }) => {
   const { data } = useQuery(GET_NOTES);
   const [input, setInput] = useState<Note>(newNote(note));
   const [addNote] = useMutation(ADD_NOTE, cacheUpdate);

   //
   // clicking on a note in the parent (list) component populates the input here,
   // a bit of an anti-pattern
   useEffect(() => {
      if (note ) {
         setInput(note)
      }
   }, [note])

   const keyPress = ( event: KeyboardEvent ) => {
      if ( event.key === "Enter" ) {
         add();
      }
   };

   const add = () => {
      //
      // Dedupe non-archived by note value
      // TODO: this will need to get smarter for rich content (hash?)
      const dupe = r.find(
         r.allPass([r.propEq('archived', false), r.propEq('note', input.note)]),
         data.notes);

      if (!dupe) {
         addNote({ variables: { note: input } });
      }
      //
      // clear input
      setInput(newNote());
   };

   return <NoteInput
      placeholder={"type something and press enter"}
      value={input.note}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
         setInput({ ...input, ...{ note: event.target.value } })}
      onKeyPress={keyPress}
   />
};

export default InputComponent;
