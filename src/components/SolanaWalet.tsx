import { Keypair, PublicKey } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import nacl from "tweetnacl";




export default function SolanaWallet( { mnemonic }: { mnemonic: string } ) {
    const [publicKeys,setPublicKeys] = useState<PublicKey[]>([]);

    const [currIndex,setCurrIndex] = useState(0);

    function createKeys(){
        if(mnemonic === "" || mnemonic.split(" ").length !== 12){
            alert("Please enter a valid Mnemonic Phrase");
            return;
        }
        const seed = mnemonicToSeedSync(mnemonic);
        const path = `m/44'/501'/${currIndex}'/0'`;
        const derivedSeed = derivePath(path,seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed);
        const privateKey = Buffer.from(secret.secretKey);
        const keypair = Keypair.fromSecretKey(privateKey);

        const publickey = keypair.publicKey;


        setPublicKeys([...publicKeys, new PublicKey(publickey.toBase58())]);
        setCurrIndex(currIndex+1);
    }
    return(
        <div>
            <button className="bg-black text-white rounded-full m-4 p-4 hover:bg-slate-800" onClick={createKeys}>Add Solana Wallet</button>
            <button className="m-2 p-2 bg-red-800 rounded-lg text-white hover:bg-red-600" onClick={()=>{
            setPublicKeys([]);
            setCurrIndex(0);
         }}>Reset</button>
            <div className="text-center">
                <div>{publicKeys.map(p=> <li className="font-mono p-4"><b className="text-purple-700">Public key  <br /></b> {p.toString()} <button className="bg-green-700 text-white rounded-full p-4 m-4 hover:bg-green-900">Check Balance</button></li>)}</div>
               
            </div>
        </div>
    )
}