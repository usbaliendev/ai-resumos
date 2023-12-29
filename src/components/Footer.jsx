import { format } from "date-fns";

const Footer = () => {
	const year = format(new Date(), "yyyy");

	return (
		<footer className="w-full flex justify-center flex-col text-black py-6 px-4">
			<div className="w-full flex justify-between">
				<div>
					<span className="font-semibold">@usbaliendev</span>
				</div>
				<div>
					<span>© {year} Todos direitos reservados.</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
