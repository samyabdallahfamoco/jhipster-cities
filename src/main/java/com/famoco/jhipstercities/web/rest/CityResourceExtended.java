package com.famoco.jhipstercities.web.rest;

import com.famoco.jhipstercities.domain.City;
import com.famoco.jhipstercities.service.CityServiceExtended;
import io.github.jhipster.web.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link City}.
 */
@RestController
@RequestMapping("/api/v1")
public class CityResourceExtended {

    private final Logger log = LoggerFactory.getLogger(CityResourceExtended.class);

    private static final String ENTITY_NAME = "cityExtended";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CityServiceExtended cityServiceExtended;

    public CityResourceExtended(CityServiceExtended cityServiceExtended) {
        this.cityServiceExtended = cityServiceExtended;
    }

    /**
     * {@code GET  /transactions} : get all the transactions.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of transactions in body.
     */
    @GetMapping("/cities")
    public ResponseEntity<List<City>> getAllCities(@RequestParam("nbPeopleMin") Optional<Double> pNbPeopleMin,
                                                   @RequestParam("fromDate") Optional<LocalDate> pFromDate,
                                                   @RequestParam("toDate") Optional<LocalDate> pToDate,
                                                                        Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        double nbPeopleMin = 0;
        if (pNbPeopleMin.isPresent()) {
            nbPeopleMin = pNbPeopleMin.get();
        }

        Instant fromDate = null;
        if (pFromDate.isPresent()) {
            fromDate = pFromDate.get().atStartOfDay(ZoneId.systemDefault()).toInstant();
        }
        Instant toDate = null;
        if (pToDate.isPresent()) {
            toDate =  pToDate.get().atStartOfDay(ZoneId.systemDefault()).plusDays(1).toInstant();
        }

        Page<City> page = cityServiceExtended.findListOfCities(nbPeopleMin, fromDate, toDate, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
