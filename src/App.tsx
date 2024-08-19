import EthWallet from './components/EthWallet'
import MnemonicGenerate from './components/Mnemonic_generator'
import SolanaWallet from './components/SolanaWalet'


function App() {
  return (
    <>
      <MnemonicGenerate />
      <SolanaWallet mnemonic = "" />
      <EthWallet mnemonic = "fasdfasfasdf" />
    </>

  )
}

export default App
