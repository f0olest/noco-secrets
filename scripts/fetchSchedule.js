const fs = require("fs");

async function run() {
  const res = await fetch(
    "http://80.93.61.249:8080/api/v2/tables/m0al196jd3i81ph/records?viewId=vwkiqr9k80063ocj&limit=100",
    {
      headers: {
        "xc-token": process.env.NOCODB_TOKEN
      }
    }
  );

  const data = await res.json();

  // Берём только list
  const cleaned = (data.list || []).map(r => ({
    date: r.fields?.date || null,
    dj_name: r.fields?.["dj name"] || "",
    ig: r.fields?.["ig @"] || "",
    pic: r.fields?.pic?.[0]?.url || null
  }));

  fs.writeFileSync(
    "schedule.json",
    JSON.stringify(cleaned, null, 2)
  );
}

run();
