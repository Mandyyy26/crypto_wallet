
import { mnemonicToSeedSync } from "bip39";
import { useState } from "react";
import { HDNodeWallet } from "ethers";
import { Wallet } from "ethers";

export default function EthWallet({mnemonic}: {mnemonic: string}) {
    const [publicKeys,setPublicKeys] = useState<string[]>([]);
    const [privateKeys,setPrivateKeys] = useState<string[]>([]);
    const [currIndex,setCurrIndex] = useState(0);

    function createKeys(){
        if(mnemonic === "" || mnemonic.split(" ").length !== 12){
            alert("Please enter a Mnemonic Phrase");
            return;
        }
        const seed = mnemonicToSeedSync(mnemonic);
        const path = `m/44'/60'/${currIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(path);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);

        setPrivateKeys([...privateKeys, wallet.privateKey]);
        setPublicKeys([...publicKeys, wallet.address]);
        setCurrIndex(currIndex+1);

    }
    return(
        <div>
        <button className="bg-black text-white rounded-full m-4 p-4 hover:bg-slate-800" onClick={createKeys}>Add Etherum Wallet</button>
        <div className="grid grid-cols-2 gap-1">
                <div>{publicKeys.map(p=> <li className="font-mono p-4"><b className="text-purple-700">Public key  <br /></b> ETH- {p.toString()}</li>)}</div>
                <div>{privateKeys.map(p=> <li className="font-mono p-4"><b className="text-green-600">Private key <br /></b>{p.toString()}</li>)}</div>
            </div>
        </div>
    )
}