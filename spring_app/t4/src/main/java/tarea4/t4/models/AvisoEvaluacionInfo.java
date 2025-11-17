package tarea4.t4.models;

public class AvisoEvaluacionInfo {

    private Integer id;
    private String fechaPublicacion;
    private String sector;
    private Integer cantidad;
    private String tipo;
    private Integer edad;
    private String comuna;
    private String notaPromedio;

    public AvisoEvaluacionInfo(Integer id, String fechaPublicacion, String sector, Integer cantidad, String tipo,
                               Integer edad, String comuna, String notaPromedio) {

        this.id = id;
        this.fechaPublicacion = fechaPublicacion;
        this.sector = sector;
        this.cantidad = cantidad;
        this.tipo = tipo;
        this.edad = edad;
        this.comuna = comuna;
        this.notaPromedio = notaPromedio;
    }

    public Integer getId() { return id; }
    public String getFechaPublicacion() { return fechaPublicacion; }
    public String getSector() { return sector; }
    public Integer getCantidad() { return cantidad; }
    public String getTipo() { return tipo; }
    public Integer getEdad() { return edad; }
    public String getComuna() { return comuna; }
    public String getNotaPromedio() { return notaPromedio; }
}

