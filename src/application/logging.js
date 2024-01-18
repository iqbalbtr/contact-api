import winston from "winston";
import { prisma } from "../../prisma/index.js";

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({})
    ]
})

prisma.$on("error", (e) => {
    logger.warn(e)
})

prisma.$on("warn", (e) => {
    logger.warn(e)
})

prisma.$on("query", (e) => {
    logger.info(e)
})

prisma.$on("info", (e) => {
    logger.info(e)
})