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

type Props = {};

export const History = (props: Props) => {
  const dummyHistory = [
    {
      id: 1,
      time: "10:10:10",
      side: "south",
      action: "go (green)",
    },

    {
      id: 2,
      time: "10:10:10",
      side: "east",

      action: "slow (yellow)",
    },
    {
      id: 3,
      time: "10:10:11",
      side: "west",
      action: "stop (red)",
    },
    {
      id: 4,
      side: "north",
      time: "10:10:15",
      action: "slow (yellow)",
    },
    {
      id: 5,
      time: "10:10:10",
      side: "north",
      action: "stop (red)",
    },
  ];
  return (
    <div className="w-full flex flex-col items-center ">
      <p className="font-semibold">history</p>
      <hr className="border-gray-300 dark:border-neutral-800 w-full my-3" />
      <Table className="h-8">
        <TableCaption>A list of your recent changes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {dummyHistory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell className="text-right">{item.action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell colSpan={2} className="text-right">
              2,500.00 records
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
