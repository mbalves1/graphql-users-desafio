const db = require('../../config/db')

module.exports = {
	usuarios(perfil) {
		// implementar (Assunto novo!)
		return db('usuarios')
			.join(
				'usuarios_perfis',
				'usuarios.id',
				'usuarios_perfis.usuario_id'
			)
			.where({ perfil_id: perfil.id })
	}
}