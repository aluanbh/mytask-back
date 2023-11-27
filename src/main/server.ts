import './config/module-alias'
import 'dotenv/config'
import { app } from '@/main/config/app'

app.listen(process.env.PORT || 8080, () => console.log(`Server running at http://localhost:${process.env.PORT}`))