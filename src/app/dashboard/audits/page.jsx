"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Select from "react-select";

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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { DataTableDemo } from "@/components/Table/DataTable";

import {
  createCompany,
  fetchCompanies,
  updateCompany,
  deleteCompany,
  updateCompanyLogo,
} from "./store"; // <-- make sure update and delete actions exist
import { fetchStoreName } from "../stores/store";

const AuditPage = () => {
  const [newItemDrawerOpen, setNewItemDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // <-- new
  const [companyName, setCompanyName] = useState("");
  const [editingCompanyId, setEditingCompanyId] = useState(null); // <-- new
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.company);
  const { storesName } = useSelector((state) => state.store);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [logoFile, setLogoFile] = useState(null);
  const [changingLogoCompanyId, setChangingLogoCompanyId] = useState(null);
  useEffect(() => {
    dispatch(fetchStoreName());
    dispatch(fetchCompanies(page, limit));
  }, [page, limit, dispatch]);

  const handleCreateOrUpdateCompany = async () => {
    if (!companyName.trim()) {
      return Swal.fire("Error", "Company name is required", "error");
    }

    try {
      if (isEditing && editingCompanyId) {
        await dispatch(updateCompany(editingCompanyId, { name: companyName })); // corrected
        await dispatch(updateCompanyLogo(editingCompanyId, logoFile));
        setLogoFile(null);

        Swal.fire("Success", "Company updated successfully", "success");

        // Swal.fire("Success", "Logo updated successfully", "success");
      } else {
        await dispatch(createCompany({ name: companyName }));
        Swal.fire("Success", "Company created successfully", "success");
      }
      setCompanyName("");
      setNewItemDrawerOpen(false);
      setIsEditing(false);
      setEditingCompanyId(null);
      dispatch(fetchCompanies(page, limit)); // refresh
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  const handleEditCompany = (company) => {
    setCompanyName(company.name);
    setEditingCompanyId(company._id);
    setIsEditing(true);
    setNewItemDrawerOpen(true);
  };

  const handleDeleteCompany = async (companyId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the company permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await dispatch(deleteCompany(companyId));
        Swal.fire("Deleted!", "Company has been deleted.", "success");
        setIsEditing(false);
        setLogoFile(null);
        dispatch(fetchCompanies(page - 1, limit)); // refresh
      } catch (err) {
        Swal.fire("Error", err.message || "Something went wrong", "error");
      }
    }
  };

  return (
    <div className="w-full my-4 px-8 py-3">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-semibold">Audit Questions</span>

        <Sheet open={newItemDrawerOpen} onOpenChange={setNewItemDrawerOpen}>
          <SheetTrigger asChild>
            <Button
              className="bg-sky-700 hover:bg-sky-800"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              + Create Questions
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[800px] sm:w-[640px] bg-white">
            <SheetHeader>
              <SheetTitle>
                {isEditing ? "Edit Questions" : "Create Questions"}
              </SheetTitle>
              <SheetDescription>
                {isEditing
                  ? "Update audit questions"
                  : "Create a new audit questions"}
              </SheetDescription>
            </SheetHeader>

            <div className="items-center p-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                className="mt-2"
              />

              <Label htmlFor="name" className="text-lg mt-4">
                Select Store
              </Label>
              <Select
                // defaultValue={selectedOption}
                // onChange={setSelectedOption}
                // options={companiesName}
                // value={selectedOption}
                // onChange={setSelectedOption}
                options={storesName}
              />

              {isEditing && (
                <>
                  <Label htmlFor="logo" className="mt-4">
                    Company Logo
                  </Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogoFile(e.target.files[0])}
                    className="border p-2 w-full mt-2"
                  />
                  {logoFile && (
                    <p className="text-sm text-gray-500 mt-2">
                      Selected: {logoFile.name}
                    </p>
                  )}
                </>
              )}
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" onClick={handleCreateOrUpdateCompany}>
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <DataTableDemo
        data={companies?.companies || []}
        onEdit={handleEditCompany}
        onDelete={handleDeleteCompany}
      />

      {/* Pagination */}
      <Pagination className="mt-4">
        <PaginationContent className="ml-auto">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            />
          </PaginationItem>

          {Array.from({ length: companies?.totalPages || 1 }, (_, index) => (
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
                setPage((prev) =>
                  Math.min(prev + 1, companies?.totalPages || 1)
                )
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AuditPage;
