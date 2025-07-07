"use client";
import React, { useState } from "react";
import axios from "axios";

export const ResponseCard = ({ option, onSubmit, questionId, storeId }) => {
  const [textAnswer, setTextAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [media, setMedia] = useState({ photo: null, video: null, file: null });
  const [submitting, setSubmitting] = useState(false);

  const handleMediaChange = (e, type) => {
    setMedia({ ...media, [type]: e.target.files[0] });
  };


  // const handleSubmit = async () => {
  //   const isTextEmpty = option.responseType === "text" && !textAnswer.trim();
  //   const isRadioEmpty = option.responseType === "radio" && !selectedOption;

  //   if (isTextEmpty || isRadioEmpty) {
  //     alert("Please fill in the required response before submitting.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("questionId", option._id);
  //   formData.append("responseType", option.responseType);
  //   formData.append(
  //     "answer",
  //     option.responseType === "radio" ? selectedOption : textAnswer
  //   );

  //   if (media.photo) formData.append("photo", media.photo);
  //   if (media.video) formData.append("video", media.video);
  //   if (media.file) formData.append("file", media.file);

  //   try {
  //     setSubmitting(true);
  //     const res = await axios.post(`${process.env.SERVER_URL}/master/audit-response`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       withCredentials:true
  //     });

  //     console.log("Response saved:", res.data);
  //     alert("Response submitted successfully!");
  //     onSubmit(); // Notify parent to go to next
  //   } catch (error) {
  //     console.error("Submission error:", error);
  //     alert("Error submitting response.");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async () => {
    const isTextEmpty = option.responseType === "text" && !textAnswer.trim();
    const isRadioEmpty = option.responseType === "radio" && !selectedOption;

    if (isTextEmpty || isRadioEmpty) {
      alert("Please fill in the required response before submitting.");
      return;
    }

    const formData = new FormData();

    formData.append("questions", option.question);
    // formData.append("questions", option.question);

    formData.append("optionId", option._id);
    formData.append("responseType", option.responseType);
    formData.append(
      "auditresponse",
      option.responseType === "radio" ? selectedOption : textAnswer
    );
    formData.append("store", storeId);
    formData.append("auditQuestionId", questionId);

    // 👇 Append multiple files
    if (Array.isArray(media.photos)) {
      media.photos.forEach((photo) => {
        formData.append("photos", photo); // name must match multer config
      });
    }

    if (Array.isArray(media.files)) {
      media.files.forEach((file) => {
        formData.append("files", file); // name must match multer config
      });
    }

    // 👇 Append single video
    if (media.video) {
      formData.append("video", media.video); // multer allows only one
    }

    try {
      setSubmitting(true);

      const res = await axios.post(
        `${process.env.SERVER_URL}/master/audit-response`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Response saved:", res.data);
      alert("Response submitted successfully!");
      onSubmit(); // Notify parent to go to next
    } catch (error) {
      console.error("Submission error:", error?.response?.data || error);
      alert("Error submitting response.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow border space-y-4 w-full">
      <h3 className="font-bold text-lg text-blue-900">{option.question}</h3>
      {option.message && (
        <p className="text-sm italic text-gray-600">{option.message}</p>
      )}

      {option.responseType === "radio" && (
        <div className="space-y-2">
          {option.responseOption.map((res) => (
            <label
              key={res._id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                checked={selectedOption === res.message} // ✅ Compare with message
                onChange={() => setSelectedOption(res.message)} // ✅ Store message
              />
              <span
                className={
                  selectedOption === res.message
                    ? "font-medium text-blue-700"
                    : ""
                }
              >
                {res.message}
              </span>
            </label>
          ))}
        </div>
      )}

      {option.responseType === "text" && (
        <textarea
          className="w-full p-2 border rounded"
          rows="3"
          placeholder="Type your answer..."
          value={textAnswer}
          onChange={(e) => setTextAnswer(e.target.value)}
        />
      )}

      <div className="space-y-3">
        {option.isPhoto && (
          <div>
            <label className="block font-medium mb-1">Upload Photo</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setMedia({ ...media, photos: [...e.target.files] })
              }
            />
            {media.photo && (
              <p className="text-sm text-gray-500 mt-1">
                Selected: {media.photo.name}
              </p>
            )}
          </div>
        )}
        {option.isVideo && (
          <div>
            <label className="block font-medium mb-1">Upload Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleMediaChange(e, "video")}
            />
            {media.video && (
              <p className="text-sm text-gray-500 mt-1">
                Selected: {media.video.name}
              </p>
            )}
          </div>
        )}
        {option.isFile && (
          <div>
            <label className="block font-medium mb-1">Upload File</label>
            <input type="file" onChange={(e) => handleMediaChange(e, "file")} />
            {media.file && (
              <p className="text-sm text-gray-500 mt-1">
                Selected: {media.file.name}
              </p>
            )}
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className={`mt-2 ${
          submitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white font-semibold px-5 py-2 rounded`}
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </div>

    // <div className="bg-white p-5 rounded-xl shadow border space-y-4 w-full">
    //   <h3 className="font-bold text-lg text-blue-900">{option.question}</h3>
    //   {option.message && (
    //     <p className="text-sm italic text-gray-600">{option.message}</p>
    //   )}

    //   {option.responseType === "radio" && (
    //     <div className="space-y-2">
    //       {option.responseOption.map((res) => (
    //         <label
    //           key={res._id}
    //           className="flex items-center space-x-2 cursor-pointer"
    //         >
    //           <input
    //             type="radio"
    //             checked={selectedOption === res._id}
    //             onChange={() => setSelectedOption(res._id)}
    //           />
    //           <span
    //             className={
    //               selectedOption === res._id ? "font-medium text-blue-700" : ""
    //             }
    //           >
    //             {res.message}
    //           </span>
    //         </label>
    //       ))}
    //     </div>
    //   )}

    //   {option.responseType === "text" && (
    //     <textarea
    //       className="w-full p-2 border rounded"
    //       rows="3"
    //       placeholder="Type your answer..."
    //       value={textAnswer}
    //       onChange={(e) => setTextAnswer(e.target.value)}
    //     />
    //   )}

    //   <div className="space-y-3">
    //     {option.isPhoto && (
    //       <div>
    //         <label className="block font-medium mb-1">Upload Photos</label>
    //         <input
    //           type="file"
    //           multiple
    //           accept="image/*"
    //           onChange={(e) =>
    //             setMedia((prev) => ({ ...prev, photos: [...e.target.files] }))
    //           }
    //         />
    //         {media.photos?.length > 0 && (
    //           <ul className="text-sm text-gray-500 mt-1 list-disc list-inside">
    //             {media.photos.map((file, index) => (
    //               <li key={index}>{file.name}</li>
    //             ))}
    //           </ul>
    //         )}
    //       </div>
    //     )}

    //     {option.isVideo && (
    //       <div>
    //         <label className="block font-medium mb-1">Upload Video</label>
    //         <input
    //           type="file"
    //           accept="video/*"
    //           onChange={(e) =>
    //             setMedia((prev) => ({ ...prev, video: e.target.files[0] }))
    //           }
    //         />
    //         {media.video && (
    //           <p className="text-sm text-gray-500 mt-1">
    //             Selected: {media.video.name}
    //           </p>
    //         )}
    //       </div>
    //     )}

    //     {option.isFile && (
    //       <div>
    //         <label className="block font-medium mb-1">Upload Files</label>
    //         <input
    //           type="file"
    //           multiple
    //           onChange={(e) =>
    //             setMedia((prev) => ({ ...prev, files: [...e.target.files] }))
    //           }
    //         />
    //         {media.files?.length > 0 && (
    //           <ul className="text-sm text-gray-500 mt-1 list-disc list-inside">
    //             {media.files.map((file, index) => (
    //               <li key={index}>{file.name}</li>
    //             ))}
    //           </ul>
    //         )}
    //       </div>
    //     )}
    //   </div>

    //   <button
    //     onClick={handleSubmit}
    //     disabled={submitting}
    //     className={`mt-2 ${
    //       submitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
    //     } text-white font-semibold px-5 py-2 rounded`}
    //   >
    //     {submitting ? "Submitting..." : "Submit"}
    //   </button>
    // </div>
  );
};

// const { useState } = require("react");

// export const ResponseCard = ({ option, onSubmit }) => {
//     const [textAnswer, setTextAnswer] = useState("");
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [media, setMedia] = useState({ photo: null, video: null, file: null });

//     const handleMediaChange = (e, type) => {
//       setMedia({ ...media, [type]: e.target.files[0] });
//     };

//     const handleSubmit = () => {
//       const isTextEmpty =
//         option.responseType === "text" && !textAnswer.trim();
//       const isRadioEmpty =
//         option.responseType === "radio" && !selectedOption;

//       if (isTextEmpty || isRadioEmpty) {
//         alert("Please fill in the required response before submitting.");
//         return;
//       }

//       const response = {
//         questionId: option._id,
//         responseType: option.responseType,
//         answer:
//           option.responseType === "radio" ? selectedOption : textAnswer,
//         media,
//       };

//       console.log("Submitted response:", response);
//       alert("Response submitted! (Check console)");

//       onSubmit(); // Notify parent to go to next
//     };

//     return (
//       <div className="bg-white p-5 rounded-xl shadow border space-y-4 w-full">
//         <h3 className="font-bold text-lg text-blue-900">{option.question}</h3>
//         {option.message && (
//           <p className="text-sm italic text-gray-600">{option.message}</p>
//         )}

//         {option.responseType === "radio" && (
//           <div className="space-y-2">
//             {option.responseOption.map((res) => (
//               <label
//                 key={res._id}
//                 className="flex items-center space-x-2 cursor-pointer"
//               >
//                 <input
//                   type="radio"
//                   checked={selectedOption === res._id}
//                   onChange={() => setSelectedOption(res._id)}
//                 />
//                 <span
//                   className={
//                     selectedOption === res._id ? "font-medium text-blue-700" : ""
//                   }
//                 >
//                   {res.message}
//                 </span>
//               </label>
//             ))}
//           </div>
//         )}

//         {option.responseType === "text" && (
//           <textarea
//             className="w-full p-2 border rounded"
//             rows="3"
//             placeholder="Type your answer..."
//             value={textAnswer}
//             onChange={(e) => setTextAnswer(e.target.value)}
//           />
//         )}

//         <div className="space-y-3">
//           {option.isPhoto && (
//             <div>
//               <label className="block font-medium mb-1">Upload Photo</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleMediaChange(e, "photo")}
//               />
//               {media.photo && (
//                 <p className="text-sm text-gray-500 mt-1">
//                   Selected: {media.photo.name}
//                 </p>
//               )}
//             </div>
//           )}
//           {option.isVideo && (
//             <div>
//               <label className="block font-medium mb-1">Upload Video</label>
//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={(e) => handleMediaChange(e, "video")}
//               />
//               {media.video && (
//                 <p className="text-sm text-gray-500 mt-1">
//                   Selected: {media.video.name}
//                 </p>
//               )}
//             </div>
//           )}
//           {option.isFile && (
//             <div>
//               <label className="block font-medium mb-1">Upload File</label>
//               <input
//                 type="file"
//                 onChange={(e) => handleMediaChange(e, "file")}
//               />
//               {media.file && (
//                 <p className="text-sm text-gray-500 mt-1">
//                   Selected: {media.file.name}
//                 </p>
//               )}
//             </div>
//           )}
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded"
//         >
//           Submit
//         </button>
//       </div>
//     );
//   };
