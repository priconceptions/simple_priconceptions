export default function Streaks() {
  // Get current date info
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11
  const currentDay = currentDate.getDate();

  // Month data
  const months = [
    { name: "JAN", days: 31, month_number: 1 },
    { name: "FEB", days: currentYear % 4 === 0 ? 29 : 28, month_number: 2 },
    { name: "MAR", days: 31, month_number: 3 },
    { name: "APR", days: 30, month_number: 4 },
    { name: "MAY", days: 31, month_number: 5 },
    { name: "JUN", days: 30, month_number: 6 },
    { name: "JULY", days: 31, month_number: 7 },
    { name: "AUG", days: 31, month_number: 8 },
    { name: "SEPT", days: 30, month_number: 9 },
    { name: "OCT", days: 31, month_number: 10 },
    { name: "NOV", days: 30, month_number: 11 },
    { name: "DEC", days: 31, month_number: 12 },
  ];

  // list of years from 2020 to 2020+90
  const years = [2020, 2021, 2022, 2023, 2024, 2025].reverse();

  const isCurrentDate = (year, month, day) => {
    return (
      year === currentYear &&
      month.month_number === currentMonth &&
      day === currentDay
    );
  };

  return (
    <div>
      {years.map((year) => (
        <div key={year} style={{ marginBottom: "1rem", color: "#64748b" }}>
          {year}
          {months.map((month) => (
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                marginBottom: "0.2rem",
                color: "#979aa1ff",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {month.name}
              {/* Days grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(22px, 1fr))",
                  gap: "1px",
                  maxWidth: "100%",
                }}
              >
                {Array.from({ length: month.days }, (_, i) => i + 1).map(
                  (day) => (
                    <div
                      key={day}
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "1px solid #d1d5db",
                        backgroundColor: isCurrentDate(year, month, day) 
                          ? "#ec4040ff" 
                          : "#ffffff",
                        color: "#374151",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        fontFamily: "inherit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {day}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
