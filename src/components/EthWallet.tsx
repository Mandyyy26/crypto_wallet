
import { mnemonicToSeedSync } from "bip39";
import { useState } from "react";
import { HDNodeWallet } from "ethers";
import { Wallet } from "ethers";

export default function EthWallet({mnemonic}: {mnemonic: string}) {
    const [publicKeys,setPublicKeys] = useState<string[]>([]);
    const [currIndex,setCurrIndex] = useState(0);

    function createKeys(){
        const seed = mnemonicToSeedSync(mnemonic);
        const path = `m/44'/60'/${currIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(path);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);

        setPublicKeys([...publicKeys, wallet.address]);
        setCurrIndex(currIndex+1);

    }
    return(
        <div>
        <button className="bg-black text-white rounded-full m-4 p-4 hover:bg-slate-800" onClick={createKeys}>Add Eherum Wallet</button>
        <div>{publicKeys.map(p=> <li className="font-mono">Eth - {p.toString()}</li>)}</div>
        </div>
    )
}