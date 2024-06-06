import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CookingPot, Moon, Sun } from "lucide-react";

export type TableData = {
  id: number;
  time: string;
  position: "south" | "north" | "east" | "west";
  action: string;
};
interface Props {
  data: TableData[];
  resetHistory: () => void;
}

const History = ({ data, resetHistory }: Props) => {
  return (
    <div className="w-full flex flex-col items-center h-full p-2">
      <div className="flex justify-between w-full items-center gap-3 px-6">
        <p className="font-semibold">History</p>
        <Button variant="ghost" size="icon" onClick={resetHistory}>
          <CookingPot className="h-[1rem] w-[1rem]" />
        </Button>
      </div>
      <hr className="border-gray-300 dark:border-neutral-800 w-full mb-6 mt-2" />
      <ScrollArea className="h-[46rem] w-full rounded-md border py-2 px-1">
        <Table>
          <TableCaption>A list of your recent changes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Side</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No data available! click on any traffic light
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.position}</TableCell>

                  <TableCell className="text-right">{item.action}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell colSpan={3} className="text-right">
                {data.length} records
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default History;
