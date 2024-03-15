
import { ReactGrid, Column, Row } from "@silevis/reactgrid";

export interface IDisplayAccount {
    id: number;
    name: string;
    balance: number;
  }
  
//   const getPeople = (): IDisplayAccount[] => [
//     { name: "Thomas", surname: "Goldman" },
//     { name: "Susie", surname: "Quattro" },
//     { name: "", surname: "" }
//   ];
  
  const getColumns = (): Column[] => [
    { columnId: "id", width: 150 },
    { columnId: "name", width: 150 },
    { columnId: "balance", width: 150 }
  ];
  
  const headerRow: Row = {
    rowId: "header",
    cells: [
      { type: "header", text: "id" },
      { type: "header", text: "name" },
      { type: "header", text: "balance" }
    ]
  };