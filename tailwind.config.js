module.exports = {
	purge: {
		enabled: true,
		content: ['./public/index.html', './public/js/main.js']
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				header: ['Patua One; cursive'],
				poppins: ['Poppins']
			},
			screens: {
				m_320px: '320px',
				m_375px: '375px',
				m_480px: '480px'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
