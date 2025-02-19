import React, { useState } from 'react';

const AIpage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedImage) {
      return alert('Please select an image to upload!');
    }
  
    const formData = new FormData();
    formData.append('image', selectedImage);  
    setLoading(true);
  
    try {
      const response = await fetch('http://localhost:4000/api/ai', {
        method: 'POST',
        body: formData, 
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch AI results');
      }
  
      const data = await response.json();
      console.log("AI Response: ", data); 
      setAiResponse(data.response);
    } catch (error) {
      console.error('Error uploading image:', error);
      setAiResponse('Error processing the image');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="ai-page">
      <h2>AI Functionality - Nutritional Value Identification</h2>

      <form onSubmit={handleSubmit}>
        <label>Select an Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>

      {aiResponse && (
        <div>
          <h3>Response:</h3>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default AIpage;
