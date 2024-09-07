import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { polygonZkEvmCardona } from 'viem/chains';
import {
  Box,
  Container,
  Flex,
  Heading,
  Button,
  Spinner,
  Card,
  Center,
  VStack,
  Input,
} from '@chakra-ui/react';
import demoAbi from '../demoSmartContract/storageAbi.json';
import {
  useReadContract,
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
} from 'wagmi';

import { createPublicClient, http } from 'viem';

const publicClient = createPublicClient({
  chain: polygonZkEvmCardona,
  transport: http(),
});

// variables specific to demo
const chainId = polygonZkEvmCardona.id;
const myzkEvmCardonaContractAddress =
  '0x72657db308e3402F6D825Df98e720FbEF48d997A';

const storageContractConfig = {
  address: myzkEvmCardonaContractAddress,
  abi: demoAbi,
  chainId,
};

function VcGatedDapp() {
  const account = useAccount();
  const [showConnectionInfo, setShowConnectionInfo] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loadingNewValue, setLoadingNewValue] = useState(false);

  const { data: storageValue, refetch: reReadStorageValue } = useReadContract({
    ...storageContractConfig,
    functionName: 'retrieve',
  });

  const { data: hash, isPending, writeContract } = useWriteContract();
  async function submit(e) {
    e.preventDefault();
    await writeContract({
      ...storageContractConfig,
      functionName: 'store',
      args: [BigInt(inputValue)],
    });
    setInputValue('');
    setLoadingNewValue(true);
  }

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (!isConfirming && isSuccess) {
      reReadStorageValue();
    }
  }, [isConfirming, isSuccess]);

  useEffect(() => {
    setLoadingNewValue(false);
  }, [storageValue]);

  return (
    <div id="vc-gated-dapp">
      <Box background="black" color="white" py={4}>
        <Container maxW={'80%'}>
          <Flex justifyContent="space-between">
            <Heading>My VC Gated Dapp</Heading>
            <ConnectButton showBalance={false} />
          </Flex>
        </Container>
      </Box>
      <Box>
        <Container maxW={'80%'} py={4}>
          <Button onClick={() => setShowConnectionInfo(!showConnectionInfo)}>
            {showConnectionInfo ? 'Hide' : 'Show'} connection information
          </Button>
          {showConnectionInfo && (
            <Box py={4}>
              {account.isConnected ? (
                <p>
                  Address {account.address} is connected to this dapp at chain
                  id: {account.chainId}
                </p>
              ) : (
                <p>
                  No account connected. Connect wallet to interact with dapp
                </p>
              )}
            </Box>
          )}
          <div>
            <Card my={4} p={4}>
              <Center>
                <VStack>
                  <Heading>Storage Dapp</Heading>

                  <p>The current value stored is</p>
                  <Heading>
                    {loadingNewValue ? (
                      <Spinner></Spinner>
                    ) : (
                      storageValue?.toString()
                    )}
                  </Heading>

                  <form onSubmit={submit}>
                    <Flex>
                      <Input
                        name="newNumber"
                        placeholder="69420"
                        required
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <Button type="submit" disabled={isPending}>
                        {isPending ? 'Confirming...' : 'Update'}
                      </Button>
                    </Flex>

                    {hash && (
                      <div>
                        <a
                          href={`https://cardona-zkevm.polygonscan.com/tx/${hash}`}
                          target="_blank"
                        >
                          View tx on Polygonscan
                        </a>
                      </div>
                    )}
                  </form>
                </VStack>
              </Center>
            </Card>
            <ul>
              <li>
                Check out the{' '}
                <a
                  href={`https://cardona-zkevm.polygonscan.com/address/${myzkEvmCardonaContractAddress}#code`}
                  target="_blank"
                >
                  Storage contract on Polygonscan
                </a>{' '}
              </li>
              <li>
                You need Polygon zkEVM Testnet ETH to update the storage value.{' '}
                <a
                  href="https://www.youtube.com/watch?v=eYZAPkTCgwg"
                  target="_blank"
                >
                  Get Polygon zkEVM Testnet ETH
                </a>{' '}
                Use the{' '}
                <a
                  href="https://wallet.polygon.technology/?redirectOnConnect=%2FzkEVM-Bridge%2Fbridge"
                  target="_blank"
                >
                  Native Bridge
                </a>{' '}
                to bridge Ethereum Goerli ETH to Polygon zkEVM testnet ETH
              </li>
            </ul>
          </div>
        </Container>
      </Box>
    </div>
  );
}

export default VcGatedDapp;
