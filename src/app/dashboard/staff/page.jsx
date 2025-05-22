"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Select from "react-select";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

import { assignUserRole, createStaff, fetchStaff, getStoresBasedOnCompany } from "./store"; // <-- now correct import (from your new store slice)
import { StoreDataTable } from "./Datatable";
import { fetchCompaniesName } from "../company/store";
import CompanyCombobox, { ComboboxDemo } from "@/components/Combobox";
import { userProfile } from "@/components/HomePage/store";

const StorePage = () => {
  const [newItemDrawerOpen, setNewItemDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyId, setCompanyId] = useState("");

  const [editingStoreId, setEditingStoreId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [logoFile, setLogoFile] = useState(null);

  const dispatch = useDispatch();
  const { staff } = useSelector((state) => state.staff);
  const { companiesName } = useSelector((state) => state.company);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCompanyOption, setSelectedCompanyOption] = useState({
    label: "",
    value: "",
  });

  const { profile, isLoggedIn } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (selectedCompanyOption?.value) {
  //     dispatch(getStoresBasedOnCompany(selectedCompanyOption.value));
  //   }
  // }, [selectedCompanyOption, dispatch]);
  

  useEffect(() => {
    dispatch(fetchCompaniesName());
    dispatch(
      userProfile((error, response) => {
        if (error) {
          showMessage(error.response.data.message, "error");
        }
      })
    );
  }, []);

  useEffect(() => {
    if (!profile?.companyId && companiesName.length > 0 && !selectedCompanyOption.value) {
      const defaultOption = companiesName.find(
        (company) => company.value === profile?.companyId
      );
      if (defaultOption) {
        setSelectedCompanyOption(defaultOption);
      }
    }
  }, [companiesName, profile, selectedCompanyOption]);
  


  useEffect(() => {
    const companyIdToFetch =
      selectedCompanyOption?.value || profile?.companyId || null;
    if (companyIdToFetch) {
      dispatch(fetchStaff(companyIdToFetch, page, limit));
    }
  }, [page, limit, dispatch, selectedCompanyOption, profile]);
  // console.log("the staff is",staff)

  const handleCreateOrUpdateStore = async () => {
    if (!name.trim()) {
      return Swal.fire("Error", "Name is required", "error");
    }

    if (!email.trim()) {
      return Swal.fire("Error", "Email is required", "error");
    }

    if (!password.trim()) {
      return Swal.fire("Error", "Password is required", "error");
    }

    if (!phoneNumber.trim()) {
      return Swal.fire("Error", "Phone number is required", "error");
    }

    const companyIdToUse = selectedOption?.value || profile?.companyId;
    if (!companyIdToUse) {
      return Swal.fire("Error", "Please select a company", "error");
    }

    const postData = {
      name,
      email,
      password,
      phoneNumber,
      companyId: companyIdToUse,
    };

    try {
      await dispatch(createStaff(postData));
      Swal.fire("Success", "Staff created successfully", "success");

      // Reset form fields
      setName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setSelectedOption(null);
      setNewItemDrawerOpen(false);
      setIsEditing(false);
      setEditingStoreId(null);

      dispatch(fetchStaff(companyIdToUse, page, limit));
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  const handleRoleChangeAndRefresh = (userId, newRole) => {
    dispatch(assignUserRole(userId, newRole)).then(() => {
      const companyIdToFetch =
        selectedCompanyOption?.value || profile?.companyId || null;
      if (companyIdToFetch) {
        dispatch(fetchStaff(companyIdToFetch, page, limit));
      }
    });
  };

  const handleEditStore = (store) => {
    // setStoreName(store.name);
    // setEditingStoreId(store._id);
    // setIsEditing(true);
    // setNewItemDrawerOpen(true);
  };

  const handleDeleteStore = async (storeId) => {
    // const confirm = await Swal.fire({
    //   title: "Are you sure?",
    //   text: "This will delete the store permanently!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#d33",
    //   cancelButtonColor: "#3085d6",
    //   confirmButtonText: "Yes, delete it!",
    // });
    // if (confirm.isConfirmed) {
    //   try {
    //     await dispatch(deleteStore(storeId));
    //     Swal.fire("Deleted!", "Store has been deleted.", "success");
    //     setIsEditing(false);
    //     setLogoFile(null);
    //     dispatch(fetchStores(page, limit));
    //   } catch (err) {
    //     Swal.fire("Error", err.message || "Something went wrong", "error");
    //   }
    // }
  };
  // console.log("The value Name is ", value);

  return (
    <div className="w-full my-4 px-8 py-3">
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-between">
          <span className="text-2xl font-semibold">Staff</span>
          {!profile?.companyId && (
            <>
              <Label htmlFor="name" className="text-lg mt-4"></Label>
              <Select
                defaultValue={selectedCompanyOption}
                onChange={setSelectedCompanyOption}
                options={companiesName}
              />
            </>
          )}
        </div>

        <Sheet open={newItemDrawerOpen} onOpenChange={setNewItemDrawerOpen}>
          <SheetTrigger asChild>
            <Button
              className="bg-sky-700 hover:bg-sky-800"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              + Add Staff
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[800px] sm:w-[640px] bg-white">
            <SheetHeader>
              <SheetTitle>{isEditing ? "Edit Staff" : "Add Staff"}</SheetTitle>
              <SheetDescription>
                {isEditing ? "Update staff details" : "Create a new staff"}
              </SheetDescription>
            </SheetHeader>

            <div className="items-center p-4">
              <Label htmlFor="name" className="text-lg mt-4">
                {" "}
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter  name"
                className="mt-2"
              />
              <Label htmlFor="email" className="text-lg mt-4">
                {" "}
                Email
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="mt-2"
              />
              <Label htmlFor="password" className="text-lg mt-4">
                Password
              </Label>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="mt-2"
              />
              <Label htmlFor="phonenumber" className="text-lg mt-4">
                Phone Number
              </Label>
              <Input
                id="phonenumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
                className="mt-2"
              />

              {!profile?.companyId && (
                <>
                  <Label htmlFor="name" className="text-lg mt-4">
                    Select Company
                  </Label>
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={companiesName}
                  />
                </>
              )}
              {isEditing && (
                <>
                  <Label htmlFor="logo" className="mt-4">
                    Store Logo
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
                <Button type="button" onClick={handleCreateOrUpdateStore}>
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <StoreDataTable
        data={staff.users || []}
        onEdit={handleEditStore}
        onDelete={handleDeleteStore}
        onRoleChange={handleRoleChangeAndRefresh}
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

          {Array.from({ length: staff?.totalPages || 1 }, (_, index) => (
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
                setPage((prev) => Math.min(prev + 1, staff?.totalPages || 1))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default StorePage;
