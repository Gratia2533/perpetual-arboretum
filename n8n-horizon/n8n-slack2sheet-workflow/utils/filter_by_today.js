// 取得今天日期，格式為 YYYYMMDD
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const todayStr = `${yyyy}${mm}${dd}`;

// 取得輸入的 JSON 資料
const inputData = $input.all();

// 篩選包含今天日期的訊息，並只保留 text 欄位
const filteredItems = inputData
  .filter(item => {
    const text = item.json.text;
    return text && text.includes(todayStr);
  })
  .map(item => ({
    json: {
      text: item.json.text
    }
  }));

// 回傳篩選後的結果
return filteredItems;
