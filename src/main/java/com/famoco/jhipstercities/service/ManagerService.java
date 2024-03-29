package com.famoco.jhipstercities.service;

import com.famoco.jhipstercities.domain.Manager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Manager}.
 */
public interface ManagerService {

    /**
     * Save a manager.
     *
     * @param manager the entity to save.
     * @return the persisted entity.
     */
    Manager save(Manager manager);

    /**
     * Get all the managers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Manager> findAll(Pageable pageable);

    /**
     * Get all the managers with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Manager> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" manager.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Manager> findOne(Long id);

    /**
     * Delete the "id" manager.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
