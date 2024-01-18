import { logger } from "./app/logging.js"
import { web } from "./app/web.js"
import 'dotenv/config.js'

web.listen(3001, () => {
    logger.info("App running at server 3001")
})