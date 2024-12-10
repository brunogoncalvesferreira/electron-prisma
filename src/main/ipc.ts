import { ipcMain } from "electron";
import { createUser, type Props } from "./controllers/create-user";
import { listUsers } from "./controllers/list-users";

ipcMain.handle('createUser', async (_,data: Props) => {
  return await createUser(data)
})

ipcMain.handle('listUsers', async () => {
  return await listUsers()
})