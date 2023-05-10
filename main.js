const { app, BrowserWindow } = require("electron"); // electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
const path = require("path");

const createWindow = () => {
  // 创建浏览窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   preload: path.join(__dirname, "./preload/preload.js"),
    // },
  });

  win.loadFile("index.html");

  // 打开开发工具
  win.webContents.openDevTools();
};

// 这段程序将会在 Electron 结束初始化和创建浏览器窗口的时候调用部分 API 在 ready 事件触发后才能使用
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常对应用程序和它们的菜单栏来说应该时刻保持激活状态, 直到用户使用 Cmd + Q 明确退出
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
