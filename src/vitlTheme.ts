import {createTheme} from "@fluentui/react";

export const vitlTheme = createTheme({
	defaultFontStyle: {fontFamily: 'sofia-pro', fontWeight: 'regular', fontSize: '14px'},
	fonts: {
		small: {
			fontSize: '14px',
			color: "inherit"
		},
		medium: {
			fontSize: '14px',
			color: "inherit",
			fontFamily: 'hurme',
			fontWeight: 400
		},
		mediumPlus: {
			fontSize: '14px',
			color: "inherit"
		},
		large: {
			fontSize: '18px',
			color: "inherit"
		},
		xLarge: {
			fontSize: '22px',
			fontWeight: 600,
			color: "inherit",
			fontFamily: 'hurme'
		},
		xxLarge: {
			fontSize: '32px',
			fontWeight: 700,
			color: "inherit",
			height: '52px',
			lineHeight: '52px',
			fontFamily: 'hurme'
		}
	},
	palette: { // NOTE: These are preliminary mappings of existing SASDS tokens, draft tokens do not yet exist in the SASDS. ALl of these need to be revisited.
		themePrimary: 'rgb(0, 120, 212)',
		// themePrimary: '#994444',
		themeLighterAlt: '#ffd326',
		// themeLighter: colors.colorUiLight ,
		// themeLight: colors.colorUiLight ,
		// themeTertiary: 'hsl(206, 69%, 67%)',
		// themeSecondary: colors.colorSecondary ,
		// themeDarkAlt: colors.colorPrimary ,
		// themeDark: colors.colorPrimary ,
		// themeDarker: colors.colorPrimary ,
		// neutralLighterAlt: colors.colorUiLight ,
		// neutralLighter: colors.colorUiMedium ,
		// neutralLight: colors.colorUiDark ,
		// neutralQuaternaryAlt: colors.colorUiBorder ,
		// neutralQuaternary: colors.colorUiBorder ,
		// neutralTertiaryAlt: colors.colorUiBorder ,
		// neutralTertiary: colors.colorNeutral ,
		// neutralSecondary: colors.colorTextLabel ,
		// neutralPrimaryAlt: colors.colorNeutral ,
		// neutralPrimary: colors.colorNeutral ,
		// neutralDark: colors.colorNeutral ,
		// black: colors.colorTextDefault ,
		// white: colors.colorTextInverse ,
	}
})