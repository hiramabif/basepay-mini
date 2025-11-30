
import { parseAbi } from "viem";

export const BRIDGE_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder for Monad Bridge Contract

export const bridgeAbi = parseAbi([
    "function lock(address token, uint256 amount, uint256 destChainId, address recipient) external",
    "function mint(address token, uint256 amount, address recipient) external" // For reference, though we only call lock on source
]);

export const DEST_CHAIN_ID_BASE = 8453; // Base Mainnet
