// pages/iframePage.js
// import React from 'react';

// const IframePage = () => {
//   return (
//     <div className="w-full h-screen bg-gray-100">
//       <iframe
//         src="https://pm.allaboutcse.com/features?projectId=68e128e2bea2411b1ee3d6c9"
//         className="w-full h-full border-0"
//         title="Embedded Project Management App"
//       ></iframe>
//     </div>
//   );
// };

// export default IframePage;
import React from "react";

const IframePage = () => {

  const iframeUrl = `https://pm.allaboutcse.com/features?projectId=68e128e2bea2411b1ee3d6c9`;

  return (
    <div className="w-full h-screen bg-gray-100">
      <iframe
        src={iframeUrl}
        className="w-full h-full border-0"
        title="Embedded Project Management App"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        allow="clipboard-write; microphone; camera; fullscreen"
      ></iframe>
    </div>
  );
};

export default IframePage;
