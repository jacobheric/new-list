import * as React from "react";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import * as r from "ramda";
import { Container, Note, NoteAction, NoteInput, NoteList } from "./listStyles";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { v4 as uuid } from 'uuid';


interface Note {
   uuid: string;
   note: string;
   done: boolean;
   archived: boolean;
}

const GET_NOTES = gql`
   query getNotes {
      notes {
         uuid
         note
         done
         archived 
      } 
   }
`;
const newNote = () => ({ uuid: uuid(), note: "", done: false, archived: false });

const ListComponent = () => {
   const { loading, error, data } = useQuery(GET_NOTES);
   const [list, setList] = useState<Note[]>([]);
   const [input, setInput] = useState<Note>(newNote());

   useEffect(() => {
      if (data ) {
         setList(data.notes)
      }
   }, [data])

   const add = ( event: KeyboardEvent ) => {
      if ( event.key !== "Enter" ) {
         return
      }
      //
      // Dedupe non-archived by taking a union based on note value
      // TODO: de-dupe will need to get smarter for rich content (hash?)
      setList(r.unionWith(r.eqProps('note'),
         r.filter(note => !note.archived, list), [input]));
      //
      // clear input
      setInput(newNote());
   };

   const edit = (note: Note) => {
      setList(r.reject(r.propEq('id', note.uuid), list));
      setInput(note);
   }

   //
   // update a note
   const update = (note: Note) =>
      setList(
         r.map((item: Note) => note.uuid === item.uuid ? note : item, list)
      );

   if (loading) {
      return <Container>Loading...</Container>;
   }

   if (error) {
      return <Container>Error retrieving data</Container>;
   }

   return <Container>
      <NoteInput
         placeholder={"type something and press enter"}
         value={input.note}
         onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setInput({ ...input, ...{ note: event.target.value }})}
         onKeyPress={add}
      />
      <NoteList>
         {list.map((item: Note, i: number) =>
            item.archived ? null : <li key={i}>
               <Note done={item.done} onClick={() => edit(item)}> {item.note} </Note>
               <NoteAction onClick={() => update({ ...item, ...{ archived: true } })}>ⓧ</NoteAction>
               <NoteAction onClick={() => update({ ...item, ...{ done: !item.done } })}>✓</NoteAction>
            </li>
         )}
      </NoteList>
   </Container>
};

export default ListComponent;
