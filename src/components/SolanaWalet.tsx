import { Keypair, PublicKey } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import nacl from "tweetnacl";



export default function SolanaWallet( { mnemonic }: { mnemonic: string } ) {
    const [publicKeys,setPublicKeys] = useState<PublicKey[]>([]);
    const [currIndex,setCurrIndex] = useState(0);

    function createKeys(){
        const seed = mnemonicToSeedSync(mnemonic);
        const path = `m/44'/501'/${currIndex}'/0'`;
        const derivedSeed = derivePath(path,seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed);
        const privateKey = secret.secretKey;
        const keypair = Keypair.fromSecretKey(privateKey);

        const publickey = keypair.publicKey;

        setPublicKeys([...publicKeys, publickey]);
        setCurrIndex(currIndex+1);
    }
    return(
        <div>
            <button className="bg-black text-white rounded-full m-4 p-4 hover:bg-slate-800" onClick={createKeys}>Add Solana Wallet</button>
            {publicKeys.map(p=> <li className="font-mono">{p.toString()}</li>)}
        </div>
    )
}