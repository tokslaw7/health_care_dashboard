const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";
const API_USERNAME = "coalition";
const API_PASSWORD = "skills-test";

// const fallbackPatients = [
//   {
//     name: "Emily Williams",
//     gender: "Female",
//     age: 18,
//     profile_picture: "https://randomuser.me/api/portraits/women/10.jpg"
//   },
//   {
//     name: "Ryan Johnson",
//     gender: "Male",
//     age: 45,
//     profile_picture: "https://randomuser.me/api/portraits/men/12.jpg"
//   },
//   {
//     name: "Brandon Mitchell",
//     gender: "Male",
//     age: 36,
//     profile_picture: "https://randomuser.me/api/portraits/men/20.jpg"
//   },
//   {
//     name: "Jessica Taylor",
//     gender: "Female",
//     age: 28,
//     profile_picture: "https://randomuser.me/api/portraits/women/68.jpg",
//     date_of_birth: "August 23, 1996",
//     phone_number: "(415) 555-1234",
//     emergency_contact: "(415) 555-5678",
//     insurance_type: "Sunrise Health Assurance",
//     diagnosis_history: [
//       {
//         month: "October",
//         year: 2023,
//         blood_pressure: {
//           systolic: { value: 120, levels: "Higher than Average" },
//           diastolic: { value: 110, levels: "Lower than Average" }
//         },
//         heart_rate: { value: 78, levels: "Lower than Average" },
//         respiratory_rate: { value: 20, levels: "Normal" },
//         temperature: { value: 98.6, levels: "Normal" }
//       },
//       {
//         month: "November",
//         year: 2023,
//         blood_pressure: {
//           systolic: { value: 115, levels: "Higher than Average" },
//           diastolic: { value: 65, levels: "Lower than Average" }
//         },
//         heart_rate: { value: 78, levels: "Lower than Average" },
//         respiratory_rate: { value: 20, levels: "Normal" },
//         temperature: { value: 98.6, levels: "Normal" }
//       },
//       {
//         month: "December",
//         year: 2023,
//         blood_pressure: {
//           systolic: { value: 160, levels: "Higher than Average" },
//           diastolic: { value: 110, levels: "Lower than Average" }
//         },
//         heart_rate: { value: 78, levels: "Lower than Average" },
//         respiratory_rate: { value: 20, levels: "Normal" },
//         temperature: { value: 98.6, levels: "Normal" }
//       },
//       {
//         month: "January",
//         year: 2024,
//         blood_pressure: {
//           systolic: { value: 118, levels: "Higher than Average" },
//           diastolic: { value: 92, levels: "Lower than Average" }
//         },
//         heart_rate: { value: 78, levels: "Lower than Average" },
//         respiratory_rate: { value: 20, levels: "Normal" },
//         temperature: { value: 98.6, levels: "Normal" }
//       },
//       {
//         month: "February",
//         year: 2024,
//         blood_pressure: {
//           systolic: { value: 150, levels: "Higher than Average" },
//           diastolic: { value: 70, levels: "Lower than Average" }
//         },
//         heart_rate: { value: 78, levels: "Lower than Average" },
//         respiratory_rate: { value: 20, levels: "Normal" },
//         temperature: { value: 98.6, levels: "Normal" }
//       },
//       {
//         month: "March",
//         year: 2024,
//         blood_pressure: {
//           systolic: { value: 160, levels: "Higher than Average" },
//           diastolic: { value: 78, levels: "Lower than Average" }
//         },
//         heart_rate: { value: 78, levels: "Lower than Average" },
//         respiratory_rate: { value: 20, levels: "Normal" },
//         temperature: { value: 98.6, levels: "Normal" }
//       }
//     ],
//     diagnostic_list: [
//       {
//         name: "Hypertension",
//         description: "Chronic high blood pressure",
//         status: "Under Observation"
//       },
//       {
//         name: "Type 2 Diabetes",
//         description: "Insulin resistance and elevated blood sugar",
//         status: "Cured"
//       },
//       {
//         name: "Asthma",
//         description: "Recurrent episodes of bronchial constriction",
//         status: "Inactive"
//       },
//       {
//         name: "Osteoarthritis",
//         description: "Degenerative joint disease",
//         status: "Untreated"
//       }
//     ],
//     lab_results: ["Blood Tests", "CT Scans", "Radiology Reports", "X-Rays", "Urine Test"]
//   },
//   {
//     name: "Samantha Johnson",
//     gender: "Female",
//     age: 56,
//     profile_picture: "https://randomuser.me/api/portraits/women/22.jpg"
//   },
//   {
//     name: "Ashley Martinez",
//     gender: "Female",
//     age: 54,
//     profile_picture: "https://randomuser.me/api/portraits/women/33.jpg"
//   },
//   {
//     name: "Olivia Brown",
//     gender: "Female",
//     age: 32,
//     profile_picture: "https://randomuser.me/api/portraits/women/45.jpg"
//   },
//   {
//     name: "Tyler Davis",
//     gender: "Male",
//     age: 19,
//     profile_picture: "https://randomuser.me/api/portraits/men/33.jpg"
//   },
//   {
//     name: "Kevin Anderson",
//     gender: "Male",
//     age: 30,
//     profile_picture: "https://randomuser.me/api/portraits/men/40.jpg"
//   },
//   {
//     name: "Dylan Thompson",
//     gender: "Male",
//     age: 36,
//     profile_picture: "https://randomuser.me/api/portraits/men/50.jpg"
//   },
//   {
//     name: "Nathan Evans",
//     gender: "Male",
//     age: 58,
//     profile_picture: "https://randomuser.me/api/portraits/men/60.jpg"
//   },
//   {
//     name: "Mike Nolan",
//     gender: "Male",
//     age: 31,
//     profile_picture: "https://randomuser.me/api/portraits/men/70.jpg"
//   }
// ];

let chart;
let patients = [];
let selectedPatient = null;

const monthShort = {
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
    renderPatients(selectedPatient);
    selectPatient(selectedPatient);
  } catch (error) {
    status.className = "error";
    status.textContent = "Unable to load API data.";
    console.error(error);
  }
}

function renderPatients(activePatient = selectedPatient) {
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
      renderPatients(selectedPatient);
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

function setImageSource(id, src, alt) {
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

  setImageSource(
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

  renderChart(history);
  renderDiagnosticList(patient.diagnostic_list);
  renderLabResults(patient.lab_results);
}

function renderChart(history) {
  const labels = history.map(
    (item) => `${monthShort[item.month] || item.month}, ${item.year}`,
  );
  const systolic = history.map(
    (item) => item.blood_pressure?.systolic?.value || 0,
  );
  const diastolic = history.map(
    (item) => item.blood_pressure?.diastolic?.value || 0,
  );
  const ctx = document.getElementById("bloodPressureChart");

  if (!ctx) {
    return;
  }

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
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

function renderDiagnosticList(items) {
  const rows = document.getElementById("diagnosticRows");
  rows.innerHTML = items.length
    ? items
        .map(
          (item) => `
        <tr>
          <td>${item.name || "--"}</td>
          <td>${item.description || "--"}</td>
          <td>${item.status || "--"}</td>
        </tr>
      `,
        )
        .join("")
    : `<tr><td colspan="3">No diagnostic records available.</td></tr>`;
}

function renderLabResults(items) {
  const list = document.getElementById("labResults");
  list.innerHTML = items.length
    ? items
        .map(
          (item) => `
        <div class="lab-item">
          <span>${item}</span>
          <a class="download" href="#" aria-label="Download ${item}"><img src="assets/healthcare_images/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt="Download" /> </a>
        </div>
      `,
        )
        .join("")
    : `<div class="lab-item">No lab results available.</div>`;
}

fetchPatients();
