package br.com.dejota.dejotaApi.security.filters;

import br.com.dejota.dejotaApi.exception.ApiError;
import br.com.dejota.dejotaApi.exception.Message;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.util.Set;

@Component
public class CustomAccessDenied implements AccessDeniedHandler {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private static final Logger LOGGER = LoggerFactory.getLogger(CustomAuthenticationEntryPoint.class);

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");

            LOGGER.error("Access Denied error: {}", accessDeniedException.getMessage());
            Set<Message> errors = Set.of(new Message("Você não tem permissão para acessar este recurso"));
            ApiError apiError = new ApiError(
                    Instant.now(),
                    HttpServletResponse.SC_FORBIDDEN,
                    request.getRequestURI(),
                    errors
            );
            objectMapper.writeValue(response.getWriter(), apiError);
    }
}
