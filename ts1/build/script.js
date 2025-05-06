"use strict";
function area() {
    const inputRaio = document.getElementById('raio');
    const raio = parseFloat(inputRaio.value);
    const area = Math.PI * raio * raio;
    const areaOutput = document.getElementById('area');
    areaOutput.value = area.toFixed(2);
    return area;
}
function circunferencia() {
    const inputRaio = document.getElementById('raio');
    const raio = parseFloat(inputRaio.value);
    const circ = 2 * Math.PI * raio;
    const circOutput = document.getElementById('circunferencia');
    circOutput.value = circ.toFixed(2);
    return circ;
}
function calcular() {
    area();
    circunferencia();
}
window.calcular = calcular;
