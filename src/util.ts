import * as React from "react";

export const tag = (msg: string, val: any) => {
   console.log(msg, val);
   return val;
}

export const dom = React.createElement;

