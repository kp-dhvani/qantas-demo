import { render } from "@testing-library/react";
import { screen, waitFor } from "@testing-library/dom";
import App from "./App";
import ListingPreview from "./components/Preview";
import Price from "./components/Price";
import Ratings from "./components/PropertyCard/Ratings";
import PropertyCard from "./components/PropertyCard";

const mockFetch = jest.fn();
global.fetch = mockFetch;

// using actual data structure from data.json
const mockData = {
	results: [
		{
			id: "cxd650nuyo",
			property: {
				propertyId: "P107801",
				title: "Courtyard by Marriott Sydney-North Ryde",
				address: ["7-11 Talavera Rd", "North Ryde"],
				previewImage: {
					url: "https://unsplash.it/145/125/?random",
					caption: "Image of Courtyard by Marriott Sydney-North Ryde",
					imageType: "PRIMARY",
				},
				rating: {
					ratingValue: 4.5,
					ratingType: "self",
				},
			},
			offer: {
				promotion: {
					title: "Exclusive Deal",
					type: "MEMBER",
				},
				name: "Deluxe Balcony Room",
				displayPrice: {
					amount: 329.0,
					currency: "AUD",
				},
				savings: {
					amount: 30.0,
					currency: "AUD",
				},
				cancellationOption: {
					cancellationType: "NOT_REFUNDABLE",
				},
			},
		},
	],
};

describe("App Component", () => {
	beforeEach(() => {
		mockFetch.mockClear();
	});
	test("renders logo", () => {
		render(<App />);
		expect(screen.getByAltText("Qantas logo")).toBeInTheDocument();
	});
	test("renders loading state initially", () => {
		render(<App />);
		expect(screen.getByTestId("loading-state")).toBeInTheDocument();
	});

	test("renders error message when fetch fails", async () => {
		mockFetch.mockRejectedValueOnce(new Error("Failed to fetch"));
		render(<App />);

		await waitFor(() => {
			expect(screen.getByTestId("error-state")).toBeInTheDocument();
		});
	});

	test("renders listings when fetch succeeds", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => mockData,
		});

		render(<App />);

		await waitFor(() => {
			expect(screen.getByText("1 hotel in Sydney"));
			expect(screen.getByTestId("success-state")).toBeInTheDocument();
			expect(
				screen.getByAltText("Image of Courtyard by Marriott Sydney-North Ryde")
			).toBeInTheDocument();
		});
	});

	test("handles multiple listings correctly", async () => {
		const multipleListingsData = {
			results: [
				mockData.results[0],
				{
					id: "mesq6mggyn",
					property: {
						propertyId: "P107802",
						title: "Primus Hotel Sydney",
						address: ["Primus Hotel", "Sydney"],
						previewImage: {
							url: "https://unsplash.it/145/125/?random",
							caption: "Image of Primus Hotel Sydney",
							imageType: "PRIMARY",
						},
						rating: {
							ratingValue: 4.5,
							ratingType: "self",
						},
					},
					offer: {
						promotion: {
							title: "Exclusive Deal",
							type: "MEMBER",
						},
						displayPrice: {
							amount: 375.0,
							currency: "AUD",
						},
						cancellationOption: {
							cancellationType: "NOT_REFUNDABLE",
						},
					},
				},
			],
		};

		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => multipleListingsData,
		});

		render(<App />);

		await waitFor(() => {
			expect(screen.getByText("2 hotels in Sydney"));
			expect(screen.getByTestId("success-state")).toBeInTheDocument();
			expect(
				screen.getByAltText("Image of Courtyard by Marriott Sydney-North Ryde")
			).toBeInTheDocument();
			expect(
				screen.getByAltText("Image of Primus Hotel Sydney")
			).toBeInTheDocument();
		});
	});
});

describe("ListingPreview Component", () => {
	const mockPreviewProps = {
		listingImage: mockData.results[0].property.previewImage,
		listingPromotion: mockData.results[0].offer.promotion,
	};

	test("renders image with correct attributes", () => {
		render(<ListingPreview {...mockPreviewProps} />);
		const image = screen.getByAltText(mockPreviewProps.listingImage.caption);
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute("src", mockPreviewProps.listingImage.url);
	});

	test("renders promotion title when available", () => {
		render(<ListingPreview {...mockPreviewProps} />);
		expect(
			screen.getByText(mockPreviewProps.listingPromotion.title)
		).toBeInTheDocument();
	});
});

describe("Price Component", () => {
	describe("with AUD currency", () => {
		const mockPriceProps = {
			displayPrice: {
				amount: 199.99,
				currency: "AUD",
			},
		};

		it("should render the correct price amount", () => {
			render(<Price {...mockPriceProps} />);
			expect(screen.getByText("199.99")).toBeInTheDocument();
		});

		it("should render $ symbol for AUD currency", () => {
			render(<Price {...mockPriceProps} />);
			expect(screen.getByText("$")).toBeInTheDocument();
		});

		it('should render "1 night total (AUD)" text', () => {
			render(<Price {...mockPriceProps} />);
			expect(
				screen.getByText((_, element) => {
					// @ts-expect-error -- ignore
					const normalizedText = element!.textContent
						.replace(/\s+/g, " ")
						.trim();
					return normalizedText === "1 night total (AUD)";
				})
			).toBeInTheDocument();
		});

		it("renders savings", () => {
			render(
				<Price
					displayPrice={mockPriceProps.displayPrice}
					savings={mockPriceProps.displayPrice}
				/>
			);
			const savingsElement = screen.getByText(/Save AUD 199\.99/);
			expect(savingsElement).toBeInTheDocument();
		});

		it("should format decimal numbers correctly", () => {
			const propsWithWholeNumber = {
				displayPrice: {
					amount: 200,
					currency: "AUD",
				},
			};
			render(<Price {...propsWithWholeNumber} />);
			expect(screen.getByText("200.00")).toBeInTheDocument();
		});
	});

	describe("with other currencies", () => {
		const mockPriceProps = {
			displayPrice: {
				amount: 150.5,
				currency: "EUR",
			},
		};

		it("should display the currency code instead of $ symbol", () => {
			render(<Price {...mockPriceProps} />);
			const price = mockPriceProps.displayPrice.amount.toFixed(2);
			expect(screen.getByText(`${price} EUR`)).toBeInTheDocument();
		});

		it("should render the correct price with currency", () => {
			render(<Price {...mockPriceProps} />);
			expect(screen.getByText(/150.50/i)).toBeInTheDocument();
		});
	});

	describe("Ratings Component", () => {
		const checkSVGPropertiesForCircles = (
			svgElements: HTMLElement[],
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expectedProperties: any[]
		) => {
			svgElements.forEach((svg, index) => {
				const expectedFill = expectedProperties[index];
				expect(svg.querySelector("circle")?.getAttribute("fill")).toBe(
					expectedFill
				);
			});
		};

		it("handles 0 rating", () => {
			render(<Ratings value={0} type="self" />);
			const circles = screen.getAllByTestId("self-icon");
			expect(circles).toHaveLength(5);
			checkSVGPropertiesForCircles(circles, [
				"none", // Filled
				"none", // Filled
				"none", // Filled
				"none", // Filled
				"none", // Empty
			]);
		});
		describe("Star Rating Type", () => {
			it("renders correct number of stars for integer value", () => {
				render(<Ratings value={4} type="star" />);
				const stars = screen.getAllByTestId("rating-star");
				expect(stars).toHaveLength(5);
			});

			it("renders half star correctly", () => {
				render(<Ratings value={4.5} type="star" />);
				const stars = screen.getAllByTestId("rating-star");
				const expectedFill = [
					"#FFD700", // Filled
					"#FFD700", // Filled
					"#FFD700", // Filled
					"#FFD700", // Filled
					"url(#halfGradient)", // Half
				];
				expect(stars).toHaveLength(5);
				stars.forEach((svg, index) => {
					expect(svg.getAttribute("fill")).toBe(expectedFill[index]);
				});
			});

			it("respects custom maxValue", () => {
				render(<Ratings value={3} type="star" maxValue={6} />);
				const stars = screen.getAllByTestId("rating-star");
				expect(stars).toHaveLength(6);
			});
		});

		describe("Self Rating Type", () => {
			it("renders correct number of circles for integer value", () => {
				render(<Ratings value={4} type="self" />);
				const circles = screen.getAllByTestId("self-icon");
				expect(circles).toHaveLength(5);

				// Check filled vs empty circles
				checkSVGPropertiesForCircles(circles, [
					"#FFD700", // Filled
					"#FFD700", // Filled
					"#FFD700", // Filled
					"#FFD700", // Filled
					"none", // Empty
				]);
			});

			it("renders half circle correctly", () => {
				render(<Ratings value={4.5} type="self" />);
				const circles = screen.getAllByTestId("self-icon");
				expect(circles).toHaveLength(5);

				// Check for half circle
				checkSVGPropertiesForCircles(circles, [
					"#FFD700", // Filled
					"#FFD700", // Filled
					"#FFD700", // Filled
					"#FFD700", // Filled
					"url(#halfGradient)", // Half
				]);
			});
		});
	});

	describe("Property Card", () => {
		it("renders details correctly", () => {
			const listing = mockData.results[0];
			render(
				<PropertyCard
					address={listing.property.address}
					offerName={listing.offer.name}
					title={listing.property.title}
					cancellationOption={{ cancellationType: "FREE_CANCELLATION" }}
					// @ts-expect-error - ignore
					rating={listing.property.rating}
				/>
			);
			expect(
				screen.getByText(mockData.results[0].property.title)
			).toBeInTheDocument();
			expect(
				screen.getByText(mockData.results[0].property.address.toString())
			).toBeInTheDocument();
			expect(
				screen.getByText(mockData.results[0].offer.name)
			).toBeInTheDocument();
			expect(screen.getByTestId("free-cancellation")).toBeInTheDocument();
		});
	});
});
