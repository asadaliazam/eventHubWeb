export default {
  MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "us-east-1",
      BUCKET: "notes-upload-react"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://pe3ouk5n7h.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_DCKBRxmW2",
      APP_CLIENT_ID: "30d360lpigrltqamdtrp88714n",
      IDENTITY_POOL_ID: "us-east-1:04b52aac-a913-45b3-b79a-a729775319ff"
    }
  };