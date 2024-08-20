import { useState } from "react";
import { generateMnemonic } from "bip39";

export default function MnemonicGenerate({setMnemonic}:{setMnemonic:Function}){
    const [mnemonics,setMnemonics] = useState("");

    function handler(){
        const mn = generateMnemonic();
        setMnemonics(mn);
        setMnemonic(mn);
    }
    return(
        <div className="flex justify-between text-xl">
            <h1 className="text-4xl p-4 m-4 font-serif" ><i>Mnemonics</i></h1>
            <input className="text-center m-4 p-4 max-w-full bg-slate-400 w-1/2 placeholder-slate-100 rounded-t-full"  type="text" value={mnemonics} onChange={(e) => {setMnemonics(e.target.value); setMnemonic(e.target.value)}} placeholder="Enter or Generate your Mnemonic Phrase here" />
            <button className="bg-black text-white rounded-full m-4 p-4 hover:bg-slate-800" onClick={handler}>Create Seed Phrase</button>
        </div>
    )
}