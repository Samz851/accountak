import { IAccount } from "@/interfaces";
import { ReactGrid, Column, Row } from "@silevis/reactgrid";

// export interface IDisplayAccount {
//     id: number;
//     name: string;
//     balance: number;
//   }
  
//   const getPeople = (): IDisplayAccount[] => [
//     { name: "Thomas", surname: "Goldman" },
//     { name: "Susie", surname: "Quattro" },
//     { name: "", surname: "" }
//   ];
  
  export const getColumns = (): Column[] => [
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

export const getRows = (displayAccounts: IAccount[]): Row[] => [
    headerRow, 
    ...displayAccounts.map<Row>((account, idx) => ({
        rowId: idx,
        cells: [
            {type: 'text', text: account.code},
            {type: 'text', text: account.account_name},
            {type: 'text', text: account.balance.toLocaleString('en-US', {style: 'currency', currency: 'EGP' })}
        ]
    }))
]