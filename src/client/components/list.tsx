import * as React from "react";
import { useState } from "react";
import * as r from "ramda";
import { Container, NoteAction, NoteList, NoteSpan } from "./styles";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import InputComponent, { ADD_NOTE, cacheUpdate, Note } from "./input";

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

const ListComponent = () => {
   const { loading, error, data } = useQuery(GET_NOTES);
   const [addNote] = useMutation(ADD_NOTE, cacheUpdate);
   const [input, setInput] = useState();

   const edit = (note: Note) => {
      setInput(r.omit(['__typename'], note));
   };

   //
   // update a note
   const update = (note: Note) => addNote({ variables: { note: r.omit(['__typename'], note) } });

   if (loading) {
      return <Container>Loading...</Container>;
   }

   if (error) {
      return <Container>Error retrieving data</Container>;
   }

   return <Container>
      <InputComponent note={ input ? input : undefined }/>
      <NoteList>
         {data.notes.map((item: Note, i: number) =>
            item.archived ? null : <li key={i}>
               <NoteSpan done={item.done} onClick={() => edit(item)}> {item.note} </NoteSpan>
               <NoteAction onClick={() => update({ ...item, ...{ archived: true } })}>ⓧ</NoteAction>
               <NoteAction onClick={() => update({ ...item, ...{ done: !item.done } })}>✓</NoteAction>
            </li>
         )}
      </NoteList>
   </Container>
};

export default ListComponent;
