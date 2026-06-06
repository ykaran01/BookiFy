class ApiError extends Error{
    constructor(
        statusCode,
        messasge="Something went wrong",
        error=[],
        statck =  " "
    ){
        super(messasge)
        this.statusCode = statusCode
        this.data = null
        this.success = false
        this.error = error

        if(statck){
            this.stack = statck
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
export {ApiError}