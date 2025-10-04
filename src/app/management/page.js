// pages/iframePage.js
import React from 'react';

const IframePage = () => {
  return (
    <div className="w-full h-screen bg-gray-100">
      <iframe
        src="https://project-management-client-amber.vercel.app/features?projectId=68e128e2bea2411b1ee3d6c9"
        className="w-full h-full border-0"
        title="Embedded Project Management App"
      ></iframe>
    </div>
  );
};

export default IframePage;
