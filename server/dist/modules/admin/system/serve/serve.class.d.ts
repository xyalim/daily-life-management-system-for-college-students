export declare class Runtime {
    os?: string;
    arch?: string;
    nodeVersion?: string;
    npmVersion?: string;
}
export declare class CoreLoad {
    rawLoad?: number;
    rawLoadIdle?: number;
}
export declare class Cpu {
    manufacturer?: string;
    brand?: string;
    physicalCores?: number;
    model?: string;
    speed?: number;
    rawCurrentLoad?: number;
    rawCurrentLoadIdle?: number;
    coresLoad?: CoreLoad[];
}
export declare class Disk {
    size?: number;
    used?: number;
    available?: number;
}
export declare class Memory {
    total?: number;
    available?: number;
}
export declare class ServeStatInfo {
    runtime?: Runtime;
    cpu?: Cpu;
    disk?: Disk;
    memory?: Memory;
}
