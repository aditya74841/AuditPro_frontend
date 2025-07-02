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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { deleteAuditOptions, fetchAuditOptions } from "./store";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

export function OptionsDataTable({ data, onEditOptions, onDelete, companyId }) {
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();

  // console.log("The data is ", data[0].options);
  const filteredData = data[0].options.filter((item) =>
    item.question.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteOptions = async (optionId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this option?"
    );

    if (confirmed) {
      try {
        await dispatch(deleteAuditOptions(companyId, optionId));
        toast.success("Option deleted successfully");
        dispatch(fetchAuditOptions(companyId));
      } catch (err) {
        toast.error(err.message || "Something went wrong while deleting");
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Response Type</TableHead>
              <TableHead>Is File</TableHead>
              <TableHead>Is Photo</TableHead>
              <TableHead>Is Video</TableHead>

              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((company) => (
                <TableRow key={company._id}>
                  <TableCell className="font-medium">
                    {company.question}
                  </TableCell>
                  <TableCell className="font-medium">{company.score}</TableCell>
                  <TableCell className="font-medium">
                    {company.responseType}
                  </TableCell>
                  <TableCell className="font-medium">
                    {company.responseOption
                      ?.map((opt) => opt.message)
                      .join(", ")}
                  </TableCell>
                  <TableCell className="font-medium">
                    {company.isFile ? "true" : "false  "}
                  </TableCell>
                  <TableCell className="font-medium">
                    {company.isPhoto ? "true" : "false  "}
                  </TableCell>

                  <TableCell className="font-medium">
                    {company.isVideo ? "true" : "false  "}
                  </TableCell>
                  {/* <TableCell>
                    {company.logo?.url ? (
                      <img
                        src={company.logo.url}
                        alt={company.name}
                        className="h-10 w-10 object-cover rounded-full"
                      />
                    ) : (
                      "No Logo"
                    )}
                  </TableCell> */}
                  {/* <TableCell className="font-medium">
                    {company.storeName}
                  </TableCell> */}
                  {/* 
                  <TableCell>
                    {new Date(company.createdAt).toLocaleDateString()}
                  </TableCell> */}
                  <TableCell className="flex gap-2">
                    <Button
                      className="bg-sky-700 hover:bg-sky-800"
                      onClick={() => onEditOptions(company)}
                    >
                      Update
                    </Button>
                    <Button
                      className="bg-red-700 hover:bg-red-800"
                      onClick={() => handleDeleteOptions(company._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4" className="text-center">
                  No companies found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
