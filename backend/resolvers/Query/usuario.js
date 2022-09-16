const db = require('../../config/db')

module.exports = {
	usuarios() {
		// implementar
		return db('usuarios')
	},
	async usuario(_, { filtro }) {
		// implementar
		if (!filtro) return null
		const { id, email } = filtro
		if (id) {
			return db('usuarios')
				.where({ id })
				.first()
		} else if (email) {
			return db('usuarios')
				.where({ email })
				.first()
		} else {
			return null
		}
	},
}