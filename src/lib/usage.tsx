import prisma from "@/lib/prisma"

const FREE_POINTS = 5
const GENERATION_COST = 1
const PREMIUM_PLAN_POINTS = 100

export async function consumeCredits(userId: string, isProUser: boolean) {
    if (!userId) {
        throw new Error("User ID is required")
    }

    try {
        console.log(`Consuming credits for user: ${userId}`)

        const defaultPoints = isProUser ? PREMIUM_PLAN_POINTS : FREE_POINTS

        // Get or create usage record for the user
        let usage = await prisma.usage.findUnique({
            where: { key: userId }
        })

        if (!usage) {
            // Create new usage record with correct points
            usage = await prisma.usage.create({
                data: {
                    key: userId,
                    points: defaultPoints,
                    expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
                }
            })
            console.log(`Created new usage record for user ${userId} with ${defaultPoints} points`)
        }

        // Check if usage has expired
        if (usage.expire && usage.expire < new Date()) {
            // Reset to correct points if expired
            usage = await prisma.usage.update({
                where: { key: userId },
                data: {
                    points: defaultPoints,
                    expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                }
            })
            console.log(`Reset expired usage for user ${userId} to ${defaultPoints} points`)
        }

        // Check if user has enough points
        if (usage.points < GENERATION_COST) {
            throw new Error("Insufficient credits")
        }

        // Consume the credit
        const updatedUsage = await prisma.usage.update({
            where: { key: userId },
            data: {
                points: usage.points - GENERATION_COST
            }
        })

        console.log(`Credits consumed successfully. Remaining: ${updatedUsage.points}`)
        return {
            remainingPoints: updatedUsage.points,
            consumed: GENERATION_COST
        }
    } catch (error) {
        console.error(`Error consuming credits for user ${userId}:`, error)
        throw error
    }
}

export async function getUsageStatus(userId: string, isProUser: boolean) {
    if (!userId) {
        throw new Error("User ID is required")
    }

    try {
        console.log(`Getting usage status for user: ${userId}`)

        const defaultPoints = isProUser ? PREMIUM_PLAN_POINTS : FREE_POINTS

        let usage = await prisma.usage.findUnique({
            where: { key: userId }
        })

        if (!usage) {
            // Return default status for new users
            const expireDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            return {
                remainingPoints: defaultPoints,
                totalPoints: defaultPoints,
                isExpired: false,
                msBeforeNext: 30 * 24 * 60 * 60 * 1000
            }
        }

        // Check if expired
        const isExpired = usage.expire && usage.expire < new Date()

        if (isExpired) {
            // Reset to correct points if expired
            usage = await prisma.usage.update({
                where: { key: userId },
                data: {
                    points: defaultPoints,
                    expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                }
            })
        }

        // Calculate msBeforeNext
        const now = new Date()
        const msBeforeNext = usage.expire ? Math.max(0, usage.expire.getTime() - now.getTime()) : 30 * 24 * 60 * 60 * 1000

        const result = {
            remainingPoints: usage.points,
            totalPoints: defaultPoints,
            isExpired: false,
            msBeforeNext
        }

        console.log(`Usage status retrieved:`, result)
        return result
    } catch (error) {
        console.error(`Error getting usage status for user ${userId}:`, error)
        throw error
    }
}
