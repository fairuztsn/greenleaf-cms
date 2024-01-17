import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import React, { useEffect, useState } from "react";
import { fetchDataFromSupabase } from "../../utils/data";
import { RenderCell } from "../render-cell";
import Loading from "../loading/loading";

type Column = {
  name: string
  uid: string
}

export const TableWrapper = ({ context }: { context: "users" | "menu" | "features" }) => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDataFromSupabase(context);

        setData(result.data);
        setColumns(result.columns);

        setColumns(prevColumns => {
          return [...prevColumns, { name: 'actions', uid: 'actions' }]
        });
        
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [context]);

  if (loading) {
    return <Loading/>;
  }

  if (data.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow>
              {(columnKey) => (
                <TableCell>
                  {RenderCell({ data: item, columnKey: columnKey })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
  
};
