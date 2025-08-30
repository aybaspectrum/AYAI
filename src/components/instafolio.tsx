import React from "react";

/**
 * InstaFolio component displays a section for showcasing achievements.
 * Accessible and responsive by default.
 */
const InstaFolio: React.FC = () => {
	return (
		<section
			className="flex min-h-[60vh] flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
			aria-label="Insta Folio Section"
		>
			<h1 className="mb-4 text-4xl font-bold text-center" tabIndex={0}>
				Insta Folio
			</h1>
			<p className="mb-8 text-lg text-gray-600 text-center" tabIndex={0}>
				Showcase your best moments and achievements here. (UI coming soon!)
			</p>
			{/* Add more UI elements here as you build out the Insta Folio features */}
		</section>
	);
};

export default InstaFolio;
