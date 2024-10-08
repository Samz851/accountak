import React, { useState, useRef, useMemo } from 'react';
import Spreadsheet, { CellBase, createEmptyMatrix } from "react-spreadsheet";// import StarterKit from '@tiptap/starter-kit'
import { CreateVariable } from './createVariables';

// const extensions = [
//     StarterKit,
//   ]
  
// const content = '<p>Hello World!</p>'

export const StatementBuilder = () => {
    const empty = createEmptyMatrix<CellBase>(10, 10)
    const onChange = d => {
        console.log(d);
        console.log(d[1][1].evaluatedData);
    }
    const data = [
        [{ value: "Vanilla" }, { value: "Chocolate" }, { value: "Vanilla" }, { value: "Chocolate" }],
        [{ value: "Strawberry" }, { value: "Cookies" }, { value: "Vanilla" }, { value: "Chocolate" }],
        [{ value: "Vanilla" }, { value: "Chocolate" }, { value: "Vanilla" }, { value: "Chocolate" }],
        [{ value: "Strawberry" }, { value: "Cookies" }, { value: "Vanilla" }, { value: "Chocolate" }],
      ];


	return (
        <div>
        <CreateVariable/>
		<Spreadsheet data={empty} onChange={onChange}/>
        </div>
	);
};