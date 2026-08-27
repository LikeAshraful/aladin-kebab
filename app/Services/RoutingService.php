<?php

namespace App\Services;

use App\Models\Branch;

class RoutingService
{
    /**
     * Calculate the distance in kilometers between two GPS coordinates using the Haversine formula.
     */
    public function calculateDistanceKm(float $lat1, float $lon1, float $lat2, float $lon2): float
    {
        $earthRadiusKm = 6371;

        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);

        $a = sin($dLat / 2) * sin($dLat / 2) +
            cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
            sin($dLon / 2) * sin($dLon / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return round($earthRadiusKm * $c, 2);
    }

    /**
     * Find the nearest active branch for given coordinates and check delivery eligibility.
     */
    public function findNearestBranch(float $lat, float $lng): ?array
    {
        $branches = Branch::where('is_active', true)->get();

        if ($branches->isEmpty()) {
            return null;
        }

        $branchesWithDistance = $branches->map(function (Branch $branch) use ($lat, $lng) {
            $distance = $this->calculateDistanceKm($lat, $lng, $branch->lat, $branch->lng);
            $isDeliverable = $distance <= $branch->delivery_radius_km;

            return [
                'branch' => $branch,
                'distance_km' => $distance,
                'is_deliverable' => $isDeliverable,
                'delivery_fee' => $branch->delivery_fee,
                'min_order_amount' => $branch->min_order_amount,
                'free_delivery_threshold' => $branch->free_delivery_threshold,
                'estimated_delivery_minutes' => $branch->estimated_delivery_time_minutes + round($distance * 1.5),
            ];
        })->sortBy('distance_km');

        $nearest = $branchesWithDistance->first();

        return [
            'nearest_branch' => $nearest['branch'],
            'distance_km' => $nearest['distance_km'],
            'is_deliverable' => $nearest['is_deliverable'],
            'delivery_fee' => $nearest['delivery_fee'],
            'min_order_amount' => $nearest['min_order_amount'],
            'free_delivery_threshold' => $nearest['free_delivery_threshold'],
            'estimated_delivery_minutes' => $nearest['estimated_delivery_minutes'],
            'all_branches_distance' => $branchesWithDistance->values(),
        ];
    }
}
