package com.famoco.jhipstercities.repository;

import com.famoco.jhipstercities.domain.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the City entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CityRepositoryExtended extends CityRepository {
    Page<City> findAllByNbPeopleGreaterThan(double nbPeople, Pageable pageable);
}
