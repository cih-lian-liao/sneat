const express = require("express"); // Web 伺服器框架
const mongoose = require("mongoose"); // MongoDB ODM
const cors = require("cors"); // 跨網域
require('dotenv').config(); // 載入環境變數

// 建立一個 Express 應用實例，後面所有的路由、中介層設定都會掛在這個 app 上
const app = express();

// 先檢查有沒有在環境變數 PORT 設定值（例如雲端部署時會自動給你一個），如果沒有，就用 8080
const PORT = process.env.PORT || 8080;

// 中介層
app.use(cors()); // 開發階段全開 CORS
app.use(express.json()); // 讓 Express 解析 JSON body

// 連線字串：從環境變數讀取，開發環境預設為本地 MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydatas";
// 用 mongoose 連線到 MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

  // 連線成功
  .then(() => console.log("✅ 已連線到 MongoDB（mydatas）"))

  // 連線失敗
  .catch((err) => {
    console.error("連線失敗：", err);
    process.exit(1); // 結束程式，避免繼續執行
  });

  // 掛上路由
  const orderChartRouter = require("./routes/orderchart");
  app.use("/api/orderchart", orderChartRouter);
  app.use("/api/salesstat",  require("./routes/salesstat"));
  app.use("/api/totalrevenue", require("./routes/totalrevenue"));
  app.use("/api/payments", require("./routes/payments"));
  app.use("/api/revenue", require("./routes/revenue"));
  app.use("/api/profitreport", require("./routes/profitreport"));


// 定義 MongoDB 集合中文件的結構（Schema）
// 第一個參數：欄位定義
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, min: 0 },
  },

  // 第二個參數：額外選項 自動加上 createdAt 和 updatedAt 欄位
  {
    timestamps: true,
  }
);

// 建立一個 Mongoose Model（可用來操作某個集合的「類別」/「門面」）
// 語法：mongoose.model(<模型名稱(如果有多個Model避免重複命名建議用跟數據有意義的名稱)>, <schema定義>, <實際Mongodb內的集合名稱>)
const Model = mongoose.model('Model', schema, 'datas');


// GET /api/datas：讀取 datas 集合的所有文件
app.get('/api/datas', async (req, res) => {
  try {
    // 從 MongoDB 查詢資料
    // - Model.find()：不帶條件 → 取全部文件，回傳陣列
    // - .lean()：回傳「純物件」而不是 Mongoose Document（速度較快、佔用較少）
    const rows = await Model.find().lean();

    // 以 JSON 回應（預設 200 OK）
    // 空資料也回 []，屬正常情況，不視為錯誤
    res.json(rows);
  } catch (err) {
    // 任何錯誤（連線、查詢）都會進到這裡
    console.error('GET /api/datas 失敗：', err);

    // 回 500（伺服器錯誤），並給結構化錯誤訊息，方便前端顯示
    res.status(500).json({ error: '获取数据库里面数据失败了' });
  }
});


// app.listen()：啟動 HTTP 伺服器，監聽指定的 PORT
// 啟動後印出連線位址
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://127.0.0.1:${PORT}`);
});
