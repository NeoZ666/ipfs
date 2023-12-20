import React, { useState } from "react";
import { NFTStorage, Blob } from "nft.storage";

const App = () => {
  const [cid, setCID] = useState("");

  const client = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN });

  async function uploadFile(file) {
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);

    fr.onloadend = async () => {
      const fileBlob = new Blob([fr.result]);
      const fileCid = await client.storeBlob(fileBlob);
      console.log({ fileCid });

      // const metadata = await client.store({
      //   metadata: {
      //     name: "My NFT",
      //     description: "My NFT Description",
      //     file: fileCid,
      //   },
      // });
      // console.log({ metadata });

      // const data = new Blob([JSON.stringify(metadata)]);
      // const { CAR } = await NFTStorage.encodeBlob(data);
      // const cid = await client.storeCAR(CAR);
      // console.log({ cid });
      setCID( fileCid ); 
    };
  }

  const handleUpload = () => {
    const fileInput = document.getElementById("fileInput");
    const inputFile = fileInput.files[0];

    if (inputFile) {
      uploadFile(inputFile);
    } else {
      console.error("No file selected.");
    }
  };

  return (
    <div className="App">
      <h1>File Upload</h1>
      <input type="file" id="fileInput" />
      <button onClick={handleUpload}>Upload</button>
      {cid && <p>CID: {cid}</p>}
    </div>
  );
};

export default App;
