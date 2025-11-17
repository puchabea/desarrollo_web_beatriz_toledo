package tarea4.t4.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import tarea4.t4.services.EvaluacionService;
import tarea4.t4.models.AvisoEvaluacionInfo;

import java.util.List;

@Controller
public class EvaluacionController {

    private final EvaluacionService evaluacionService;

    public EvaluacionController(EvaluacionService evaluacionService) {
        this.evaluacionService = evaluacionService;
    }

    @GetMapping("/evaluaciones")
    public String listadoNotas(Model model) {

        List<AvisoEvaluacionInfo> avisos = evaluacionService.getListadoEvaluacion();

        model.addAttribute("avisos", avisos);

        return "listado_notas";
    }
}
