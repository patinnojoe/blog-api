const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const generateCode = require("./generateCode");
const client = new S3Client({
  region: "aws-region",
  credentials: {
    accessKeyId: "aws-access key",
    secretAccessKey: "aws secret key",
  },
});
const uploadFile = async ({ file, ext }) => {
  const filename = `${generateCode(13)}_${Date.now()}${ext}`;
  const params = {
    Bucket: "aws bucket name",
    Body: file.buffer,
    Key: filename,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  try {
    await client.send(command);
    return filename;
  } catch (error) {
    console.log(error);
  }
};

const singedURL = async (Key) => {
  const params = {
    Bucket: "aws bucket name",
    Key,
  };

  const command = new GetObjectCommand(params);
  try {
    const url = await getSignedUrl(client, command, { expiresIn: 60 });
    return url;
  } catch (error) {
    console.log(error);
  }
};

const deleteFile = async (Key) => {
  try {
    const params = {
      Bucket: "aws bucket name",
      Key,
    };
    const command = new DeleteObjectCommand(params);
    await client.send(command);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadFile,
  singedURL,
  deleteFile,
};
