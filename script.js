const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";
const API_USERNAME = "coalition";
const API_PASSWORD = "skills-test";

let chart;
let patients = [];
let selectedPatient = null;

const monthCal = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

async function fetchPatients() {
  const status = document.getElementById("patientStatus");

  if (!API_URL) {
    status.className = "error";
    status.textContent = "API URL is not configured.";
    return;
  }

  try {
    const headers = {};

    if (API_USERNAME && API_PASSWORD) {
      headers.Authorization =
        "Basic " + btoa(`${API_USERNAME}:${API_PASSWORD}`);
    }

    const response = await fetch(API_URL, { headers });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    patients = Array.isArray(data) ? data : [];
    selectedPatient =
      patients.find((patient) => patient.name === "Jessica Taylor") ||
      patients[0] ||
      null;
    status.remove();
    showPatients(selectedPatient);
    selectPatient(selectedPatient);
  } catch (error) {
    status.className = "error";
    status.textContent = "Unable to load patient API data.";
    console.error(error);
  }
}

function showPatients(activePatient = selectedPatient) {
  const list = document.getElementById("patientList");
  list.innerHTML = patients
    .map(
      (patient) => `
        <button class="patient-row ${activePatient?.name === patient.name ? "active" : ""}" data-name="${patient.name}">
          <img src="${patient.profile_picture}" alt="${patient.name}" />
          <span>
            <strong>${patient.name}</strong>
            <small>${patient.gender}, ${patient.age || "--"}</small>
          </span>
          <span class="dots">•••</span>
        </button>
      `,
    )
    .join("");

  list.querySelectorAll(".patient-row").forEach((row) => {
    row.addEventListener("click", () => {
      const patient = patients.find((item) => item.name === row.dataset.name);
      selectedPatient = patient || selectedPatient;
      showPatients(selectedPatient);
      selectPatient(patient);
    });
  });
}

function setTextContent(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function setProfile(id, src, alt) {
  const element = document.getElementById(id);
  if (element) {
    element.src = src;
    element.alt = alt;
  }
}

function selectPatient(patient) {
  if (!patient) return;

  const history = [...(patient.diagnosis_history || [])].slice(-6);
  const latest = history[history.length - 1] || {};
  const bp = latest.blood_pressure || {};

  setProfile(
    "profilePhoto",
    patient.profile_picture,
    patient.name || "Selected patient",
  );
  setTextContent("patientName", patient.name);
  setTextContent("dateOfBirth", patient.date_of_birth);
  setTextContent("gender", patient.gender);
  setTextContent("phone", patient.phone_number);
  setTextContent("emergency", patient.emergency_contact);
  setTextContent("insurance", patient.insurance_type);

  setTextContent("systolicValue", bp.systolic?.value ?? "--");
  setTextContent(
    "systolicTrend",
    bp.systolic?.levels ? `▲ ${bp.systolic.levels}` : "--",
  );
  setTextContent("diastolicValue", bp.diastolic?.value ?? "--");
  setTextContent(
    "diastolicTrend",
    bp.diastolic?.levels ? `▼ ${bp.diastolic.levels}` : "--",
  );

  setTextContent(
    "respiratoryRate",
    latest.respiratory_rate?.value
      ? `${latest.respiratory_rate.value} bpm`
      : "--",
  );
  setTextContent("respiratoryStatus", latest.respiratory_rate?.levels || "--");
  setTextContent(
    "temperature",
    latest.temperature?.value ? `${latest.temperature.value}°F` : "--",
  );
  setTextContent("temperatureStatus", latest.temperature?.levels || "--");
  setTextContent(
    "heartRate",
    latest.heart_rate?.value ? `${latest.heart_rate.value} bpm` : "--",
  );
  setTextContent(
    "heartStatus",
    latest.heart_rate?.levels ? `▼ ${latest.heart_rate.levels}` : "--",
  );

  showChart(history);
  showDiagnosticList(patient.diagnostic_list);
  showLabResults(patient.lab_results);
}

function showChart(history) {
  const labels = history.map(
    (item) => `${monthCal[item.month] || item.month}, ${item.year}`,
  );
  const systolic = history.map(
    (item) => item.blood_pressure?.systolic?.value || 0,
  );
  const diastolic = history.map(
    (item) => item.blood_pressure?.diastolic?.value || 0,
  );
  const chartImg = document.getElementById("bloodPressureChart");

  if (!chartImg) {
    return;
  }

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(chartImg, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Systolic",
          data: systolic,
          borderColor: "#e66fd2",
          backgroundColor: "#e66fd2",
          pointBackgroundColor: "#e66fd2",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 12,
          tension: 0.45,
          borderWidth: 3,
        },
        {
          label: "Diastolic",
          data: diastolic,
          borderColor: "#8c6fe6",
          backgroundColor: "#8c6fe6",
          pointBackgroundColor: "#8c6fe6",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 12,
          tension: 0.45,
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      animations: {
        radius: {
          duration: 400,
          easing: "linear",
          loop: (context) => context.active,
        },
      },

      hoverRadius: 12,
      hoverBackgroundColor: "#fff176",

      interaction: {
        mode: "nearest",
        intersect: false,
        axis: "x",
      },

      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: false,
        },
      },

      scales: {
        y: {
          min: 60,
          max: 180,
          ticks: {
            stepSize: 20,
          },
          grid: {
            color: "rgba(7, 38, 53, .14)",
          },
          border: { display: false },
        },
        x: {
          grid: { display: false },
          border: { display: false },
        },
      },
    },
  });
}

function showDiagnosticList(items) {
  const rows = document.getElementById("diagnosticRows");
  rows.innerHTML = items.length
    ? items
        .map(
          (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.description}</td>
          <td>${item.status}</td>
        </tr>
      `,
        )
        .join("")
    : `<tr><td colspan="3">No diagnostic records available.</td></tr>`;
}

function showLabResults(items) {
  const list = document.getElementById("labResults");
  list.innerHTML = items.length
    ? items
        .map(
          (item) => `
        <div class="lab-item">
          <span>${item}</span>
          <a class="download" href="#" aria-label="Download ${item}"><img src="assets/healthcare_images/downloadIcon.svg" alt="Download" /> </a>
        </div>
      `,
        )
        .join("")
    : `<div class="lab-item">No lab results available.</div>`;
}

fetchPatients();
