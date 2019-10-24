package com.famoco.jhipstercities.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Country.
 */
@Entity
@Table(name = "country")
public class Country implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "country")
    private Set<Area> areas = new HashSet<>();

    @ManyToMany(mappedBy = "countries")
    @JsonIgnore
    private Set<Manager> managers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Country name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Area> getAreas() {
        return areas;
    }

    public Country areas(Set<Area> areas) {
        this.areas = areas;
        return this;
    }

    public Country addAreas(Area area) {
        this.areas.add(area);
        area.setCountry(this);
        return this;
    }

    public Country removeAreas(Area area) {
        this.areas.remove(area);
        area.setCountry(null);
        return this;
    }

    public void setAreas(Set<Area> areas) {
        this.areas = areas;
    }

    public Set<Manager> getManagers() {
        return managers;
    }

    public Country managers(Set<Manager> managers) {
        this.managers = managers;
        return this;
    }

    public Country addManagers(Manager manager) {
        this.managers.add(manager);
        manager.getCountries().add(this);
        return this;
    }

    public Country removeManagers(Manager manager) {
        this.managers.remove(manager);
        manager.getCountries().remove(this);
        return this;
    }

    public void setManagers(Set<Manager> managers) {
        this.managers = managers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Country)) {
            return false;
        }
        return id != null && id.equals(((Country) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Country{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
