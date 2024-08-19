import MnemonicGenerate from './components/Mnemonic_generator'
import SolanaWallet from './components/SolanaWalet'


function App() {
  return (
    <>
      <MnemonicGenerate />
      <SolanaWallet mnemonic = "" />
    </>

  )
}

export default App
