import { useEffect, useState } from 'react';
import { HfInference } from '@huggingface/inference';

// retrieve the access token from the .env file
const inference = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

function App() {
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');

  const generateImage = async () => {
    setLoading(true);
    try {
      const image = await inference.textToImage({
        model: 'runwayml/stable-diffusion-v1-5',
        inputs: 'An astronaut riding a horse in mars, realistic, colorful',
      });
      setLoading(false);
      const url = URL.createObjectURL(image);
      setImageURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetch from huggingface using the inference API
    generateImage();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world</h1>
      {loading && <span className="loading loading-dots loading-lg"></span>}
      {imageURL && <img src={imageURL} alt="generated" className="w-64" />}
    </>
  );
}

export default App;
