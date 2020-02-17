import styled from "styled-components";


export const Container = styled.div`
   margin: 20px;
   width: 60%;
`;

export const NoteInput = styled.input`
   padding: 5px;
   width: 98%;
   height: 20px;
   font-size: 16px;   
`;

export const NoteList = styled.ul`
   list-style-type: none;      
   padding: 0px;   
   li {
      border-bottom: 1px solid #eeeeee;   
      padding: 6px; 
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
