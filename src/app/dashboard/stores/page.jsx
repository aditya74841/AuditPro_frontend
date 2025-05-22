// "use client";

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import Select from "react-select";

// import { Check, ChevronsUpDown } from "lucide-react";

// import { cn } from "@/lib/utils";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// import {
//   createStore,
//   fetchStores,
//   updateStore,
//   deleteStore,
//   updateStoreLogo,
//   getStoresBasedOnCompany,
// } from "./store"; // <-- now correct import (from your new store slice)
// import { StoreDataTable } from "./Datatable";
// import { fetchCompaniesName } from "../company/store";
// import CompanyCombobox, { ComboboxDemo } from "@/components/Combobox";
// import { userProfile } from "@/components/HomePage/store";

// const StorePage = () => {
//   const [newItemDrawerOpen, setNewItemDrawerOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [storeName, setStoreName] = useState("");
//   const [editingStoreId, setEditingStoreId] = useState(null);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(5);
//   const [logoFile, setLogoFile] = useState(null);

//   const dispatch = useDispatch();
//   const { stores } = useSelector((state) => state.store);
//   const { companiesName } = useSelector((state) => state.company);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedCompanyOption, setSelectedCompanyOption] = useState({
//     label: "",
//     value: "",
//   });
//   const { profile, isLoggedIn } = useSelector((state) => state.auth);

//   // console.log("the selectedOption is ", selectedOption);

//   useEffect(() => {
//     dispatch(fetchCompaniesName());
//     dispatch(
//       userProfile((error, response) => {
//         if (error) {
//           showMessage(error.response.data.message, "error");
//         }
//       })
//     );
//   }, []);

//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState("");
//   const [companyData, setCompanyData] = useState([]);

//   // useEffect(() => {
//   //   // dispatch(fetchStores(page, limit));
//   //   dispatch(getStoresBasedOnCompany(companyId, page, limit));
//   // }, [page, limit, dispatch]);

//   useEffect(() => {
//     if (
//       !profile?.companyId &&
//       companiesName.length > 0 &&
//       !selectedCompanyOption.value
//     ) {
//       const defaultOption = companiesName.find(
//         (company) => company.value === profile?.companyId
//       );
//       if (defaultOption) {
//         setSelectedCompanyOption(defaultOption);
//       }
//     }
//   }, [companiesName, profile, selectedCompanyOption]);

//     useEffect(() => {
//     const companyIdToFetch =
//       selectedCompanyOption?.value || profile?.companyId || null;
//     if (companyIdToFetch) {
//       dispatch(getStoresBasedOnCompany(companyIdToFetch, page, limit));
//     }
//   }, [page, limit, dispatch, selectedCompanyOption, profile]);
//   const handleCreateOrUpdateStore = async () => {
//     if (!storeName.trim()) {
//       return Swal.fire("Error", "Store name is required", "error");
//     }

//     try {
//       if (isEditing && editingStoreId) {
//         console.log("the Editing Id is ", editingStoreId);
//         await dispatch(
//           updateStore(editingStoreId, {
//             name: storeName,
//             company: selectedOption.value,
//           })
//         );
//         if (logoFile) {
//           await dispatch(updateStoreLogo(editingStoreId, logoFile));
//           setLogoFile(null);
//         }
//         Swal.fire("Success", "Store updated successfully", "success");
//       } else {
//         console.log("checking");
//         await dispatch(
//           createStore({ name: storeName, company: selectedOption.value })
//         );
//         Swal.fire("Success", "Store created successfully", "success");
//       }
//       setStoreName("");
//       setNewItemDrawerOpen(false);
//       setIsEditing(false);
//       setEditingStoreId(null);
//       dispatch(fetchStores(page, limit));
//     } catch (err) {
//       Swal.fire("Error", err.message || "Something went wrong", "error");
//     }
//   };

//   const handleEditStore = (store) => {
//     setStoreName(store.name);
//     setEditingStoreId(store._id);
//     setIsEditing(true);
//     setNewItemDrawerOpen(true);
//   };

//   const handleDeleteStore = async (storeId) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This will delete the store permanently!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await dispatch(deleteStore(storeId));
//         Swal.fire("Deleted!", "Store has been deleted.", "success");
//         setIsEditing(false);
//         setLogoFile(null);
//         // dispatch(fetchStores(page, limit));
//       } catch (err) {
//         Swal.fire("Error", err.message || "Something went wrong", "error");
//       }
//     }
//   };
//   // console.log("The value Name is ", value);

//   return (
//     <div className="w-full my-4 px-8 py-3">
//       <div className="flex justify-between items-center mb-4  w-full">
//         <div className="flex w-1/2">
//           <span className="text-2xl font-semibold">Store</span>
//           {!profile?.companyId && (
//             <>
//               <Label htmlFor="name" className="text-lg mt-4"></Label>
//               <Select
//                 defaultValue={selectedCompanyOption}
//                 onChange={setSelectedCompanyOption}
//                 options={companiesName}
//                 className="ml-4"
//               />
//             </>
//           )}
//         </div>

//         <Sheet open={newItemDrawerOpen} onOpenChange={setNewItemDrawerOpen}>
//           <SheetTrigger asChild>
//             <Button
//               className="bg-sky-700 hover:bg-sky-800"
//               onClick={() => {
//                 setIsEditing(false);
//               }}
//             >
//               + Add Store
//             </Button>
//           </SheetTrigger>
//           <SheetContent className="w-[800px] sm:w-[640px] bg-white">
//             <SheetHeader>
//               <SheetTitle>{isEditing ? "Edit Store" : "Add Store"}</SheetTitle>
//               <SheetDescription>
//                 {isEditing ? "Update store details" : "Create a new store"}
//               </SheetDescription>
//             </SheetHeader>

//             <div className="items-center p-4">
//               <Label htmlFor="name">Store Name</Label>
//               <Input
//                 id="name"
//                 value={storeName}
//                 onChange={(e) => setStoreName(e.target.value)}
//                 placeholder="Enter store name"
//                 className="mt-2"
//               />
//               {/* //Popover section */}
//               <Label htmlFor="name" className="text-lg mt-4">
//                 Select Company
//               </Label>

//               <Select
//                 defaultValue={selectedOption}
//                 onChange={setSelectedOption}
//                 options={companiesName}
//               />
//               {isEditing && (
//                 <>
//                   <Label htmlFor="logo" className="mt-4">
//                     Store Logo
//                   </Label>
//                   <Input
//                     id="logo"
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setLogoFile(e.target.files[0])}
//                     className="border p-2 w-full mt-2"
//                   />
//                   {logoFile && (
//                     <p className="text-sm text-gray-500 mt-2">
//                       Selected: {logoFile.name}
//                     </p>
//                   )}
//                 </>
//               )}
//             </div>

//             <SheetFooter>
//               <SheetClose asChild>
//                 <Button type="button" onClick={handleCreateOrUpdateStore}>
//                   Save changes
//                 </Button>
//               </SheetClose>
//             </SheetFooter>
//           </SheetContent>
//         </Sheet>
//       </div>

//       <StoreDataTable
//         data={stores?.stores || []}
//         onEdit={handleEditStore}
//         onDelete={handleDeleteStore}
//       />

//       {/* Pagination */}
//       <Pagination className="mt-4">
//         <PaginationContent className="ml-auto">
//           <PaginationItem>
//             <PaginationPrevious
//               href="#"
//               onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//             />
//           </PaginationItem>

//           {Array.from({ length: stores?.totalPages || 1 }, (_, index) => (
//             <PaginationItem key={index}>
//               <PaginationLink
//                 href="#"
//                 isActive={page === index + 1}
//                 onClick={() => setPage(index + 1)}
//               >
//                 {index + 1}
//               </PaginationLink>
//             </PaginationItem>
//           ))}

//           <PaginationItem>
//             <PaginationNext
//               href="#"
//               onClick={() =>
//                 setPage((prev) => Math.min(prev + 1, stores?.totalPages || 1))
//               }
//             />
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>
//     </div>
//   );
// };

// export default StorePage;

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

import {
  createStore,
  fetchStores,
  updateStore,
  deleteStore,
  updateStoreLogo,
  getStoresBasedOnCompany,
} from "./store";
import { StoreDataTable } from "./Datatable";
import { fetchCompaniesName } from "../company/store";
import { userProfile } from "@/components/HomePage/store";

const StorePage = () => {
  const [newItemDrawerOpen, setNewItemDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [editingStoreId, setEditingStoreId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [logoFile, setLogoFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCompanyOption, setSelectedCompanyOption] = useState({
    label: "",
    value: "",
  });
  const [isRefresh, setIsRefresh] = useState(false);

  const dispatch = useDispatch();
  const { stores } = useSelector((state) => state.store);
  const { companiesName } = useSelector((state) => state.company);
  const { profile } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCompaniesName());
    dispatch(
      userProfile((error, response) => {
        if (error) {
          Swal.fire("Error", error.response.data.message, "error");
        }
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (
      !profile?.companyId &&
      companiesName.length > 0 &&
      !selectedCompanyOption.value
    ) {
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
      dispatch(getStoresBasedOnCompany(companyIdToFetch, page, limit));
    }
  }, [page, limit, dispatch, selectedCompanyOption, profile, isRefresh]);

  const handleCreateOrUpdateStore = async () => {
    if (!storeName.trim()) {
      return Swal.fire("Error", "Store name is required", "error");
    }

    try {
      if (isEditing && editingStoreId) {
        await dispatch(
          updateStore(editingStoreId, {
            name: storeName,
            company: selectedOption.value,
          })
        );
        if (logoFile) {
          await dispatch(updateStoreLogo(editingStoreId, logoFile));
          setLogoFile(null);
        }
        Swal.fire("Success", "Store updated successfully", "success");
      } else {
        await dispatch(
          createStore({ name: storeName, company: selectedOption.value })
        );
        Swal.fire("Success", "Store created successfully", "success");
      }
      setStoreName("");
      setNewItemDrawerOpen(false);
      setIsEditing(false);
      setEditingStoreId(null);
      setIsRefresh((prev) => !prev);
      // dispatch(fetchStores(page, limit));
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  // const handleEditStore = (store) => {
  //   setStoreName(store.name);
  //   setEditingStoreId(store._id);
  //   setIsEditing(true);
  //   setNewItemDrawerOpen(true);
  // };
  const handleEditStore = (store) => {
    setStoreName(store.name);
    setEditingStoreId(store._id);
    setIsEditing(true);
    setNewItemDrawerOpen(true);

    // Make sure to find the exact option object from companiesName
    const matchedCompany = companiesName.find(
      (company) =>
        company.value === store.company || company.value === store.company?._id
    );
    if (matchedCompany) {
      setSelectedOption({
        label: matchedCompany.label,
        value: matchedCompany.value,
      });
    } else {
      setSelectedOption(null);
    }
  };

  const handleDeleteStore = async (storeId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the store permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await dispatch(deleteStore(storeId));
        Swal.fire("Deleted!", "Store has been deleted.", "success");
        setIsEditing(false);
        setLogoFile(null);
      } catch (err) {
        Swal.fire("Error", err.message || "Something went wrong", "error");
      }
    }
  };

  return (
    <div className="w-full my-4 px-8 py-3">
      <div className="flex justify-between items-center mb-4 w-full">
        <div className="flex w-1/2">
          <span className="text-2xl font-semibold">Store</span>
          {!profile?.companyId && (
            <Select
              defaultValue={selectedCompanyOption}
              onChange={setSelectedCompanyOption}
              options={companiesName}
              className="ml-4"
            />
          )}
        </div>

        <Sheet open={newItemDrawerOpen} onOpenChange={setNewItemDrawerOpen}>
          <SheetTrigger asChild>
            <Button
              className="bg-sky-700 hover:bg-sky-800"
              onClick={() => setIsEditing(false)}
            >
              + Add Store
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[800px] sm:w-[640px] bg-white">
            <SheetHeader>
              <SheetTitle>{isEditing ? "Edit Store" : "Add Store"}</SheetTitle>
              <SheetDescription>
                {isEditing ? "Update store details" : "Create a new store"}
              </SheetDescription>
            </SheetHeader>

            <div className="items-center p-4">
              <Label htmlFor="name">Store Name</Label>
              <Input
                id="name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Enter store name"
                className="mt-2"
              />

              <Label htmlFor="name" className="text-lg mt-4">
                Select Company
              </Label>
              <Select
                // defaultValue={selectedOption}
                // onChange={setSelectedOption}
                // options={companiesName}
                value={selectedOption}
                onChange={setSelectedOption}
                options={companiesName}
              />

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
        data={stores?.stores || []}
        onEdit={handleEditStore}
        onDelete={handleDeleteStore}
      />

      <Pagination className="mt-4">
        <PaginationContent className="ml-auto">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            />
          </PaginationItem>

          {Array.from({ length: stores?.totalPages || 1 }, (_, index) => (
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
                setPage((prev) => Math.min(prev + 1, stores?.totalPages || 1))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default StorePage;
