import prisma from "@/lib/prisma"
import { PlanType } from "@/generated/prisma" // adjust import path

const FREE_POINTS = 5
const GENERATION_COST = 1
const PREMIUM_PLAN_POINTS = 100

function getPlanDefaults(isProUser: boolean) {
  return {
    planType: isProUser ? PlanType.PRO : PlanType.FREE, // ✅ use enum, not string
    points: isProUser ? PREMIUM_PLAN_POINTS : FREE_POINTS,
  }
}

export async function consumeCredits(userId: string, isProUser: boolean) {
  if (!userId) {
    throw new Error("User ID is required")
  }

  try {
    console.log(`Consuming credits for user: ${userId}`)

    const { planType, points: defaultPoints } = getPlanDefaults(isProUser)

    // Find existing usage
    let usage = await prisma.usage.findUnique({
      where: { key: userId },
    })

    // Create new usage record
    if (!usage) {
      usage = await prisma.usage.create({
        data: {
          key: userId,
          points: defaultPoints,
          planType, // ✅ correct now
          expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      })
      console.log(`Created usage for ${userId} with ${defaultPoints} points`)
    }

    // Handle plan upgrade/downgrade
    if (usage.planType !== planType) {
      usage = await prisma.usage.update({
        where: { key: userId },
        data: {
          points: defaultPoints,
          planType,
          expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      })
      console.log(`Plan changed for ${userId} → ${planType}, reset to ${defaultPoints} points`)
    }

    // Reset expired usage
    if (usage.expire && usage.expire < new Date()) {
      usage = await prisma.usage.update({
        where: { key: userId },
        data: {
          points: defaultPoints,
          planType,
          expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      })
      console.log(`Expired usage reset for ${userId} → ${defaultPoints} points`)
    }

    // Check credits
    if (usage.points < GENERATION_COST) {
      throw new Error("Insufficient credits")
    }

    // Consume
    const updatedUsage = await prisma.usage.update({
      where: { key: userId },
      data: {
        points: usage.points - GENERATION_COST,
      },
    })

    console.log(`Credits consumed. Remaining: ${updatedUsage.points}`)
    return {
      remainingPoints: updatedUsage.points,
      consumed: GENERATION_COST,
    }
  } catch (error) {
    console.error(`Error consuming credits for ${userId}:`, error)
    throw error
  }
}

export async function getUsageStatus(userId: string, isProUser: boolean) {
  if (!userId) {
    throw new Error("User ID is required")
  }

  try {
    console.log(`Getting usage status for ${userId}`)

    const { planType, points: defaultPoints } = getPlanDefaults(isProUser)

    let usage = await prisma.usage.findUnique({
      where: { key: userId },
    })

    // New user
    if (!usage) {
      const expireDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      return {
        remainingPoints: defaultPoints,
        totalPoints: defaultPoints,
        planType,
        isExpired: false,
        msBeforeNext: 30 * 24 * 60 * 60 * 1000,
      }
    }

    // Handle plan change
    if (usage.planType !== planType) {
      usage = await prisma.usage.update({
        where: { key: userId },
        data: {
          points: defaultPoints,
          planType,
          expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      })
      console.log(`Plan changed for ${userId} → ${planType}, reset to ${defaultPoints} points`)
    }

    // Expiry check
    const now = new Date()
    const isExpired = usage.expire && usage.expire < now

    if (isExpired) {
      usage = await prisma.usage.update({
        where: { key: userId },
        data: {
          points: defaultPoints,
          planType,
          expire: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      })
      console.log(`Expired usage reset for ${userId}`)
    }

    const msBeforeNext =
      usage.expire?.getTime() && usage.expire.getTime() > now.getTime()
        ? usage.expire.getTime() - now.getTime()
        : 30 * 24 * 60 * 60 * 1000

    const result = {
      remainingPoints: usage.points,
      totalPoints: defaultPoints,
      planType,
      isExpired: false,
      msBeforeNext,
    }

    console.log(`Usage status:`, result)
    return result
  } catch (error) {
    console.error(`Error getting usage status for ${userId}:`, error)
    throw error
  }
}
