const { app, BrowserWindow, Tray, Menu } = require('electron/main')
const path = require('path')
const fs = require('fs')
const keytar = require('keytar')

let tray = null
let win = null

const createWindow = () => {
  win = new BrowserWindow({
    title: 'Electron App',
    width: 800,
    height: 600,
    resizable: true, //false, // Impede o redimensionamento
    maximizable: true, //false, // Impede a maximização
    icon: path.join(__dirname, 'favicon.ico') // Define o ícone da janela
  })

  win.loadURL('https://www.instagram.com/') // Carrega a URL desejada
  win.webContents.on('did-finish-load', () => {
    // Define o título da janela como o título da página carregada
    win.setTitle(win.getTitle())
  })
  win.webContents.on('did-navigate', (event, url) => {
    // Define o título da janela como o título da página carregada
    win.setTitle(win.getTitle())
  }
  )
  win.webContents.on('did-navigate-in-page', (event, url) => {
    // Define o título da janela como o título da página carregada
    win.setTitle(win.getTitle())
  })
  win.webContents.on('page-title-updated', (event, title) => {
    // Define o título da janela como o título da página carregada
    win.setTitle(title)
  })  
  win.setMenu(null) // Remove o menu padrão
  win.setAlwaysOnTop(true) // Mantém a janela sempre no topo  
  //win.setSkipTaskbar(true) // Remove a janela da barra de tarefas
  win.setVisibleOnAllWorkspaces(true) // Torna a janela visível em todas as áreas de trabalho

  // Evento para minimizar a janela na bandeja
  win.on('minimize', (event) => {
    event.preventDefault()
    win.hide() // Oculta a janela
  })
}

app.whenReady().then(() => {
  createWindow()

  // Cria o ícone da bandeja
  tray = new Tray(path.join(__dirname, 'favicon.ico')) // Usa o favicon.ico como ícone

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Restaurar', click: () => win.show() },
    { label: 'Sair', click: () => app.quit() }
  ])
  tray.setToolTip(win.getTitle()) // Usa o título da janela como texto ao passar o mouse sobre o ícone
  tray.setContextMenu(contextMenu)

  // Evento para restaurar a janela ao clicar no ícone da bandeja
  tray.on('click', () => {
    win.show()
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Para salvar uma credencial
//await keytar.setPassword('ElectronInstagram', 'usuario', 'senhaSuperSecreta')

// Para recuperar uma credencial
//const senha = await keytar.getPassword('ElectronInstagram', 'usuario')

// Para deletar uma credencial
//await keytar.deletePassword('ElectronInstagram', 'usuario')