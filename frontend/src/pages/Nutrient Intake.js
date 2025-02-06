import { useState } from "react";

const NutritionIntake = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiUserToken = "9e75e1b9520c90b17ad611a10c771bafab8ffbd7";

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      // Step 1: Upload image for dish segmentation
      let response = await fetch("https://api.logmeal.com/v2/image/segmentation/complete", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${apiUserToken}`,
        },
      });

      let result = await response.json();
      if (!result.imageId) throw new Error("Image ID not received");

      // Step 2: Get nutritional info
      response = await fetch("https://api.logmeal.com/v2/recipe/nutritionalInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiUserToken}`,
        },
        body: JSON.stringify({ imageId: result.imageId }),
      });

      result = await response.json();
      setNutritionData(result);
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
      alert("Failed to fetch nutrition data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nutrition-intake">
      <h2>Nutrition Intake</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Processing..." : "Upload & Analyze"}
      </button>

      {nutritionData && (
        <div>
          <h3>Nutrition Info:</h3>
          <pre>{JSON.stringify(nutritionData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default NutritionIntake;
