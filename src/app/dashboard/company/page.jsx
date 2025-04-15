"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { DataTableDemo } from "@/components/Table/DataTable";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const CompanyPage = () => {
  const [newItemDrawerOpen, setNewItemDrawerOpen] = useState(false);

  return (
    <div className="w-full my-4 px-8 py-3">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-semibold">Company</span>

        <div className="flex  justify-between items-center  gap-2">
          <Input
            placeholder="Filter invoices..."
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Sheet open={newItemDrawerOpen} onOpenChange={setNewItemDrawerOpen}>
            <SheetTrigger asChild>
              <Button className="bg-sky-700 hover:bg-sky-800">
                + Add Company{" "}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[800px] sm:w-[640px] bg-white ">
              <SheetHeader className="">
                <SheetTitle>Add Company</SheetTitle>
                <SheetDescription>Create a new company </SheetDescription>
              </SheetHeader>

              <div className=" items-center p-4 ">
                <Label htmlFor="name" className="">
                  Company Name
                </Label>
                <Input id="name" defaultValue="Pedro Duarte" className="mt-2" />
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <DataTableDemo data={invoices} />

      <Pagination className="ml-auto mt-4">
        <PaginationContent className="ml-auto">
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CompanyPage;
