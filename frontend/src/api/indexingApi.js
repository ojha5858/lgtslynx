const API_BASE = "https://vigilant-journey-65q46wx54qhwpv-5000.app.github.dev/api/indexing";

export const submitIndexingJob = async (payload) => {
  const res = await fetch(`${API_BASE}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to submit indexing job");
  }

  return res.json();
};

export const fetchIndexingLogs = async (jobId) => {
  const res = await fetch(`${API_BASE}/logs/${jobId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch logs");
  }

  return res.json();
};
