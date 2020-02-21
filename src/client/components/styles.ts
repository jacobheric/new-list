import styled from "styled-components";

export const Container = styled.div`
   max-width: 1024px;
   margin: 50px auto;
   padding: 0 25px;
`;

export const Row = styled.div`
   margin: auto;
   display: flex;
   justify-content: space-between;
   align-items: center;   
`;

export const NoteList = styled.ul`
   list-style-type: none;
   padding: 0;   
   li {
      border-bottom: 1px solid #eee;   
      margin-bottom: .5em; 
  }   
`;

export const NoteLI = styled.li`
   display: flex;
   align-items: center;
   padding: .25em;
   cursor: pointer;
`;

export const NoteAction = styled.div`
   padding: 0 .5em;
   cursor: pointer;            
`;

export const NoteText = styled.span`
   display: inline-block;
   width: 100%;
   cursor: pointer;
   text-decoration: ${(props: { done: boolean }) => props.done ? "line-through" : "none"}
`;

export const HR = styled.hr`
  margin: 10px 0;
  border: 0;
  border-top: 1px solid #eee;
`;

export const Input = styled.input`
   padding: 0 10px;
   height: 2em;
   font-size: 1.1em;  
   width: ${ props => props.width ? props.width : 80 }%; 
`;

export const ActionButton = styled.button`
   width: 120px;
   margin-left: .5em;
   border-radius: 4px;
   height: 2em;
   font-size: 1.1em;
   cursor: pointer;      
`;
