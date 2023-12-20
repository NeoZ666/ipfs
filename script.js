require('dotenv').config();

// import { NFTStorage, Blob } from 'nft.storage';
import { NFTStorage, File, Blob } from './node_modules/nft.storage';


const fr = new FileReader();
const client = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN });

async function uploadFile(file) {
    fr.readAsArrayBuffer(file);
    fr.onloadend = async () => {
        const fileBlob = new Blob([fr.result]);
        const fileCid = await client.storeBlob(fileBlob);
        console.log({ fileCid });
        const metadata = await client.store({
            metadata: {
                file: fileCid,
            },
        });
        console.log({ metadata });
        const data = new Blob([JSON.stringify(metadata)]);
        const { CAR } = await NFTStorage.encodeBlob(data);
        const cid = await client.storeCAR(CAR);
        console.log({ cid });
    };
}

window.handleUpload = function handleUpload() {
    const fileInput = document.getElementById('fileInput');
    const inputFile = fileInput.files[0];

    if (inputFile) {
        uploadFile(inputFile);
    } else {
        console.error('No file selected.');
    }
}
