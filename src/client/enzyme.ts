import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import WebSocket from 'ws';

configure({ adapter: new Adapter() });

//
// provide a web socket implementation for tests
Object.assign(global, {
  WebSocket,
});
