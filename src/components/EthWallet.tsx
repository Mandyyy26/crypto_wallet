
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
        <button onClick={createKeys}>Add Eherum Wallet</button>
        {publicKeys.map(p=> <div>Eth - {p.toString()}</div>)}
        </div>
    )
}