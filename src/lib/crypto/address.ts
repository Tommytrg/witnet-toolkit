import { bech32 } from "@scure/base";
import { hexToBytes, bytesToHex } from "@noble/hashes/utils"

class PublicKeyHash {
  private _hash: Uint8Array;

  // Constructor
  constructor(params: { hash?: Uint8Array } = {}) {
    this._hash = params.hash || new Uint8Array();
  }

  // Factory method to create an instance from an address
  static fromAddress(address: string): PublicKeyHash {
    if (!address.startsWith("wit")) {
      throw new Error("Invalid address");
    }
    const decoded = bech32.decode<'wit'>(address as `wit1${string}`) 
    // https://en.bitcoin.it/wiki/Bech32 witness version?
    const [_version, ...dataW] = decoded.words;
    const program = bech32.fromWords(dataW);

    return new PublicKeyHash({ hash: program });
  }

  // Factory method to create an instance from a buffer
  static fromBuffer(buffer: Uint8Array): PublicKeyHash {
    return new PublicKeyHash({ hash: buffer });
  }

  // Clone the current instance
  clone(): PublicKeyHash {
    return new PublicKeyHash({ hash: this._hash.slice() });
  }

  // Convert hash to hex string
  get hex(): string {
    return bytesToHex(this._hash);
  }

  // Get address from hash
  get address(): string {
    return bech32.encodeFromBytes("wit", this._hash);
  }

  // Get protocol buffer bytes
  get pbBytes(): Uint8Array {
    return this.toBuffer();
  }

  // Get hash
  get hash(): Uint8Array {
    return this._hash;
  }

  // Set hash
  set hash(value: Uint8Array) {
    this._hash = value;
  }

  // Check if hash is set
  hasHash(): boolean {
    return this._hash.length > 0;
  }

  // Clear hash
  clearHash(): void {
    this._hash = new Uint8Array();
  }

  // Serialize to a buffer
  toBuffer(): Uint8Array {
    return this._hash; // Replace with serialization logic if needed
  }
}

// class Address {
//   address: string;
//   publicKey?: WitPublicKey;
//   publicKeyHash?: PublicKeyHash;
//   // private _utxoInfo?: UtxoInfo;
//   // utxoPool?: UtxoPool;

//   constructor(params: { address: string; publicKeyHash?: PublicKeyHash; publicKey?: WitPublicKey }) {
//     this.address = params.address;
//     this.publicKeyHash = params.publicKeyHash;
//     this.publicKey = params.publicKey;

//     bech32.encodeFromBytes()
//   }
// }
