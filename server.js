import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { existsSync, mkdirSync } from 'fs'
import jsonServer from 'json-server'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

// Crée le dossier uploads s'il n'existe pas
const uploadsDir = path.join(__dirname, 'public/uploads')
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true })

app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.use('/uploads', express.static(uploadsDir))

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

app.post('/upload-pdf', upload.single('pdf'), (req, res) => {
  console.log('Upload reçu:', req.file)
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu' })
  res.json({ path: `/uploads/${req.file.filename}` })
})

const router = jsonServer.router(path.join(__dirname, 'server/db.json'))
const middlewares = jsonServer.defaults()
app.use(middlewares)
app.use(router)

app.listen(3000, () => {
  console.log('✅ Serveur sur http://localhost:3000')
  console.log('📁 Uploads dans:', uploadsDir)
})
