package tarea4.t4.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import tarea4.t4.models.*;

@Service
public class EvaluacionService {

    private final AvisoRepository avisoRepository;
    private final NotaRepository notaRepository;

    public EvaluacionService(AvisoRepository avisoRepository, NotaRepository notaRepository) {
        this.avisoRepository = avisoRepository;
        this.notaRepository = notaRepository;
    }

    public List<AvisoEvaluacionInfo> getListadoEvaluacion() {

        List<AvisoAdopcion> avisos = avisoRepository.findAll();
        List<AvisoEvaluacionInfo> resultado = new ArrayList<>();

        for (AvisoAdopcion aviso : avisos) {

            List<Nota> notas = notaRepository.findByAvisoId(aviso.getId());

            String promedio = "-";

            if (!notas.isEmpty()) {
                double prom = notas.stream()
                                    .mapToInt(Nota::getNota)
                                    .average()
                                    .orElse(0);

                promedio = String.format("%.1f", prom);
            }

            AvisoEvaluacionInfo info = new AvisoEvaluacionInfo(
                aviso.getId(),
                aviso.getFechaIngreso().toString(),
                aviso.getSector(),
                aviso.getCantidad(),
                aviso.getTipo(),
                aviso.getEdad(),
                aviso.getComuna().getNombre(),
                promedio
            );

            resultado.add(info);
        }

        return resultado;
    }

    public void agregarNota(Integer avisoId, Integer notaValor) {

    AvisoAdopcion aviso = avisoRepository.findById(avisoId)
            .orElseThrow(() -> new RuntimeException("Aviso no existe"));

    Nota nueva = new Nota(aviso, notaValor);
    notaRepository.save(nueva);
    }

    public String obtenerPromedio(Integer avisoId) {
    List<Nota> notas = notaRepository.findByAvisoId(avisoId);

    if (notas.isEmpty()) return "-";

    double prom = notas.stream()
                       .mapToInt(Nota::getNota)
                       .average()
                       .orElse(0);

    return String.format("%.1f", prom);
    }

}   
