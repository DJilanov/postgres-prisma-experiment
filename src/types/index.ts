/**
 * HTTP response status codes and their corresponding descriptions.
 * 
 * This object maps HTTP status codes to their respective status messages.
 * It serves as a reference for commonly used HTTP status codes.
 * 
 * @constant
 * @type {ReadOnly<Record<number, string>>}
 */
const responseStatus = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  408: "Request Timeout",
  410: "Gone",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
} as const;

/**
 * Error types and their descriptions.
 * 
 * This object maps error types to their corresponding messages.
 * It is used to classify and describe different types of errors that may occur.
 * 
 * @constant
 * @type {ReadOnly<Record<string, string>>}
 */
const reason = {
  REQUIRED: "The requested resource is required",
  NOT_AVAILABLE: "The requested resource is not available",
  EXPIRED: "The requested resource is expired",
} as const;

/**
 * Type alias for response status codes.
 * 
 * Represents a mapping of HTTP status codes to their corresponding descriptions.
 * 
 * @type {typeof responseStatus}
 */
type ResponseStatus = typeof responseStatus;

/**
 * Type alias for HTTP response codes.
 * 
 * Represents the keys of the `ResponseStatus` object, which are HTTP status codes.
 * 
 * @type {keyof ResponseStatus}
 */
type ResponseCode = keyof ResponseStatus;

/**
 * Type alias for error types.
 * 
 * Represents the keys of the `reason` object, which are types of errors.
 * 
 * @type {keyof typeof reason}
 */
type ErrorType = keyof typeof reason;

/**
 * Type representing an error response.
 * 
 * Indicates a failed response with an error code, optional error type, and a message.
 * 
 * @type {object}
 * @property {boolean} success - Indicates that the operation was not successful.
 * @property {object} error - Contains details about the error.
 * @property {ResponseCode} error.code - The HTTP status code for the error.
 * @property {ErrorType} [error.type] - Optional error type indicating the nature of the error.
 * @property {string} error.message - A descriptive message about the error.
 * @property {any} [data] - Optional additional data related to the error.
 */
type ResponseError = {
  success: false;
  error: {
    code: ResponseCode;
    type?: ErrorType;
    message: string;
  };
  data?: any;
};

/**
 * Type representing a response with a message.
 * 
 * Indicates a successful response with a code and message, or an error response.
 * 
 * @type {ResponseError | object}
 * @property {boolean} success - Indicates that the operation was successful.
 * @property {ResponseCode} code - The HTTP status code for the response.
 * @property {string} message - A message describing the result of the operation.
 */
export type ResponseWithMessage =
  | {
      success: true;
      code: ResponseCode;
      message: string;
    }
  | ResponseError;

/**
 * Type representing a successful response with data.
 * 
 * Indicates a successful response with optional data.
 * 
 * @type {ResponseBody<T> | ResponseError}
 * @template T
 * @property {boolean} success - Indicates that the operation was successful.
 * @property {ResponseCode} code - The HTTP status code for the response.
 * @property {T} [data] - Optional data related to the successful response.
 */
export type ResponseSuccess<T> =
  | ResponseBody<T>
  | ResponseError;

/**
 * Type representing the body of a successful response.
 * 
 * Contains the result of a successful operation along with an HTTP status code.
 * 
 * @type {object}
 * @template T
 * @property {boolean} success - Indicates that the operation was successful.
 * @property {ResponseCode} code - The HTTP status code for the response.
 * @property {T} [data] - Optional data related to the successful response.
 */
export type ResponseBody<T> = {
  success: true;
  code: ResponseCode;
  data?: T;
}

/**
 * Type representing a response object.
 * 
 * This type covers both successful and error responses, with or without additional data.
 * 
 * @template T
 * @type {ResponseSuccess<T> | ResponseWithMessage}
 */
export type Response<T = boolean> = T extends object ? ResponseSuccess<T> : ResponseWithMessage;
