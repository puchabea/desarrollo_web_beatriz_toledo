document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".boton-evaluar").forEach(boton => {

        boton.addEventListener("click", async () => {
            const avisoId = boton.dataset.id;
            let nota = prompt("Ingrese una nota entre 1 y 7:");
            if (nota === null) return;

            if (!/^[1-7]$/.test(nota.trim())) {
                alert("La nota debe ser un número entero entre 1 y 7.");
                return;
            }

            const respuesta = await fetch("/api/nota", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `avisoId=${avisoId}&nota=${nota}`
            });

            if (!respuesta.ok) {
                alert("Error al guardar la nota");
                return;
            }

            const nuevoPromedio = await respuesta.text();
            boton.closest("tr").querySelector(".col-promedio").textContent = nuevoPromedio;
        });
    });
});