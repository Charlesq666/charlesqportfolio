import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm"
import { google } from "googleapis"

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const googleServiceParamName = process.env.GOOGLE_SERVICE_PARAM_NAME
        const ssmClient = new SSMClient({ region: "us-east-1" })
        const parameter = await ssmClient.send(
            new GetParameterCommand({ 
                Name: googleServiceParamName, 
                WithDecryption: true 
            })
        )
        const googleServiceAccKey = parameter.Parameter?.Value as string
        const docId = process.env.RESUME_DOC_ID
        if (!googleServiceAccKey || !docId) {
            throw new Error("Google service account key or doc id not found")
        }

        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(googleServiceAccKey),
            scopes: ["https://www.googleapis.com/auth/documents.readonly"],
        })
        console.log(`Authenticated as: ${auth}`)
        google.options({ auth })
        const docs = google.docs({ version: "v1" })
        const res = await docs.documents.get({ documentId: docId })
        const demoRes = JSON.stringify(res.data.body?.content?.at(2))
        console.log(JSON.stringify(res.data.body?.content?.at(2), null, 4))
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `fetch resume, ${demoRes}`,
            }),
        };
    } catch (err) {
        console.log(err);
        const msg = err instanceof Error ? err.message : String(err)
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `some error happened, ${msg}`,
            }),
        };
    }
};
