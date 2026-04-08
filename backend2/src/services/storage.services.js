import ImageKit from "@imagekit/nodejs"



const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

async function uploadFile(buffer) {
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.pdf"
    })
    return result;
}

export default uploadFile;