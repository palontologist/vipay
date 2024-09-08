import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Head from 'next/head'
import VcGatedDapp from '../components/VcGatedDapp'
import PolygonIDVerifier from '../components/PolygonIDVerifier'
import { useState } from 'react'


const Home: NextPage = () => {
  const [provedAccessBirthday, setProvedAccessBirthday] = useState(false)

  return ( 
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
      <Head>
        <title>Crypto & M-Pesa Balance Manager</title>
        <meta name="description" content="Manage your crypto and M-Pesa balance in one place" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {provedAccessBirthday ? (
          <VcGatedDapp />
        ) : (
          <div className="flex flex-col items-center justify-center space-y-8">
            <h1 className="text-4xl font-bold text-center text-purple-800 mb-2">
              Manage Your Crypto & M-Pesa Balance
            </h1>
            <p className="text-xl text-center text-gray-600 mb-8">
              One secure platform for all your financial needs
            </p>

            <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-purple-500 mb-4">
                    Access Your Dashboard
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Prove you were born before January 1, 2023 to use the dapp. This is a{' '}
                    <a
                      href="https://devs.polygonid.com/docs/introduction/#core-concepts-of-polygon-id-verifiable-credentials-identity-holder-issuer-and-verifier"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 underline"
                    >
                      Verifiable Credential
                    </a>{' '}
                    gated dapp.
                  </p>
                  <PolygonIDVerifier
                    publicServerURL={process.env.NEXT_PUBLIC_VERIFICATION_SERVER_PUBLIC_URL}
                    localServerURL={process.env.NEXT_PUBLIC_VERIFICATION_SERVER_LOCAL_HOST_URL}
                    credentialType={'KYCAgeCredential'}
                    issuerOrHowToLink={'https://oceans404.notion.site/How-to-get-a-Verifiable-Credential-f3d34e7c98ec4147b6b2fae79066c4f6?pvs=4'}
                    onVerificationResult={setProvedAccessBirthday}
                  />
                </div>
                <div className="flex-1">
                  <img
                    src="/crazyy.jpg?height=300&width=300"
                    alt="Online Payments Illustration"
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <ConnectButton />
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>
          Template built with 💜 by{' '}
          <a
            href="https://twitter.com/0ceans404"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800"
          >
            palontologist
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Home