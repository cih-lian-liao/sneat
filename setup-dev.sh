# 開發環境設置腳本
# 在專案根目錄執行

echo "🚀 設置 Sneat 開發環境..."

# 安裝根目錄依賴
npm install

# 安裝客戶端依賴
cd client && npm install && cd ..

# 安裝服務端依賴
cd server && npm install && cd ..

echo "✅ 開發環境設置完成！"
echo ""
echo "📋 啟動命令："
echo "  後端: cd server && npm run dev"
echo "  前端: cd client && npm run dev"
echo "  Vercel: vercel dev"
echo ""
echo "🌐 部署 URL: https://sneat-cihlianliao.vercel.app"
