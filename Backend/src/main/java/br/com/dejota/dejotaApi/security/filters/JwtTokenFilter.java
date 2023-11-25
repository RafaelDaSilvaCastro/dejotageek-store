package br.com.dejota.dejotaApi.security.filters;

import br.com.dejota.dejotaApi.security.UserDetailsServiceImp;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenService jwtTokenProvider;

    @Autowired
    private UserDetailsServiceImp userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = jwtTokenProvider.resolveToken(request.getHeader("Authorization"));

            if (token != null && jwtTokenProvider.validateToken(token)) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(jwtTokenProvider.getUsernameFromToken(token));

                var authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
        }
        catch (UsernameNotFoundException e) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), e.getMessage());
        }
        catch (AccessDeniedException e) {
            response.sendError(HttpStatus.FORBIDDEN.value(), e.getMessage());
        }
    }
}
