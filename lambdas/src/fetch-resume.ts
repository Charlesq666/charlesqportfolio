import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager"
import { google } from "googleapis"

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const secretsClient = new SecretsManagerClient({ region: "us-east-1" })
        const googleServiceAccKey = process.env.GOOGLE_SERVICE_KEY
        const first20 = googleServiceAccKey?.slice(0, 20)
        console.log(`${first20}`)
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `fetch resume, ${first20}`,
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
