import { useState } from 'react';
import EthWallet from './components/EthWallet'
import MnemonicGenerate from './components/Mnemonic_generator'
import SolanaWallet from './components/SolanaWalet'


function App() {
  const [ mnemonic, setMnemonic ] = useState<string>("");

  return (
    <div className='text-center'>
      <MnemonicGenerate setMnemonic = {setMnemonic} />
      <SolanaWallet mnemonic = {mnemonic} />
      <EthWallet mnemonic = {mnemonic} />
    </div>

  )
}

export default App
