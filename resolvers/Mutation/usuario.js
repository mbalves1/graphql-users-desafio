const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil')
const { usuario: obterUsuario } = require('../Query/usuario')

module.exports = {
	async novoUsuario(_, { dados }) {
		// Implementar
		try {
			const idsPerfis = []
			if(dados.perfis) {
				for(filtro of dados.perfis) {
					const perfil = await obterPerfil(_, {
						filtro
					})
					if(perfil) idsPerfis.push(perfil.id)
				}
			}

			// delete dados.perfil
			const [ id ] = await db('usuarios')
				.insert({
					nome: dados.nome,
					email: dados.email,
					senha: dados.senha,
				})

			for(perfil_id of idsPerfis) {
				await db('usuarios_perfis')
					.insert({ perfil_id, usuario_id: id })
			}

			return db('usuarios')
				.where({ id }).first()

		} catch (err) {
			throw new Error(err.sqlMessage)
		}
	},
	async excluirUsuario(_, { filtro }) {
		// Implementar
		try {
			const usuario = await obterUsuario(_, { filtro })
			if (usuario) {
				const { id } = usuario
				await db('usuarios_perfis')
					.where({ usuario_id: id }).delete()
				await db('usuarios')
					.where({ id }).delete()
			}
			return usuario
		} catch (err) {
			throw new Error(err.sqlMessage)
		}
	},
	async alterarUsuario(_, { filtro, dados }) {
		// Implementar
		try {
			const usuario = await obterUsuario(_, { filtro })
			if (usuario) {
				const { id } = usuario
				if(dados.perfis) {
					await db('usuarios_perfis')
						.where({ usuario_id: id}).delete()
					
					for(let filtro of dados.perfis) {
						const perfil = await obterPerfil(_, {
							filtro
						})
						perfil && await db('usuarios_perfis')
							.insert({
								perfil_id: perfil.id,
								usuario_id: id
							})
					}
				}
				delete dados.perfis
				await db('usuarios').where({ id })
					.update(dados)

			}
			return !usuario ? null : { ...usuario, ...dados }
		} catch (err) {
			throw new Error(err.sqlMessage)
		}
	}
}