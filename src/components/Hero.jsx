import React from "react";

import { logo, github } from "../assets";

const Hero = () => {
	return (
		<header className="w-full flex justify-center items-center flex-col">
			<nav className="flex justify-between items-center w-full mb-10 pt-3">
				<img src={logo} alt="airesumo_logo" className="w-14 object-contain" />
				<span className="blue_gradient">OpenAI Resumir.io</span>

				<button
					type="button"
					onClick={() => window.open("https://github.com/usbaliendev")}
					className=""
				>
					<img
						src={github}
						alt="airesumo_logo"
						className="w-8 object-contain"
					/>
				</button>
			</nav>
			<h1 className="head_text">
				Resuma URLs com <br className="max-md:hidden" />{" "}
				<span className="blue_gradient">OpenAI GPT-4</span>
			</h1>
			<h2 className="desc">
				Simplifique sua leitura com Resumir.io, uma ferramenta opensource de
				resumo de URLs e textos que tranforma artigos compridos em resumos
				simples e concisos
			</h2>
			<h2 className="subdesc">
				Por agora apenas URLs com conteúdo em Ingles são suportadas, mas em
				breve integrarei uma API de tradução e textos também serão suportados.
			</h2>
		</header>
	);
};

export default Hero;
