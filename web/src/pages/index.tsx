import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import usersAvatarExampleImage from '../assets/users-avatar.png'

import iconCheckImg from '../assets/icon-check.svg'

import { api } from "../lib/axios";

interface HomeProps {
  poolCount: number;
  guessCount: number;
}

export default function Home({ poolCount, guessCount }: HomeProps) {
  console.log(poolCount);
  return (
    <div className="max-w-6xl h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={logoImg} alt="Logo do NLW Copa" />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>
        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImage} alt="" />
          <strong className="text-gray-100 text-xl ">
            <span className="text-ignite-500">+12.592</span> pessoas já estão
            usando
          </strong>
        </div>
        <form className="mt-10 flex items-center gap-2" action="">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border-gray-600 text-sn"
            type={"text"}
            required
            placeholder="Qual nome do seu bolão"
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded font-bold text-gray-900 text-sn uppercase hover:bg-yellow-700"
            type="submit"
          >
            Criar meu Bolão
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>
        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolCount}</span>
              <span>Bolões Criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guessCount}</span>
              <span>Palpites Enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={appPreviewImg}
        alt="Dois Celulares exibingo uma prévia da aplicação do NLW Copa"
        quality={100}
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const poolCountResponse = await api.get("/pools/count");

  const guessCountResponse = await api.get("/guesses/count");

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
    },
  };
};
