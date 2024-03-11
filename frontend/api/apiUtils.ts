import { ErrorResult } from './apiTypes';

export async function processErrorRespose(response: Response): Promise<ErrorResult> {
    let data: any = null
    let errorResult: ErrorResult = {}
    if (response.headers.get("Content-Type") === "application/json") {
        data = await response.json()
    }

    if (typeof data === "string") {
        errorResult = {
            root: data
        }
    } else if (typeof data === "object") {
        Object.keys(data).forEach((key) => {
            if (errorResult)
                errorResult[key] = data[key]
        })
    }
    return errorResult
}
