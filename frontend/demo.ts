import { google } from "googleapis"

async function main() {
    // const res = await fetch(url)
    // const text = await res.text
    // console.log(text)
    const docId = ""
    const auth = new google.auth.GoogleAuth({
        keyFile: "./google-service-acc-key.json",
        scopes: ["https://www.googleapis.com/auth/documents.readonly"],
    })
    console.log(`Authenticated as: ${auth}`)
    google.options({auth})
    const docs = google.docs({version: "v1"})
    const res = await docs.documents.get({ documentId: docId })
    console.log(JSON.stringify(res.data.body?.content?.at(2)), null, 4)
}
main()