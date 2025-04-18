// 任務與對應行政區的設定
const missions = {
  "mission1": { regionId: "xinzhuang", name: "新莊任務" },
  "mission2": { regionId: "banqiao", name: "板橋任務" },
  "mission3": { regionId: "sanchong", name: "三重任務" },
  "mission4": { regionId: "xindian", name: "新店任務" },
  "mission5": { regionId: "tamsui", name: "淡水任務" }
};

// 讀取已完成的任務
const completed = JSON.parse(localStorage.getItem("completedMissions")) || [];

// 取得 URL 中的任務代碼
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");

// 如果有任務代碼且尚未完成，則標記為已完成
if (code && missions[code]) {
  const regionId = missions[code].regionId;
  if (!completed.includes(regionId)) {
    completed.push(regionId);
    localStorage.setItem("completedMissions", JSON.stringify(completed));
    document.getElementById("message").innerText = `🎉 恭喜完成「${missions[code].name}」！`;
  } else {
    document.getElementById("message").innerText = `✅ 你已完成「${missions[code].name}」`;
  }
}

// 載入 SVG 地圖並標記已完成的區域
fetch("newtaipei.svg")
  .then(response => response.text())
  .then(svgText => {
    document.getElementById("map-container").innerHTML = svgText;
    // 標記已完成的區域
    completed.forEach(regionId => {
      const region = document.getElementById(regionId);
      if (region) {
        region.classList.add("completed");
      }
    });
  });
