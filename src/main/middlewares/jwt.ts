import jwt from 'jsonwebtoken';

export class JwtMiddleware {
	private readonly secretKey = process.env.SECRET_KEY || 'secret'; // A chave secreta deve ser armazenada em uma variável de ambiente, está aqui apenas para fins didáticos do desafio

	generateToken(userId: number, name: string, email: string): string {
		return jwt.sign({ userId, name, email }, this.secretKey, { expiresIn: '1h' });
	}

	verifyToken(token: string): any {
		try {
			const tokenWithoutBearer = token.replace('Bearer ', '');

			return jwt.verify(tokenWithoutBearer, this.secretKey);
		} catch (error) {
			return null;
		}
	}
}

export const jwtMiddleware = new JwtMiddleware();
