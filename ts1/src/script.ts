import { pi } from "./data"

function area(): number {
    const inputRaio = document.getElementById('raio') as HTMLInputElement;
    const raio = parseFloat(inputRaio.value);
    const area = pi * raio * raio;
  
    const areaOutput = document.getElementById('area') as HTMLInputElement;
    areaOutput.value = area.toFixed(2);
  
    return area;
  }
  
  function circunferencia(): number {
    const inputRaio = document.getElementById('raio') as HTMLInputElement;
    const raio = parseFloat(inputRaio.value);
    const circ = 2 * pi * raio;
  
    const circOutput = document.getElementById('circunferencia') as HTMLInputElement;
    circOutput.value = circ.toFixed(2);
  
    return circ;
  }

  function calcular(): void {
    area();
    circunferencia();
  }
  
  (window as any).calcular = calcular;
  
  
  
  
  

