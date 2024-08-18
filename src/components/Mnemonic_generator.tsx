import { useState } from "react";
import { generateMnemonic } from "bip39";

export default function MnemonicGenerate(){
    const [mnemonics,setMnemonics] = useState("");

    function handler(){
        const mn = generateMnemonic();
        setMnemonics(mn);
    }
    return(
        <div>
            <input type="text" value={mnemonics} />
            <button onClick={handler}>Create Seed Phrase</button>
        </div>
    )
}