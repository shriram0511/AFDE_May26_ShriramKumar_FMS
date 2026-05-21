import { useState, useEffect } from "react";
import { uploadCSV, getETLHistory, downloadReport, getAnalytics } from "../services/etlService";

function ETLUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    getAnalytics().then((res) => setAnalytics(res.data)).catch(() => {});
  }, [result]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a CSV or Excel file");
    setLoading(true);
    try {
      const res = await uploadCSV(file);
      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.detail || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleHistory = async () => {
    try {
      const res = await getETLHistory();
      setHistory(res.data);
      setShowHistory(true);
    } catch {
      alert("Failed to load history");
    }
  };

  const handleDownload = async () => {
    try {
      const res = await downloadReport();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "feedback_report.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("Download failed");
    }
  };

  return (
    <div className="page">
      <h2 className="page-title">ETL Pipeline</h2>

      <div className="etl-card">
        <p className="section-title">📂 Upload Feedback Dataset</p>
        <p className="etl-hint">Supported formats: CSV, Excel (.xlsx) — Min. 100 records recommended</p>

        <div className="etl-upload-row">
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            className="etl-file-input"
            onChange={(e) => { setFile(e.target.files[0]); setResult(null); }}
          />
          <button className="btn-primary" onClick={handleUpload} disabled={loading}>
            {loading ? "Processing..." : "⚡ Run ETL"}
          </button>
        </div>

        {result && (
          <div className="etl-result">
            <p className="etl-result-title">✅ ETL Completed — <span>{result.filename}</span></p>
            <div className="etl-stats">
              <div className="etl-stat blue">
                <div className="etl-stat-value">{result.total_rows}</div>
                <div className="etl-stat-label">Total Rows</div>
              </div>
              <div className="etl-stat green">
                <div className="etl-stat-value">{result.valid_rows}</div>
                <div className="etl-stat-label">Inserted</div>
              </div>
              <div className="etl-stat orange">
                <div className="etl-stat-value">{result.duplicate_rows}</div>
                <div className="etl-stat-label">Duplicates</div>
              </div>
              <div className="etl-stat red">
                <div className="etl-stat-value">{result.invalid_rows}</div>
                <div className="etl-stat-label">Invalid</div>
              </div>
            </div>

            {result.errors.length > 0 && (
              <ul className="etl-errors">
                {result.errors.map((e, i) => <li key={i}>⚠️ {e}</li>)}
              </ul>
            )}

            <button className="btn-secondary" onClick={handleDownload} style={{ marginTop: "16px" }}>
              📥 Download Report
            </button>
          </div>
        )}
      </div>

      {analytics.length > 0 && (
        <div className="etl-card" style={{ marginTop: "24px" }}>
          <p className="section-title">📊 Program-wise Analytics</p>
          <table className="etl-table">
            <thead>
              <tr>
                <th>Program</th>
                <th>Total Feedback</th>
                <th>Avg Rating</th>
                <th>Highest</th>
                <th>Lowest</th>
              </tr>
            </thead>
            <tbody>
              {analytics.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{row.program_name}</td>
                  <td>{row.total_feedback}</td>
                  <td style={{ color: "#f97316", fontWeight: 600 }}>{row.avg_rating}</td>
                  <td style={{ color: "#22c55e", fontWeight: 600 }}>{row.highest_rating} ★</td>
                  <td style={{ color: "#ef4444", fontWeight: 600 }}>{row.lowest_rating} ★</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: "24px" }}>
        <button className="btn-secondary" onClick={handleHistory}>
          🕐 View ETL History
        </button>
      </div>

      {showHistory && (
        <div className="etl-card" style={{ marginTop: "20px" }}>
          <p className="section-title">ETL Run History</p>
          {history.length === 0 ? (
            <div className="empty">No ETL runs yet.</div>
          ) : (
            <table className="etl-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Filename</th>
                  <th>Total</th>
                  <th>Inserted</th>
                  <th>Duplicates</th>
                  <th>Invalid</th>
                  <th>Run At</th>
                </tr>
              </thead>
              <tbody>
                {history.map((run) => (
                  <tr key={run.run_id}>
                    <td>{run.run_id}</td>
                    <td>{run.filename}</td>
                    <td>{run.total_rows}</td>
                    <td style={{ color: "#22c55e", fontWeight: 600 }}>{run.valid_rows}</td>
                    <td style={{ color: "#f97316" }}>{run.duplicate_rows}</td>
                    <td style={{ color: "#ef4444" }}>{run.invalid_rows}</td>
                    <td>{new Date(run.run_at).toLocaleString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit"
                    })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default ETLUpload;
