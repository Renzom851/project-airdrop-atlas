export const S1_NETWORK_POOL = 90_000_000
export const S2_ASSUMED_POOL = 90_000_000
export const S2_EPOCH_COUNT = 20

const s1NetworkSnapshotRewards = [
  { label: 'Closed Alpha', allocation: 15_000_000, rewards: [7520.8, 1077.5, 145, 125.7, 107.7, 94.3, 75.4, 41.9, 16.8] },
  { label: 'Epoch 1', allocation: 10_000_000, rewards: [3085.5, 442, 59.5, 51.6, 44.2, 38.7, 30.9, 17.2, 6.9] },
  { label: 'Epoch 2', allocation: 10_000_000, rewards: [1906.4, 272.6, 36.7, 31.8, 27.3, 23.9, 19.1, 10.6, 4.2] },
  { label: 'Epoch 3', allocation: 10_000_000, rewards: [614.8, 87.8, 11.8, 10.3, 8.8, 7.7, 6.2, 3.4, 1.4] },
  { label: 'Epoch 4', allocation: 10_000_000, rewards: [446.5, 63.8, 8.6, 7.4, 6.4, 5.6, 4.5, 2.5, 1] },
  { label: 'Epoch 5', allocation: 10_000_000, rewards: [572.4, 81.8, 11, 9.6, 8.2, 7.2, 5.7, 3.2, 1.3] },
  { label: 'Epoch 6', allocation: 10_000_000, rewards: [652, 93.2, 12.6, 10.9, 9.3, 8.2, 6.5, 3.6, 1.5] },
  { label: 'Epoch 7', allocation: 10_000_000, rewards: [637.1, 91, 12.3, 10.6, 9.1, 8, 6.4, 3.5, 1.4] },
  { label: 'Bonus Epoch', allocation: 5_000_000, rewards: [442.77, 63.29, 8.52, 7.38, 6.33, 5.54, 4.43, 2.25, 0.98] },
]

export function getS2RewardsByTier(assumedPool = S2_ASSUMED_POOL) {
  const poolScale = assumedPool / S1_NETWORK_POOL
  return s1NetworkSnapshotRewards[0].rewards.map((_, tierIndex) => {
    const s1TotalForTier = s1NetworkSnapshotRewards.reduce((sum, epoch) => sum + epoch.rewards[tierIndex], 0)
    return (s1TotalForTier * poolScale) / S2_EPOCH_COUNT
  })
}

export function getEpochs(assumedPool = S2_ASSUMED_POOL) {
  const s2RewardsByTier = getS2RewardsByTier(assumedPool)
  return Array.from({ length: S2_EPOCH_COUNT }, (_, index) => {
    const number = index + 1
    return {
      id: `s2e${number}`,
      label: `Epoch ${number}`,
      allocation: assumedPool / S2_EPOCH_COUNT,
      rewards: s2RewardsByTier,
    }
  })
}

export const s2RewardsByTier = getS2RewardsByTier()
export const epochs = getEpochs()

export const epochIds = Array.from({ length: S2_EPOCH_COUNT }, (_, index) => {
  const number = index + 1
  return `s2e${number}`
})

// Grass published S1 tier payouts but did not publish a deterministic public points-to-tier formula.
// These automatic bands are a disclosed heuristic used for S2 projection.
export const tierBands = [
  { tier: 1, min: 2_500_000, label: '2.5M+' },
  { tier: 2, min: 1_000_000, label: '1M–2.5M' },
  { tier: 3, min: 500_000, label: '500K–1M' },
  { tier: 4, min: 200_000, label: '200K–500K' },
  { tier: 5, min: 100_000, label: '100K–200K' },
  { tier: 6, min: 50_000, label: '50K–100K' },
  { tier: 7, min: 20_000, label: '20K–50K' },
  { tier: 8, min: 5_000, label: '5K–20K' },
  { tier: 9, min: 500, label: '500–5K' },
]

export function estimateTier(points) {
  const numeric = Number(points) || 0
  return tierBands.find((band) => numeric >= band.min)?.tier ?? null
}

export function formatNumber(value, maxDigits = 2) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: maxDigits }).format(value)
}
