const { useState } = require("react");

export const ResponseCard = ({ option, onSubmit }) => {
    const [textAnswer, setTextAnswer] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [media, setMedia] = useState({ photo: null, video: null, file: null });
  
    const handleMediaChange = (e, type) => {
      setMedia({ ...media, [type]: e.target.files[0] });
    };
  
    const handleSubmit = () => {
      const isTextEmpty =
        option.responseType === "text" && !textAnswer.trim();
      const isRadioEmpty =
        option.responseType === "radio" && !selectedOption;
  
      if (isTextEmpty || isRadioEmpty) {
        alert("Please fill in the required response before submitting.");
        return;
      }
  
      const response = {
        questionId: option._id,
        responseType: option.responseType,
        answer:
          option.responseType === "radio" ? selectedOption : textAnswer,
        media,
      };
  
      console.log("Submitted response:", response);
      alert("Response submitted! (Check console)");
  
      onSubmit(); // Notify parent to go to next
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
                  checked={selectedOption === res._id}
                  onChange={() => setSelectedOption(res._id)}
                />
                <span
                  className={
                    selectedOption === res._id ? "font-medium text-blue-700" : ""
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
                accept="image/*"
                onChange={(e) => handleMediaChange(e, "photo")}
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
              <input
                type="file"
                onChange={(e) => handleMediaChange(e, "file")}
              />
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
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded"
        >
          Submit
        </button>
      </div>
    );
  };