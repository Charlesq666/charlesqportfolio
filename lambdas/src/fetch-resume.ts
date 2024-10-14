import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm"
import { docs_v1, google } from "googleapis"
import * as fs from 'fs';
import { z } from "zod";

const ParsedResponseSchema = z.object({
    experience: z.array(z.object({
        company: z.string(),
        title: z.string(),
        location: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        content: z.array(z.string()),
    })),
    education: z.array(z.object({
        school: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        content: z.array(z.string()),
    })),
    projects: z.array(z.object({
        title: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        content: z.array(z.string()),
    })),
});

type ParasedResponse = z.infer<typeof ParsedResponseSchema>
const ParsedResponseKeys = ParsedResponseSchema.keyof().options

function parseGoogleDocContent(elements: docs_v1.Schema$StructuralElement[]) {
    const TITLE_FONT_SIZE = 10;
    const PARAGRAPH_FONT_SIZE = 9;
    const CONTENT_FONT_SIZE = 8;
    const contents = elements.reduce((acc, element) => {
        for (const subElement of element.paragraph?.elements || []) {
            const textContent = subElement.textRun?.content?.trim()
            const fontSize = subElement.textRun?.textStyle?.fontSize?.magnitude
            if (!textContent?.length) continue

            if (acc.length > 0 && acc[acc.length - 1].fontSize === fontSize && (fontSize as number) > CONTENT_FONT_SIZE) {
                acc[acc.length - 1].content += textContent
            } else {
                acc.push({ content: textContent, fontSize })
            }
        }
        return acc
    }, [] as { content: string, fontSize: number | undefined | null }[])


    const response = {} as ParasedResponse
    let curKey = "";
    for (const content of contents) {
        if (content.fontSize === TITLE_FONT_SIZE && content.content.trim().toLowerCase() in ParsedResponseKeys) {
            curKey = content.content.trim().toLowerCase()
        }
    }

    return contents
}


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
        google.options({ auth })
        const docs = google.docs({ version: "v1" })
        const res = await docs.documents.get({ documentId: docId })
        const demoRes = JSON.stringify(res.data.body?.content?.at(2))
        const content = res.data.body?.content
        if (!content) {
            throw new Error("Failed to find any content in the doc")
        }
        const parsedContent = parseGoogleDocContent(content)
        // fs.writeFileSync('demo.json', JSON.stringify(res.data.body?.content, null, 2))
        fs.writeFileSync('parsed.json', JSON.stringify(parsedContent, null, 2))

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
