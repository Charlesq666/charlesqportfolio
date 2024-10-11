import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager"
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm"
import { google } from "googleapis"

async function main() {
    // const res = await fetch(url)
    // const text = await res.text
    // console.log(text)
    const secretsClient = new SecretsManagerClient({ region: "us-east-1" })
    const ssmClient = new SSMClient({ region: "us-east-1" })
    const parameter = await ssmClient.send(new GetParameterCommand({ Name: "/personal-web/google-service-key", WithDecryption: true }))
    console.log(`parameter is ${parameter.Parameter?.Value}`)

    // const googleServiceAccKey = await secretsClient.send(
    //     new GetSecretValueCommand({ SecretId: "google-service-key" }))
    const googleServiceAccKey = parameter.Parameter?.Value as string
    
    // if (!googleServiceAccKey.SecretString) {
    //     throw new Error("Google service account key not found")
    // }
    const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(googleServiceAccKey),
        scopes: ["https://www.googleapis.com/auth/documents.readonly"],
    })
    console.log(`Authenticated as: ${auth}`)
    google.options({auth})
    const docs = google.docs({version: "v1"})
    const res = await docs.documents.get({ documentId: docId })
    console.log(JSON.stringify(res.data.body?.content?.at(2)), null, 4)
}
main()