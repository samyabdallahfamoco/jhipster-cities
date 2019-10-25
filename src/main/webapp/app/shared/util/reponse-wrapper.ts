/**
 * This class can be use to handle backend response
 */
export class ResponseWrapper {
  /**
   * Constructor
   * @param headers headers received by the backend answer
   * @param json the content of the body
   * @param status http status number
   */
  constructor(public headers: Headers, public json: any, public status: number) {}
}
