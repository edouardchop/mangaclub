// config aws
import * as AWS from "aws-sdk";



export class AwsService {
  constructor() {
    this.s3 = new AWS.S3({
      region: process.env.local.AWS_REGION,
      credentials: {
        accessKeyId: process.env.local.AWS_ACCESKEY,
        secretAccessKey: process.env.local.AWS_SECRETACCESKEY,
      },
    })
  }
async uploadFile(name, type, buf) {
  const params = {
    Bucket: process.env.local.AWS_BUCKET,
    Key: name,
    Body: Buffer.from(buf),
    ContentType: type,
    ContentEncoding: 'base64',
  };
console.log("les params : ",params)
  try {
    const data = await this.s3.upload(params).promise();

    return {
      url: `https://${process.env.local.AWS_BUCKET}.s3.${process.env.local.AWS_REGION}.amazonaws.com/${name}`,
      data,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error; // Rejet de la promesse pour indiquer une erreur
  }
}

  async getFileStream ( fileKey )
  {
    console.log("on est dans getFileStream")
    const params = {
      Bucket: process.env.local.AWS_BUCKET,
      Key: fileKey
    }

console.log("les params : ",params)
    try {
      const data = await this.s3.getObject(params).promise()

      return {
        file: data.Body,
        url: `https://${ process.env.local.AWS_BUCKET }.s3.${ process.env.local.AWS_REGION }.amazonaws.com/${ fileKey }`
      }
    } catch (error) {
      return "Error retrieving file:", error
    }
  }
}