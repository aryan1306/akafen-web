import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

// const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
	sm: "40em",
	md: "52em",
	lg: "64em",
	xl: "80em",
});

const theme = extendTheme({
	colors: {
		black: "#16161D",
		brand: {
			100: "#FFFAC8",
			200: "#DFA408",
			300: "#744838",
		},
	},
	fonts: {
		heading: "Arbutus Slab, serif",
		body: "Inter, sans-serif",
		test: "Noto Serif JP, serif",
	},
	breakpoints,
});

export default theme;
