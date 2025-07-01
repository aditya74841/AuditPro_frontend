"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Select from "react-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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

// import { DataTableDemo } from "@/components/Table/DataTable";

import {
  createAuditName,
  fetchAuditQuestions,
  updateCompanyLogo,
  deleteAuditQuestion,
  updateAuditQuestion,
  createOptions,
  fetchAuditOptions,
} from "./store"; // <-- make sure update and delete actions exist
import { fetchStoreName } from "../stores/store";
import { DataTableDemo } from "./Datatable";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { OptionsDataTable } from "./OptionsDatatable";
const responseTypeOptions = [
  { value: "text", label: "Text" },
  { value: "radio", label: "Radio" },
  { value: "checkbox", label: "Checkbox" },
];
const AuditPage = () => {
  const [newItemDrawerOpen, setNewItemDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // <-- new
  const [companyName, setCompanyName] = useState("");
  const [auditName, setAuditName] = useState("");
  const [storeOption, setStoreOption] = useState({
    value: null,
    label: "Select Store",
  });
  const [loading, setLoading] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const [editingCompanyId, setEditingCompanyId] = useState(null); // <-- new
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.company);
  const { storesName } = useSelector((state) => state.store);
  const { auditQuestion } = useSelector((state) => state.audit);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [logoFile, setLogoFile] = useState(null);
  const [changingLogoCompanyId, setChangingLogoCompanyId] = useState(null);

  const [question, setQuestion] = useState("");
  const [score, setScore] = useState(0);
  const [responseType, setResponseType] = useState("");
  const [responseOptionText, setResponseOptionText] = useState(""); // comma separated
  const [isVideo, setIsVideo] = useState(false);
  const [isPhoto, setIsPhoto] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const responseOption = responseOptionText
      .split(",")
      .map((msg) => ({ message: msg.trim() }))
      .filter((opt) => opt.message);

    const payload = {
      question,
      responseType,
      responseOption,
      isVideo,
      isPhoto,
      isFile,
      message,
      score,
    };

    try {
      await axios.post(`/your-api-route/${auditQuestionId}/options`, payload);
      toast.success("Option created");
    } catch (err) {
      toast.error("Failed to create option");
    }
  };

  useEffect(() => {
    dispatch(fetchStoreName());
    dispatch(fetchAuditQuestions(page, limit));
  }, [page, limit, dispatch, loading]);

  const handleCreateOrUpdateAudit = async () => {
    if (!auditName.trim()) {
      return Swal.fire("Error", "Company name is required", "error");
    }

    try {
      if (isEditing && editingCompanyId) {
        await dispatch(
          updateAuditQuestion(editingCompanyId, {
            name: auditName,
            storeId: storeOption.value,
            isPublished: isPublished,
          })
        ); // corrected
        // await dispatch(updateCompanyLogo(editingCompanyId, logoFile));
        setLogoFile(null);
        setLoading((prev) => !prev);
        Swal.fire("Success", "Company updated successfully", "success");

        // Swal.fire("Success", "Logo updated successfully", "success");
      } else {
        await dispatch(
          createAuditName({ name: auditName, storeId: storeOption.value })
        );
        setLoading((prev) => !prev);
        Swal.fire("Success", "Company created successfully", "success");
      }
      // setCompanyName("");
      setAuditName("");
      setStoreOption({
        value: null,
        label: "Select Store",
      });
      setNewItemDrawerOpen(false);
      setIsEditing(false);
      setEditingCompanyId(null);
      // dispatch(fetchCompanies(page, limit)); // refresh
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  const handleEditCompany = (company) => {
    setAuditName(company.name);

    setIsAssigned(company.isAssigned);
    setIsPublished(company.isPublished);
    setEditingCompanyId(company._id);
    setIsEditing(true);
    setNewItemDrawerOpen(true);

    const matchedCompany = storesName.find(
      (store) =>
        store.value === company.store || store.value === company.store?._id
    );
    if (matchedCompany) {
      setStoreOption({
        label: matchedCompany.label,
        value: matchedCompany.value,
      });
      dispatch(fetchAuditOptions(company._id))
    } else {
      setStoreOption(null);
    }
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
        await dispatch(deleteAuditQuestion(companyId));
        Swal.fire("Deleted!", "Company has been deleted.", "success");
        setIsEditing(false);
        setLogoFile(null);
        setLoading((prev) => !prev);
        // dispatch(fetchCompanies(page - 1, limit)); // refresh
      } catch (err) {
        Swal.fire("Error", err.message || "Something went wrong", "error");
      }
    }
  };

  // const handleCreateOrUpdateOptions = async () => {
  //   if (!auditName.trim()) {
  //     return Swal.fire("Error", "Company name is required", "error");
  //   }

  //   try {
  //     if (isEditing && editingCompanyId) {
  //       await dispatch(
  //         updateAuditQuestion(editingCompanyId, {
  //           name: auditName,
  //           storeId: storeOption.value,
  //           isPublished: isPublished,
  //         })
  //       ); // corrected
  //       // await dispatch(updateCompanyLogo(editingCompanyId, logoFile));
  //       setLogoFile(null);
  //       setLoading((prev) => !prev);
  //       Swal.fire("Success", "Company updated successfully", "success");

  //       // Swal.fire("Success", "Logo updated successfully", "success");
  //     } else {
  //       await dispatch(
  //         createAuditName({ name: auditName, storeId: storeOption.value })
  //       );
  //       setLoading((prev) => !prev);
  //       Swal.fire("Success", "Company created successfully", "success");
  //     }
  //     // setCompanyName("");
  //     setAuditName("");
  //     setStoreOption({
  //       value: null,
  //       label: "Select Store",
  //     });
  //     setNewItemDrawerOpen(false);
  //     setIsEditing(false);
  //     setEditingCompanyId(null);
  //     // dispatch(fetchCompanies(page, limit)); // refresh
  //   } catch (err) {
  //     Swal.fire("Error", err.message || "Something went wrong", "error");
  //   }
  // };

  const handleReset = () => {
    setQuestion(""),
      setScore(""),
      setResponseType(""),
      setResponseOptionText(""),
      setIsPhoto(false),
      setIsFile(false),
      setIsVideo(false),
      setMessage("");
  };

  const handleCreateOrUpdateOptions = async () => {
    if (isSubmitting) return; // prevent double click
    setIsSubmitting(true);

    const postData = {
      question,
      score,
      responseType,
      responseOptionText,
      isVideo,
      isPhoto,
      isFile,
      message,
    };

    try {
      await dispatch(
        createOptions({ auditId: editingCompanyId, optionsData: postData })
      );
      dispatch(fetchAuditOptions(editingCompanyId))
      handleReset();
      toast.success("Options created successfully");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full my-4 px-8 py-3 ">
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
          <SheetContent className="w-[60vw] max-w-[60vw] bg-white p-6 ">
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

            <Tabs defaultValue="first" className="w-full p-4">
              {isEditing && (
                <>
                  <TabsList className="p-4">
                    <TabsTrigger value="first">First</TabsTrigger>
                    <TabsTrigger value="second">Second</TabsTrigger>
                  </TabsList>
                </>
              )}

              <TabsContent value="first" className="w-1/2">
                <div className="items-center p-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={auditName}
                    onChange={(e) => setAuditName(e.target.value)}
                    placeholder="Enter Audit name"
                    className="mt-2"
                  />

                  <Label htmlFor="name" className="text-lg mt-4">
                    Select Store
                  </Label>
                  <Select
                    // defaultValue={selectedOption}
                    // onChange={setSelectedOption}
                    // options={companiesName}
                    value={storeOption}
                    onChange={setStoreOption}
                    options={storesName}
                  />

                  {isEditing && (
                    <>
                      <div className="flex items-center justify-between mt-6">
                        <Label htmlFor="assigned">Assigned</Label>
                        <Switch
                          id="assigned"
                          checked={isAssigned}
                          onCheckedChange={setIsAssigned}
                        />
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <Label htmlFor="published">Published</Label>
                        <Switch
                          id="published"
                          checked={isPublished}
                          onCheckedChange={setIsPublished}
                        />
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="second">
                <div className="flex">
                  <div className="grid gap-4 w-1/2  ">
                    <div>
                      <Label htmlFor="question">Question</Label>
                      <Input
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter the audit question"
                      />
                    </div>

                    <div>
                      <Label htmlFor="score">Score</Label>
                      <Input
                        id="score"
                        type="number"
                        value={score}
                        onChange={(e) => setScore(Number(e.target.value))}
                        placeholder="Score (e.g. 10)"
                      />
                    </div>

                    <div>
                      <Label htmlFor="responseType">Response Type</Label>
                      <Select
                        id="responseType"
                        options={responseTypeOptions}
                        value={responseTypeOptions.find(
                          (opt) => opt.value === responseType
                        )}
                        onChange={(selected) => setResponseType(selected.value)}
                        placeholder="Select response type"
                      />
                    </div>

                    {(responseType === "radio" ||
                      responseType === "checkbox") && (
                      <div>
                        <Label htmlFor="responseOption">Response Options</Label>
                        <Textarea
                          id="responseOption"
                          value={responseOptionText}
                          onChange={(e) =>
                            setResponseOptionText(e.target.value)
                          }
                          placeholder="Enter options separated by commas"
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          id="video"
                          checked={isVideo}
                          onCheckedChange={setIsVideo}
                        />
                        <Label htmlFor="video">Video</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          id="photo"
                          checked={isPhoto}
                          onCheckedChange={setIsPhoto}
                        />
                        <Label htmlFor="photo">Photo</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          id="file"
                          checked={isFile}
                          onCheckedChange={setIsFile}
                        />
                        <Label htmlFor="file">File</Label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Custom message (optional)"
                      />
                    </div>

                    <Button
                      onClick={handleCreateOrUpdateOptions}
                      disabled={isSubmitting}
                      className="mt-4"
                    >
                      {isSubmitting ? "Saving..." : "Create Option"}
                    </Button>
                  </div>
                  <div className="p-4 w-full">
                    <OptionsDataTable
                      data={auditQuestion?.auditQuestions.options || []}
                      onEdit={handleEditCompany}
                      onDelete={handleDeleteCompany}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" onClick={handleCreateOrUpdateAudit}>
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <DataTableDemo
        data={auditQuestion?.auditQuestions || []}
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
