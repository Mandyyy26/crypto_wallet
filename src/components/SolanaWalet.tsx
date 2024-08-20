import { Keypair, PublicKey } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import nacl from "tweetnacl";




export default function SolanaWallet( { mnemonic }: { mnemonic: string } ) {
    const [publicKeys,setPublicKeys] = useState<PublicKey[]>([]);
    const [privateKeys,setPrivateKeys] = useState<string[]>([]);

    const [currIndex,setCurrIndex] = useState(0);

    function createKeys(){
        const seed = mnemonicToSeedSync(mnemonic);
        const path = `m/44'/501'/${currIndex}'/0'`;
        const derivedSeed = derivePath(path,seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed);
        const privateKey = Buffer.from(secret.secretKey);
        const keypair = Keypair.fromSecretKey(privateKey);

        const publickey = keypair.publicKey;

        setPrivateKeys([...privateKeys, Buffer.from(privateKey).toString("base64")]);
        setPublicKeys([...publicKeys, new PublicKey(publickey.toBase58())]);
        setCurrIndex(currIndex+1);
    }
    return(
        <div>
            <button className="bg-black text-white rounded-full m-4 p-4 hover:bg-slate-800" onClick={createKeys}>Add Solana Wallet</button>
            <div className="grid grid-cols-2 gap-1">
                <div>{publicKeys.map(p=> <li className="font-mono"><b className="text-purple-700">Public key  <br /></b> {p.toString()}</li>)}</div>
                <div>{privateKeys.map(p=> <li className="font-mono"><b className="text-green-600">Private key <br /></b>{p.toString()}</li>)}</div>
            </div>
        </div>
    )
}