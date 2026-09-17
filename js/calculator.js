// calculator.js - V2 ROI & Readiness Calculator Script

document.addEventListener('DOMContentLoaded', () => {
  const companySizeInput = document.getElementById('companySizeV2');
  const sizeValDisplay = document.getElementById('sizeValDisplayV2');
  const manualHoursInput = document.getElementById('manualHoursV2');
  const hoursValDisplay = document.getElementById('hoursValDisplayV2');
  const sectorSelect = document.getElementById('sectorSelectV2');

  const hoursSavedResult = document.getElementById('hoursSavedResultV2');
  const costSavedResult = document.getElementById('costSavedResultV2');
  const readinessScoreResult = document.getElementById('readinessScoreResultV2');
  const recommendationText = document.getElementById('recommendationTextV2');

  if (!companySizeInput || !manualHoursInput) return;

  const sectorData = {
    retail: { hourlyRate: 38, efficiencyGain: 0.80, readinessBase: 45, label: "Retail & E-Commerce" },
    banking: { hourlyRate: 58, efficiencyGain: 0.85, readinessBase: 40, label: "Banca y Finanzas" },
    telco: { hourlyRate: 48, efficiencyGain: 0.75, readinessBase: 50, label: "Telecomunicaciones" },
    public: { hourlyRate: 32, efficiencyGain: 0.70, readinessBase: 35, label: "Sector Público y Salud" },
    other: { hourlyRate: 42, efficiencyGain: 0.75, readinessBase: 45, label: "Corporativo General" }
  };

  function calculate() {
    const employees = parseInt(companySizeInput.value, 10);
    const weeklyHoursPerEmp = parseInt(manualHoursInput.value, 10);
    const sectorKey = sectorSelect.value;
    const config = sectorData[sectorKey] || sectorData.other;

    sizeValDisplay.textContent = `${employees} empleados`;
    hoursValDisplay.textContent = `${weeklyHoursPerEmp} hrs / semana`;

    const totalWeeklyHours = employees * weeklyHoursPerEmp;
    const totalAnnualHours = totalWeeklyHours * 52;
    const annualHoursSaved = Math.round(totalAnnualHours * config.efficiencyGain);
    const annualCostSaved = Math.round(annualHoursSaved * config.hourlyRate);

    let readinessScore = config.readinessBase;
    if (weeklyHoursPerEmp > 15) readinessScore += 25;
    if (employees > 50) readinessScore += 15;
    readinessScore = Math.min(Math.max(readinessScore, 35), 94);

    hoursSavedResult.textContent = `${annualHoursSaved.toLocaleString('es-ES')} hrs`;
    costSavedResult.textContent = `$${annualCostSaved.toLocaleString('en-US')} USD`;
    readinessScoreResult.textContent = `${readinessScore}%`;

    let rec = "";
    if (annualCostSaved > 500000) {
      rec = `🔥 **Alto Potencial Empresarial**: Tu organización en ${config.label} proyecta un retorno financiero masivo. Recomendamos ingresar directamente al programa **LAB-AI** con *Clean-up Crew* para curaduría de datos y despliegue de agentes UiPath/Azure OpenAI.`;
    } else if (annualCostSaved > 100000) {
      rec = `⚡ **Oportunidad de Eficiencia Relevante**: Modernizar tus pipelines de datos reducirá la carga operativa manual en más de un 75%.`;
    } else {
      rec = `💡 **Diagnóstico Recomendado**: Iniciar con una *Data Discovery Session* sin costo para priorizar los casos de mayor impacto.`;
    }

    recommendationText.innerHTML = rec;
  }

  companySizeInput.addEventListener('input', calculate);
  manualHoursInput.addEventListener('input', calculate);
  sectorSelect.addEventListener('change', calculate);

  calculate();
});
