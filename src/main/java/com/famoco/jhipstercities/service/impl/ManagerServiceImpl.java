package com.famoco.jhipstercities.service.impl;

import com.famoco.jhipstercities.service.ManagerService;
import com.famoco.jhipstercities.domain.Manager;
import com.famoco.jhipstercities.repository.ManagerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Manager}.
 */
@Service
@Transactional
public class ManagerServiceImpl implements ManagerService {

    private final Logger log = LoggerFactory.getLogger(ManagerServiceImpl.class);

    private final ManagerRepository managerRepository;

    public ManagerServiceImpl(ManagerRepository managerRepository) {
        this.managerRepository = managerRepository;
    }

    /**
     * Save a manager.
     *
     * @param manager the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Manager save(Manager manager) {
        log.debug("Request to save Manager : {}", manager);
        return managerRepository.save(manager);
    }

    /**
     * Get all the managers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Manager> findAll(Pageable pageable) {
        log.debug("Request to get all Managers");
        return managerRepository.findAll(pageable);
    }

    /**
     * Get all the managers with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Manager> findAllWithEagerRelationships(Pageable pageable) {
        return managerRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one manager by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Manager> findOne(Long id) {
        log.debug("Request to get Manager : {}", id);
        return managerRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the manager by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Manager : {}", id);
        managerRepository.deleteById(id);
    }
}
