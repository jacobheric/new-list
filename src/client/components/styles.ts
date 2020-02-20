import styled from "styled-components";


export const Container = styled.div`
   margin: 20px;
   width: 60%;
`;

export const NoteInput = styled.input`
   padding: 0 10px 0 10px;
   width: 98%;
   height: 2em;
   font-size: 1.25em;   
`;

export const NoteList = styled.ul`
   list-style-type: none;      
   padding: 0 0 0 5px;   
   li {
      border-bottom: 1px solid #eeeeee;   
      padding: 6px;
      margin-bottom: 6px; 
  }   
`;

export const NoteAction = styled.div`
   float: right;
   cursor: pointer;    
   padding-left: 10px;          
`;

export const NoteSpan = styled.span`
   cursor: pointer;
   text-decoration: ${(props: { done: boolean }) => props.done ? "line-through" : "none"}
`;
