import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import VcGatedDapp from '../components/VcGatedDapp';
import PolygonIDVerifier from '../components/PolygonIDVerifier';
import { useState } from 'react';
import { Center, Card, Image, CardBody, Container } from '@chakra-ui/react';

const Home: NextPage = () => {
  const [provedAccessBirthday, setProvedAccessBirthday] = useState(false);
  return (
    <>
      {provedAccessBirthday ? (
        <VcGatedDapp />
      ) : (
        <Center className={styles.mainpage}>
          <Container>
            <Card
              style={{
                border: '2px solid #805AD5',
              }}
            >
              <CardBody style={{ paddingBottom: 0 }}>
                <p>
                  This is a fullstack template for creating a Polygon ID VC{' '}
                  <a
                    href="https://devs.polygonid.com/docs/introduction/#core-concepts-of-polygon-id-verifiable-credentials-identity-holder-issuer-and-verifier"
                    target="_blank"
                  >
                    (Verifiable Credential)
                  </a>{' '}
                  gated dapp. Prove you were born before January 1, 2023 to use
                  the dapp
                </p>

                <PolygonIDVerifier
                  publicServerURL={
                    process.env.NEXT_PUBLIC_VERIFICATION_SERVER_PUBLIC_URL
                  }
                  localServerURL={
                    process.env.NEXT_PUBLIC_VERIFICATION_SERVER_LOCAL_HOST_URL
                  }
                  credentialType={'KYCAgeCredential'}
                  issuerOrHowToLink={
                    'https://oceans404.notion.site/How-to-get-a-Verifiable-Credential-f3d34e7c98ec4147b6b2fae79066c4f6?pvs=4'
                  }
                  onVerificationResult={setProvedAccessBirthday}
                />
                <Image
                  src="https://bafybeibcgo5anycve5flw6pcz5esiqkvrzlmwdr37wcqu33u63olskqkze.ipfs.nftstorage.link/"
                  alt="Polygon devs image"
                  borderRadius="lg"
                />
              </CardBody>
              <a
                href="https://twitter.com/0ceans404"
                target="_blank"
                rel="noreferrer"
              >
                <p
                  style={{
                    position: 'absolute',
                    bottom: '-15px',
                    right: '0',
                    fontSize: '8px',
                  }}
                >
                  Template built with 💜 by Steph
                </p>
              </a>
            </Card>
          </Container>
        </Center>
      )}
    </>
  );
};

export default Home;
