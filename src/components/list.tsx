import * as React from "react";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import * as r from "ramda";
import { Container, Note, NoteAction, NoteInput, NoteList } from "~components/listStyles";

interface Note {
   note: string;
   done: boolean;
}

const ListComponent = () => {
   const [list, setList] = useState([{ note: 'start an app', done: false }]);
   const [input, setInput] = useState('');

   const add = ( event: KeyboardEvent ) => {
      if ( event.key === "Enter" ) {
         //
         // a tad inefficient, add and then de-dupe
         setList(
            r.uniqBy(r.prop("note"), [...list, ...[{ note: input, done: false }]])
         );
         //
         // clear input after it's added to list
         setInput('');
      }
   };

   //
   // returns a new list minus the provided note
   const remove = (note: string) =>
      setList(
         r.reject(r.propEq("note", note), list)
      );

   //
   // toggle "done" flag (represented by a strike-through style)
   const done = (note: string) =>
      setList(
         r.map((item: Note) => note === item.note ? { ...item, done: !item.done } : item, list)
      );

   return <Container>
      <NoteInput
         placeholder={"type something and press enter"}
         value={input}
         onChange={(event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
         onKeyPress={add}
      />
      <NoteList>
         {list.map((item: Note, i: number) =>
            <li key={i}>
               <Note done={item.done}> {item.note} </Note>
               <NoteAction onClick={() => remove(item.note)}>"ⓧ"</NoteAction>
               <NoteAction onClick={() => done(item.note)}>"✓"</NoteAction>
            </li>
         )}
      </NoteList>
   </Container>
};

export default ListComponent;
