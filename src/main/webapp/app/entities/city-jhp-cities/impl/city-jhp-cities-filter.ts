/**
 * Device filter used to reach api endpoint
 */
export interface CityJhpCitiesFilter {
  /**
   * Site name related to the device
   */
  nbPeopleMin?: string;
  /**
   * After (or equal) this date
   */
  fromDate?: string;
  /**
   * Before (or equal) this date
   */
  toDate?: string;
}
