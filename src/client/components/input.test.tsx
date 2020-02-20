import * as React from 'react';
import { shallow } from 'enzyme';
import InputComponent from "./input";
import { v4 as uuid } from "uuid";
import { MockedProvider } from "@apollo/client/testing";

const testNote = { uuid: uuid(), note: "create an enzyme test", done: false, archived: false };

describe('note input', () => {
   const input = shallow(
      <MockedProvider>
         <InputComponent note={testNote} />
      </MockedProvider>);

   //
   // TODO: real tests
   it('should exist', () => {
      expect(input.find(InputComponent).length).toEqual(1);
   });
});
