// config aws
import * as AWS from "aws-sdk";


const AWS_BUCKET=process.env.AWS_BUCKET

export class AwsService {
  constructor() {
    this.s3 = new AWS.S3({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESKEY,
        secretAccessKey: process.env.AWS_SECRETACCESKEY,
      },
    })
  }
async uploadFile(name, type, buf) {
  const params = {
    Bucket:AWS_BUCKET,
    Key: name,
    Body: Buffer.from(buf),
    ContentType: type,
    ContentEncoding: 'base64',
  };
console.log("les params : ",params)
  try {
    const data = await this.s3.upload(params).promise();

    return {
      url: `https://${AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/blacklagoon}`,
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
      Bucket:AWS_BUCKET,
      Key: fileKey
    }

console.log("les params : ",params)
    try {
      const data = await this.s3.getObject(params).promise()

      return {
        file: data.Body,
        url: `https://${ process.env.AWS_BUCKET }.s3.${ process.env.AWS_REGION }.amazonaws.com/${ fileKey }`
      }
    } catch (error) {
      return "Error retrieving file:", error
    }
  }
}