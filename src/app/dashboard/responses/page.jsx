"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponseCard } from "./ResponseCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuditResponse } from "./store";

const ResponsePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const auditId = "68300d07e8fc0902863f51ef";
  const dispatch = useDispatch();

  const { response, loading, error } = useSelector((state) => state.response);
  const questions = response?.options || [];

  useEffect(() => {
    dispatch(fetchAuditResponse(auditId));
  }, [dispatch, auditId]);

  const goToNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (loading) {
    return <div className="text-center py-10 text-blue-600">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        Error loading audit: {error}
      </div>
    );
  }

  if (!response || !questions.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No audit data available.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {response.name}
      </h1>

      <div className="relative h-full min-h-[300px]">
        <AnimatePresence mode="wait">
          {currentIndex < questions.length ? (
            <motion.div
              key={questions[currentIndex]._id}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full"
            >
              <ResponseCard
                option={questions[currentIndex]}
                onSubmit={goToNext}
              />
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="text-center p-6"
            >
              <h2 className="text-2xl font-semibold text-green-700">
                🎉 All responses submitted!
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResponsePage;


// "use client";
// import React, { useState } from "react";

// const hardcodedAuditData = {
//   _id: "68300d07e8fc0902863f51ef",
//   name: "Audit 1",
//   isAssigned: false,
//   isPublished: true,
//   options: [
//     {
//       _id: "6863bda005df5375770c0b20",
//       question: "Option 1",
//       score: 345,
//       responseType: "radio",
//       isVideo: true,
//       isPhoto: true,
//       isFile: false,
//       message: "This is the message",
//       responseOption: [
//         { _id: "686511fb8fba3e1fd6ef504e", message: "r1" },
//         { _id: "686511fb8fba3e1fd6ef504f", message: "r2" },
//         { _id: "686511fb8fba3e1fd6ef5050", message: "r3" },
//         { _id: "686511fb8fba3e1fd6ef5051", message: "r4" },
//       ],
//     },
//     {
//       _id: "6865049b5b148a56a39deaa6",
//       question: "Option 3",
//       score: 320,
//       responseType: "radio",
//       isVideo: true,
//       isPhoto: true,
//       isFile: true,
//       message: "",
//       responseOption: [
//         { _id: "68651762a00732f9f60fe824", message: "r1" },
//         { _id: "68651762a00732f9f60fe825", message: "r2" },
//         { _id: "68651762a00732f9f60fe826", message: "r3" },
//         { _id: "68651762a00732f9f60fe827", message: "r4" },
//       ],
//     },
//     {
//       _id: "68663f23b584c401a17f82c7",
//       question: "Option 2",
//       score: 123,
//       responseType: "text",
//       isVideo: true,
//       isPhoto: false,
//       isFile: false,
//       message: "sadsdsdasda",
//       responseOption: [],
//     },
//   ],
// };

// const ResponseCard = ({ option }) => {
//   const [textAnswer, setTextAnswer] = useState("");
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [media, setMedia] = useState({ photo: null, video: null, file: null });

//   const handleMediaChange = (e, type) => {
//     setMedia({ ...media, [type]: e.target.files[0] });
//   };

//   const handleSubmit = () => {
//     const isTextEmpty =
//       option.responseType === "text" && !textAnswer.trim();
//     const isRadioEmpty =
//       option.responseType === "radio" && !selectedOption;

//     if (isTextEmpty || isRadioEmpty) {
//       alert("Please fill in the required response before submitting.");
//       return;
//     }

//     const response = {
//       questionId: option._id,
//       responseType: option.responseType,
//       answer:
//         option.responseType === "radio" ? selectedOption : textAnswer,
//       media,
//     };

//     console.log("Submitted response:", response);
//     alert("Response submitted! (Check console)");
//   };

//   return (
//     <div className="bg-white p-5 rounded-xl shadow border space-y-4">
//       <h3 className="font-bold text-lg text-blue-900">{option.question}</h3>
//       {option.message && (
//         <p className="text-sm italic text-gray-600">{option.message}</p>
//       )}

//       {/* Radio Options */}
//       {option.responseType === "radio" && (
//         <div className="space-y-2">
//           {option.responseOption.map((res) => (
//             <label
//               key={res._id}
//               className="flex items-center space-x-2 cursor-pointer"
//             >
//               <input
//                 type="radio"
//                 checked={selectedOption === res._id}
//                 onChange={() => setSelectedOption(res._id)}
//               />
//               <span
//                 className={
//                   selectedOption === res._id ? "font-medium text-blue-700" : ""
//                 }
//               >
//                 {res.message}
//               </span>
//             </label>
//           ))}
//         </div>
//       )}

//       {/* Text Input */}
//       {option.responseType === "text" && (
//         <textarea
//           className="w-full p-2 border rounded"
//           rows="3"
//           placeholder="Type your answer..."
//           value={textAnswer}
//           onChange={(e) => setTextAnswer(e.target.value)}
//         />
//       )}

//       {/* Media Uploads */}
//       <div className="space-y-3">
//         {option.isPhoto && (
//           <div>
//             <label className="block font-medium mb-1">Upload Photo</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => handleMediaChange(e, "photo")}
//             />
//             {media.photo && (
//               <p className="text-sm text-gray-500 mt-1">
//                 Selected: {media.photo.name}
//               </p>
//             )}
//           </div>
//         )}
//         {option.isVideo && (
//           <div>
//             <label className="block font-medium mb-1">Upload Video</label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => handleMediaChange(e, "video")}
//             />
//             {media.video && (
//               <p className="text-sm text-gray-500 mt-1">
//                 Selected: {media.video.name}
//               </p>
//             )}
//           </div>
//         )}
//         {option.isFile && (
//           <div>
//             <label className="block font-medium mb-1">Upload File</label>
//             <input
//               type="file"
//               onChange={(e) => handleMediaChange(e, "file")}
//             />
//             {media.file && (
//               <p className="text-sm text-gray-500 mt-1">
//                 Selected: {media.file.name}
//               </p>
//             )}
//           </div>
//         )}
//       </div>

//       <button
//         onClick={handleSubmit}
//         className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded"
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// const ResponsePage = () => {
//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         {hardcodedAuditData.name}
//       </h1>

//       {hardcodedAuditData.options.map((option) => (
//         <ResponseCard key={option._id} option={option} />
//       ))}
//     </div>
//   );
// };

// export default ResponsePage;
