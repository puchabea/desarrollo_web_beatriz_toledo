package tarea4.t4.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tarea4.t4.services.EvaluacionService;

@RestController
@RequestMapping("/api/nota")
public class NotaApiController {

    private final EvaluacionService evaluacionService;

    public NotaApiController(EvaluacionService evaluacionService) {
        this.evaluacionService = evaluacionService;
    }

    @PostMapping
    public ResponseEntity<?> agregarNota(@RequestParam Integer avisoId,
                                         @RequestParam Integer nota) {

        if (nota < 1 || nota > 7) {
            return ResponseEntity.badRequest().body("La nota debe ser entre 1 y 7");
        }

        evaluacionService.agregarNota(avisoId, nota);

        // devolver nuevo promedio para actualizar sin recargar
        String nuevoPromedio = evaluacionService.obtenerPromedio(avisoId);

        return ResponseEntity.ok(nuevoPromedio);
    }
}
