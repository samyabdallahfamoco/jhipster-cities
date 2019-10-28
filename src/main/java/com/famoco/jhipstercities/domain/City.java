package com.famoco.jhipstercities.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A City.
 */
@Entity
@Table(name = "city")
public class City implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "nb_people", nullable = false)
    private Double nbPeople;

    @NotNull
    @Column(name = "postal_code", nullable = false)
    private String postalCode;

    @Column(name = "date_update")
    private Instant dateUpdate;

    @ManyToOne
    @JsonIgnoreProperties("cities")
    private Area area;

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

    public City name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getNbPeople() {
        return nbPeople;
    }

    public City nbPeople(Double nbPeople) {
        this.nbPeople = nbPeople;
        return this;
    }

    public void setNbPeople(Double nbPeople) {
        this.nbPeople = nbPeople;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public City postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public Instant getDateUpdate() {
        return dateUpdate;
    }

    public City dateUpdate(Instant dateUpdate) {
        this.dateUpdate = dateUpdate;
        return this;
    }

    public void setDateUpdate(Instant dateUpdate) {
        this.dateUpdate = dateUpdate;
    }

    public Area getArea() {
        return area;
    }

    public City area(Area area) {
        this.area = area;
        return this;
    }

    public void setArea(Area area) {
        this.area = area;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof City)) {
            return false;
        }
        return id != null && id.equals(((City) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "City{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", nbPeople=" + getNbPeople() +
            ", postalCode='" + getPostalCode() + "'" +
            ", dateUpdate='" + getDateUpdate() + "'" +
            "}";
    }
}
