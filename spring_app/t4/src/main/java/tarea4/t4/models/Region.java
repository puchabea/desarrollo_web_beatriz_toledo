package tarea4.t4.models;

import jakarta.persistence.*;

@Entity
@Table(name = "region")
public class Region {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "nombre")
    private String nombre;

    public Integer getId() { return id; }
    public String getNombre() { return nombre; }
}

