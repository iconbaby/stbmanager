const { app, BrowserWindow } = require("electron")

function createWindow() {
    //创建浏览器窗口
    win = new BrowserWindow({ width: 800, height: 600 })

    //加载应用的index.html
    win.loadFile('index.html')

    //当window 被关闭，这个事件会被触发
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
    })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用
app.on('ready', createWindow)

// 监听应用程序对象中的所有浏览器窗口对象是否全部被关闭，如果全部被关闭，则退出整个应用程序。该
app.on("window-all-closed",function(){
    // 判断当前操作系统是否是window系统，因为这个事件只作用在window系统中
    if(process.platform!="darwin"){
        // 退出整个应用程序
        app.quit();
    }
});

// 监听应用程序图标被通过点或者没有任何浏览器窗口显示在桌面上，那我们应该重新创建并打开浏览器窗口，避免Mac OS X系统回收或者销毁浏览器窗口
app.on("activate",function(){
    if(mainWindow===null){
        createWindow();
    }
});