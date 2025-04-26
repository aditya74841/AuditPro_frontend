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
import { useDispatch, useSelector } from "react-redux";
import { createCompany, fetchCompanies } from "./store";

const CompanyPage = () => {
  const [newItemDrawerOpen, setNewItemDrawerOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();
  const { companies, error } = useSelector((state) => state.company);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  console.log("The company is ", companies.companies);

  useEffect(() => {
    dispatch(fetchCompanies(page, limit));
  }, [page, limit, dispatch]);

  const handleCreateCompany = async () => {
    if (!companyName.trim()) {
      return Swal.fire("Error", "Company name is required", "error");
    }

    try {
      await dispatch(createCompany({ name: companyName }));

      Swal.fire("Success", "Company created successfully", "success");
      setCompanyName(""); // clear input
      setNewItemDrawerOpen(false); // close drawer
      dispatch(fetchCompanies()); // refresh list
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  // console.log("The Company is ", companies);
  return (
    <div className="w-full my-4 px-8 py-3">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-semibold">Company</span>

        <div className="flex  justify-between items-center  gap-2">
          {/* <Input
            placeholder="Filter invoices..."
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          /> */}
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
                <Input
                  id="name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                  className="mt-2"
                />
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="button" onClick={handleCreateCompany}>
                    Save changes
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <DataTableDemo data={companies.companies || []} />

      <Pagination className="ml-auto mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            />
          </PaginationItem>

          {/* Show page numbers */}
          {Array.from({ length: companies.totalPages || 1 }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={page === index + 1}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, companies.totalPages || 1))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CompanyPage;
