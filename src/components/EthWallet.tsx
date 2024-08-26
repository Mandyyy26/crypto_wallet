
import { mnemonicToSeedSync } from "bip39";
import { useState } from "react";
import { HDNodeWallet } from "ethers";
import { Wallet } from "ethers";

export default function EthWallet({mnemonic}: {mnemonic: string}) {
    const [publicKeys,setPublicKeys] = useState<string[]>([]);
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

        setPublicKeys([...publicKeys, wallet.address]);
        setCurrIndex(currIndex+1);

    }
    return(
        <div>
        <button className="bg-black text-white rounded-full m-4 p-4 hover:bg-slate-800" onClick={createKeys}>Add Etherum Wallet</button>
         <button className="m-2 p-2 bg-red-800 rounded-lg text-white hover:bg-red-600" onClick={()=>{
            setPublicKeys([]);
            setCurrIndex(0);
         }}>Reset</button>
        <div className="text-center">
                <div>{publicKeys.map(p=> <li className="font-mono p-4"><b className="text-purple-700">Public key  <br /></b> ETH- {p.toString()}  <button  className="bg-green-700 text-white m-4 p-4 rounded-full hover:bg-green-900">check Balance</button></li>)}</div>
                
            </div>
        </div>
    )
}