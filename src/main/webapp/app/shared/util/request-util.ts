import { HttpParams } from '@angular/common/http';

export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort') {
        options = options.set(key, req[key]);
      }
    });
    if (req.sort) {
      req.sort.forEach(val => {
        options = options.append('sort', val);
      });
    }
  }
  return options;
};

/**
 * Represent a Request to backend endpoints allowing paging
 */
export interface Request {
  /**
   * The page number to get >=0
   */
  page: number;
  /**
   * The size of the page to retrieve
   */
  size: number;
  /**
   * A list of queryParam to sort/filter on
   */
  [key: string]: any;
}
