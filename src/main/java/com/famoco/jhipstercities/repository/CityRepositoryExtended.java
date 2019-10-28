package com.famoco.jhipstercities.repository;

import com.famoco.jhipstercities.domain.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;

/**
 * Spring Data  repository for the City entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CityRepositoryExtended extends CityRepository {
    //Page<City> findAllByNbPeopleGreaterThan(double nbPeople, Pageable pageable);

    @Query("SELECT city FROM City city" +
        " WHERE (city.nbPeople >=:nbPeopleMin OR :nbPeopleMin IS NULL)" +
        " AND (cast(:dateFrom AS timestamp) IS NULL OR city.dateUpdate >= :dateFrom )" + // technical trick for postgres database
        " AND (cast(:dateTo AS timestamp) IS NULL OR city.dateUpdate <= :dateTo  )" // technical trick for postgres database
    )
    Page<City> findAllViaQuery(@Param("nbPeopleMin") double nbPeopleMin, @Param("dateFrom") Instant dateFrom, @Param("dateTo") Instant dateTo, Pageable pageable);

}
