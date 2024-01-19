import * as AWS from "aws-sdk";



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

  async uploadFile({ content, name, type }) {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: name,
      Body: content,
      ContentType: type,
    }

    await this.s3
      .upload(params, (err, data) => {
        if (err) {
          return "Error uploading file:", err
        } else {
          return `File uploaded successfully. ${data.Location}`
        }
      })
      .promise()

    return {
      url: `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${name}`,
    }
  }

  async getFileStream({ fileKey }) {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: fileKey,
    }

    try {
      const data = await this.s3.getObject(params).promise()

      return {
        file: data.Body,
        url: `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`,
      }
    } catch (error) {
      return "Error retrieving file:", error
    }
  }
}