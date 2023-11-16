import { Common } from './common';

export class EngineModel {
    // In pounds of force. Used as a multiplier for results of table 1506
    static maxThrust = 72200;

    /**
     * Maximum N1 in CLB thrust
     * @param i row index (tat) in steps of 4°C
     * @param j col index (pressure altitude)
     * @returns Corrected N1 (CN1)
     */
    static maxClimbThrustTableLeap = [
        [0, 2000, 5000, 8000, 12000, 15000, 17000, 20000, 24000, 27000, 31000, 35000, 39000, 41500],
        [-54.0, 71.8, 73.6, 75.5, 76.8, 78.1, 78.9, 80.1, 81.5, 81.6, 83.0, 83.6, 83.7, 83.3],
        [-50.0, 72.5, 74.3, 76.2, 77.5, 78.8, 79.6, 80.9, 82.2, 82.4, 83.8, 84.4, 84.5, 84.0],
        [-46.0, 73.1, 75.0, 76.9, 78.2, 79.5, 80.3, 81.6, 83.0, 83.1, 84.5, 85.1, 85.3, 84.8],
        [-42.0, 73.8, 75.6, 77.6, 78.9, 80.2, 81.0, 82.3, 83.7, 83.8, 85.3, 85.9, 86.0, 85.5],
        [-38.0, 74.4, 76.3, 78.2, 79.6, 80.9, 81.7, 83.0, 84.4, 84.6, 86.0, 86.6, 86.7, 86.3],
        [-34.0, 75.0, 76.9, 78.9, 80.3, 81.6, 82.4, 83.7, 85.1, 85.3, 86.7, 87.3, 87.5, 87.0],
        [-30.0, 75.7, 77.6, 79.6, 80.9, 82.2, 83.1, 84.4, 85.8, 86.0, 87.5, 88.1, 88.2, 87.7],
        [-26.0, 76.3, 78.2, 80.2, 81.6, 82.9, 83.8, 85.1, 86.5, 86.7, 88.2, 88.8, 88.9, 88.4],
        [-22.0, 76.9, 78.8, 80.9, 82.2, 83.6, 84.4, 85.8, 87.2, 87.4, 88.9, 89.5, 89.6, 89.1],
        [-18.0, 77.5, 79.5, 81.5, 82.9, 84.2, 85.1, 86.5, 87.9, 88.1, 89.6, 90.2, 90.0, 89.5],
        [-14.0, 78.1, 80.1, 82.1, 83.5, 84.9, 85.8, 87.1, 88.6, 88.8, 90.3, 90.0, 89.2, 88.7],
        [-10.0, 78.7, 80.7, 82.8, 84.2, 85.6, 86.4, 87.8, 89.3, 89.5, 91.0, 89.2, 88.4, 87.9],
        [-6.0, 79.3, 81.3, 83.4, 84.8, 86.2, 87.1, 88.5, 90.0, 90.1, 91.1, 88.5, 87.7, 87.1],
        [-2.0, 79.9, 81.9, 84.0, 85.5, 86.8, 87.7, 89.1, 90.6, 90.8, 90.2, 87.7, 86.9, 86.4],
        [2.0, 80.5, 82.5, 84.6, 86.1, 87.5, 88.4, 89.8, 91.3, 90.3, 89.5, 87.0, 86.2, 85.6],
        [6.0, 81.1, 83.1, 85.3, 86.7, 88.1, 89.0, 90.4, 90.5, 89.5, 88.8, 86.3, 85.5, 84.9],
        [10.0, 81.6, 83.7, 85.9, 87.3, 88.7, 89.7, 90.0, 89.6, 88.7, 88.1, 85.6, 84.8, 84.2],
        [14.0, 82.2, 84.3, 86.5, 87.9, 89.4, 89.3, 89.1, 88.7, 87.9, 87.5, 84.8, 83.9, 83.3],
        [18.0, 82.8, 84.9, 87.1, 88.5, 88.6, 88.4, 88.3, 87.9, 87.2, 86.8, 86.8, 86.8, 86.8],
        [22.0, 83.4, 85.5, 86.9, 88.0, 87.8, 87.7, 87.5, 87.2, 86.5, 86.1, 86.1, 86.1, 86.1],
        [26.0, 83.9, 85.7, 86.2, 87.2, 87.1, 87.0, 86.8, 86.5, 85.8, 85.4, 85.4, 85.4, 85.4],
        [30.0, 84.5, 84.9, 85.4, 86.5, 86.4, 86.3, 86.1, 85.8, 85.1, 85.1, 85.1, 85.1, 85.1],
        [34.0, 83.8, 84.2, 84.7, 85.8, 85.7, 85.6, 85.5, 85.1, 85.1, 85.1, 85.1, 85.1, 85.1],
        [38.0, 83.0, 83.4, 83.9, 85.1, 85.0, 84.9, 84.8, 84.8, 84.8, 84.8, 84.8, 84.8, 84.8],
        [42.0, 82.2, 82.6, 83.1, 84.4, 84.4, 84.3, 84.3, 84.3, 84.3, 84.3, 84.3, 84.3, 84.3],
        [46.0, 81.4, 81.8, 82.4, 83.7, 83.7, 83.7, 83.7, 83.7, 83.7, 83.7, 83.7, 83.7, 83.7],
        [50.0, 80.6, 81.1, 81.6, 83.0, 83.0, 83.0, 83.0, 83.0, 83.0, 83.0, 83.0, 83.0, 83.0],
        [54.0, 79.9, 80.4, 80.4, 80.4, 80.4, 80.4, 80.4, 80.4, 80.4, 80.4, 80.4, 80.4, 80.4],
        [58.0, 79.2, 79.2, 79.2, 79.2, 79.2, 79.2, 79.2, 79.2, 79.2, 79.2, 79.2, 79.2, 79.2],
    ];

    /**
     * Table 1502 - CN2 vs CN1 @ Mach 0, 0.2, 0.9
     * n2_to_n1_table
     * @param i row index (n2)
     * @param j 1 = Mach 0, 2 = Mach 0.2, 3 = Mach 0.9
     * @returns Corrected N1 (CN1)
     */
    static table1502 = [
        [0, 0, 0.2, 0.9],
        [18.200000, 0.000000, 0.000000, 17.000000],
        [22.000000, 1.900000, 1.900000, 17.400000],
        [26.000000, 2.500000, 2.500000, 18.200000],
        [57.000000, 12.800000, 12.800000, 27.000000],
        [68.200000, 19.600000, 19.600000, 34.827774],
        [77.000000, 26.000000, 26.000000, 40.839552],
        [83.000000, 31.420240, 31.420240, 44.768766],
        [89.000000, 40.972041, 40.972041, 50.092140],
        [92.800000, 51.000000, 51.000000, 55.042000],
        [97.000000, 65.000000, 65.000000, 65.000000],
        [100.000000, 77.000000, 77.000000, 77.000000],
        [104.000000, 85.000000, 85.000000, 85.500000],
        [116.500000, 101.000000, 101.000000, 101.000000],
    ];

    /**
     * Table 1503 - Turbine LoMach (0) CN2 vs. Throttle @ IAP Ratio 1.00000000, 1.20172257, 1.453783983, 2.175007333, 3.364755652, 4.47246108, 5.415178313
     * mach_0_corrected_commanded_ne_table
     * @param i row index (thrust lever position)
     * @param j IAP ratio
     * @returns Corrected N2 (CN2)
     */
    static table1503 = [
        [0, 1.00000000, 1.20172257, 1.453783983, 2.175007333, 3.364755652, 4.47246108, 5.415178313],
        [0.000000, 68.200000, 69.402657, 70.671269, 73.432244, 76.544349, 78.644882, 78.644882],
        [0.100000, 76.000000, 77.340205, 78.753906, 81.830654, 85.298688, 87.639458, 87.639458],
        [0.200000, 83.000000, 84.463645, 86.007556, 89.367688, 93.155146, 95.711513, 95.711513],
        [0.400000, 92.800000, 94.436461, 96.162664, 99.919535, 104.154188, 107.012390, 107.012390],
        [0.600000, 98.000000, 99.728159, 101.551090, 105.518475, 109.990414, 113.008774, 113.008774],
        [0.750000, 101.500000, 103.289879, 105.177914, 109.286991, 113.918643, 117.044802, 117.044802],
        [0.900000, 103.000000, 104.816330, 106.000000, 110.902070, 115.602170, 118.774528, 118.774528],
        [1.000000, 104.200000, 106.037491, 107.975750, 112.194133, 116.948991, 120.158309, 120.158309],
    ];

    /**
     * Table 1504 - Turbine HiMach (0.9) CN2 vs. Throttle @ IAP Ratio 1.00000000, 1.20172257, 1.453783983, 2.175007333, 3.364755652, 4.47246108, 5.415178313
     * mach_hi_corrected_commanded_ne_table
     * @param i row index (thrust lever position)
     * @param j IAP ratio
     * @returns Corrected N2 (CN2)
     */
    static table1504 = [
        [0, 1.00000000, 1.20172257, 1.453783983, 2.175007333, 3.364755652, 4.47246108, 5.415178313],
        [0.000000, 63.267593, 64.383271, 65.560133, 68.121427, 71.008456, 72.957073, 72.957073],
        [0.100000, 70.503476, 71.746753, 73.058212, 75.912441, 79.129658, 81.301137, 81.301137],
        [0.200000, 76.997217, 78.355007, 79.787258, 82.904376, 86.417916, 88.789399, 88.789399],
        [0.400000, 86.088455, 87.606562, 89.207922, 92.693086, 96.621477, 99.272967, 99.272967],
        [0.600000, 90.912377, 92.515550, 94.206642, 97.887095, 102.035612, 104.835676, 104.835676],
        [0.750000, 94.159247, 95.819677, 97.571165, 101.383063, 105.679741, 108.579808, 108.579808],
        [0.900000, 95.550763, 97.235732, 98.333795, 102.881334, 107.241510, 110.184435, 110.184435],
        [1.000000, 104.200000, 106.037491, 107.975750, 112.194133, 116.948991, 120.158309, 120.158309],
    ];

    /**
     * Table 1506 - Corrected net Thrust vs CN1 @ Mach 0 to 0.9 in 0.1 steps
     * n1_and_mach_on_thrust_table
     * @param i row index (CN1)
     * @param j mach
     * @returns Corrected net thrust (pounds of force)
     */
    static table1506 = [
        [0.000000, 0.000000, 0.100000, 0.200000, 0.300000, 0.400000, 0.500000, 0.600000, 0.700000, 0.800000, 0.900000],
        [0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000, 0.000000],
        [20.000000, 0.080273, 0.050660, 0.054029, 0.034096, -0.067284, -0.007284, 0.032923, -0.025841, -0.055399, -0.228717],
        [25.000000, 0.132910, 0.091802, 0.094901, 0.040404, -0.059593, 0.003429, 0.065444, 0.028672, -0.006204, -0.179028],
        [30.000000, 0.182715, 0.128642, 0.133300, 0.046748, -0.032611, 0.033990, 0.063079, 0.123186, 0.178054, -0.109391],
        [35.000000, 0.255971, 0.196661, 0.202831, 0.065921, -0.025281, 0.036062, 0.087188, 0.157200, 0.190280, -0.033631],
        [40.000000, 0.326378, 0.259090, 0.284088, 0.089579, 0.007905, 0.079621, 0.119790, 0.234284, 0.314218, 0.039370],
        [45.000000, 0.393280, 0.370036, 0.316707, 0.132419, 0.041418, 0.106757, 0.146090, 0.198509, 0.202480, 0.104880],
        [50.000000, 0.452337, 0.431066, 0.371353, 0.178174, 0.077429, 0.134915, 0.171171, 0.227419, 0.252601, 0.161526],
        [55.000000, 0.509468, 0.493568, 0.429961, 0.229106, 0.118650, 0.167223, 0.198383, 0.255660, 0.288704, 0.210531],
        [60.000000, 0.594614, 0.559955, 0.494629, 0.287477, 0.167773, 0.206899, 0.231404, 0.287148, 0.324556, 0.254964],
        [65.000000, 0.660035, 0.632604, 0.567151, 0.355055, 0.226928, 0.256669, 0.273627, 0.325850, 0.364441, 0.299012],
        [70.000000, 0.733601, 0.713506, 0.648571, 0.432623, 0.297163, 0.318210, 0.327559, 0.375142, 0.412485, 0.347269],
        [75.000000, 0.818693, 0.803880, 0.738756, 0.519514, 0.377939, 0.391604, 0.394241, 0.437197, 0.472005, 0.404042],
        [80.000000, 0.910344, 0.903795, 0.835982, 0.613166, 0.466644, 0.474822, 0.472689, 0.512384, 0.544867, 0.472679],
        [85.000000, 1.025165, 1.011823, 0.936548, 0.708692, 0.558128, 0.563210, 0.559351, 0.598690, 0.630870, 0.554907],
        [90.000000, 1.157049, 1.124695, 1.034400, 0.798466, 0.644251, 0.649011, 0.647581, 0.691153, 0.727149, 0.650203],
        [95.000000, 1.281333, 1.236993, 1.120774, 0.871733, 0.713455, 0.720890, 0.727136, 0.781322, 0.827588, 0.755167],
        [100.000000, 1.357935, 1.340844, 1.183864, 0.914234, 0.750352, 0.763488, 0.783684, 0.834691, 0.877963, 0.799115],
        [105.000000, 1.378826, 1.359626, 1.208498, 0.935750, 0.769609, 0.781137, 0.800375, 0.850444, 0.892832, 0.812086],
        [110.000000, 1.392754, 1.372148, 1.229322, 0.953937, 0.785886, 0.796054, 0.814483, 0.863759, 0.905400, 0.823051],
    ];

    /**
     * Placeholder
     * @param table
     * @param i
     * @param j
     * @returns
     */
    static tableInterpolation(table: number[][], i: number, j: number): number {
        const numRows = table.length;
        const numCols = table[0].length;
        // Iterate through rows to find the upper bound to i
        let r: number;
        for (r = 1; r < numRows; r++) {
            if (table[r][0] > i) {
                break;
            }
        }
        // Get lower bound to i
        const r1 = Math.max(1, r - 1);
        const r2 = Math.min(numRows - 1, r);
        // Iterate through rows to find the upper bound to j
        let c: number;
        for (c = 1; c < numCols; c++) {
            if (table[0][c] > j) {
                break;
            }
        }
        // Get the lower bound to j
        const c1 = Math.max(1, c - 1);
        const c2 = Math.min(numCols - 1, c);

        const interpolatedRowAtC1 = r1 === r2 ? table[r1][c1] : Common.interpolate(i, table[r1][0], table[r2][0], table[r1][c1], table[r2][c1]);
        const interpolatedRowAtC2 = r1 === r2 ? table[r1][c2] : Common.interpolate(i, table[r1][0], table[r2][0], table[r1][c2], table[r2][c2]);

        if (c1 === c2) {
            return interpolatedRowAtC1;
        }

        return Common.interpolate(j, table[0][c1], table[0][c2], interpolatedRowAtC1, interpolatedRowAtC2);
    }

    /**
     * Retrieve a bilinear interpolated row value from a table
     * @param table
     * @param j Value on column axis
     * @param result Value normally returned as result
     */
    static reverseTableInterpolation(table: number[][], j: number, result: number): number {
        const numRows = table.length;
        const numCols = table[0].length;

        let c: number;
        for (c = 1; c < numCols; c++) {
            if (table[0][c] > j) {
                break;
            }
        }
        const c1 = Math.max(1, c - 1);
        const c2 = Math.min(numCols - 1, c);

        let r: number;
        for (r = 1; r < numRows; r++) {
            if (table[r][c1] > result) {
                break;
            }
        }
        const r1 = Math.max(1, r - 1);
        const r2 = Math.min(numRows - 1, r);
        for (r = 1; r < numRows; r++) {
            if (table[r][c2] > result) {
                break;
            }
        }
        const r3 = Math.max(1, r - 1);
        const r4 = Math.min(numRows - 1, r);

        const interpolatedRowAtC1 = r1 === r2 ? table[r1][0] : Common.interpolate(result, table[r1][c1], table[r2][c1], table[r1][0], table[r2][0]);
        const interpolatedRowAtC2 = r3 === r4 ? table[r3][0] : Common.interpolate(result, table[r3][c2], table[r4][c2], table[r3][0], table[r4][0]);

        return Common.interpolate(j, table[0][c1], table[0][c2], interpolatedRowAtC1, interpolatedRowAtC2);
    }

    /**
     * Placeholder
     * @param cn1 corrected N1 %
     * @param mach mach value
     * @param alt altitude in feet
     * @returns fuel flow, in pounds per hour (per engine)
     */
    static getCorrectedFuelFlow(cn1: number, mach: number, alt: number): number {
        const coefficients = [-639.6602981, 0.00000e+00, 1.03705e+02, -2.23264e+03, 5.70316e-03, -2.29404e+00, 1.08230e+02,
            2.77667e-04, -6.17180e+02, -7.20713e-02, 2.19013e-07, 2.49418e-02, -7.31662e-01, -1.00003e-05,
            -3.79466e+01, 1.34552e-03, 5.72612e-09, -2.71950e+02, 8.58469e-02, -2.72912e-06, 2.02928e-11];

        const flow = coefficients[0] + coefficients[1] + (coefficients[2] * cn1) + (coefficients[3] * mach) + (coefficients[4] * alt)
                    + (coefficients[5] * cn1 ** 2) + (coefficients[6] * cn1 * mach) + (coefficients[7] * cn1 * alt)
                    + (coefficients[8] * mach ** 2) + (coefficients[9] * mach * alt) + (coefficients[10] * alt ** 2)
                    + (coefficients[11] * cn1 ** 3) + (coefficients[12] * cn1 ** 2 * mach) + (coefficients[13] * cn1 ** 2 * alt)
                    + (coefficients[14] * cn1 * mach ** 2) + (coefficients[15] * cn1 * mach * alt) + (coefficients[16] * cn1 * alt ** 2)
                    + (coefficients[17] * mach ** 3) + (coefficients[18] * mach ** 2 * alt) + (coefficients[19] * mach * alt ** 2)
                    + (coefficients[20] * alt ** 3);

        return flow * 2.45;
    }

    // static getCN1fromUncorrectedThrust(thrust: number)

    static getCorrectedN1(n1: number, theta2: number): number {
        return n1 / Math.sqrt(theta2);
    }

    static getUncorrectedN1(cn1: number, theta2: number): number {
        return cn1 * Math.sqrt(theta2);
    }

    static getUncorrectedN2(cn2: number, theta2: number): number {
        return cn2 * Math.sqrt(theta2);
    }

    static getUncorrectedThrust(correctedThrust: number, delta2: number): number {
        return correctedThrust * delta2;
    }

    static getUncorrectedFuelFlow(correctedFuelFlow: number, delta2: number, theta2: number): number {
        return correctedFuelFlow * delta2 * Math.sqrt(theta2);
    }

    static getCorrectedThrust(uncorrectedThrust: number, delta2: number): number {
        return uncorrectedThrust / delta2;
    }

    static getIdleN1(altitude: Feet, mach: Mach, tropoAltitude: Feet): number {
        const delta = Common.getDelta(altitude, altitude > tropoAltitude);
        const iap = 1 / delta;

        const theta = Common.getTheta(altitude, 0, altitude > tropoAltitude);
        const theta2 = Common.getTheta2(theta, mach);

        const lowMachCn2 = EngineModel.tableInterpolation(EngineModel.table1503, 0, iap);
        const highMachCn2 = EngineModel.tableInterpolation(EngineModel.table1504, 0, iap);

        const cn2 = Common.interpolate(mach, 0, 0.9, lowMachCn2, highMachCn2);
        const cn1 = EngineModel.tableInterpolation(EngineModel.table1502, cn2, mach);

        const n1 = cn1 * Math.sqrt(theta2);
        return n1;
    }
}
