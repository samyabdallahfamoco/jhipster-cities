package com.famoco.jhipstercities.service;

import com.famoco.jhipstercities.domain.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.Instant;
import java.util.Optional;

/**
 * Service Interface for managing {@link City}.
 */
public interface CityServiceExtended {

    /**
     * Get all the cities.
     *
     * @param nbOfPeopleMin the number of people min
     * @param fromDate the date min
     * @param toDate the date max
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<City> findListOfCities(Double nbOfPeopleMin, Instant fromDate, Instant toDate, Pageable pageable);


}
