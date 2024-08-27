import { Response, ResponseWithMessage } from "@/types";

/**
 * Creates a response object for server actions.
 * 
 * This function can be used to generate a standardized response for server-side actions, with support for different types of response structures.
 * It has overloads to handle responses with or without additional data and messages.
 * 
 * @function
 * 
 * @param {ResponseWithMessage} response - A response object with a message and status. Used for server actions where only a message and status are needed.
 * @returns {Response} The provided response object, ensuring it conforms to the `Response` type.
 * 
 * @param {Response<T>} response - A response object with additional data. Used for server actions where additional data needs to be included in the response.
 * @returns {Response<T>} The provided response object with data, ensuring it conforms to the `Response<T>` type.
 * 
 * @param {T} response - A generic response object. Used for server actions where the response does not need to conform to a specific type but just needs to be returned as is.
 * @returns {T} The provided generic response object.
 */
export function response(response: ResponseWithMessage): Response;
export function response<T extends Record<string, unknown>>(response: Response<T>): Response<T>;
export function response<T extends object>(response: T): T {
  return response;
}
