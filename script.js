const missions = {
  "mission1": { regionId: "Xinzhuang", name: "新莊任務" },
  "mission4": { regionId: "Shuangxi", name: "雙溪任務" },
  "mission5": { regionId: "Tamsui", name: "淡水任務" }
};

const completed = JSON.parse(localStorage.getItem("completedMissions")) || [];

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");
const messageBox = document.getElementById("message");

if (code && missions[code]) {
  const regionId = missions[code].regionId;
  if (!completed.includes(regionId)) {
    completed.push(regionId);
    localStorage.setItem("completedMissions", JSON.stringify(completed));
    messageBox.innerText = `🎉 恭喜完成「${missions[code].name}」！`;
  } else {
    messageBox.innerText = `✅ 你已完成「${missions[code].name}」`;
  }
}

completed.forEach(regionId => {
  const layer = document.getElementById(`light-${regionId}`);
  if (layer) {
    layer.classList.add("active");
  }
});
