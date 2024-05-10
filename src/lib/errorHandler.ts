// import toast from "react-hot-toast";

interface ErrorData {
    status: string
    info?: string
    details?: string
}

const INFO_DELIMITER = '__'
const DETAILS_DELIMITER = '___'

export const handleError = (status: number, info: string = '', error?: any) => {
    console.log('*** ERROR: ', error)

    if(status && info) {
        throw createError(status, info, error)
    }

    if(status && error) {
        throw createError(status, error.message)
    }

    if(status === 401) {
        throw createError(status, 'Unauthorized! You have not the permission to access this page.')
    }

    if(status === 404) {
        throw createError(status, 'Not found! The page you tried to access doesn\'t exist.')
    }

    if(status >= 500) {
        throw createError(status, 'Internal Server Error! Sorry, something wen wrong.')
    }
}

const createError = (status: number, info: string, error?: any) => {
    if(!error) {
        return new Error(status + INFO_DELIMITER + info)
    }

    return new Error(status + INFO_DELIMITER + info + DETAILS_DELIMITER + error.message)
}

const extractInfo = (errorMessage: string) => {
    const detailsIndex = errorMessage.indexOf(DETAILS_DELIMITER)
    const infoEndIndex = detailsIndex === -1 ? errorMessage.length : detailsIndex
    return errorMessage.substring(3 + INFO_DELIMITER.length, infoEndIndex)
}

const extractDetails = (errorMessage: string) => {
    if(!errorMessage.includes(DETAILS_DELIMITER)) {
        return ''
    }

    const detailsStartIndex = errorMessage.indexOf(DETAILS_DELIMITER) + DETAILS_DELIMITER.length
    return errorMessage.substring(detailsStartIndex)
}

export const parseErrorMessage = (errorMessage: string): ErrorData => {
    if(!errorMessage.includes(INFO_DELIMITER)) {
        return {
            status: "500",
            info: errorMessage
        }
    }

    return {
        status: errorMessage.substring(0, 3),
        info: extractInfo(errorMessage),
        details: extractDetails(errorMessage)
    }
}