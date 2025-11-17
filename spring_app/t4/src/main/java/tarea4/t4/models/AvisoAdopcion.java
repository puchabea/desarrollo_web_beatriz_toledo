package tarea4.t4.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "aviso_adopcion")
public class AvisoAdopcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "fecha_ingreso", nullable = false)
    private LocalDateTime fechaIngreso;

    @ManyToOne
    @JoinColumn(name = "comuna_id", nullable = false)
    private Comuna comuna;

    @Column(name = "sector")
    private String sector;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "email")
    private String email;

    @Column(name = "celular")
    private String celular;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "cantidad")
    private Integer cantidad;

    @Column(name = "edad")
    private Integer edad;

    @Column(name = "unidad_medida")
    private String unidadMedida;   // "a" / "m"

    @Column(name = "fecha_entrega", nullable = false)
    private LocalDateTime fechaEntrega;

    @Column(name = "descripcion")
    private String descripcion;

    @OneToMany(mappedBy = "aviso", fetch = FetchType.LAZY)
    private List<Nota> notas;

    public Integer getId() { return id; }
    public LocalDateTime getFechaIngreso() { return fechaIngreso; }
    public Comuna getComuna() { return comuna; }
    public String getSector() { return sector; }
    public String getNombre() { return nombre; }
    public String getEmail() { return email; }
    public String getCelular() { return celular; }
    public String getTipo() { return tipo; }
    public Integer getCantidad() { return cantidad; }
    public Integer getEdad() { return edad; }
    public String getUnidadMedida() { return unidadMedida; }
    public LocalDateTime getFechaEntrega() { return fechaEntrega; }
    public String getDescripcion() { return descripcion; }
    public List<Nota> getNotas() { return notas; }
}
