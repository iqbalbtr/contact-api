import { logger } from "./application/logging.js"
import { web } from "./application/web.js"

web.listen(3001, () => {
    logger.info("App running at server 3001")
})