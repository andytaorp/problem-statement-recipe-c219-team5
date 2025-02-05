import { useState } from "react";
import { useAIContext } from "../hooks/useAIContext";

const AIDetection = () => {
  const [image, setImage] = useState(null);
  const { aiResult, dispatch } = useAIContext();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://api.logmeal.com/v2/image/segmentation/complete", {
        method: "POST",
        headers: {
          "Authorization": 'Bearer ' + process.env.REACT_APP_LOGMEAL_API_KEY,  
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI results");
      }

      const data = await response.json();
      dispatch({ type: "SET_AI_RESULT", payload: data });
    } catch (error) {
      console.error("AI request failed", error);
    }
  };

  return (
    <div>
      <h2>Upload Food Image</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {aiResult && aiResult.food_name && (
        <div>
          <h3>Detected Food: {aiResult.food_name}</h3>
          <p>Calories: {aiResult.calories}</p>
          <p>Serving Size: {aiResult.serving_size}</p>
        </div>
      )}
    </div>
  );
};

export default AIDetection;
