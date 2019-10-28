package com.famoco.jhipstercities.service.impl;

import com.famoco.jhipstercities.domain.City;
import com.famoco.jhipstercities.repository.CityRepository;
import com.famoco.jhipstercities.repository.CityRepositoryExtended;
import com.famoco.jhipstercities.service.CityService;
import com.famoco.jhipstercities.service.CityServiceExtended;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

/**
 * Service Implementation for managing {@link City}.
 */
@Primary
@Service
@Transactional
public class CityServiceImplExtended extends CityServiceImpl implements CityServiceExtended {

    private final Logger log = LoggerFactory.getLogger(CityServiceImplExtended.class);

    private final CityRepositoryExtended cityRepositoryExtended;

    public CityServiceImplExtended(CityRepositoryExtended cityRepositoryExtended) {
        super(cityRepositoryExtended);
        this.cityRepositoryExtended = cityRepositoryExtended;
    }

    /**
     * Get all the cities.
     *
     * @param nbOfPeopleMin the number of people min
     * @param fromDate the date min
     * @param toDate the date max
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<City> findListOfCities(Double nbOfPeopleMin, Instant fromDate, Instant toDate, Pageable pageable){
        return cityRepositoryExtended.findAllViaQuery(nbOfPeopleMin, fromDate, toDate, pageable);
    }

}
