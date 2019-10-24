package com.famoco.jhipstercities.repository;
import com.famoco.jhipstercities.domain.Manager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Manager entity.
 */
@Repository
public interface ManagerRepository extends JpaRepository<Manager, Long> {

    @Query(value = "select distinct manager from Manager manager left join fetch manager.countries",
        countQuery = "select count(distinct manager) from Manager manager")
    Page<Manager> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct manager from Manager manager left join fetch manager.countries")
    List<Manager> findAllWithEagerRelationships();

    @Query("select manager from Manager manager left join fetch manager.countries where manager.id =:id")
    Optional<Manager> findOneWithEagerRelationships(@Param("id") Long id);

}
