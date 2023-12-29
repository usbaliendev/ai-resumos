import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
// import { useTranslateMutation } from "../services/translateApi";

const Demo = () => {
	const [article, setArticle] = useState({
		url: "",
		summary: "",
	});
	const [allArticles, setAllArticles] = useState([]);
	const [copied, setCopied] = useState("");
	const [copiedRes, setCopiedRes] = useState("");
	// const [translate] = useTranslateMutation();

	// RTK lazy query
	const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

	// Carrega os dados do local storage quando o componente e montado
	useEffect(() => {
		const articlesFromLocalStorage = JSON.parse(
			localStorage.getItem("articles")
		);

		if (articlesFromLocalStorage) {
			setAllArticles(articlesFromLocalStorage);
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault(); // previne reload da pagina

		const existingArticle = allArticles.find(
			(item) => item.url === article.url
		);

		if (existingArticle) return setArticle(existingArticle);

		const { data: summaryData } = await getSummary({ articleUrl: article.url });
		if (summaryData?.summary) {
			const articleSummary = summaryData.summary; // substituido pelo meu texto
			// const articleSummary = "This is the API test to see if only small text translation is happening";

			const res = await fetch("https://libretranslate.com/translate", {
				method: "POST",
				body: JSON.stringify({
					q: articleSummary,
					source: "auto",
					target: "pt",
					format: "text",
				}),
				headers: { "Content-Type": "application/json" },
			});

			const translationData = await res.json();

			if (translationData) {
				console.log(translationData);
			}

			const newArticle = {
				...article,
				summary: summaryData.summary,
			}; // espalha o artigo e adiciona o summary
			// const newArticle = { ...article, summary: data.summary }; // espalha o artigo e adiciona o summary
			const updatedAllArticles = [newArticle, ...allArticles]; // update state and local storage

			setArticle(newArticle);
			setAllArticles(updatedAllArticles);
			localStorage.setItem("articles", JSON.stringify(updatedAllArticles)); // aqui usamos stringify poque o local storage so aceita strings
		}
	};

	// copy the url and toggle the icon for user feedback
	const handleCopy = (copyUrl) => {
		setCopied(copyUrl);
		navigator.clipboard.writeText(copyUrl);
		setTimeout(() => setCopied(false), 3000);
	};

	const handleCopyText = (copyRes) => {
		setCopiedRes(copyRes);
		navigator.clipboard.writeText(copyRes);
		setTimeout(() => setCopiedRes(false), 3000);
	};

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			handleSubmit(e);
		}
	};

	return (
		<section className="mt-16 w-full max-w-xl">
			{/* Pesquisa */}
			<div className="flex flex-col w-full gap-2">
				<form
					className="relative flex justify-center items-center"
					onSubmit={handleSubmit}
				>
					<img
						src={linkIcon}
						alt="link-icon"
						className="absolute left-0 my-2 ml-3 w-5"
					/>

					<input
						type="url"
						placeholder="Insira o link do artigo"
						value={article.url}
						onChange={(e) => setArticle({ ...article, url: e.target.value })}
						onKeyDown={handleKeyDown}
						required
						className="url_input peer" // Quando você precisar estilizar um elemento com base no estado de um elemento irmão, marque o irmão com a classe peer e use modificadores peer-* para estilizar o elemento alvo
					/>
					<button
						type="submit"
						className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 "
					>
						<p>↵</p>
					</button>
				</form>

				{/* Historico de pesquisa */}
				<div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
					{allArticles.reverse().map((item, index) => (
						<div
							key={`link-${index}`}
							onClick={() => setArticle(item)}
							className="link_card"
						>
							<p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
								{item.url}
							</p>
							<div className="copy_btn " onClick={() => handleCopy(item.url)}>
								<img
									src={copied === item.url ? tick : copy}
									alt={copied === item.url ? "tick_icon" : "copy_icon"}
									className="w-[40%] h-[40%] object-contain"
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Mostrar resultados */}
			<div className="my-10 max-w-full flex justify-center items-center">
				{isFetching ? (
					<img src={loader} alt="loader" className="w-20 h-20 object-contain" />
				) : error ? (
					<p className="font-inter font-bold text-black text-center">
						Eita, isso não deveria acontecer...
						<br />
						<span className="font-satoshi font-normal text-gray-700">
							{error?.data?.error}
						</span>
					</p>
				) : (
					article.summary && (
						<div className="flex flex-col gap-3">
							<h2 className="font-satoshi font-bold text-gray-600 text-xl">
								<span className="blue_gradient">Resumo</span> do artigo
							</h2>
							<div className="relative group">
								<div className="summary_box">
									<p className="font-inter font-medium text-sm text-justify text-gray-700">
										{article.summary}
									</p>
									<div
										className="copy_btn absolute top-[12px] right-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
										onClick={() => handleCopyText(article.summary)}
									>
										<img
											src={copiedRes === article.summary ? tick : copy}
											alt={
												copiedRes === article.summary
													? "tick_icon"
													: "copy_icon"
											}
											className="w-[40%] h-[40%] object-contain"
										/>
									</div>
								</div>
							</div>
						</div>
					)
				)}
			</div>
		</section>
	);
};

export default Demo;
