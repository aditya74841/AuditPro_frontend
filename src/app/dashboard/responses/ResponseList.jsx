"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuditResponses } from "./store"; // The one that sets responses[]
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export const ResponseList = ({ auditId }) => {
  const dispatch = useDispatch();
  const { responses, loading } = useSelector((state) => state.response);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    dispatch(fetchAuditResponses(auditId, filterDate));
  }, [auditId, filterDate]);

  return (
    <div className="my-6">
      <h2 className="text-xl font-bold mb-4">Audit Responses</h2>

      <div className="mb-4 flex gap-4 items-center">
        <Input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-60"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : responses.length === 0 ? (
        <p>No responses found.</p>
      ) : (
        <div className="space-y-4">
          {responses.map((res) => (
            <Card key={res._id} className="p-4">
              <p><strong>Question:</strong> {res.questions}</p>
              <p><strong>Response:</strong> {res.auditresponse}</p>
              <p><strong>Score:</strong> {res.score}</p>
              <p><strong>Message:</strong> {res.message}</p>
              <p><strong>Created At:</strong> {new Date(res.createdAt).toLocaleString()}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
