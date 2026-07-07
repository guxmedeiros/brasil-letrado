package br.com.brasilletrado.security;

import br.com.brasilletrado.model.Instituicao;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.util.Date;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private final String SECRET = "brasil_letrado_super_secret_key_12345";
    private final String ISSUER = "brasil-letrado-api";
    private final long EXPIRATION_TIME = 86400000; // 24 horas

    public String generateToken(Instituicao instituicao) {
        return JWT.create()
                .withIssuer(ISSUER)
                .withSubject(instituicao.getEmail())
                .withClaim("id", instituicao.getId())
                .withClaim("nome", instituicao.getNome())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(Algorithm.HMAC256(SECRET));
    }

    public DecodedJWT validateToken(String token) {
        try {
            return JWT.require(Algorithm.HMAC256(SECRET))
                    .withIssuer(ISSUER)
                    .build()
                    .verify(token);
        } catch (Exception e) {
            return null;
        }
    }
}
