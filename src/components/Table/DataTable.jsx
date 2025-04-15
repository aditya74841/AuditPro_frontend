// "use client";

// import * as React from "react";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ];

// export function DataTableDemo() {
//   return (
//     <div className="w-full">
//       <div className="flex items-center py-4">
//         <Input
//           placeholder="Filter emails..."
//           //   value={table.getColumn("email")?.getFilterValue() ?? ""}
//           //   onChange={(event) =>
//           //     table.getColumn("email")?.setFilterValue(event.target.value)
//           //   }
//           className="max-w-sm"
//         />
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[100px]">Invoice</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Method</TableHead>
//               <TableHead className="text-right">Amount</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {invoices.map((invoice) => (
//               <TableRow key={invoice.invoice}>
//                 <TableCell className="font-medium">{invoice.invoice}</TableCell>
//                 <TableCell>{invoice.paymentStatus}</TableCell>
//                 <TableCell>{invoice.paymentMethod}</TableCell>
//                 <TableCell className="text-right">
//                   {invoice.totalAmount}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <Pagination className="ml-auto  mt-4">
//         <PaginationContent className="ml-auto bg-grey-200">
//           <PaginationItem>
//             <PaginationPrevious href="#" />
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink href="#">1</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink href="#" isActive>
//               2
//             </PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink href="#">3</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationEllipsis />
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationNext href="#" />
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>
//     </div>
//   );
// }

"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";

export function DataTableDemo({ data }) {
  const [search, setSearch] = React.useState("");

  const filteredData = data.filter((item) =>
    item.invoice.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* <div className="flex items-center py-4">
        <Input
          placeholder="Filter invoices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div> */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
